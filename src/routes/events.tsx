import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { events } from '@/data/mockData'
import { Calendar, MapPin, Clock, Tag, ChevronRight, Search } from 'lucide-react'

export const Route = createFileRoute('/events')({
  component: EventsPage,
})

const categories = ['All', 'Workshop', 'AICTE', 'Motivational', 'Internship']

const categoryColors: Record<string, string> = {
  Workshop: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  AICTE: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  Motivational: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  Internship: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
}

function EventsPage() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [name, setName] = useState('');
const [email, setEmail] = useState('');
  const handleSubmit = async (eventName) => {
  const data = {
   name: name,
   email: email,
   event: eventName
  };

  try {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
  } catch (err) {
    console.error(err);
  }
};

  const filtered = events.filter(e => {
    const matchCat = category === 'All' || e.category === category
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="dark:bg-slate-900 min-h-screen">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a5298] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span>Events & News</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Events & Activities</h1>
          <p className="text-white/80 max-w-2xl">Workshops, AICTE programs, motivational sessions, internship drives, and more.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${category === cat ? 'bg-[#1e3a5f] text-white' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:border-[#1e3a5f]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <Calendar size={48} className="mx-auto mb-4 opacity-40" />
            <p>No events found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(ev => (
              <div key={ev.id} className="card-hover rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden">
                {/* Date Banner */}
                <div className="bg-[#1e3a5f] p-4 flex items-center gap-4">
                  <div className="text-center bg-white/10 rounded-xl p-3 min-w-[50px]">
                    <div className="text-xs text-white/70 leading-none">
                      {new Date(ev.date).toLocaleString('en-US', { month: 'short' })}
                    </div>
                    <div className="text-2xl font-bold text-white leading-none mt-1">
                      {ev.date.split('-')[2]}
                    </div>
                  </div>
                  <div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[ev.category] || 'bg-gray-100 text-gray-600'}`}>
                      {ev.category}
                    </span>
                    <div className="flex items-center gap-2 text-white/70 text-xs mt-1.5">
                      <Clock size={12} /> {ev.time}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-[#1e3a5f] dark:text-white text-base leading-snug mb-2">{ev.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{ev.description}</p>
<input
  type="text"
  placeholder="Enter your name"
  className="w-full mb-2 p-2 border rounded"
  onChange={(e) => setName(e.target.value)}
/>

<input
  type="email"
  placeholder="Enter your email"
  className="w-full mb-2 p-2 border rounded"
  onChange={(e) => setEmail(e.target.value)}
/>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-3">
                    <MapPin size={13} /> {ev.venue}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {ev.tags.map((tag, i) => (
                      <span key={i} className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${ev.registrationOpen ? 'bg-[#1e3a5f] hover:bg-[#152b47] text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}
                    disabled={!ev.registrationOpen}
                    onClick={() => handleSubmit(ev.title)}
                  >
                    {ev.registrationOpen ? 'Register Now' : 'Registration Closed'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
