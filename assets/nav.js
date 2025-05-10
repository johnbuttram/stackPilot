const navItems = [
  {
    id: "index",
    label: "Welcome"
  },
  {
    id: "section2",
    label: "Getting Started",
    children: [
      { id: "section2#editor", label: "Choosing a Code Editor" },
      { id: "section2#github", label: "Setting Up Git & GitHub" },
      { id: "section2#server", label: "Running a Local Server" },
      { id: "section2#prompts", label: "ChatGPT Setup Prompts" }
    ]
  },
  {
    id: "section3",
    label: "Folder Structure"
  },
  {
    id: "section4",
    label: "Styling Options"
  },
  {
    id: "section5",
    label: "Creating New Sections"
  },
  {
    id: "section6",
    label: "Dynamic Navigation"
  }
];

function renderSidebar() {
  const sidebar = document.getElementById("sidebar-placeholder");
  sidebar.innerHTML = `
    <nav>
      <ul class="space-y-2 text-sm font-medium">
        ${navItems.map(item => {
          const hasChildren = item.children && item.children.length > 0;
          const childrenHTML = hasChildren ? `
            <ul class='pl-4 space-y-1 hidden' id="submenu-${item.id}">
              ${item.children.map(child => `
                <li>
                  <a href="#${child.id}" class="block px-2 py-1 text-sm text-cyan-300 hover:underline" data-subnav>
                    ${child.label}
                  </a>
                </li>
              `).join('')}
            </ul>` : "";

          return `
            <li>
              <div class="flex justify-between items-center px-3 py-2 hover:bg-cyan-200 dark:hover:bg-cyan-700 rounded">
                <a href="#${item.id}" class="text-left flex-grow">${item.label}</a>
                ${hasChildren ? `<button class="toggle-parent ml-2" data-target="submenu-${item.id}" aria-label="Toggle submenu">
                  <span>▶</span>
                </button>` : ""}
              </div>
              ${childrenHTML}
            </li>
          `;
        }).join('')}
      </ul>
    </nav>
  `;

  // Add toggle behavior for subsections
  document.querySelectorAll('.toggle-parent').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target');
      const submenu = document.getElementById(targetId);
      if (submenu) submenu.classList.toggle('hidden');
      const icon = btn.querySelector('span');
      if (icon) icon.textContent = submenu.classList.contains('hidden') ? '▶' : '▼';
    });
  });

  highlightActiveLink();
}

function highlightActiveLink() {
  const hash = window.location.hash;
  document.querySelectorAll('[data-subnav]').forEach(link => {
    link.classList.remove('bg-cyan-800', 'text-white', 'font-semibold');
    if (link.getAttribute('href') === hash) {
      link.classList.add('bg-cyan-800', 'text-white', 'font-semibold');
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  window.addEventListener("hashchange", highlightActiveLink);
});
