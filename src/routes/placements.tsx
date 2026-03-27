import { createFileRoute, Link } from '@tanstack/react-router'
import { placementStats, placementCompanies, departmentPlacementStats } from '@/data/mockData'
import { Trophy, TrendingUp, Building2, Users, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/placements')({
  component: PlacementsPage,
})

const typeColors: Record<string, string> = {
  Dream: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  'Super Dream': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  Mass: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  Core: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
}

function PlacementsPage() {
  return (
    <div className="dark:bg-slate-900 min-h-screen">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a5298] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span>Placements</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Placements & Internships</h1>
          <p className="text-white/80 max-w-2xl">VIT's Training & Placement Cell ensures industry-ready graduates. 88% placement rate with packages up to ₹42 LPA.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          {[
            { icon: Trophy, value: `${placementStats.placementPercent}%`, label: 'Overall Placement Rate', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
            { icon: TrendingUp, value: `₹${placementStats.avgPackage} LPA`, label: 'Average CTC', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
            { icon: Trophy, value: `₹${placementStats.highestPackage} LPA`, label: 'Highest CTC (Google)', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
            { icon: Building2, value: `${placementStats.companiesVisited}+`, label: 'Companies Visited', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          ].map((stat, i) => (
            <div key={i} className={`card-hover p-6 rounded-2xl ${stat.bg} border border-current/10`}>
              <stat.icon size={28} className={`${stat.color} mb-3`} />
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* More stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { value: placementStats.totalStudents, label: 'Eligible Students' },
            { value: placementStats.placed, label: 'Students Placed' },
            { value: placementStats.offersReceived, label: 'Total Offers' },
            { value: placementStats.ppoConverted, label: 'PPO Converted' },
          ].map((s, i) => (
            <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-center">
              <div className="text-2xl font-bold text-[#1e3a5f] dark:text-white">{s.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Department-wise placement bar chart */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-[#1e3a5f] dark:text-white mb-6">Department-wise Placement (%)</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
            <div className="space-y-4">
              {departmentPlacementStats.map((d, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-bold text-[#1e3a5f] dark:text-white">{d.dept}</div>
                  <div className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-full h-8 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#1e3a5f] to-[#2a5298] rounded-full flex items-center justify-end pr-3 progress-bar"
                      style={{ width: `${d.placed}%` }}
                    >
                      <span className="text-white text-xs font-bold">{d.placed}%</span>
                    </div>
                  </div>
                  <div className="w-20 text-sm text-gray-600 dark:text-gray-300 text-right">₹{d.avg} LPA avg</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company List */}
        <div>
          <h2 className="text-2xl font-bold text-[#1e3a5f] dark:text-white mb-6">Top Recruiting Companies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {placementCompanies.map((company, i) => (
              <div key={i} className="card-hover flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
                <div className="w-12 h-12 rounded-xl bg-[#1e3a5f] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {company.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-800 dark:text-white text-sm">{company.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[company.type]}`}>{company.type}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{company.package} · {company.students} students</p>
                </div>
                <Users size={16} className="text-gray-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Internships CTA */}
        <div className="mt-14 p-8 rounded-2xl bg-[#1e3a5f] text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Looking for Internship Opportunities?</h2>
          <p className="text-white/70 mb-6">VIT's Placement Cell facilitates internships with 50+ companies. Register on the student portal to apply.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="bg-amber-400 hover:bg-amber-300 text-[#1e3a5f] font-bold px-8 py-3 rounded-xl transition-colors">
              Student Portal
            </Link>
            <Link to="/events" className="border-2 border-white/30 hover:border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl transition-colors">
              View Placement Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
