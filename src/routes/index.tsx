import { useEffect, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { AnnouncementTicker } from '@/components/AnnouncementTicker'
import { ImageSlider } from '@/components/ImageSlider'
import { Component as VaporizeTextEffect } from '@/components/ui/vapour-text-effect'
import { departments, events, placementStats, announcements, faculty } from '@/data/mockData'
import {
  GraduationCap, Users, Building2, Trophy, ArrowRight, Calendar,
  BookOpen, Award, Microscope, Globe, ChevronRight,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const quickAccessCards = [
  { icon: GraduationCap, label: 'Admissions', path: '/admissions', color: 'bg-blue-600', desc: 'Apply for 2024-25' },
  { icon: BookOpen, label: 'Courses', path: '/courses', color: 'bg-green-600', desc: '6+ Departments' },
  { icon: Users, label: 'Faculty', path: '/faculty', color: 'bg-purple-600', desc: '100+ Experts' },
  { icon: Trophy, label: 'Placements', path: '/placements', color: 'bg-amber-600', desc: '88% Placed' },
  { icon: Globe, label: 'Alumni', path: '/alumni', color: 'bg-rose-600', desc: 'Global Network' },
  { icon: Calendar, label: 'Events', path: '/events', color: 'bg-teal-600', desc: 'Workshops & More' },
]

const stats = [
  { value: '5000+', label: 'Students', icon: Users },
  { value: '100+', label: 'Faculty', icon: GraduationCap },
  { value: '120+', label: 'Recruiters', icon: Building2 },
  { value: '42 LPA', label: 'Highest Package', icon: Trophy },
  { value: '50+', label: 'Student Clubs', icon: Award },
  { value: '29', label: 'Years of Excellence', icon: Microscope },
]

function HomePage() {
  const upcomingEvents = events.slice(0, 3)
  const latestAnnouncements = announcements.slice(0, 5)

  const campusImages = [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1350&q=80',
    'https://source.unsplash.com/1350x900/?education,academics',
  ]
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage(prev => (prev + 1) % campusImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="dark:bg-slate-900">
      {/* Full-screen Campus Image Slideshow with 4 Images */}
      <section className="relative h-screen overflow-hidden bg-gray-900">
        {campusImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
              idx === activeImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">Welcome to Our Campus Life</h1>
          <p className="mt-3 text-lg md:text-2xl text-gray-200 max-w-2xl">Experience Learning, Fun, and Growth</p>
          <div className="absolute bottom-12 flex gap-2 items-center justify-center">
            {campusImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`transition-all ${i === activeImage ? 'bg-white w-8 h-3 rounded-full' : 'bg-white/50 w-3 h-3 rounded-full hover:bg-white/70'}`}
              />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slide-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        section.hero {
          animation: slide-in 0.3s ease-in;
        }
      `}</style>

      <section className="relative h-screen">
        <VaporizeTextEffect />
      </section>

      <AnnouncementTicker />
      <ImageSlider />

      {/* Quick Access */}
      <section className="py-12 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-[#1e3a5f] dark:text-white mb-8">Quick Access</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickAccessCards.map(card => (
              <Link key={card.path} to={card.path} className="card-hover group">
                <div className="text-center p-4 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-transparent hover:shadow-lg bg-white dark:bg-slate-700 transition-all">
                  <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <card.icon size={22} className="text-white" />
                  </div>
                  <p className="font-semibold text-sm text-gray-800 dark:text-white">{card.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{card.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation Section */}
      <section id="accreditation" className="py-14 px-4 bg-gray-100 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16 bg-gray-300 dark:bg-slate-600" />
            <div className="bg-orange-500 px-5 py-2 rounded-full text-white text-lg font-bold tracking-wider">ACCREDITATION</div>
            <div className="h-px w-16 bg-gray-300 dark:bg-slate-600" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Recognised by UGC and autonomous status', icon: '🎓' },
              { label: 'Approved by AICTE ensuring quality education', icon: '✅' },
              { label: 'Accredited by NBA multiple times', icon: '🏅' },
              { label: 'NAAC A+ Grade accreditation', icon: '⭐' },
              { label: 'Affiliated to VTU', icon: '📘' },
              { label: 'Ranked in NIRF', icon: '📈' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-11 h-11 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 text-xl">{item.icon}</span>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-white">{item.label}</h3>
                </div>
                <div className="h-1 w-16 bg-orange-400 rounded-full mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-300">Leading credentials that showcase our institutional quality and global recognition.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Tour Section */}
      <section className="py-14 px-4 bg-white dark:bg-slate-800" id="campus-tour">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] dark:text-white text-center mb-3">Campus Tour</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-10">Take a virtual tour of our state-of-the-art facilities and beautiful campus infrastructure.</p>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/3Sy-4z83r1w"
                title="Campus Tour"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-4 bg-[#1e3a5f] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center stat-item" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 bg-amber-400/20 border border-amber-400/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={22} className="text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-amber-400">{stat.value}</div>
                <div className="text-white/70 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events & Announcements Section */}
      <section className="py-14 px-4 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
              {/* Upcoming Events */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#1e3a5f] dark:text-white">Upcoming Events</h2>
                  <Link to="/events" className="text-sm text-amber-600 hover:text-amber-500">View All</Link>
                </div>
                <div className="space-y-3">
                  {upcomingEvents.map(ev => (
                    <div key={ev.id} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
                      <div className="flex items-start gap-3">
                        <div className="text-center bg-[#1e3a5f] text-white rounded-lg p-2 min-w-[40px]">
                          <div className="text-xs leading-none">{ev.date.split('-')[1]}</div>
                          <div className="text-lg font-bold leading-none">{ev.date.split('-')[2]}</div>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-800 dark:text-white leading-tight">{ev.title}</p>
                          <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">{ev.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Announcements */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#1e3a5f] dark:text-white">Announcements</h2>
                  <Link to="/circulars" className="text-sm text-amber-600">View All</Link>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 divide-y divide-gray-100 dark:divide-slate-700">
                  {latestAnnouncements.map(ann => (
                    <div key={ann.id} className="p-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                      <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">{ann.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{ann.date}</p>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Placement Highlights */}
      <section className="py-14 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1e3a5f] dark:text-white mb-2">Placement Highlights 2024</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10">Our students are placed at the best companies worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[
              { value: `${placementStats.placementPercent}%`, label: 'Placement Rate', color: 'text-blue-600' },
              { value: `₹${placementStats.avgPackage} LPA`, label: 'Average Package', color: 'text-green-600' },
              { value: `₹${placementStats.highestPackage} LPA`, label: 'Highest Package', color: 'text-amber-600' },
              { value: `${placementStats.companiesVisited}+`, label: 'Companies Visited', color: 'text-purple-600' },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-50 dark:bg-slate-700 border border-gray-100 dark:border-slate-600">
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
          <Link to="/placements" className="inline-flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#152b47] text-white font-semibold px-8 py-3 rounded-xl transition-colors">
            View Full Placement Report <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Faculty Spotlight */}
      <section className="py-14 px-4 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#1e3a5f] dark:text-white">Faculty Spotlight</h2>
            <Link to="/courses" className="text-sm text-amber-600 hover:text-amber-500 flex items-center gap-1">
              View in Academics <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {faculty.slice(0, 4).map(f => (
              <div key={f.id} className="card-hover text-center p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#2a5298] flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                  {f.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <h3 className="font-bold text-[#1e3a5f] dark:text-white text-sm">{f.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{f.designation}</p>
                <p className="text-amber-600 dark:text-amber-400 text-xs font-medium mt-1">{f.department}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 line-clamp-2">{f.specialization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-gradient-to-r from-[#1e3a5f] to-[#2a5298] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Join 5000+ students at VIT. Applications for 2024-25 batch are now open.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/admissions" className="bg-amber-400 hover:bg-amber-300 text-[#1e3a5f] font-bold px-8 py-3.5 rounded-xl transition-colors">
            Apply for Admission
          </Link>
          <Link to="/contact" className="border-2 border-white/40 hover:border-white text-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-xl transition-colors">
            Contact Admissions Team
          </Link>
        </div>
      </section>
    </div>
  )
}
