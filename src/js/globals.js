if (typeof localStorage !== 'undefined' && typeof document !== 'undefined') {
  if (localStorage.getItem('sazon_theme') === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
}

window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sazon: {
          marfil: '#F4F4E8',
          cacao: '#643B22',
          cacaoText: '#F4F4E8',
          verdeNoche: '#114622',
          verdeHondo: '#215B33',
          verdeHoja: '#3D8E33',
          hoja: '#7FBA00',
          verdeNutresa: '#1B4332',
          verdeNutresaCard: '#133326',
          verdeNeon: '#66d149',
          texto: '#3F4040',
          texto2: '#5B5E60',
          brandZenu: '#D32F2F',
          brandDoria: '#E65100',
          brandPietran: '#2E7D32',
          brandNoel: '#C2185B'
        }
      },
      fontFamily: {
        poppins: ['"Poppins"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      }
    }
  }
};
if (typeof tailwind !== 'undefined') {
  tailwind.config = window.tailwind.config;
}

function toggleSidebar() {
  // Si React ya expuso su toggleSidebar reactivo, llamarlo
  if (typeof window !== 'undefined' && typeof window.toggleSidebar === 'function' && window.toggleSidebar !== toggleSidebar) {
    window.toggleSidebar();
    return;
  }
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!sidebar || !overlay) return;
  const isHidden = sidebar.classList.contains('-translate-x-full');
  if (isHidden) {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
    setTimeout(() => overlay.classList.remove('opacity-0'), 10);
    document.body.style.overflow = 'hidden';
  } else {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('opacity-0');
    setTimeout(() => overlay.classList.add('hidden'), 300);
    document.body.style.overflow = '';
  }
}

function showToast(message) {
  const toast = document.getElementById('custom-toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => toast.classList.add('hidden'), 3500);
}

function switchTheme(theme) {
  const html = document.documentElement;
  const dayBtn = document.getElementById('themeDayBtn');
  const nightBtn = document.getElementById('themeNightBtn');
  
  if (theme === 'dark') {
    html.classList.add('dark');
    html.classList.remove('light');
    try { localStorage.setItem('sazon_theme', 'dark'); } catch(e) {}
    if (dayBtn && nightBtn) {
      nightBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3D8E33] text-white font-bold shadow-sm transition-all duration-200';
      dayBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200';
    }
  } else {
    html.classList.remove('dark');
    html.classList.add('light');
    try { localStorage.setItem('sazon_theme', 'light'); } catch(e) {}
    if (dayBtn && nightBtn) {
      dayBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3D8E33] text-white font-bold shadow-sm transition-all duration-200';
      nightBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200';
    }
  }
}
window.toggleSidebar = toggleSidebar;
window.showToast = showToast;
window.switchTheme = switchTheme;

function handleGlobalSearch(event) {
  const target = event ? event.target : document.getElementById('global-search');
  if (!target) return;
  const query = target.value.toLowerCase().trim();
  const cards = document.querySelectorAll('#modules-container article, [data-searchable]');
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? '' : 'none';
  });
}
window.handleGlobalSearch = handleGlobalSearch;

function syncHeaderSession() {
  if (typeof localStorage === 'undefined') return;
  try {
    let sesionStr = localStorage.getItem('sazon_sesion_activa');
    if (!sesionStr) {
      const defaultUser = {
        id: 3,
        nombre: 'Mariana Morales',
        email: 'mariana@nutresa.com',
        rol: 'creador de contenido',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
        biografia: 'Chef entusiasta y creadora de recetas para la comunidad Sa·zón. Comprometida con la nutrición balanceada y la creatividad culinaria con marcas Grupo Nutresa.'
      };
      localStorage.setItem('sazon_sesion_activa', JSON.stringify(defaultUser));
      sesionStr = JSON.stringify(defaultUser);
    }
    const sesion = JSON.parse(sesionStr);
    const nameEl = document.getElementById('header-name');
    const roleEl = document.getElementById('header-role');
    const avatarEl = document.getElementById('header-avatar');
    if (nameEl && sesion.nombre) nameEl.textContent = sesion.nombre;
    if (roleEl && sesion.rol) roleEl.textContent = sesion.rol;
    if (avatarEl && sesion.avatar) avatarEl.src = sesion.avatar;
  } catch(e) {}
}
window.syncHeaderSession = syncHeaderSession;

function initGlobals() {
  if (typeof tailwind !== 'undefined') {
    tailwind.config = window.tailwind.config;
  }

  syncHeaderSession();

  if (document.getElementById('themeDayBtn')) {
    try {
      const savedTheme = localStorage.getItem('sazon_theme');
      if (savedTheme === 'dark') {
        switchTheme('dark');
      } else {
        switchTheme('light');
      }
    } catch(e) {
      switchTheme('light');
    }

    document.getElementById('themeDayBtn')?.addEventListener('click', () => switchTheme('light'));
    document.getElementById('themeNightBtn')?.addEventListener('click', () => switchTheme('dark'));
  }

  document.querySelectorAll('button[id*="toggle-pass"], button[id*="toggle-password"], [data-action="toggle-password"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('section') || btn.parentElement;
      const input = container ? container.querySelector('input') : null;
      const icon = btn.querySelector('i');
      if (input) {
        const isPass = input.type === 'password';
        input.type = isPass ? 'text' : 'password';
        if (icon) {
          icon.className = isPass ? 'bi bi-eye-slash text-sm' : 'bi bi-eye text-sm';
        }
      }
    });
  });

  document.querySelectorAll('[data-action="toggle-sidebar"]').forEach(el => {
    if (!el.dataset.listenerAttached) {
      el.dataset.listenerAttached = 'true';
      el.addEventListener('click', (e) => {
        // Evitar doble toggle si React ya lo manejó
        if (e.defaultPrevented) return;
        toggleSidebar();
      });
    }
  });

  document.getElementById('btn-notifications')?.addEventListener('click', () => {
    showToast('Tienes recetas recomendadas en tu despensa');
  });

  document.getElementById('user-profile')?.addEventListener('click', () => {
    showToast('Sesión activa: Mariana Morales (Chef de Comunidad)');
  });

  const searchForm = document.getElementById('search-form');
  searchForm?.addEventListener('submit', (e) => e.preventDefault());

  const searchInput = document.getElementById('global-search');
  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      showToast('Buscando: ' + searchInput.value);
    }
  });
}
window.initGlobals = initGlobals;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlobals);
} else {
  initGlobals();
}
