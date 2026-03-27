import { Link } from '@tanstack/react-router'
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                <GraduationCap size={22} className="text-[#1e3a5f]" />
              </div>
              <div>
                <div className="font-bold leading-tight">BMSIT Institute</div>
                <div className="text-xs text-amber-300">of Technology</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Empowering Minds, Shaping Futures. NAAC A+ | NBA Accredited | AICTE Approved. Established 1995.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-amber-400 hover:text-[#1e3a5f] flex items-center justify-center transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-amber-300 mb-4 uppercase tracking-wide text-sm">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Admissions', path: '/admissions' },
                { label: 'Courses & Departments', path: '/courses' },
                { label: 'Faculty', path: '/faculty' },
                { label: 'Placements', path: '/placements' },
                { label: 'Alumni Connect', path: '/alumni' },
                { label: 'Events & News', path: '/events' },
                { label: 'Contact Us', path: '/contact' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/70 hover:text-amber-300 text-sm transition-colors flex items-center gap-1">
                    <span className="text-amber-400">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Section */}
          <div>
            <h3 className="font-semibold text-amber-300 mb-4 uppercase tracking-wide text-sm">Student Portal</h3>
            <ul className="space-y-2">
              {[
                { label: 'Student Login', path: '/login' },
                { label: 'Dashboard', path: '/dashboard' },
                { label: 'Downloads & Resources', path: '/downloads' },
                { label: 'Notifications', path: '/notifications' },
                { label: 'Circulars', path: '/circulars' },
                { label: 'Library Resources', path: '/library' },
                { label: 'Feedback', path: '/feedback' },
                { label: 'FAQ', path: '/faq' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/70 hover:text-amber-300 text-sm transition-colors flex items-center gap-1">
                    <span className="text-amber-400">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-amber-300 mb-4 uppercase tracking-wide text-sm">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">123 Knowledge Park, Tech City, Maharashtra 411001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-amber-400 flex-shrink-0" />
                <span className="text-white/70 text-sm">+91 20 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-amber-400 flex-shrink-0" />
                <span className="text-white/70 text-sm">info@vit.edu.in</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-amber-400/10 border border-amber-400/20 rounded-lg">
              <p className="text-xs text-amber-300 font-semibold">Admission Helpline</p>
              <p className="text-white text-sm font-bold">1800-XXX-XXXX</p>
              <p className="text-white/60 text-xs">Mon-Sat, 9 AM - 5 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/50 text-sm">© 2024 BMSIT Institute of Technology. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-white/50 hover:text-white/80 text-xs">Privacy Policy</a>
            <a href="#" className="text-white/50 hover:text-white/80 text-xs">Terms of Use</a>
            <a href="#" className="text-white/50 hover:text-white/80 text-xs">RTI</a>
            <a href="#" className="text-white/50 hover:text-white/80 text-xs">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
