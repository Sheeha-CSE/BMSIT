import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { departments, faculty } from '@/data/mockData'
import { Users, BookOpen, FlaskConical, ChevronRight, Search } from 'lucide-react'

export const Route = createFileRoute('/courses')({
  component: CoursesPage,
})

function CoursesPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<number | null>(null)

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

  const dept = selected !== null ? departments.find(d => d.id === selected) : null

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
                <h2 className="text-2xl font-bold text-[#1e3a5f] dark:text-white mb-6">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryDepts.map(dept => (
                    <div
                      key={dept.id}
                      className={`card-hover rounded-2xl border-2 ${colorMap[dept.color]} cursor-pointer transition-all`}
                      onClick={() => setSelected(selected === dept.id ? null : dept.id)}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <span className="text-4xl">{dept.icon}</span>
                          <span className="bg-[#1e3a5f] text-white text-xs font-bold px-3 py-1 rounded-full">{dept.code}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#1e3a5f] dark:text-white mb-2">{dept.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{dept.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                            <Users size={14} />
                            <span>{dept.students} Students</span>
                          </div>
                          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <BookOpen size={14} />
                            <span>{dept.faculty} Faculty</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">HOD: {dept.hod}</p>
                      </div>

                      {selected === dept.id && (
                        <div className="border-t border-current/10 p-6 space-y-4">
                          <div>
                            <h4 className="font-semibold text-[#1e3a5f] dark:text-white text-sm mb-2 flex items-center gap-1">
                              <BookOpen size={14} /> Programs Offered
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {dept.courses.map((c, i) => (
                                <span key={i} className="text-xs bg-[#1e3a5f] text-white px-3 py-1 rounded-full">{c}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#1e3a5f] dark:text-white text-sm mb-2 flex items-center gap-1">
                              <FlaskConical size={14} /> Laboratories
                            </h4>
                            <ul className="space-y-1">
                              {dept.labs.map((lab, i) => (
                                <li key={i} className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                                  {lab}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
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
