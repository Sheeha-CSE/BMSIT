import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot } from 'lucide-react'

interface Message {
  id: number
  text: string
  isBot: boolean
}

const botResponses: Record<string, string> = {
  default: "Hi! I'm VIT's AI assistant. I can help you with admissions, courses, placements, campus life, and more. What would you like to know?",
  admission: "For admissions at VIT, you need to have 10+2 with PCM and a valid JEE Main score. Apply online at vit.edu.in. Admission helpline: 1800-XXX-XXXX.",
  course: "VIT offers B.Tech in CSE, ECE, ME, CE, IT, and EE. We also offer M.Tech and Ph.D programs. Visit our Courses page for details.",
  placement: "VIT has an 88% placement rate with average package of 8.6 LPA and highest of 42 LPA (Google). 120+ companies visit annually.",
  fee: "B.Tech fee is Rs 1.2 Lakhs per year. SC/ST students get fee concession. Scholarships available for merit students.",
  hostel: "VIT has separate hostels for boys and girls with 2000+ capacity. AC and non-AC options available. Apply through student portal.",
  faculty: "VIT has 100+ qualified faculty members with Ph.D from IITs and NITs. Faculty-student ratio is 1:15.",
  contact: "Contact us at info@vit.edu.in or +91 20 1234 5678. Address: 123 Knowledge Park, Tech City, Maharashtra 411001.",
}

function getResponse(msg: string): string {
  const lower = msg.toLowerCase()
  if (lower.includes('admission') || lower.includes('apply') || lower.includes('eligib')) return botResponses.admission
  if (lower.includes('course') || lower.includes('department') || lower.includes('program')) return botResponses.course
  if (lower.includes('placement') || lower.includes('job') || lower.includes('salary') || lower.includes('package')) return botResponses.placement
  if (lower.includes('fee') || lower.includes('cost') || lower.includes('scholarship')) return botResponses.fee
  if (lower.includes('hostel') || lower.includes('accommodation') || lower.includes('stay')) return botResponses.hostel
  if (lower.includes('faculty') || lower.includes('professor') || lower.includes('teacher')) return botResponses.faculty
  if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('address')) return botResponses.contact
  return botResponses.default
}

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: botResponses.default, isBot: true },
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg: Message = { id: Date.now(), text: input, isBot: false }
    const botMsg: Message = { id: Date.now() + 1, text: getResponse(input), isBot: true }
    setMessages(prev => [...prev, userMsg, botMsg])
    setInput('')
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="bg-[#1e3a5f] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-[#1e3a5f]" />
              </div>
              <div>
                <p className="font-semibold text-sm">VIT AI Assistant</p>
                <p className="text-xs text-green-300">● Online</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="hover:bg-white/10 rounded p-1">
              <X size={16} />
            </button>
          </div>
          <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-slate-900">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${msg.isBot ? 'bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 shadow-sm' : 'bg-[#1e3a5f] text-white'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about admissions, courses..."
              className="flex-1 bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
            />
            <button
              onClick={sendMessage}
              className="bg-[#1e3a5f] hover:bg-[#152b47] text-white p-2 rounded-lg transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="chatbot-btn w-14 h-14 bg-[#1e3a5f] hover:bg-[#152b47] text-white rounded-full shadow-lg flex items-center justify-center transition-colors relative"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 text-[#1e3a5f] text-xs font-bold rounded-full flex items-center justify-center">
            AI
          </span>
        )}
      </button>
    </div>
  )
}
