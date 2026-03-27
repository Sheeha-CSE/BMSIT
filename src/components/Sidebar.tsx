import { Link, useNavigate } from '@tanstack/react-router'
import { useApp } from '@/contexts/AppContext'
import {
  LayoutDashboard, User, Bell, Download, BookOpen, Users,
  Calendar, LogOut, Settings, ChevronRight,
} from 'lucide-react'

const studentLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: User, label: 'My Profile', path: '/profile' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Download, label: 'Downloads', path: '/downloads' },
  { icon: BookOpen, label: 'Library', path: '/library' },
  { icon: Calendar, label: 'Events', path: '/events' },
  { icon: Users, label: 'Alumni', path: '/alumni' },
]

const adminLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Settings, label: 'Admin Panel', path: '/admin' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Calendar, label: 'Events', path: '/events' },
]

interface SidebarProps {
  activePath?: string
}

export function Sidebar({ activePath }: SidebarProps) {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const links = user?.role === 'admin' ? adminLinks : studentLinks

  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 min-h-screen">
      {/* User Info */}
      <div className="p-6 border-b border-gray-200 dark:border-slate-700 bg-[#1e3a5f] text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-[#1e3a5f] text-xl font-bold">
            {user?.name[0]}
          </div>
          <div>
            <p className="font-semibold text-sm">{user?.name}</p>
            <p className="text-xs text-amber-300 capitalize">{user?.role}</p>
            {user?.rollNo && <p className="text-xs text-white/60">{user.rollNo}</p>}
          </div>
        </div>
        {user?.department && (
          <div className="mt-3 text-xs text-white/70">
            {user.department} {user.year ? `· Year ${user.year}` : ''}
          </div>
        )}
      </div>

      {/* Nav Links */}
      <nav className="p-3 space-y-1">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activePath === link.path
                ? 'bg-[#1e3a5f] text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-[#1e3a5f] dark:hover:text-white'
            }`}
          >
            <link.icon size={18} />
            <span>{link.label}</span>
            {activePath === link.path && <ChevronRight size={14} className="ml-auto" />}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-6 left-0 w-64 px-3">
        <button
          onClick={() => { logout(); navigate({ to: '/' }) }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}
