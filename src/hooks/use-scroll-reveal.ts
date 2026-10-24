import { useEffect } from "react";

/** Progressive enhancement: content remains visible without motion support. */
export function useScrollReveal() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(
      "#home section:not(.hero-intro) .animate-fade-in, #home section .animate-fade-in-up, #home section .animate-scale-in, [data-scroll-reveal]",
    ));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

    elements.forEach((element) => {
      // Never hide content already in the opening viewport.
      if (element.getBoundingClientRect().top < window.innerHeight - 24) return;
      element.classList.add("scroll-reveal");
      observer.observe(element);
    });
    const showAll = () => {
      if (preference.matches) {
        observer.disconnect();
        elements.forEach((element) => element.classList.add("is-revealed"));
      }
    };
    preference.addEventListener("change", showAll);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", showAll);
      elements.forEach((element) => element.classList.remove("scroll-reveal", "is-revealed"));
    };
  }, []);
}