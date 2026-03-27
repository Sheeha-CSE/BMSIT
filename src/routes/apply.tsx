import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronRight, Upload, CheckCircle, AlertCircle } from 'lucide-react'

export const Route = createFileRoute('/apply')({
  component: ApplyPage,
})

interface FormData {
  fullName: string
  email: string
  phone: string
  program: string
  jeeScore: string
  percentage: string
  stateName: string
  category: string
  document?: File
}

function ApplyPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    program: 'B.Tech',
    jeeScore: '',
    percentage: '',
    stateName: '',
    category: 'General',
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const programs = ['B.Tech', 'M.Tech', 'Ph.D', 'Lateral Entry B.Tech']
  const categories = ['General', 'OBC', 'SC', 'ST']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        document: e.target.files![0],
      }))
    }
  }

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setError('Please enter your full name')
      return false
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address')
      return false
    }
    if (!formData.phone.match(/^\d{10}$/)) {
      setError('Please enter a valid 10-digit phone number')
      return false
    }
    if (formData.program !== 'Ph.D' && !formData.jeeScore.trim()) {
      setError('Please enter your JEE score')
      return false
    }
    if (!formData.percentage.trim() || isNaN(Number(formData.percentage))) {
      setError('Please enter a valid percentage')
      return false
    }
    if (!formData.stateName.trim()) {
      setError('Please enter your state name')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          program: 'B.Tech',
          jeeScore: '',
          percentage: '',
          stateName: '',
          category: 'General',
        })
      }, 5000)
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="dark:bg-slate-900 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center border border-green-200 dark:border-green-800">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#1e3a5f] dark:text-white mb-2">Application Submitted!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for applying to BMSIT. We'll review your application and contact you within 5-7 business days.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              A confirmation has been sent to <span className="font-semibold">{formData.email}</span>
            </p>
            <Link
              to="/"
              className="inline-block bg-[#1e3a5f] hover:bg-[#152b47] text-white font-semibold py-2.5 px-6 rounded-xl transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dark:bg-slate-900 min-h-screen">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a5298] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span>Apply Now</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">BMSIT Online Application</h1>
          <p className="text-white/80">Fill out the form below to apply for your desired program at BMS Institute of Technology</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-slate-700">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-bold text-[#1e3a5f] dark:text-white mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    State Name *
                  </label>
                  <input
                    type="text"
                    name="stateName"
                    value={formData.stateName}
                    onChange={handleChange}
                    placeholder="Enter your state"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                  />
                </div>
              </div>
            </div>

            {/* Program Selection */}
            <div>
              <h3 className="text-lg font-bold text-[#1e3a5f] dark:text-white mb-4">Program Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Choose Program *
                  </label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                  >
                    {programs.map(prog => (
                      <option key={prog} value={prog}>{prog}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {formData.program !== 'Ph.D' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      JEE Score (Percentile) *
                    </label>
                    <input
                      type="text"
                      name="jeeScore"
                      value={formData.jeeScore}
                      onChange={handleChange}
                      placeholder="Enter your JEE percentile"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    12th Percentage *
                  </label>
                  <input
                    type="number"
                    name="percentage"
                    value={formData.percentage}
                    onChange={handleChange}
                    placeholder="0-100"
                    min="0"
                    max="100"
                    step="0.01"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]"
                  />
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div>
              <h3 className="text-lg font-bold text-[#1e3a5f] dark:text-white mb-4">Document Upload</h3>
              <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-6 text-center hover:border-[#1e3a5f] transition-colors">
                <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                <label className="cursor-pointer">
                  <span className="text-sm font-semibold text-[#1e3a5f] hover:underline">
                    Click to upload
                  </span>
                  <span className="text-gray-600 dark:text-gray-400"> or drag and drop</span>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX, JPG, PNG up to 5MB</p>
                {formData.document && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-3 font-semibold">
                    ✓ {formData.document.name}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e3a5f] hover:bg-[#152b47] disabled:bg-gray-400 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin">⏳</span>
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                By submitting, you agree to our terms and conditions. We'll review your application within 5-7 business days.
              </p>
            </div>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-[#1e3a5f] dark:text-white mb-2">When will I hear back?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              We review all applications within 5-7 business days. You'll receive updates via email.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h4 className="font-bold text-[#1e3a5f] dark:text-white mb-2">Can I apply for multiple programs?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Yes! You can submit separate applications for different programs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
