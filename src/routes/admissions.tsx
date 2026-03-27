import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCircle, ChevronRight, FileText, Calendar, Phone } from 'lucide-react'

export const Route = createFileRoute('/admissions')({
  component: AdmissionsPage,
})

function AdmissionsPage() {
  const programs = [
    { name: 'B.Tech (4 Years)', seats: '480 seats across 7 branches', eligibility: '10+2 PCM, JEE Main Score', fee: '₹1.5 Lakhs/year', intake: 'July 2024' },
    { name: 'M.Tech (2 Years)', seats: '90 seats across 4 specializations', eligibility: 'B.Tech/B.E. in relevant field, GATE', fee: '₹90,000/year', intake: 'July 2024' },
    { name: 'Ph.D (3-5 Years)', seats: 'Limited seats, interview-based', eligibility: 'M.Tech/M.E. with 60%+ marks', fee: '₹40,000/year', intake: 'January & July' },
    { name: 'Lateral Entry B.Tech', seats: '8% of total B.Tech seats', eligibility: 'Diploma in Engineering, 60%+', fee: '₹1.5 Lakhs/year', intake: 'July 2024' },
  ]

  const steps = [
    { step: 1, title: 'Fill Online Application', desc: 'Register and complete the online application form at /apply' },
    { step: 2, title: 'Upload Documents', desc: 'Upload 10th & 12th marksheets, JEE score, passport photo, and ID proof' },
    { step: 3, title: 'Pay Application Fee', desc: 'Pay Rs 500 application fee online via UPI, Net Banking, or Card' },
    { step: 4, title: 'Merit List / Counseling', desc: 'Check merit list on portal. Attend online/offline counseling' },
    { step: 5, title: 'Fee Payment & Enrollment', desc: 'Pay semester fee and complete enrollment with original documents' },
  ]

  return (
    <div className="dark:bg-slate-900 min-h-screen">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a5298] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span>Admissions</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">BMSIT Admissions 2024-25</h1>
          <p className="text-white/80 max-w-2xl">Join BMS Institute of Technology's world-class programs. Applications now open for B.Tech, M.Tech, and Ph.D. Limited seats — apply early!</p>
          <div className="mt-6 inline-flex items-center gap-2 bg-amber-400 text-[#1e3a5f] font-bold px-6 py-3 rounded-xl">
            <Calendar size={18} />
            Application Deadline: June 30, 2024
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Programs */}
        <h2 className="text-2xl font-bold text-[#1e3a5f] dark:text-white mb-6">Programs Available</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {programs.map((prog, i) => (
            <div key={i} className="card-hover p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-[#1e3a5f] dark:text-white mb-4">{prog.name}</h3>
              <div className="space-y-3">
                {[
                  { label: 'Available Seats', value: prog.seats },
                  { label: 'Eligibility', value: prog.eligibility },
                  { label: 'Fee per Year', value: prog.fee },
                  { label: 'Next Intake', value: prog.intake },
                ].map((item, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{item.label}: </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="/apply"
                className="mt-4 inline-flex w-full items-center justify-center bg-[#1e3a5f] hover:bg-[#152b47] text-white font-semibold py-2.5 rounded-xl transition-colors"
              >
                Apply for {prog.name.split(' ')[0]}
              </a>
            </div>
          ))}
        </div>

        {/* How to Apply */}
        <h2 className="text-2xl font-bold text-[#1e3a5f] dark:text-white mb-8">How to Apply</h2>
        <div className="relative">
          <div className="hidden md:block absolute left-5 top-0 bottom-0 w-0.5 bg-[#1e3a5f]/20 dark:bg-white/10" />
          <div className="space-y-6">
            {steps.map(step => (
              <div key={step.step} className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-[#1e3a5f] text-white font-bold flex items-center justify-center flex-shrink-0 z-10">
                  {step.step}
                </div>
                <div className="flex-1 p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
                  <h4 className="font-semibold text-[#1e3a5f] dark:text-white">{step.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="mt-14 p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
          <h3 className="text-lg font-bold text-[#1e3a5f] dark:text-white mb-4 flex items-center gap-2">
            <FileText size={20} className="text-amber-600" /> Required Documents
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {['10th Marksheet', '12th Marksheet', 'JEE Main Score Card', 'Aadhar Card', 'Passport Size Photo', 'Category Certificate (if applicable)', 'Income Certificate', 'Domicile Certificate', 'Transfer Certificate'].map((doc, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle size={14} className="text-green-500 flex-shrink-0" /> {doc}
              </div>
            ))}
          </div>
        </div>

        {/* Helpline */}
        <div className="mt-8 p-6 rounded-2xl bg-[#1e3a5f] text-white text-center">
          <h3 className="text-xl font-bold mb-2">Admission Helpline</h3>
          <p className="text-white/70 mb-4">Our admission team is available Monday to Saturday, 9 AM – 5 PM</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-amber-400" />
              <span className="font-semibold">1800-XXX-XXXX (Toll Free)</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-amber-400" />
              <span className="font-semibold">admissions@bmsit.edu.in</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
