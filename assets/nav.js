
const navItems = [
  { id: "index", label: "Welcome" },
  { id: "section2", label: "Folder Structure" },
  // Future sections can be added here
];

function renderSidebar() {
  const sidebar = document.getElementById("sidebar-placeholder");
  sidebar.innerHTML = `
    <nav>
      <ul class="space-y-2 text-sm font-medium">
        ${navItems.map(item => `
          <li>
            <a href="#${item.id}" class="block px-3 py-2 hover:bg-cyan-200 dark:hover:bg-cyan-700 rounded">
              ${item.label}
            </a>
          </li>
        `).join('')}
      </ul>
    </nav>
  `;
}

document.addEventListener("DOMContentLoaded", renderSidebar);
