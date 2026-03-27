import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { departments } from '@/data/mockData'
import { ChevronRight, Search } from 'lucide-react'

export const Route = createFileRoute('/courses')({
  component: CoursesPage,
})

function CoursesPage() {
  const [search, setSearch] = useState('')

  const categories = [
    'Engineering & Technology',
    'Postgraduate Programs',
    'Basic Sciences',
    'Humanities'
  ]

  const filtered = departments.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.code.toLowerCase().includes(search.toLowerCase())
  )

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  }


  return (
    <div className="dark:bg-slate-900 min-h-screen">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a5298] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span>Courses & Departments</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Departments</h1>
          <p className="text-white/80 max-w-2xl">Explore our diverse departments offering undergraduate, postgraduate, and research programs in engineering, technology, sciences, and humanities.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search departments..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
          />
        </div>

        <div className="space-y-12">
          {categories.map(category => {
            const categoryDepts = filtered.filter(d => d.category === category)
            if (categoryDepts.length === 0) return null

            return (
              <div key={category}>
                <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryDepts.map(dept => (
                    <div key={dept.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                      <h3 className="text-xl font-bold text-[#1e3a8a] mb-2">{dept.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{dept.description}</p>

                      <div className="text-sm text-gray-700 space-y-1 mb-4">
                        <p><strong>Program:</strong> {dept.programs}</p>
                        <p><strong>HoD:</strong> {dept.hod}</p>
                        <p><strong>Affiliation:</strong> VTU, Belagavi</p>
                        <p><strong>Accreditation:</strong> NBA Accredited</p>
                        <p><strong>Focus Areas:</strong> {dept.focusAreas}</p>
                      </div>

                      <a
                        href="#"
                        className="inline-block px-4 py-2 bg-[#1e3a8a] text-white rounded-md text-sm font-medium hover:bg-blue-800"
                      >
                        View Details
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
