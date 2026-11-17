import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import Breadcrumb from './Breadcrumb'
import Toast from './Toast'
import ThemeToggle from './ThemeToggle'
import Footer from './Footer'

function Header({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.toggleSidebar = toggleSidebar
      window.closeSidebar = closeSidebar
      window.openSidebar = openSidebar

      if (typeof window.initGlobals === 'function') {
        window.initGlobals()
      } else if (typeof window.syncHeaderSession === 'function') {
        window.syncHeaderSession()
      }
    }
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isSidebarOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  }, [isSidebarOpen])

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <TopBar onToggleSidebar={toggleSidebar} />
      <Breadcrumb />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <Toast />
      <ThemeToggle />
      <Footer />
    </>
  )
}

export default Header
