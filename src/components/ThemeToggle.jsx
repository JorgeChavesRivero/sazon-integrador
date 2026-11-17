function ThemeToggle({ onSelectDay, onSelectNight }) {
  const handleDay = () => {
    if (onSelectDay) onSelectDay()
    else if (typeof window !== 'undefined' && typeof window.switchTheme === 'function') {
      window.switchTheme('light')
    }
  }

  const handleNight = () => {
    if (onSelectNight) onSelectNight()
    else if (typeof window !== 'undefined' && typeof window.switchTheme === 'function') {
      window.switchTheme('dark')
    }
  }

  return (
    <aside className="fixed bottom-3 right-5 z-40 bg-white/95 dark:bg-[#133124]/95 backdrop-blur-md rounded-full p-1 shadow-xl border border-black/10 dark:border-white/20 flex items-center gap-1 font-mono text-xs">
      <button
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3D8E33] text-white font-bold shadow-sm transition-all duration-200 cursor-pointer"
        id="themeDayBtn"
        title="Activar Modo Día"
        type="button"
        onClick={handleDay}
      >
        <i className="bi bi-sun-fill text-xs"></i>
        <span>Día</span>
      </button>
      <button
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 cursor-pointer"
        id="themeNightBtn"
        title="Activar Modo Noche"
        type="button"
        onClick={handleNight}
      >
        <i className="bi bi-moon-stars-fill text-xs"></i>
        <span>Noche</span>
      </button>
    </aside>
  )
}

export default ThemeToggle
