import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { circulars } from '@/data/mockData'
import { FileText, Download, ChevronRight, Search } from 'lucide-react'

export const Route = createFileRoute('/circulars')({
  component: CircularsPage,
})

const catColors: Record<string, string> = {
  Examination: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  Administrative: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  Academic: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  Library: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
}

function CircularsPage() {
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')

  const categories = ['All', ...Array.from(new Set(circulars.map(c => c.category)))]

  const filtered = circulars.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = catFilter === 'All' || c.category === catFilter
    return matchSearch && matchCat
  })

  return (
    <div className="dark:bg-slate-900 min-h-screen">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a5298] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span>Circulars & Announcements</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Circulars & Announcements</h1>
          <p className="text-white/80 max-w-2xl">Official circulars, notices, and announcements from academic and administrative departments.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search circulars..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCatFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${catFilter === cat ? 'bg-[#1e3a5f] text-white' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:border-[#1e3a5f]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map(c => (
            <div key={c.id} className="card-hover flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
              <div className="w-12 h-12 rounded-xl bg-[#1e3a5f]/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                <FileText size={22} className="text-[#1e3a5f] dark:text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-[#1e3a5f] dark:text-white text-base">{c.title}</h3>
                      {c.isNew && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">NEW</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${catColors[c.category] || 'bg-gray-100 text-gray-600'}`}>
                        {c.category}
                      </span>
                      <span className="text-xs text-gray-400">{c.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 leading-relaxed">{c.description}</p>
              </div>
              <button className="flex items-center gap-1.5 text-sm text-[#1e3a5f] dark:text-amber-400 hover:underline flex-shrink-0">
                <Download size={15} /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
