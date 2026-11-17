function Toast({ message = 'Mensaje de notificación...' }) {
  return (
    <aside
      className="fixed bottom-20 right-5 z-50 bg-slate-900/90 dark:bg-white/95 text-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md border border-slate-700/50 dark:border-slate-200 text-xs font-mono-tag flex items-center gap-3 hidden transition-all"
      id="custom-toast"
    >
      <i className="bi bi-info-circle-fill text-sazon-verdeNeon dark:text-sazon-verdeHoja text-base"></i>
      <output id="toast-msg">{message}</output>
    </aside>
  )
}

export default Toast

