const fs = require('fs');
const path = require('path');

// Target paths
const PROJECTS_JSON_PATH = path.join(__dirname, 'Web_porto', 'public', 'data', 'projects.json');
const PROJECT_DIR_PATH = path.join(__dirname, 'Project');
const ASSETS_PROJECTS_DIR = path.join(__dirname, 'Web_porto', 'public', 'assets', 'projects');

// Helper to slugify folder names
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start
    .replace(/-+$/, '');            // Trim - from end
}

// Helper to format folder name into readable title
function formatTitle(folderName) {
  return folderName
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

// Recursively scan directory up to a certain depth
function scanDirectory(dir, depth = 0, maxDepth = 3) {
  let files = [];
  if (depth > maxDepth) return files;
  
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        if (file !== 'node_modules' && file !== '.git' && file !== '.venv' && file !== 'dist' && file !== 'media') {
          files.push({ type: 'dir', name: file, path: fullPath });
          files = files.concat(scanDirectory(fullPath, depth + 1, maxDepth));
        }
      } else {
        files.push({ type: 'file', name: file, path: fullPath });
      }
    });
  } catch (e) {
    // Ignore read errors
  }
  return files;
}

// Detect tools based on files present in the folder
function detectTools(allFiles) {
  const tools = new Set();
  
  allFiles.forEach(f => {
    const nameLower = f.name.toLowerCase();
    
    if (nameLower.endsWith('.ipynb')) tools.add('Jupyter Notebook');
    if (nameLower.endsWith('.py')) tools.add('Python');
    if (nameLower.endsWith('.js') || nameLower.endsWith('.jsx')) tools.add('JavaScript');
    if (nameLower.endsWith('.ts') || nameLower.endsWith('.tsx')) tools.add('TypeScript');
    if (nameLower.endsWith('.go')) tools.add('Go');
    if (nameLower.endsWith('.php')) tools.add('PHP');
    if (nameLower.endsWith('.html')) tools.add('HTML5');
    if (nameLower.endsWith('.css')) tools.add('CSS3');
    
    if (nameLower === 'package.json') tools.add('Node.js');
    if (nameLower === 'dockerfile' || nameLower.startsWith('docker-compose')) tools.add('Docker');
    if (nameLower === 'requirements.txt') tools.add('Python');
    
    if (nameLower.includes('fastapi')) tools.add('FastAPI');
    if (nameLower.includes('react')) tools.add('React');
    if (nameLower.includes('tailwind')) tools.add('Tailwind CSS');
    if (nameLower.includes('tensorflow')) tools.add('TensorFlow');
    if (nameLower.includes('keras')) tools.add('Keras');
  });

  return Array.from(tools);
}

// Find demo URL in text files
function findDemoUrl(allFiles) {
  const txtFiles = allFiles.filter(f => f.type === 'file' && f.name.toLowerCase().endsWith('.txt'));
  
  for (const f of txtFiles) {
    try {
      const content = fs.readFileSync(f.path, 'utf8');
      const match = content.match(/https?:\/\/[^\s]+/);
      if (match) {
        return match[0].trim();
      }
    } catch (e) {}
  }
  return null;
}

// Extract GitHub repo from .git/config if available
function getGitRepo(projectPath) {
  const gitConfigPath = path.join(projectPath, '.git', 'config');
  if (fs.existsSync(gitConfigPath)) {
    try {
      const content = fs.readFileSync(gitConfigPath, 'utf8');
      const match = content.match(/url\s*=\s*(?:https:\/\/github\.com\/|git@github\.com:)([^\s]+)(?:\.git)?/);
      if (match) {
        return match[1].replace(/\.git$/, '').trim();
      }
    } catch (e) {}
  }
  
  try {
    const list = fs.readdirSync(projectPath);
    for (const file of list) {
      const fullPath = path.join(projectPath, file);
      if (fs.statSync(fullPath).isDirectory() && file !== 'node_modules' && file !== '.venv') {
        const subGit = getGitRepo(fullPath);
        if (subGit) return subGit;
      }
    }
  } catch (e) {}
  
  return null;
}

