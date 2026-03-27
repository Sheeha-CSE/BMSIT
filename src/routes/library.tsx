import { createFileRoute, Link } from '@tanstack/react-router'
import { libraryResources } from '@/data/mockData'
import { BookOpen, ExternalLink, ChevronRight, Database, Video, Globe } from 'lucide-react'

export const Route = createFileRoute('/library')({
  component: LibraryPage,
})

const typeIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Database: Database,
  Video: Video,
  Course: BookOpen,
  'Digital Library': Globe,
}

function LibraryPage() {
  return (
    <div className="dark:bg-slate-900 min-h-screen">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a5298] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span>Library Resources</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Library & Digital Resources</h1>
          <p className="text-white/80 max-w-2xl">Access 50,000+ books, 8 research databases, e-journals, and free online courses.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Physical Library Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: '50,000+', label: 'Physical Books' },
            { value: '500+', label: 'Journals & Magazines' },
            { value: '8', label: 'Research Databases' },
            { value: '10,000+', label: 'E-Books' },
          ].map((s, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-center">
              <div className="text-2xl font-bold text-[#1e3a5f] dark:text-amber-400">{s.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Digital Resources */}
        <h2 className="text-2xl font-bold text-[#1e3a5f] dark:text-white mb-6">Digital Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
          {libraryResources.map(res => {
            const Icon = typeIcons[res.type] || BookOpen
            return (
              <div key={res.id} className="card-hover p-5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
                <div className="w-12 h-12 bg-[#1e3a5f]/10 dark:bg-white/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#1e3a5f] dark:text-amber-400" />
                </div>
                <h3 className="font-bold text-[#1e3a5f] dark:text-white text-sm mb-1">{res.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{res.category}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${res.access === 'Free' || res.access.includes('Free') ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'}`}>
                    {res.access}
                  </span>
                  <a href="#" className="text-[#1e3a5f] dark:text-amber-400 hover:underline text-xs flex items-center gap-1">
                    Access <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Library Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#1e3a5f] text-white">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-amber-400" /> Library Hours
            </h3>
            <div className="space-y-3">
              {[
                { day: 'Monday – Friday', time: '8:00 AM – 8:00 PM' },
                { day: 'Saturday', time: '9:00 AM – 5:00 PM' },
                { day: 'Sunday & Holidays', time: '10:00 AM – 2:00 PM' },
                { day: 'During Exams', time: '8:00 AM – 10:00 PM' },
              ].map((h, i) => (
                <div key={i} className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/70 text-sm">{h.day}</span>
                  <span className="font-semibold text-sm text-amber-300">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
            <h3 className="text-xl font-bold text-[#1e3a5f] dark:text-white mb-4">Borrowing Policy</h3>
            <div className="space-y-3">
              {[
                { rule: 'Students can borrow up to 4 books at a time' },
                { rule: 'Loan period: 14 days (renewable once)' },
                { rule: 'Fine: Rs 2 per day per book after due date' },
                { rule: 'Reference books cannot be borrowed — reading room only' },
                { rule: 'Digital library access: 24x7 via student portal' },
                { rule: 'Inter-library loan available from partner institutions' },
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-300">{r.rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
