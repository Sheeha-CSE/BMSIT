import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { faqs } from '@/data/mockData'
import { ChevronDown, ChevronRight, HelpCircle } from 'lucide-react'

export const Route = createFileRoute('/faq')({
  component: FaqPage,
})

function FaqPage() {
  const [openId, setOpenId] = useState<number | null>(null)
  const [catFilter, setCatFilter] = useState('All')

  const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))]
  const filtered = catFilter === 'All' ? faqs : faqs.filter(f => f.category === catFilter)

  return (
    <div className="dark:bg-slate-900 min-h-screen">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a5298] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span>FAQ</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Frequently Asked Questions</h1>
          <p className="text-white/80 max-w-2xl">Find answers to common questions about admissions, academics, campus life, and placements.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${catFilter === cat ? 'bg-[#1e3a5f] text-white' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(faq => (
            <div key={faq.id} className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              >
                <div className="flex items-start gap-3">
                  <HelpCircle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1e3a5f] dark:text-white">{faq.question}</p>
                    <span className="text-xs text-gray-400 mt-0.5 inline-block">{faq.category}</span>
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 flex-shrink-0 transition-transform ${openId === faq.id ? 'rotate-180' : ''}`}
                />
              </button>
              {openId === faq.id && (
                <div className="px-5 pb-5 pl-14 border-t border-gray-100 dark:border-slate-700">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed pt-3">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-[#1e3a5f]/5 dark:bg-white/5 border border-[#1e3a5f]/10 dark:border-white/10 text-center">
          <h3 className="font-bold text-[#1e3a5f] dark:text-white text-lg mb-2">Still have questions?</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Our admissions team is happy to help you with any queries.</p>
          <Link to="/contact" className="bg-[#1e3a5f] hover:bg-[#152b47] text-white font-semibold px-6 py-2.5 rounded-xl transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
