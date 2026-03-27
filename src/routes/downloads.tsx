import { useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useApp } from '@/contexts/AppContext'
import { Sidebar } from '@/components/Sidebar'
import { notes } from '@/data/mockData'
import { Download, Search, Upload, FileText, BookOpen } from 'lucide-react'

export const Route = createFileRoute('/downloads')({
  component: DownloadsPage,
})

const typeColors: Record<string, string> = {
  Notes: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  PYQ: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  Syllabus: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  Circular: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
}

function DownloadsPage() {
  const { isAuthenticated, user } = useApp()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [yearFilter, setYearFilter] = useState('All')
  const [showUpload, setShowUpload] = useState(false)
  const [downloaded, setDownloaded] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: '/login' })
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) return null

  const depts = ['All', ...Array.from(new Set(notes.map(n => n.department)))]
  const types = ['All', 'Notes', 'PYQ', 'Syllabus', 'Circular']
  const years = ['All', '1', '2', '3', '4']

  const filtered = notes.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.subject.toLowerCase().includes(search.toLowerCase())
    const matchDept = deptFilter === 'All' || n.department === deptFilter
    const matchType = typeFilter === 'All' || n.type === typeFilter
    const matchYear = yearFilter === 'All' || n.year.toString() === yearFilter
    return matchSearch && matchDept && matchType && matchYear
  })

  const handleDownload = (id: number) => {
    setDownloaded(prev => new Set([...prev, id]))
    // Simulate download
    setTimeout(() => {}, 1000)
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
      <Sidebar activePath="/downloads" />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1e3a5f] dark:text-white flex items-center gap-2">
              <Download size={24} className="text-amber-500" /> Downloads & Resources
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Notes, PYQs, Syllabus, Circulars — filterable by department and year
            </p>
          </div>
          {user?.role === 'admin' && (
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-[#1e3a5f] font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              <Upload size={16} /> Upload Resource
            </button>
          )}
        </div>

        {/* Upload Form (Admin only) */}
        {showUpload && user?.role === 'admin' && (
          <div className="mb-6 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800">
            <h3 className="font-bold text-[#1e3a5f] dark:text-white mb-4">Upload New Resource</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Title', 'Subject', 'Uploaded By'].map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{field}</label>
                  <input className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                <select className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]">
                  {depts.filter(d => d !== 'All').map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <select className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]">
                  {types.filter(t => t !== 'All').map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PDF File</label>
                <input type="file" accept=".pdf" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-sm text-gray-800 dark:text-white" />
              </div>
            </div>
            <button className="mt-4 bg-[#1e3a5f] hover:bg-[#152b47] text-white font-semibold px-6 py-2.5 rounded-xl transition-colors">
              Upload
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
            />
          </div>
          {[
            { label: 'Department', value: deptFilter, options: depts, onChange: setDeptFilter },
            { label: 'Type', value: typeFilter, options: types, onChange: setTypeFilter },
            { label: 'Year', value: yearFilter, options: years, onChange: setYearFilter },
          ].map(f => (
            <select
              key={f.label}
              value={f.value}
              onChange={e => f.onChange(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
            >
              {f.options.map(o => <option key={o} value={o}>{o === 'All' ? `All ${f.label}s` : (f.label === 'Year' ? `Year ${o}` : o)}</option>)}
            </select>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {types.slice(1).map(type => (
            <div key={type} className="flex items-center gap-2 text-sm">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[type]}`}>{type}</span>
              <span className="text-gray-500 dark:text-gray-400">{notes.filter(n => n.type === type).length}</span>
            </div>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(note => (
            <div key={note.id} className="card-hover bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                  <FileText size={22} className="text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 dark:text-white text-sm leading-tight truncate">{note.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{note.subject}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[note.type]}`}>{note.type}</span>
                    <span className="text-xs text-gray-400">{note.department}</span>
                    <span className="text-xs text-gray-400">Year {note.year}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">By {note.uploadedBy}</p>
                  <p className="text-xs text-gray-400">{note.fileSize} · {note.downloads} downloads</p>
                </div>
                <button
                  onClick={() => handleDownload(note.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors ${
                    downloaded.has(note.id)
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-[#1e3a5f] hover:bg-[#152b47] text-white'
                  }`}
                >
                  <Download size={13} />
                  {downloaded.has(note.id) ? 'Downloaded' : 'Download'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <BookOpen size={48} className="mx-auto mb-4 opacity-40" />
            <p>No resources found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  )
}
