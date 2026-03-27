import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useApp } from '@/contexts/AppContext'
import { notifications } from '@/data/mockData'
import {
  Menu, X, Sun, Moon, Bell, Search, ChevronDown,
  GraduationCap, User, LogOut, Settings, LayoutDashboard,
} from 'lucide-react'

const navItems = [
  { label: 'Home', path: '/' },
  {
    label: 'Academics',
    children: [
      { label: 'Courses & Departments', path: '/courses' },
      { label: 'Faculty', path: '/faculty' },
      { label: 'Library Resources', path: '/library' },
    ],
  },
  {
    label: 'Admissions',
    children: [
      { label: 'Admissions Info', path: '/admissions' },
      { label: 'FAQ', path: '/faq' },
    ],
  },
  {
    label: 'Campus Life',
    children: [
      { label: 'Events & News', path: '/events' },
      { label: 'Gallery', path: '/gallery' },
      { label: 'About Us', path: '/about' },
    ],
  },
  { label: 'Placements', path: '/placements' },
  { label: 'Alumni', path: '/alumni' },
  {
    label: 'Resources',
    children: [
      { label: 'Circulars', path: '/circulars' },
      { label: 'Downloads', path: '/downloads' },
      { label: 'Feedback', path: '/feedback' },
    ],
  },
  { label: 'Contact', path: '/contact' },
]

export function Navbar() {
  const { user, isAuthenticated, logout, isDark, toggleTheme } = useApp()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

  const newNotifCount = notifications.filter(n => n.isNew).length

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false)
      if (userRef.current && !userRef.current.contains(e.target as Node)) setShowUserMenu(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate({ to: '/events', search: { q: searchQuery } as any })
      setSearchQuery('')
      setShowSearch(false)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#1e3a5f] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
              <GraduationCap size={22} className="text-[#1e3a5f]" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-base leading-tight">BMSIT Institute</div>
              <div className="text-xs text-amber-300 leading-tight">of Technology</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <button
                      className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-white/10 text-sm font-medium transition-colors"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.label}
                      <ChevronDown size={14} />
                    </button>
                    <div
                      className={`absolute left-0 top-full mt-1 w-52 bg-white text-gray-800 rounded-lg shadow-xl py-1 nav-dropdown ${openDropdown === item.label ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.children.map(child => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2 hover:bg-blue-50 hover:text-[#1e3a5f] text-sm transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path!}
                    className="px-3 py-2 rounded-md hover:bg-white/10 text-sm font-medium transition-colors block"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              {showSearch ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white placeholder-white/60 focus:outline-none focus:border-amber-400 w-40"
                  />
                  <button type="button" onClick={() => setShowSearch(false)} className="ml-1 p-1 hover:bg-white/10 rounded">
                    <X size={16} />
                  </button>
                </form>
              ) : (
                <button onClick={() => setShowSearch(true)} className="p-2 hover:bg-white/10 rounded-md transition-colors">
                  <Search size={18} />
                </button>
              )}
            </div>

            {/* Dark Mode */}
            <button onClick={toggleTheme} className="p-2 hover:bg-white/10 rounded-md transition-colors">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Notifications */}
            {isAuthenticated && (
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 hover:bg-white/10 rounded-md transition-colors"
                >
                  <Bell size={18} />
                  {newNotifCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-400 text-[#1e3a5f] text-xs font-bold rounded-full flex items-center justify-center badge-pulse">
                      {newNotifCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
                    <div className="bg-[#1e3a5f] text-white px-4 py-3 flex justify-between items-center">
                      <span className="font-semibold">Notifications</span>
                      <Link to="/notifications" className="text-xs text-amber-300 hover:text-amber-200" onClick={() => setShowNotifications(false)}>View All</Link>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-slate-700">
                      {notifications.slice(0, 5).map(n => (
                        <div key={n.id} className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 ${n.isNew ? 'border-l-3 border-amber-400' : ''}`}>
                          <div className="flex items-start gap-2">
                            {n.isNew && <span className="mt-1.5 w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />}
                            <div className={n.isNew ? '' : 'ml-4'}>
                              <p className="text-sm font-medium leading-tight">{n.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{n.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/10 rounded-md transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-[#1e3a5f] text-sm font-bold">
                    {user?.name[0]}
                  </div>
                  <span className="hidden sm:block text-sm">{user?.name.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 py-1">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                      <p className="font-semibold text-sm">{user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role} · {user?.department}</p>
                    </div>
                    <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm" onClick={() => setShowUserMenu(false)}>
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm" onClick={() => setShowUserMenu(false)}>
                      <User size={15} /> Profile
                    </Link>
                    {user?.role === 'admin' && (
                      <Link to="/admin" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm" onClick={() => setShowUserMenu(false)}>
                        <Settings size={15} /> Admin Panel
                      </Link>
                    )}
                    <div className="border-t border-gray-100 dark:border-slate-700 mt-1">
                      <button
                        onClick={() => { logout(); setShowUserMenu(false); navigate({ to: '/' }) }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 text-sm w-full"
                      >
                        <LogOut size={15} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Mobile Menu Toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 hover:bg-white/10 rounded-md">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#152b47] border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {navItems.map(item => (
              <div key={item.label}>
                {item.children ? (
                  <div>
                    <div className="px-3 py-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">{item.label}</div>
                    {item.children.map(child => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-6 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    to={item.path!}
                    className="block px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
