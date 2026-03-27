import { createFileRoute, Link } from '@tanstack/react-router'
import { faculty } from '@/data/mockData'

export const Route = createFileRoute('/faculty')({
  component: FacultyPage,
})

const departmentOrder = ['CSE', 'AI & ML', 'Mechanical Engineering', 'Chemistry', 'ECE', 'EEE', 'CE', 'IT', 'CSBS', 'MBA', 'MCA']

function FacultyPage() {
  const grouped = faculty.reduce((acc, f) => {
    if (!acc[f.department]) acc[f.department] = []
    acc[f.department].push(f)
    return acc
  }, {} as Record<string, typeof faculty>)

  const sortedDepartments = Object.keys(grouped).sort((a, b) => {
    const ai = departmentOrder.indexOf(a)
    const bi = departmentOrder.indexOf(b)
    if (ai === -1 || bi === -1) return a.localeCompare(b)
    return ai - bi
  })

  return (
    <div className="dark:bg-slate-900 min-h-screen">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a5298] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span> / </span>
            <Link to="/courses" className="hover:text-white">Academics</Link>
            <span> / </span>
            <span>Faculty</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Faculty - Academic Departments</h1>
          <p className="text-white/80 max-w-2xl">Explore faculty members by department, listed branch-wise as requested.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        {sortedDepartments.map(dept => (
          <div key={dept} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-[#1e3a5f] dark:text-white mb-4">{dept}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {grouped[dept].map(member => (
                <div key={member.id} className="p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-sm">
                  <h3 className="font-semibold text-lg text-[#1e3a5f] dark:text-white">{member.name}</h3>
                  <div className="text-xs text-gray-500 dark:text-gray-300 mb-2">{member.designation}</div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{member.specialization}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{member.qualification} • {member.experience}</p>
                  <p className="text-xs text-amber-600 dark:text-amber-300 mt-1">{member.email}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
