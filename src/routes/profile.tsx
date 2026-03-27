import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useApp } from '@/contexts/AppContext'
import { Sidebar } from '@/components/Sidebar'
import { useEffect, useState } from 'react'
import { Mail, Phone, GraduationCap, Building2, Edit, Save } from 'lucide-react'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  const { user, isAuthenticated } = useApp()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [phone, setPhone] = useState('+91 98765 43210')
  const [address, setAddress] = useState('Hostel Block B, Room 204')

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: '/login' })
  }, [isAuthenticated, navigate])

  if (!isAuthenticated || !user) return null

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar activePath="/profile" />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-[#1e3a5f] dark:text-white mb-6">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
            <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2a5298] p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-amber-400 flex items-center justify-center mx-auto text-[#1e3a5f] text-4xl font-bold mb-4">
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <p className="text-amber-300 capitalize">{user.role}</p>
              {user.rollNo && <p className="text-white/60 text-sm mt-1">{user.rollNo}</p>}
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">{user.email}</span>
              </div>
              {user.department && (
                <div className="flex items-center gap-3">
                  <Building2 size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{user.department}</span>
                </div>
              )}
              {user.year && (
                <div className="flex items-center gap-3">
                  <GraduationCap size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Year {user.year}</span>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-[#1e3a5f] dark:text-white text-lg">Personal Information</h2>
              <button
                onClick={() => setEditing(!editing)}
                className="flex items-center gap-1.5 text-sm bg-[#1e3a5f] hover:bg-[#152b47] text-white px-4 py-2 rounded-xl transition-colors"
              >
                {editing ? <><Save size={15} /> Save</> : <><Edit size={15} /> Edit</>}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: 'Full Name', value: user.name, editable: false },
                { label: 'Email Address', value: user.email, editable: false },
                { label: 'Roll Number', value: user.rollNo || 'N/A', editable: false },
                { label: 'Department', value: user.department || 'N/A', editable: false },
                { label: 'Academic Year', value: user.year ? `Year ${user.year}` : 'N/A', editable: false },
                { label: 'Role', value: user.role, editable: false },
              ].map((field, i) => (
                <div key={i}>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{field.label}</label>
                  <p className="mt-1 font-semibold text-gray-800 dark:text-white capitalize">{field.value}</p>
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Phone Number</label>
                {editing ? (
                  <input value={phone} onChange={e => setPhone(e.target.value)}
                    className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]" />
                ) : (
                  <p className="mt-1 font-semibold text-gray-800 dark:text-white">{phone}</p>
                )}
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Hostel / Address</label>
                {editing ? (
                  <input value={address} onChange={e => setAddress(e.target.value)}
                    className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]" />
                ) : (
                  <p className="mt-1 font-semibold text-gray-800 dark:text-white">{address}</p>
                )}
              </div>
            </div>

            {/* Academic Progress (student only) */}
            {user.role === 'student' && (
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700">
                <h3 className="font-bold text-[#1e3a5f] dark:text-white mb-4">Academic Progress</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'CGPA', value: '8.4' },
                    { label: 'Attendance', value: '89%' },
                    { label: 'Credits Earned', value: '142' },
                    { label: 'Backlogs', value: '0' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 rounded-xl bg-gray-50 dark:bg-slate-700">
                      <div className="text-2xl font-bold text-[#1e3a5f] dark:text-amber-400">{stat.value}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
