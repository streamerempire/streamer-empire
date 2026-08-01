/*
  Streamer Empire — Contact & Social Links patch
  Version: 2026-08-01

  This patch ONLY:
  1) Adds Linktree as the first social link.
  2) Adds LinkedIn as the second social link.
  3) Preserves all existing links and page content.
*/
(() => {
  "use strict";

  const LINKS = {
    linktree: "https://linktr.ee/streamerempire",
    linkedin: "https://www.linkedin.com/company/streamerempire/"
  };

  const ICONS = {
    linktree: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M11 2h2v7.17l2.59-2.58L17 8l-5 5-5-5 1.41-1.41L11 9.17V2zm-6.36 9.64L6.05 13.05 3.1 16H9v2H3.1l2.95 2.95-1.41 1.41L0 17.72l4.64-4.64zM19.36 13.08 24 17.72l-4.64 4.64-1.41-1.41L20.9 18H15v-2h5.9l-2.95-2.95 1.41-1.41zM11 15h2v7h-2v-7z"/>
      </svg>`,
    linkedin: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5.2 3.6A2.2 2.2 0 1 1 5.2 8a2.2 2.2 0 0 1 0-4.4zM3.3 9.5h3.8V21H3.3V9.5zm6.1 0H13v1.6h.1c.5-.9 1.7-2 3.6-2 3.9 0 4.6 2.5 4.6 5.8V21h-3.8v-5.4c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21H9.4V9.5z"/>
      </svg>`
  };

  function normalizeUrl(url) {
    try {
      const parsed = new URL(url, window.location.href);
      return `${parsed.hostname.replace(/^www\./, "")}${parsed.pathname.replace(/\/+$/, "")}`.toLowerCase();
    } catch {
      return String(url || "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/+$/, "").toLowerCase();
    }
  }

  function makeLink(href, label, icon, marker) {
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.setAttribute("aria-label", label);
    anchor.setAttribute("title", label);
    anchor.dataset.seSocialPatch = marker;
    anchor.innerHTML = icon;
    return anchor;
  }

  function findSocialContainer() {
    return (
      document.querySelector("#contact .socials") ||
      document.querySelector('[id*="contact" i] .socials') ||
      document.querySelector(".socials")
    );
  }

  function removeExistingDuplicate(container, targetUrl, marker) {
    const normalizedTarget = normalizeUrl(targetUrl);
    container.querySelectorAll("a").forEach((anchor) => {
      const sameUrl = normalizeUrl(anchor.href) === normalizedTarget;
      const sameMarker = anchor.dataset.seSocialPatch === marker;
      if (sameUrl || sameMarker) anchor.remove();
    });
  }

  function applyPatch() {
    const container = findSocialContainer();
    if (!container) return;

    removeExistingDuplicate(container, LINKS.linktree, "linktree");
    removeExistingDuplicate(container, LINKS.linkedin, "linkedin");

    const linktree = makeLink(
      LINKS.linktree,
      "Streamer Empire on Linktree",
      ICONS.linktree,
      "linktree"
    );

    const linkedin = makeLink(
      LINKS.linkedin,
      "Streamer Empire on LinkedIn",
      ICONS.linkedin,
      "linkedin"
    );

    container.prepend(linkedin);
    container.prepend(linktree);
  }

  document.addEventListener("DOMContentLoaded", applyPatch, { once: true });

  const observer = new MutationObserver(() => {
    window.requestAnimationFrame(applyPatch);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  applyPatch();
})();
