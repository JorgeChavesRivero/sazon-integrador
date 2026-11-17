const MODULES_DATA = [
  {
    title: 'Catálogo Nutresa',
    cell: 'Célula 1',
    description: 'Gestión de productos oficiales Grupo Nutresa, marcas aliadas e información nutricional y empaques.',
    icon: 'bi-grid',
    href: './src/catalogo-productos/landing.html',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
  },
  {
    title: 'Recetario y Contenido',
    cell: 'Célula 2',
    description: 'Colección de preparaciones, técnicas de cocina, videos y guías paso a paso con marcas Nutresa.',
    icon: 'bi-book',
    href: './src/recetario-contenido/landing.html',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
  },
  {
    title: 'Despensa Virtual',
    cell: 'Célula 3',
    description: 'Control de inventario de ingredientes en el hogar, fechas de caducidad y alertas de reposición.',
    icon: 'bi-box-seam',
    href: './src/despensa-virtual/landing.html',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
  },
  {
    title: 'Nutrición y Perfiles',
    cell: 'Célula 4',
    description: 'Planes nutricionales personalizados, metas familiares y cálculo calórico balanceado.',
    icon: 'bi-heart-pulse',
    href: './src/nutricion-perfiles/landing.html',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
  },
  {
    title: 'Planificador y Lista',
    cell: 'Célula 5',
    description: 'Planificación semanal de menús y generación automática de la lista del mercado familiar.',
    icon: 'bi-calendar-week',
    href: './src/planificador-mercado/landing.html',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300',
  },
  {
    title: 'Comunidad y Reseñas',
    cell: 'Célula 6',
    description: 'Valoraciones de recetas, interacción entre chefs caseros y recomendaciones comunitarias.',
    icon: 'bi-chat-heart',
    href: './src/comunidad-valoraciones/landing.html',
    badgeColor: 'bg-pink-100 text-pink-800 dark:bg-pink-950/60 dark:text-pink-300',
  },
  {
    title: 'Campañas y Puntos',
    cell: 'Célula 7',
    description: 'Programas de lealtad, acumulación de puntos Sa·zón y promociones de marcas familiares.',
    icon: 'bi-megaphone',
    href: './src/mercadeo-campanas/landing.html',
    badgeColor: 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300',
  },
  {
    title: 'Mi Perfil',
    cell: 'Usuarios',
    description: 'Gestión de cuenta de usuario, preferencias culinarias y configuración de la plataforma.',
    icon: 'bi-person-circle',
    href: './src/auth-usuarios/perfil.html',
    badgeColor: 'bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-slate-300',
  },
]

function DashboardView() {
  return (
    <section className="space-y-8">
      {/* Banner Hero */}
      <article
        className="rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl"
        id="hero-banner"
      >
        <section className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-tag font-bold uppercase tracking-wider bg-white/15 text-sazon-verdeNeon border border-white/20 backdrop-blur-md">
            <i className="bi bi-stars"></i>
            <span>Ecosistema Digital 2026</span>
          </span>
          <h2 className="font-poppins font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight m-0">
            El Sabor que nos Une en Familia
          </h2>
          <p className="font-inter text-sm sm:text-base text-white/90 leading-relaxed m-0 font-normal">
            Plataforma integral de nutrición, recetas oficiales, despensa inteligente y planificación culinaria respaldada por las marcas de Grupo Nutresa.
          </p>
          <nav className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl bg-white text-sazon-verdeNutresa font-poppins text-xs font-bold shadow-md hover:bg-slate-100 transition-all flex items-center gap-2 cursor-pointer"
              onClick={() => {
                if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
                  window.showToast('Explorando catálogo y recetas de Grupo Nutresa')
                }
              }}
            >
              <i className="bi bi-grid text-sazon-verdeHoja text-sm"></i>
              <span>Explorar Módulos</span>
            </button>
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl bg-white/15 text-white border border-white/30 backdrop-blur-md font-poppins text-xs font-bold hover:bg-white/25 transition-all flex items-center gap-2 cursor-pointer"
              onClick={() => {
                if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
                  window.showToast('Sesión activa: Mariana Morales (Chef de Comunidad)')
                }
              }}
            >
              <i className="bi bi-person-check text-sm"></i>
              <span>Ver mi Perfil</span>
            </button>
          </nav>
        </section>
      </article>

      {/* Encabezado de Módulos */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
        <section className="space-y-0.5">
          <h3 className="font-poppins font-extrabold text-xl text-slate-900 dark:text-white m-0">
            Módulos del Sistema
          </h3>
          <p className="font-inter text-xs text-slate-500 dark:text-slate-400 m-0">
            Accede a las células funcionales del ecosistema Sa·zón Nutresa
          </p>
        </section>
        <span className="text-xs font-mono-tag text-slate-500 dark:text-slate-400">
          8 células integradas
        </span>
      </section>

      {/* Grid de Módulos con id="modules-container" para el filtro de búsqueda */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        id="modules-container"
      >
        {MODULES_DATA.map((mod) => (
          <article
            key={mod.title}
            data-searchable="true"
            className="group p-5 rounded-2xl bg-white dark:bg-sazon-verdeNutresaCard border border-slate-200/90 dark:border-emerald-900/40 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4 hover:-translate-y-1"
          >
            <section className="space-y-3">
              <header className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-sazon-verdeHoja/10 dark:bg-sazon-verdeHoja/20 text-sazon-verdeHoja dark:text-sazon-verdeNeon flex items-center justify-center text-xl shadow-xs group-hover:scale-110 transition-transform">
                  <i className={`bi ${mod.icon}`}></i>
                </span>
                <span
                  className={`text-[10px] font-mono-tag font-bold uppercase px-2 py-0.5 rounded-md ${mod.badgeColor}`}
                >
                  {mod.cell}
                </span>
              </header>

              <h4 className="font-poppins font-bold text-base text-slate-900 dark:text-white m-0 group-hover:text-sazon-verdeHoja dark:group-hover:text-sazon-verdeNeon transition-colors">
                {mod.title}
              </h4>

              <p className="font-inter text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0 font-normal">
                {mod.description}
              </p>
            </section>

            <footer className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <a
                href={mod.href}
                className="text-xs font-mono-tag font-bold text-sazon-verdeHoja dark:text-sazon-verdeNeon flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                <span>Ingresar</span>
                <i className="bi bi-arrow-right text-xs"></i>
              </a>
              <i className="bi bi-check-circle-fill text-sazon-verdeHoja text-sm opacity-0 group-hover:opacity-100 transition-opacity"></i>
            </footer>
          </article>
        ))}
      </section>
    </section>
  )
}

export default DashboardView

