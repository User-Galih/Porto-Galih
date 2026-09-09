import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const observed = new WeakSet();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -12% 0px" }
    );

    const attach = () => {
      document.querySelectorAll(".js-reveal").forEach((el) => {
        if (observed.has(el) || el.classList.contains("is-in")) return;
        observed.add(el);
        io.observe(el);
      });
    };

    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
