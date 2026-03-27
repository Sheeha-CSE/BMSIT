import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { alumni } from '@/data/mockData'
import { Linkedin, Mail, Search, ChevronRight, Building2, GraduationCap } from 'lucide-react'

export const Route = createFileRoute('/alumni')({
  component: AlumniPage,
})

function AlumniPage() {
  const [search, setSearch] = useState('')
  const [yearFilter, setYearFilter] = useState('All')
  const [deptFilter, setDeptFilter] = useState('All')

  const years = ['All', ...Array.from(new Set(alumni.map(a => a.batch.toString()))).sort().reverse()]
  const depts = ['All', ...Array.from(new Set(alumni.map(a => a.department)))]

  const filtered = alumni.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase())
    const matchYear = yearFilter === 'All' || a.batch.toString() === yearFilter
    const matchDept = deptFilter === 'All' || a.department === deptFilter
    return matchSearch && matchYear && matchDept
  })

  return (
    <div className="dark:bg-slate-900 min-h-screen">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a5298] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span>Alumni Connect</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Alumni Connect</h1>
          <p className="text-white/80 max-w-2xl">Connect with our 15,000+ alumni network spread across 40+ countries. Find mentors, collaborators, and friends.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { value: '15,000+', label: 'Alumni Worldwide', icon: GraduationCap },
            { value: '40+', label: 'Countries', icon: Building2 },
            { value: '500+', label: 'Entrepreneurs', icon: Building2 },
            { value: '200+', label: 'PhD Holders', icon: GraduationCap },
          ].map((s, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-center">
              <div className="text-2xl font-bold text-[#1e3a5f] dark:text-amber-400">{s.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search alumni by name, company, or role..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
            />
          </div>
          <select
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
          >
            {years.map(y => <option key={y} value={y}>{y === 'All' ? 'All Batches' : `Batch ${y}`}</option>)}
          </select>
          <select
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
          >
            {depts.map(d => <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>)}
          </select>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(alum => (
            <div key={alum.id} className="card-hover rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden">
              <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2a5298] p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center mx-auto text-[#1e3a5f] text-2xl font-bold">
                  {alum.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <h3 className="text-white font-bold mt-3">{alum.name}</h3>
                <p className="text-amber-300 text-xs mt-0.5">Batch {alum.batch} · {alum.department}</p>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 size={14} className="text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">{alum.company}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{alum.role}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">📍 {alum.location}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 italic mb-4 line-clamp-2">"{alum.achievement}"</p>
                <div className="flex gap-2">
                  <a
                    href={alum.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#0077b5] hover:bg-[#006396] text-white text-xs font-medium py-2 rounded-lg transition-colors"
                  >
                    <Linkedin size={13} /> LinkedIn
                  </a>
                  <a
                    href={`mailto:${alum.email}`}
                    className="flex-1 flex items-center justify-center gap-1.5 border border-[#1e3a5f] dark:border-amber-400 text-[#1e3a5f] dark:text-amber-400 hover:bg-[#1e3a5f] hover:text-white dark:hover:bg-amber-400 dark:hover:text-[#1e3a5f] text-xs font-medium py-2 rounded-lg transition-colors"
                  >
                    <Mail size={13} /> Email
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <GraduationCap size={48} className="mx-auto mb-4 opacity-40" />
            <p>No alumni found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
