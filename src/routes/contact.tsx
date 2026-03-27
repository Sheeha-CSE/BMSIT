import { createFileRoute, Link } from '@tanstack/react-router'
import { Mail, Phone, MapPin, Clock, ChevronRight, Send } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [enquiryForm, setEnquiryForm] = useState({ fullName: '', email: '', phone: '', course: '' })
  const [enquirySent, setEnquirySent] = useState(false)

  return (
    <div className="dark:bg-slate-900 min-h-screen">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a5298] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span>Contact Us</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
          <div className="flex items-center gap-4 mb-4">
            <img src="https://bmsit.ac.in/images/bmsitlogo.png" alt="BMSIT & M Logo" className="h-16 w-16 rounded-lg border border-white/30 bg-white p-1" />
            <div>
              <p className="text-white/90 text-lg font-semibold">BMS Institute of Technology & Management</p>
              <p className="text-white/80 text-sm">Doddaballapur Main Road, Avalahalli, Yelahanka, Bengaluru – 560119</p>
            </div>
          </div>
          <p className="text-white/80 max-w-2xl">Reach out to us for admissions, academic queries, or general information.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              {
                icon: MapPin,
                title: 'Address',
                lines: ['BMS Institute of Technology & Management', 'Doddaballapur Main Road, Avalahalli, Yelahanka, Bengaluru – 560119'],
              },
              {
                icon: Phone,
                title: 'Phone',
                lines: ['+91 80 6873 0444'],
                href: 'tel:+918068730444',
              },
              {
                icon: Mail,
                title: 'Email',
                lines: ['principal@bmsit.in'],
                href: 'mailto:principal@bmsit.in',
              },
              {
                icon: Clock,
                title: 'Office Hours',
                lines: ['Mon – Sat: 9:00 AM – 5:00 PM', 'Closed on Sundays & Public Holidays'],
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
                <div className="w-12 h-12 rounded-xl bg-[#1e3a5f] flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1e3a5f] dark:text-white mb-1">{item.title}</h3>
                  {item.lines.map((line, j) => (
                    item.href ? (
                      <a key={j} href={item.href} className="text-gray-600 dark:text-gray-300 text-sm hover:text-[#1e3a5f] dark:hover:text-amber-400 transition-colors">{line}</a>
                    ) : (
                      <p key={j} className="text-gray-600 dark:text-gray-300 text-sm">{line}</p>
                    )
                  ))}
                </div>
              </div>
            ))}

            {/* Departments Contact */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
              <h3 className="font-semibold text-[#1e3a5f] dark:text-white mb-3">Department Contacts</h3>
              {[
                { dept: 'Admissions', label: '080-26146800 / 080-26146856' },
                { dept: 'Fee Section', label: '080-26186828' },
                { dept: 'Hostel', label: '+91 9741590336' },
                { dept: 'Placement Cell', email: 'placements@bmsit.in' },
              ].map((d, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700 last:border-0">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{d.dept}</span>
                  {d.email ? (
                    <a href={`mailto:${d.email}`} className="text-xs text-[#1e3a5f] dark:text-amber-400 hover:underline">{d.email}</a>
                  ) : (
                    <span className="text-xs text-[#1e3a5f] dark:text-amber-400">{d.label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Admission Helpline */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#2a5298] border border-amber-400/20">
              <h3 className="font-semibold text-amber-400 mb-3">Admission Helpline</h3>
              <div className="space-y-2">
                <a href="tel:08026146800" className="block text-white hover:text-amber-400 transition-colors">
                  <span className="font-semibold">📞 080-26146800</span>
                </a>
                <a href="tel:08026146856" className="block text-white hover:text-amber-400 transition-colors">
                  <span className="font-semibold">📞 080-26146856</span>
                </a>
                <p className="text-white/80 text-sm mt-3">Mon–Sat, 9 AM – 5 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="h-full flex items-center justify-center p-12 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 text-center">
                <div>
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-[#1e3a5f] dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-300">We'll get back to you within 1-2 business days.</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); setSent(true) }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-8 space-y-5"
              >
                <h2 className="text-xl font-bold text-[#1e3a5f] dark:text-white mb-6">Send a Message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name *</label>
                    <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                      placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
                    <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                      placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
                    <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                      placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject *</label>
                    <select required value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]">
                      <option value="">Select subject</option>
                      {['Admissions Inquiry', 'Academic Query', 'Placement Info', 'Fee Payment', 'Hostel', 'Other'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message *</label>
                  <textarea required rows={6} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] resize-none"
                    placeholder="Your message..." />
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#1e3a5f] hover:bg-[#152b47] text-white font-bold py-3.5 rounded-xl transition-colors">
                  <Send size={18} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map & Enquiry Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Google Maps */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-700">
            <iframe
              src="https://www.google.com/maps?q=BMS%20Institute%20of%20Technology%20Bangalore&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Enquiry Form */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-8">
            <h2 className="text-2xl font-bold text-[#1e3a5f] dark:text-white mb-6">Quick Enquiry</h2>
            {enquirySent ? (
              <div className="flex items-center justify-center h-72 text-center">
                <div>
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-[#1e3a5f] dark:text-white mb-2">Enquiry Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-300">Our admission team will contact you soon.</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); setEnquirySent(true) }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={enquiryForm.fullName}
                    onChange={e => setEnquiryForm(p => ({ ...p, fullName: e.target.value }))}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={enquiryForm.email}
                    onChange={e => setEnquiryForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={enquiryForm.phone}
                    onChange={e => setEnquiryForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Course *</label>
                  <select
                    required
                    value={enquiryForm.course}
                    onChange={e => setEnquiryForm(p => ({ ...p, course: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                  >
                    <option value="">Choose a course</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="Ph.D">Ph.D</option>
                    <option value="Lateral Entry">Lateral Entry B.Tech</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition-colors"
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
