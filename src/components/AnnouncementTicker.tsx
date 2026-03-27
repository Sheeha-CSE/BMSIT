import { announcements } from '@/data/mockData'

export function AnnouncementTicker() {
  const text = announcements.map(a => a.text).join('     ·     ')
  return (
    <div className="bg-amber-400 text-[#1e3a5f] py-1.5 overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-[#1e3a5f] text-amber-400 font-bold text-xs px-4 py-0 h-full flex items-center uppercase tracking-wider whitespace-nowrap">
          📢 Latest
        </div>
        <div className="overflow-hidden flex-1">
          <div className="ticker-content inline-block text-sm font-medium">
            {text}
          </div>
        </div>
      </div>
    </div>
  )
}
