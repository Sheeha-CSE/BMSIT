import { useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useApp } from '@/contexts/AppContext'
import { Sidebar } from '@/components/Sidebar'
import { announcements, events, notes, alumni, faculty } from '@/data/mockData'
import { Plus, Check, Settings, Users, Calendar, BookOpen, Bell, Megaphone } from 'lucide-react'

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})

function AdminPage() {
  const { user, isAuthenticated } = useApp()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [newAnnouncement, setNewAnnouncement] = useState({ text: '', date: '' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: '/login' })
    else if (user?.role !== 'admin') navigate({ to: '/dashboard' })
  }, [isAuthenticated, user, navigate])

  if (!isAuthenticated || user?.role !== 'admin') return null

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Settings },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'users', label: 'Users', icon: Users },
  ]

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setNewAnnouncement({ text: '', date: '' })
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar activePath="/admin" />
      <main className="flex-1 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Settings size={24} className="text-amber-500" />
          <h1 className="text-2xl font-bold text-[#1e3a5f] dark:text-white">Admin Panel</h1>
          <span className="bg-amber-400 text-[#1e3a5f] text-xs font-bold px-2.5 py-1 rounded-full">Admin</span>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 bg-white dark:bg-slate-800 p-1 rounded-2xl border border-gray-100 dark:border-slate-700 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-[#1e3a5f] text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Students', value: '4,820', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { label: 'Faculty Members', value: '108', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
              { label: 'Announcements', value: announcements.length, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
              { label: 'Events This Month', value: events.length, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
              { label: 'Resources Uploaded', value: notes.length, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20' },
              { label: 'Alumni Profiles', value: alumni.length, color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/20' },
              { label: 'Faculty Profiles', value: faculty.length, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
              { label: 'Active Sessions', value: '127', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
            ].map((s, i) => (
              <div key={i} className={`p-5 rounded-2xl ${s.bg} border border-current/10`}>
                <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Announcements Management */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
              <h3 className="font-bold text-[#1e3a5f] dark:text-white mb-4 flex items-center gap-2">
                <Plus size={18} /> Add New Announcement
              </h3>
              <form onSubmit={handleSaveAnnouncement} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Announcement Text</label>
                  <textarea
                    required
                    rows={3}
                    value={newAnnouncement.text}
                    onChange={e => setNewAnnouncement(p => ({ ...p, text: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                    placeholder="Enter announcement text..."
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Date</label>
                    <input
                      type="date"
                      required
                      value={newAnnouncement.date}
                      onChange={e => setNewAnnouncement(p => ({ ...p, date: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                    />
                  </div>
                  <div className="flex items-end">
                    <button type="submit" className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#152b47] text-white font-semibold px-6 py-2.5 rounded-xl transition-colors">
                      {saved ? <><Check size={16} /> Saved!</> : <><Plus size={16} /> Add</>}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
              <div className="p-5 border-b border-gray-100 dark:border-slate-700">
                <h3 className="font-bold text-[#1e3a5f] dark:text-white">Current Announcements</h3>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-slate-700">
                {announcements.map(ann => (
                  <div key={ann.id} className="flex items-start justify-between gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-700">
                    <div>
                      <p className="text-sm text-gray-800 dark:text-gray-200">{ann.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{ann.date}</p>
                    </div>
                    <button className="text-xs text-red-500 hover:text-red-700 flex-shrink-0">Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Events Management */}
        {activeTab === 'events' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
            <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="font-bold text-[#1e3a5f] dark:text-white">Events Management</h3>
              <button className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-[#1e3a5f] font-semibold text-sm px-4 py-2 rounded-xl">
                <Plus size={15} /> Add Event
              </button>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-slate-700">
              {events.map(ev => (
                <div key={ev.id} className="flex items-start justify-between gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-700">
                  <div>
                    <p className="font-medium text-sm text-gray-800 dark:text-white">{ev.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{ev.date} · {ev.venue} · {ev.category}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${ev.registrationOpen ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {ev.registrationOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources */}
        {activeTab === 'resources' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
            <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="font-bold text-[#1e3a5f] dark:text-white">Resource Management</h3>
              <button className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-[#1e3a5f] font-semibold text-sm px-4 py-2 rounded-xl">
                <Plus size={15} /> Upload Resource
              </button>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-slate-700">
              {notes.map(note => (
                <div key={note.id} className="flex items-start justify-between gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-700">
                  <div>
                    <p className="font-medium text-sm text-gray-800 dark:text-white">{note.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{note.department} · {note.type} · {note.uploadedBy}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-400">{note.downloads} downloads</span>
                    <button className="text-xs text-red-500 hover:text-red-700">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
            <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="font-bold text-[#1e3a5f] dark:text-white">User Management</h3>
              <button className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-[#1e3a5f] font-semibold text-sm px-4 py-2 rounded-xl">
                <Plus size={15} /> Add User
              </button>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { role: 'Students', count: '4,820', color: 'blue' },
                  { role: 'Faculty', count: '108', color: 'green' },
                  { role: 'Alumni', count: '15,200+', color: 'purple' },
                ].map((r, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-gray-50 dark:bg-slate-700 text-center">
                    <div className="text-3xl font-bold text-[#1e3a5f] dark:text-white">{r.count}</div>
                    <div className="text-gray-500 dark:text-gray-400 mt-1">{r.role}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm">Demo Users</h4>
                {[
                  { name: 'Aarav Sharma', email: 'student@vit.edu.in', role: 'Student', dept: 'CSE Year 3' },
                  { name: 'Dr. Admin Singh', email: 'admin@vit.edu.in', role: 'Admin', dept: 'Administration' },
                  { name: 'Arjun Mehta', email: 'alumni@vit.edu.in', role: 'Alumni', dept: 'CSE 2018' },
                ].map((u, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-slate-700">
                    <div>
                      <p className="font-medium text-sm text-gray-800 dark:text-white">{u.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{u.email} · {u.dept}</p>
                    </div>
                    <span className="text-xs bg-[#1e3a5f] text-white px-2.5 py-1 rounded-full">{u.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
