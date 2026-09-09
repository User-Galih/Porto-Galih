const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const CERT_ROOT = path.join(ROOT, "Certificates");
const PUBLIC_DIR = path.join(ROOT, "Web_porto", "public", "assets", "certificates");
const JSON_PATH = path.join(ROOT, "Web_porto", "public", "data", "certificates.json");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readHeader(filePath, bytes = 64) {
  const fd = fs.openSync(filePath, "r");
  const buf = Buffer.alloc(bytes);
  fs.readSync(fd, buf, 0, bytes, 0);
  fs.closeSync(fd);
  return buf;
}

function classifyFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".json" || ext === ".txt") return null;

  const header = readHeader(filePath);
  const ascii = header.toString("utf8").replace(/^\uFEFF/, "").trimStart();

  if (ascii.startsWith("%PDF")) return "pdf";
  if (ascii.startsWith("<svg") || ascii.startsWith("<?xml")) return "svg";
  if (header[0] === 0xff && header[1] === 0xd8) return "jpeg";
  if (header[0] === 0x89 && header[1] === 0x50) return "png";
  if (ext === ".pdf") return "pdf";
  if (ext === ".svg") return "svg";
  if (ext === ".jpeg" || ext === ".jpg") return "jpeg";
  if (ext === ".png") return "png";
  return "other";
}

function stem(fileName) {
  return fileName.replace(/\.[^.]+$/, "");
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

const certificates = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
const byId = new Map(certificates.map((c) => [c.id, c]));

const folders = fs.readdirSync(CERT_ROOT, { withFileTypes: true }).filter((d) => d.isDirectory());
const report = [];

for (const dir of folders) {
  const folderPath = path.join(CERT_ROOT, dir.name);
  const metaPath = path.join(folderPath, "metadata.json");
  if (!fs.existsSync(metaPath)) {
    report.push({ folder: dir.name, status: "skip-no-metadata" });
    continue;
  }

  const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
  const cert = byId.get(meta.id);
  if (!cert) {
    report.push({ folder: dir.name, status: "skip-unknown-id", id: meta.id });
    continue;
  }

  const files = fs.readdirSync(folderPath).map((name) => {
    const full = path.join(folderPath, name);
    return { name, full, kind: classifyFile(full) };
  });

  const pdf = files.find((f) => f.kind === "pdf");
  const photo = files.find((f) => f.kind === "jpeg" || f.kind === "png");
  const svg = files.find((f) => f.kind === "svg");

  const nameBase = photo
    ? stem(photo.name)
    : svg
      ? stem(svg.name)
      : pdf
        ? stem(pdf.name)
        : null;

  if (!nameBase) {
    report.push({ folder: dir.name, status: "no-assets" });
    continue;
  }

  let imageUrl = null;
  if (photo) {
    const destName = `${nameBase}${path.extname(photo.name).toLowerCase()}`;
    copyFile(photo.full, path.join(PUBLIC_DIR, destName));
    imageUrl = `assets/certificates/${destName}`;
  } else if (svg) {
    const destName = `${nameBase}.svg`;
    copyFile(svg.full, path.join(PUBLIC_DIR, destName));
    imageUrl = `assets/certificates/${destName}`;
  }

  let previewUrl = null;
  if (pdf) {
    const destName = `${nameBase}.pdf`;
    copyFile(pdf.full, path.join(PUBLIC_DIR, destName));
    previewUrl = `assets/certificates/${destName}`;
  }

  cert.image_url = imageUrl;
  cert.preview_url = previewUrl;
  cert.file_url = previewUrl || imageUrl;

  if (cert.id === "bnsp-data-scientist") {
    cert.verification_url = "";
  } else if (meta.verification_url) {
    cert.verification_url = meta.verification_url;
  }

  report.push({
    folder: dir.name,
    id: cert.id,
    image: imageUrl,
    preview: previewUrl,
    verify: cert.verification_url || "(none)",
    pdfSourceName: pdf ? pdf.name : null,
    renamedPdf: pdf && stem(pdf.name) !== nameBase
  });
}

fs.writeFileSync(JSON_PATH, JSON.stringify(certificates, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
console.log("\nUpdated", JSON_PATH);
