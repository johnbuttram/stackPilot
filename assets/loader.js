let currentSection = "";

async function loadComponent(id, path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to fetch ${path}`);
    const html = await res.text();
    const container = document.getElementById(id);
    if (!container) throw new Error(`No element with ID ${id}`);
    container.innerHTML = html;
  } catch (err) {
    console.error(`Error loading component '${id}' from '${path}':`, err);
    const fallback = document.getElementById(id);
    if (fallback) {
      fallback.innerHTML = `<div class='text-red-500 text-sm'>Error loading content from <code>${path}</code></div>`;
    }
  }
}

function handleHashChange() {
  const hash = window.location.hash;
  const [baseSection, anchor] = hash.replace("#", "").split("#");

  if (baseSection !== currentSection) {
    currentSection = baseSection;
    loadComponent("main", `content/${baseSection}-content.html`).then(() => {
      if (anchor) {
        document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
      }
    });
  } else if (anchor) {
    document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  handleHashChange();
  window.addEventListener("hashchange", handleHashChange);
  loadComponent("header-placeholder", "assets/header.html");
  loadComponent("footer-placeholder", "assets/footer.html");
});