import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { galleryImages } from '@/data/mockData'
import { Image, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
})

const categoryColors: Record<string, string> = {
  Campus: 'bg-blue-500',
  Events: 'bg-purple-500',
  Labs: 'bg-green-500',
}

const placeholderColors = [
  'from-blue-600 to-blue-800',
  'from-purple-600 to-purple-800',
  'from-green-600 to-green-800',
  'from-teal-600 to-teal-800',
  'from-indigo-600 to-indigo-800',
  'from-rose-600 to-rose-800',
  'from-amber-600 to-amber-800',
  'from-cyan-600 to-cyan-800',
]

function GalleryPage() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<number | null>(null)

  const categories = ['All', 'Campus', 'Events', 'Labs']
  const filtered = filter === 'All' ? galleryImages : galleryImages.filter(g => g.category === filter)
  const selectedImg = selected !== null ? galleryImages.find(g => g.id === selected) : null

  return (
    <div className="dark:bg-slate-900 min-h-screen">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a5298] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span>Gallery</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Campus Gallery</h1>
          <p className="text-white/80 max-w-2xl">A glimpse into campus life, events, labs, and facilities at VIT.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filter buttons */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${filter === cat ? 'bg-[#1e3a5f] text-white' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:border-[#1e3a5f]'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img, i) => (
            <div
              key={img.id}
              className="card-hover aspect-square rounded-2xl overflow-hidden cursor-pointer relative group"
              onClick={() => setSelected(img.id)}
            >
              <div className={`w-full h-full bg-gradient-to-br ${placeholderColors[i % placeholderColors.length]} flex items-center justify-center`}>
                <Image size={40} className="text-white/40" />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex flex-col justify-end p-3">
                <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                  <span className={`text-xs text-white font-medium px-2 py-0.5 rounded-full ${categoryColors[img.category]} mb-1 inline-block`}>
                    {img.category}
                  </span>
                  <p className="text-white text-sm font-semibold leading-tight">{img.title}</p>
                  <p className="text-white/70 text-xs mt-0.5">{img.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImg && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden max-w-2xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className={`h-64 bg-gradient-to-br ${placeholderColors[selectedImg.id % placeholderColors.length]} flex items-center justify-center`}>
              <Image size={60} className="text-white/40" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs text-white font-medium px-2.5 py-1 rounded-full ${categoryColors[selectedImg.category]}`}>
                  {selectedImg.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1e3a5f] dark:text-white">{selectedImg.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{selectedImg.description}</p>
              <button
                onClick={() => setSelected(null)}
                className="mt-4 bg-[#1e3a5f] text-white px-6 py-2 rounded-xl hover:bg-[#152b47] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
