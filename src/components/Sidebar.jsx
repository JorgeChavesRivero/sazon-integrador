const DEFAULT_MODULES = [
  {
    name: 'Dashboard Principal',
    href: './landing.html',
    icon: 'bi-speedometer2',
    active: true,
  },
  {
    name: 'Mi Perfil',
    href: './src/auth-usuarios/perfil.html',
    icon: 'bi-person-circle',
  },
  {
    name: 'Catálogo Nutresa',
    href: './src/catalogo-productos/landing.html',
    icon: 'bi-grid',
  },
  {
    name: 'Recetario y Contenido',
    href: './src/recetario-contenido/landing.html',
    icon: 'bi-book',
  },
  {
    name: 'Despensa Virtual',
    href: './src/despensa-virtual/landing.html',
    icon: 'bi-box-seam',
  },
  {
    name: 'Nutrición y Perfiles',
    href: './src/nutricion-perfiles/landing.html',
    icon: 'bi-heart-pulse',
  },
  {
    name: 'Planificador y Lista',
    href: './src/planificador-mercado/landing.html',
    icon: 'bi-calendar-week',
  },
  {
    name: 'Comunidad y Reseñas',
    href: './src/comunidad-valoraciones/landing.html',
    icon: 'bi-chat-heart',
  },
  {
    name: 'Campañas y Puntos',
    href: './src/mercadeo-campanas/landing.html',
    icon: 'bi-megaphone',
  },
]

function Sidebar({ modules = DEFAULT_MODULES, isOpen = false, onClose }) {
  const handleClose = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (onClose) {
      onClose()
    } else if (typeof window !== 'undefined' && typeof window.closeSidebar === 'function') {
      window.closeSidebar()
    } else if (typeof window !== 'undefined' && typeof window.toggleSidebar === 'function') {
      window.toggleSidebar()
    }
  }

  return (
    <>
      {/* Overlay */}
      <section
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 cursor-pointer ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none hidden'
        }`}
        id="sidebar-overlay"
        onClick={handleClose}
      ></section>

      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 h-screen w-80 sm:w-96 bg-sazon-verdeHoja text-white z-50 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        id="sidebar"
      >
        <section className="flex flex-col flex-1 pb-4">
          <header className="flex items-center justify-between pb-4 border-b border-white/20">
            <figure className="flex items-center gap-3 m-0">
              <span className="w-9 h-9 rounded-full bg-white text-sazon-verdeHoja flex items-center justify-center text-xl font-bold shadow-md">
                <svg className="w-5 h-5 fill-current text-sazon-verdeHoja" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                </svg>
              </span>
              <figcaption>
                <h2 className="font-poppins text-lg font-extrabold leading-none text-white m-0">Sa·zón</h2>
                <span className="font-mono-tag text-[10px] tracking-wider uppercase text-white/80 block">Ecosistema Nutresa</span>
              </figcaption>
            </figure>
            <button
              aria-label="Cerrar menú"
              className="p-1.5 rounded-lg hover:bg-white/20 text-white text-lg transition-colors cursor-pointer"
              type="button"
              onClick={handleClose}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </header>

          <span className="text-[11px] font-mono-tag uppercase tracking-wider text-white/70 pt-4 pb-2 block">
            Módulos del Sistema
          </span>

          <nav className="flex-1 flex flex-col justify-around py-2 font-poppins text-sm">
            {modules.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={
                  item.active
                    ? 'flex items-center gap-3.5 px-3 py-2 rounded-xl text-white bg-white/20 font-bold'
                    : 'flex items-center gap-3.5 px-3 py-2 rounded-xl text-white hover:text-white/80 hover:translate-x-1.5 transition-all group hover:bg-white/10'
                }
              >
                <i
                  className={`bi ${item.icon} text-xl w-6 shrink-0 ${
                    item.active ? 'text-sazon-verdeNeon' : 'opacity-90 group-hover:opacity-100'
                  }`}
                ></i>
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
        </section>

        <footer className="pt-4 border-t border-white/20 space-y-2.5">
          <button
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md text-white text-xs font-poppins font-bold transition-all shadow-md group cursor-pointer"
            id="btn-close-sidebar"
            type="button"
            onClick={handleClose}
          >
            <i className="bi bi-x-circle text-base text-white group-hover:rotate-90 transition-transform"></i>
            <span className="tracking-wide text-white">Cerrar Menú</span>
          </button>
        </footer>
      </aside>
    </>
  )
}

export default Sidebar
