function TopBar({ onToggleSidebar, onSearch }) {
  const handleToggle = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (onToggleSidebar) {
      onToggleSidebar()
    } else if (typeof window !== 'undefined' && typeof window.toggleSidebar === 'function') {
      window.toggleSidebar()
    }
  }

  const handleSearchInput = (e) => {
    if (onSearch) {
      onSearch(e)
    } else if (typeof window !== 'undefined' && typeof window.handleGlobalSearch === 'function') {
      window.handleGlobalSearch(e)
    }
  }

  return (
    <header
      className="sticky top-0 z-30 bg-white dark:bg-sazon-verdeNutresaCard/95 backdrop-blur-md border-b border-slate-200/80 dark:border-emerald-900/60 px-4 sm:px-6 lg:px-8 py-2.5 transition-colors"
      id="top-header"
    >
      <section className="max-w-7xl mx-auto flex items-center justify-between gap-4 w-full">
        {/* Izquierda: Botón Menú + Logotipo Sa·zón */}
        <section className="flex items-center gap-3 shrink-0">
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/60 text-sazon-verdeHoja dark:text-sazon-verdeNeon hover:bg-sazon-verdeHoja hover:text-white dark:hover:bg-sazon-verdeHoja dark:hover:text-white border border-emerald-200/70 dark:border-emerald-800/50 text-xs font-poppins font-bold transition-all cursor-pointer shadow-xs"
            id="btn-toggle-menu"
            type="button"
            onClick={handleToggle}
          >
            <i className="bi bi-list text-lg leading-none"></i>
            <span className="font-poppins">Menú</span>
          </button>

          <a
            className="flex items-center gap-2.5 m-0 text-inherit hover:opacity-90 transition-opacity"
            href="./landing.html"
          >
            <span className="w-8 h-8 rounded-xl bg-sazon-verdeHoja text-white flex items-center justify-center font-bold text-base shadow-sm">
              <svg className="w-4.5 h-4.5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
              </svg>
            </span>
            <figcaption className="hidden sm:block">
              <h1 className="font-poppins font-black text-xl text-slate-900 dark:text-white leading-none tracking-tight m-0">
                Sa·zón
              </h1>
            </figcaption>
          </a>
        </section>

        {/* Centro: Buscador estilo cápsula */}
        <form
          className="flex-1 max-w-xl mx-2 sm:mx-6"
          id="search-form"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="relative w-full block">
            <span className="sr-only">Buscar recetas, productos Nutresa, módulos...</span>
            <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-emerald-500 text-xs"></i>
            <input
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-full bg-slate-100/80 dark:bg-sazon-verdeNutresa border border-slate-200/80 dark:border-emerald-800/80 focus:outline-none focus:ring-2 focus:ring-sazon-verdeHoja dark:text-white placeholder:text-slate-400 dark:placeholder:text-emerald-500/70 font-inter transition-all"
              id="global-search"
              placeholder="Buscar recetas, productos Nutresa, módulos..."
              type="search"
              onInput={handleSearchInput}
            />
          </label>
        </form>

        {/* Derecha: Notificaciones + Perfil */}
        <section className="flex items-center gap-3 shrink-0">
          <button
            aria-label="Notificaciones"
            className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-sazon-verdeNutresa text-slate-500 dark:text-slate-300 transition-colors cursor-pointer"
            id="btn-notifications"
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
                window.showToast('Tienes recetas recomendadas en tu despensa')
              }
            }}
          >
            <i className="bi bi-bell text-lg"></i>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-sazon-verdeNutresaCard"></span>
          </button>

          <aside
            className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-emerald-800/60 cursor-pointer hover:opacity-85 transition-opacity group select-none"
            id="user-profile"
            onClick={() => {
              if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
                window.showToast('Sesión activa: Mariana Morales (Creador De Contenido)')
              }
            }}
          >
            <img
              alt="Mariana Morales"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-sazon-verdeHoja shadow-xs"
              id="header-avatar"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
            />
            <span className="hidden md:block text-left leading-tight">
              <span
                className="font-poppins font-bold text-xs block text-slate-900 dark:text-white"
                id="header-name"
              >
                Mariana Morales
              </span>
              <span
                className="font-mono-tag text-[10px] text-slate-500 dark:text-sazon-verdeNeon block capitalize"
                id="header-role"
              >
                Creador De Contenido
              </span>
            </span>
            <i className="bi bi-chevron-down text-[10px] text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white transition-colors hidden sm:block"></i>
          </aside>
        </section>
      </section>
    </header>
  )
}

export default TopBar
