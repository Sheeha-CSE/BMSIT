import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useApp } from '@/contexts/AppContext'
import { Sidebar } from '@/components/Sidebar'
import { notifications, events, notes, announcements, placementStats } from '@/data/mockData'
import { Bell, Download, Calendar, BookOpen, TrendingUp, Clock, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const { user, isAuthenticated } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: '/login' })
  }, [isAuthenticated, navigate])

  if (!isAuthenticated || !user) return null

  const newNotifCount = notifications.filter(n => n.isNew).length
  const recentNotes = notes.slice(0, 4)
  const upcomingEvents = events.slice(0, 3)

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar activePath="/dashboard" />

      <main className="flex-1 p-6 overflow-x-hidden">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a5298] rounded-2xl p-6 text-white mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
              <p className="text-white/70 mt-1">
                {user.role === 'student' && `${user.department} · Year ${user.year} · ${user.rollNo}`}
                {user.role === 'admin' && 'Administrator · Full Access'}
                {user.role === 'alumni' && `Alumni · ${user.department}`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-sm">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              {newNotifCount > 0 && (
                <Link to="/notifications" className="inline-flex items-center gap-1.5 mt-2 bg-amber-400 text-[#1e3a5f] text-sm font-semibold px-3 py-1.5 rounded-full">
                  <Bell size={14} /> {newNotifCount} new notifications
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Bell, label: 'New Notifications', value: newNotifCount, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', path: '/notifications' },
            { icon: Download, label: 'Downloads Available', value: notes.length, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', path: '/downloads' },
            { icon: Calendar, label: 'Upcoming Events', value: events.filter(e => e.registrationOpen).length, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', path: '/events' },
            { icon: TrendingUp, label: 'Placement Rate', value: `${placementStats.placementPercent}%`, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', path: '/placements' },
          ].map((stat, i) => (
            <Link key={i} to={stat.path} className={`card-hover p-4 rounded-2xl ${stat.bg} border border-current/10 block`}>
              <stat.icon size={22} className={stat.color} />
              <div className={`text-2xl font-bold ${stat.color} mt-2`}>{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Notes */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-700">
              <h2 className="font-bold text-[#1e3a5f] dark:text-white flex items-center gap-2">
                <BookOpen size={18} className="text-amber-500" /> Recent Resources
              </h2>
              <Link to="/downloads" className="text-xs text-amber-600 flex items-center gap-1">
                View All <ChevronRight size={12} />
              </Link>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-slate-700">
              {recentNotes.map(note => (
                <div key={note.id} className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#1e3a5f]/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Download size={16} className="text-[#1e3a5f] dark:text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{note.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{note.department} · {note.type}</p>
                  </div>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium flex-shrink-0">{note.fileSize}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-700">
              <h2 className="font-bold text-[#1e3a5f] dark:text-white flex items-center gap-2">
                <Calendar size={18} className="text-amber-500" /> Upcoming Events
              </h2>
              <Link to="/events" className="text-xs text-amber-600 flex items-center gap-1">
                View All <ChevronRight size={12} />
              </Link>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-slate-700">
              {upcomingEvents.map(ev => (
                <div key={ev.id} className="flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                  <div className="text-center bg-[#1e3a5f] rounded-xl p-2 min-w-[40px] flex-shrink-0">
                    <div className="text-xs text-white/70">{ev.date.split('-')[1]}</div>
                    <div className="text-lg font-bold text-white leading-none">{ev.date.split('-')[2]}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white leading-tight">{ev.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock size={11} className="text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{ev.time} · {ev.venue}</span>
                    </div>
                    <span className="mt-1.5 inline-block text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                      {ev.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Announcements */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 lg:col-span-2">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-700">
              <h2 className="font-bold text-[#1e3a5f] dark:text-white flex items-center gap-2">
                <Bell size={18} className="text-amber-500" /> Latest Announcements
              </h2>
              <Link to="/circulars" className="text-xs text-amber-600 flex items-center gap-1">
                View All <ChevronRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 dark:divide-slate-700">
              {announcements.slice(0, 4).map(ann => (
                <div key={ann.id} className="p-4 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">{ann.text}</p>
                  <p className="text-xs text-gray-400 mt-2">{ann.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
