const DEFAULT_CRUMBS = [
  { label: 'Inicio', icon: 'bi-house', active: false },
  { label: 'Dashboard Central', icon: 'bi-speedometer2', active: true },
]

function Breadcrumb({ items = DEFAULT_CRUMBS }) {
  return (
    <nav
      aria-label="Miga de pan"
      className="bg-slate-100/60 dark:bg-sazon-verdeNutresaCard/70 border-b border-slate-200/80 dark:border-emerald-900/40 py-2 px-4 sm:px-6 lg:px-8 text-xs font-mono-tag overflow-x-auto"
    >
      <ol className="max-w-7xl mx-auto flex items-center gap-2 whitespace-nowrap list-none m-0 p-0">
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={crumb.label} className="flex items-center gap-2">
              {crumb.active || isLast ? (
                <span
                  aria-current="page"
                  className="bg-sazon-verdeHoja text-white px-2.5 py-1 rounded-md font-bold flex items-center gap-1.5 shadow-sm"
                >
                  {crumb.icon && <i className={`bi ${crumb.icon}`}></i>}
                  <span>{crumb.label}</span>
                </span>
              ) : (
                <>
                  <span className="bg-white dark:bg-sazon-verdeNutresa px-2.5 py-1 rounded-md border border-slate-200 dark:border-emerald-800/60 text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    {crumb.icon && <i className={`bi ${crumb.icon}`}></i>}
                    <span>{crumb.label}</span>
                  </span>
                  <i className="bi bi-chevron-right text-slate-400 text-[10px]"></i>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb

