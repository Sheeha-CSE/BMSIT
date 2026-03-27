import { useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useApp } from '@/contexts/AppContext'
import { Sidebar } from '@/components/Sidebar'
import { notifications } from '@/data/mockData'
import { Bell, Check } from 'lucide-react'

export const Route = createFileRoute('/notifications')({
  component: NotificationsPage,
})

const typeColors: Record<string, string> = {
  event: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  placement: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  internship: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  aicte: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  resource: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400',
  academic: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  workshop: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
}

function NotificationsPage() {
  const { isAuthenticated } = useApp()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const [readIds, setReadIds] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: '/login' })
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) return null

  const types = ['All', 'event', 'placement', 'internship', 'aicte', 'resource', 'academic']
  const filtered = filter === 'All' ? notifications : notifications.filter(n => n.type === filter)
  const markAllRead = () => setReadIds(new Set(notifications.map(n => n.id)))

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar activePath="/notifications" />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1e3a5f] dark:text-white flex items-center gap-2">
              <Bell size={24} className="text-amber-500" /> Notifications
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {notifications.filter(n => n.isNew && !readIds.has(n.id)).length} unread notifications
            </p>
          </div>
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-sm bg-[#1e3a5f] hover:bg-[#152b47] text-white px-4 py-2 rounded-xl transition-colors"
          >
            <Check size={15} /> Mark All Read
          </button>
        </div>

        {/* Type filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${filter === type ? 'bg-[#1e3a5f] text-white' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700'}`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(notif => {
            const isRead = readIds.has(notif.id) || !notif.isNew
            return (
              <div
                key={notif.id}
                className={`flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border transition-all cursor-pointer hover:shadow-md ${
                  !isRead ? 'border-amber-200 dark:border-amber-800 border-l-4 border-l-amber-400' : 'border-gray-100 dark:border-slate-700'
                }`}
                onClick={() => setReadIds(prev => new Set([...prev, notif.id]))}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[notif.type] || 'bg-gray-100 text-gray-600'}`}>
                  <Bell size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-semibold text-sm ${!isRead ? 'text-[#1e3a5f] dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {notif.title}
                    </h3>
                    {!isRead && (
                      <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-amber-400 mt-1 badge-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{notif.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium capitalize ${typeColors[notif.type]}`}>{notif.type}</span>
                    <span className="text-xs text-gray-400">{notif.date}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