// Helper to copy files recursively
function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Process and copy media files for a project
function processProjectMedia(projectFolderPath, projectSlug) {
  const mediaDir = path.join(projectFolderPath, 'media');
  const videosDir = path.join(mediaDir, 'videos');
  const documentsDir = path.join(mediaDir, 'documents');
  const imagesDir = path.join(mediaDir, 'images');

  // 1. Proactively create local media folders if they don't exist
  if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir, { recursive: true });
    console.log(`  > Created 'media/' folder in ${path.basename(projectFolderPath)}`);
  }
  if (!fs.existsSync(videosDir)) fs.mkdirSync(videosDir, { recursive: true });
  if (!fs.existsSync(documentsDir)) fs.mkdirSync(documentsDir, { recursive: true });
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

  const mediaData = {
    video_url: '',
    presentation_url: '',
    guide_url: '',
    meet_photos: []
  };

  // Target directory inside Web_porto public assets
  const targetWebDir = path.join(ASSETS_PROJECTS_DIR, projectSlug);
  const targetWebVideos = path.join(targetWebDir, 'videos');
  const targetWebDocs = path.join(targetWebDir, 'documents');
  const targetWebImages = path.join(targetWebDir, 'images');

  // 2. Check for youtube.txt first, then scan and copy videos
  try {
    const youtubePath = path.join(videosDir, 'youtube.txt');
    if (fs.existsSync(youtubePath)) {
      const ytUrl = fs.readFileSync(youtubePath, 'utf8').trim();
      if (ytUrl) {
        mediaData.video_url = ytUrl;
        console.log(`  > Found YouTube URL in youtube.txt: ${ytUrl}`);
      }
    } else {
      const videos = fs.readdirSync(videosDir).filter(f => f.match(/\.(mp4|mkv|mov|avi|webm)$/i));
      if (videos.length > 0) {
        fs.mkdirSync(targetWebVideos, { recursive: true });
        fs.copyFileSync(path.join(videosDir, videos[0]), path.join(targetWebVideos, videos[0]));
        mediaData.video_url = `assets/projects/${projectSlug}/videos/${videos[0]}`;
        console.log(`  > Copied video: ${videos[0]}`);
      }
    }
  } catch (e) {
    console.error("  > Error processing videos for " + projectSlug, e);
  }

  // 3. Scan and copy documents (PPT & User Guide)
  try {
    const docs = fs.readdirSync(documentsDir).filter(f => f.match(/\.(pdf|pptx|ppt|docx|doc)$/i));
    docs.forEach(doc => {
      fs.mkdirSync(targetWebDocs, { recursive: true });
      fs.copyFileSync(path.join(documentsDir, doc), path.join(targetWebDocs, doc));
      
      const docLower = doc.toLowerCase();
      if (docLower.includes('ppt') || docLower.includes('presentation') || docLower.includes('presentasi') || docLower.includes('pitch')) {
        mediaData.presentation_url = `assets/projects/${projectSlug}/documents/${doc}`;
        console.log(`  > Copied presentation: ${doc}`);
      } else if (docLower.includes('guide') || docLower.includes('user') || docLower.includes('panduan') || docLower.includes('manual')) {
        mediaData.guide_url = `assets/projects/${projectSlug}/documents/${doc}`;
        console.log(`  > Copied user guide: ${doc}`);
      } else {
        // Fallback to presentation if undefined
        if (!mediaData.presentation_url) {
          mediaData.presentation_url = `assets/projects/${projectSlug}/documents/${doc}`;
        }
      }
    });
  } catch (e) {}
  // 4. Scan and copy meeting photos / UI screenshots
  try {
    const images = fs.readdirSync(imagesDir).filter(f => f.match(/\.(jpg|jpeg|png|webp|gif)$/i));
    images.forEach(img => {
      fs.mkdirSync(targetWebImages, { recursive: true });
      fs.copyFileSync(path.join(imagesDir, img), path.join(targetWebImages, img));
      
      const imgLower = img.toLowerCase();
      if (!imgLower.includes('evaluation') && !imgLower.includes('confusion') && !imgLower.includes('matrix') && !imgLower.includes('cm_')) {
        mediaData.meet_photos.push(`assets/projects/${projectSlug}/images/${img}`);
        console.log(`  > Copied screenshot to meet_photos: ${img}`);
      } else {
        console.log(`  > Copied evaluation asset: ${img}`);
      }
    });
  } catch (e) {}

  return mediaData;
}

