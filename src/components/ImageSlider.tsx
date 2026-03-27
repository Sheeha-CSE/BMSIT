import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: 'Excellence in Engineering Education',
    subtitle: 'NAAC A+ | NBA Accredited | AICTE Approved',
    description: 'Shaping the innovators of tomorrow with world-class facilities and faculty.',
    bg: 'from-[#1e3a5f] to-[#2a5298]',
    badge: '🏆 NIRF Ranked #42',
  },
  {
    id: 2,
    title: 'Admissions Open 2024-25',
    subtitle: 'B.Tech | M.Tech | Ph.D Programs',
    description: 'Apply now for B.Tech in CSE, ECE, ME, CE, IT, and EE. Scholarships available.',
    bg: 'from-[#1a1a2e] to-[#16213e]',
    badge: '🎓 Apply Now',
  },
  {
    id: 3,
    title: '88% Placement Rate',
    subtitle: 'Average Package: 8.6 LPA | Highest: 42 LPA',
    description: '120+ companies visit campus every year including Google, Microsoft, Amazon, and TCS.',
    bg: 'from-[#0f2027] to-[#203a43]',
    badge: '💼 View Placements',
  },
  {
    id: 4,
    title: 'National Hackathon CodeStorm 2024',
    subtitle: 'Cash Prizes Worth ₹5 Lakhs',
    description: '36-hour hackathon with problem statements from leading industry partners. Register today!',
    bg: 'from-[#360033] to-[#0b8793]',
    badge: '💻 Register Now',
  },
]

export function ImageSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length)
  const next = () => setCurrent(prev => (prev + 1) % slides.length)

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-[#1e3a5f]">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg} flex items-center justify-center transition-opacity duration-1000 ${i === current ? 'opacity-100 slide-active' : 'opacity-0'}`}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 25px 25px, white 2px, transparent 0)',
              backgroundSize: '50px 50px',
            }} />
          </div>

          <div className="relative text-center text-white px-6 max-w-4xl">
            <span className="inline-block bg-amber-400 text-[#1e3a5f] text-sm font-bold px-4 py-1.5 rounded-full mb-6">
              {slide.badge}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{slide.title}</h1>
            <p className="text-amber-300 text-lg md:text-xl font-medium mb-4">{slide.subtitle}</p>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-2xl mx-auto">{slide.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/admissions" className="bg-amber-400 hover:bg-amber-300 text-[#1e3a5f] font-bold px-8 py-3 rounded-xl transition-colors">
                Apply Now
              </a>
              <a href="/about" className="border-2 border-white/40 hover:border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl transition-colors">
                Learn More
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm">
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all ${i === current ? 'w-8 h-2.5 bg-amber-400' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  )
}