function sync() {
  console.log('=== Web Portfolio Project & Media Synchronizer ===');
  
  // 1. Read existing projects.json
  let projects = [];
  if (fs.existsSync(PROJECTS_JSON_PATH)) {
    try {
      projects = JSON.parse(fs.readFileSync(PROJECTS_JSON_PATH, 'utf8'));
      console.log(`Loaded ${projects.length} existing projects from projects.json.`);
    } catch (e) {
      console.error('Error parsing projects.json, starting with empty array.', e);
    }
  } else {
    console.log('projects.json does not exist, creating new database.');
  }

  // 2. Read subdirectories of Project/
  if (!fs.existsSync(PROJECT_DIR_PATH)) {
    console.error(`Project directory not found at: ${PROJECT_DIR_PATH}`);
    return;
  }

  const projectFolders = fs.readdirSync(PROJECT_DIR_PATH).filter(file => {
    const fullPath = path.join(PROJECT_DIR_PATH, file);
    return fs.statSync(fullPath).isDirectory();
  });

  console.log(`Found ${projectFolders.length} folders in Project/ directory:`, projectFolders);

  let changesMade = false;

  // 3. Process each folder
  projectFolders.forEach(folder => {
    const fullPath = path.join(PROJECT_DIR_PATH, folder);
    const slug = slugify(folder);
    
    // Process local project media and copy files to public web assets
    console.log(`\nProcessing folder: '${folder}'`);
    const mediaData = processProjectMedia(fullPath, slug);

    // Read metadata.json from project folder if available
    const metadataPath = path.join(fullPath, 'metadata.json');
    let folderProjects = [];
    
    if (fs.existsSync(metadataPath)) {
      try {
        const rawMeta = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        folderProjects = Array.isArray(rawMeta) ? rawMeta : [rawMeta];
        console.log(`  > Loaded ${folderProjects.length} project(s) metadata configuration.`);
      } catch (e) {
        console.error(`  > Error parsing metadata.json in ${folder}:`, e);
      }
    }

    // Fallback if metadata.json is not found or empty
    if (folderProjects.length === 0) {
      const allFiles = scanDirectory(fullPath, 0, 3);
      const tools = detectTools(allFiles);
      const demoUrl = findDemoUrl(allFiles);
      const githubRepo = getGitRepo(fullPath);
      const title = formatTitle(folder);

      folderProjects.push({
        id: slug,
        title_id: title,
        title_en: title,
        subtitle_id: "Proyek AI & Software Engineering Baru",
        subtitle_en: "New AI & Software Engineering Project",
        description_id: `Deskripsi otomatis untuk proyek dari folder ${folder}. Silakan edit berkas projects.json atau metadata.json proyek ini untuk memperbarui teks ini.`,
        description_en: `Automated description for project from folder ${folder}. Please edit projects.json or metadata.json to customize this text.`,
        architecture_id: "• Arsitektur: Belum dikonfigurasi.<br>• Integrasi: Tambahkan detail teknis arsitektur di metadata.json.",
        architecture_en: "• Architecture: Not configured.<br>• Integration: Add technical architecture details in metadata.json.",
        tools: tools.length > 0 ? tools : ["Python"],
        github_repo: githubRepo || "User-Galih",
        demo_url: demoUrl || ""
      });
    }

    // Process and merge each project found in this folder
    folderProjects.forEach(proj => {
      proj.folder_name = folder;

      // Auto-merge media files if not explicitly defined in project metadata
      if (!proj.video_url && mediaData.video_url) {
        proj.video_url = mediaData.video_url;
      }
      if (!proj.presentation_url && mediaData.presentation_url) {
        proj.presentation_url = mediaData.presentation_url;
      }
      if (!proj.guide_url && mediaData.guide_url) {
        proj.guide_url = mediaData.guide_url;
      }
      if ((!proj.meet_photos || proj.meet_photos.length === 0) && mediaData.meet_photos.length > 0) {
        proj.meet_photos = mediaData.meet_photos;
      }

      // Check if project exists in database
      const existingIndex = projects.findIndex(p => p.id === proj.id);
      if (existingIndex !== -1) {
        // Merge updates
        projects[existingIndex] = { ...projects[existingIndex], ...proj };
        console.log(`  > Merged and updated project '${proj.id}' (${proj.title_id})`);
      } else {
        // Push as new project
        projects.push(proj);
        console.log(`  > Added new project '${proj.id}' (${proj.title_id})`);
      }
      changesMade = true;
    });
  });

  // 4. Check for orphaned folders (folders that are in projects.json but no longer exist in Project/)
  projects.forEach(p => {
    if (p.folder_name && !projectFolders.includes(p.folder_name)) {
      console.warn(`\n[WARNING] Project '${p.title_id}' is mapped to folder '${p.folder_name}', but this folder was not found in Project/.`);
      console.log(`  > Keeping the project in database but clearing its folder_name mapping to avoid loss of data.`);
      p.folder_name = "";
      changesMade = true;
    }
  });

  // 5. Write back to projects.json
  if (changesMade) {
    try {
      // Ensure target directory exists
      const targetDir = path.dirname(PROJECTS_JSON_PATH);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.writeFileSync(PROJECTS_JSON_PATH, JSON.stringify(projects, null, 2), 'utf8');
      console.log('\nSUCCESS: projects.json has been updated and synchronized!');
    } catch (e) {
      console.error('\nERROR writing to projects.json:', e);
    }
  } else {
    console.log('\nNo changes needed. projects.json is up to date.');
  }

  // --- Certificates Synchronization ---
  console.log('\n=== Syncing Certificates ===');
  const CERTS_DIR_PATH = path.join(__dirname, 'Certificates');
  const WEB_CERTS_JSON_PATH = path.join(__dirname, 'Web_porto', 'public', 'data', 'certificates.json');
  const WEB_CERTS_ASSETS_DIR = path.join(__dirname, 'Web_porto', 'public', 'assets', 'certificates');

  if (fs.existsSync(CERTS_DIR_PATH)) {
    const certFolders = fs.readdirSync(CERTS_DIR_PATH).filter(file => {
      const fullPath = path.join(CERTS_DIR_PATH, file);
      return fs.statSync(fullPath).isDirectory();
    });

    const certList = [];
    certFolders.forEach(folder => {
      const folderPath = path.join(CERTS_DIR_PATH, folder);
      const metadataPath = path.join(folderPath, 'metadata.json');

      if (fs.existsSync(metadataPath)) {
        try {
          const certMeta = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
          
          // Look for certificate file (PDF or Image) inside the folder
          const files = fs.readdirSync(folderPath);
          const certFile = files.find(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.pdf', '.jpg', '.jpeg', '.png', '.webp'].includes(ext) && file !== 'metadata.json';
          });

          if (certFile) {
            fs.mkdirSync(WEB_CERTS_ASSETS_DIR, { recursive: true });
            fs.copyFileSync(path.join(folderPath, certFile), path.join(WEB_CERTS_ASSETS_DIR, certFile));
            certMeta.file_url = `assets/certificates/${certFile}`;
            console.log(`  > Synchronized certificate file for '${certMeta.id}': ${certFile}`);
          } else {
            // Keep existing file_url if present in metadata, or default to empty
            if (!certMeta.file_url) {
              certMeta.file_url = "";
            }
          }

          // Look for any .txt file in the folder for link & syllabus
          const txtFile = files.find(file => path.extname(file).toLowerCase() === '.txt');
          if (txtFile) {
            try {
              const txtContent = fs.readFileSync(path.join(folderPath, txtFile), 'utf8');
              const lines = txtContent.split(/\r?\n/).map(line => line.trim());
              
              let parsedLink = '';
              const parsedSyllabus = [];

              lines.forEach(line => {
                // Extract URL/Link
                const linkMatch = line.match(/(https?:\/\/[^\s]+)/);
                if (linkMatch && !parsedLink) {
                  parsedLink = linkMatch[1];
                }

                // Extract Syllabus item (starts with -, *, +, or numbers)
                if (line.match(/^[-*+]\s+/) || line.match(/^\d+[\.\)]\s+/)) {
                  const cleanedItem = line.replace(/^[-*+]\s+/, '').replace(/^\d+[\.\)]\s+/, '').trim();
                  if (cleanedItem) {
                    parsedSyllabus.push(cleanedItem);
                  }
                }
              });

              if (parsedLink) {
                certMeta.verification_url = parsedLink;
                console.log(`  > Parsed verification link from text file in ${folder}: ${parsedLink}`);
              }

              if (parsedSyllabus.length > 0) {
                certMeta.syllabus_id = parsedSyllabus;
                // Auto-translate syllabus to English
                certMeta.syllabus_en = parsedSyllabus.map(item => {
                  return item
                    .replace(/jam/gi, 'hours')
                    .replace(/menit/gi, 'minutes')
                    .replace(/Belajar/gi, 'Learn')
                    .replace(/Dasar-Dasar/gi, 'Fundamentals')
                    .replace(/Dasar/gi, 'Basic')
                    .replace(/Pengenalan/gi, 'Introduction to')
                    .replace(/dan/gi, 'and')
                    .replace(/dengan/gi, 'with')
                    .replace(/Tingkat Mahir/gi, 'Advanced Level')
                    .replace(/Tingkat/gi, 'Level')
                    .replace(/Pemula/gi, 'Beginner')
                    .replace(/Jaringan Saraf Tiruan/gi, 'Artificial Neural Networks')
                    .replace(/Pengembangan/gi, 'Development')
                    .replace(/Aplikasi/gi, 'Application')
                    .replace(/Membangun/gi, 'Building')
                    .replace(/Proyek/gi, 'Project')
                    .replace(/Analisis/gi, 'Analysis')
                    .replace(/Lanjutan/gi, 'Advanced')
                    .replace(/Klasifikasi/gi, 'Classification')
                    .replace(/Citra Medis/gi, 'Medical Imaging')
                    .replace(/Pemrograman/gi, 'Programming')
                    .replace(/Struktur/gi, 'Structure')
                    .replace(/Data/gi, 'Data')
                    .replace(/Algoritma/gi, 'Algorithm')
                    .replace(/Jaringan/gi, 'Network')
                    .replace(/Saraf/gi, 'Neural')
                    .replace(/Tiruan/gi, 'Artificial')
                    .replace(/Memulai/gi, 'Getting Started with')
                    .replace(/Keamanan/gi, 'Security')
                    .replace(/Siber/gi, 'Cyber')
                    .replace(/Pengelolaan/gi, 'Management');
                });
                console.log(`  > Parsed ${parsedSyllabus.length} syllabus items from text file in ${folder} and translated to English.`);
              }
            } catch (txtErr) {
              console.error(`  > Error parsing txt file in ${folder}:`, txtErr);
            }
          }

          certList.push(certMeta);
        } catch (e) {
          console.error(`  > Error parsing certificate metadata in ${folder}:`, e);
        }
      }
    });

    if (certList.length > 0) {
      try {
        fs.mkdirSync(path.dirname(WEB_CERTS_JSON_PATH), { recursive: true });
        fs.writeFileSync(WEB_CERTS_JSON_PATH, JSON.stringify(certList, null, 2), 'utf8');
        console.log(`SUCCESS: certificates.json updated with ${certList.length} items!`);
      } catch (e) {
        console.error('ERROR writing to certificates.json:', e);
      }
    }
  } else {
    console.log('Certificates directory does not exist, skipping certificates sync.');
  }
}

sync();
