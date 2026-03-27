import { createFileRoute, Link } from '@tanstack/react-router'
import { GraduationCap, Target, Eye, Award, Users, Building, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  const milestones = [
    { year: '1946', event: 'BMS College of Engineering established by late Sri B.M Sreenivasaiah' },
    { year: '2002', event: 'BMS Institute of Technology & Management (BMSIT&M) established under BMS Educational Trust' },
    { year: '2002', event: 'Received AICTE approval and began operations' },
    { year: '2010', event: 'Expanded academic programs and infrastructure' },
    { year: '2015', event: 'Achieved NBA accreditation for multiple programs' },
    { year: '2020', event: 'Digital transformation and online learning initiatives' },
    { year: '2023', event: 'Recognized as one of the best engineering colleges in Bangalore' },
    { year: '2024', event: 'Continuing legacy of excellence in technical education' },
  ]

  const values = [
    { icon: Eye, title: 'Vision', text: 'To emerge as one of the finest technical institutions of higher learning, to develop engineering professionals who are technically competent, ethical and environment friendly for betterment of the society.' },
    { icon: Target, title: 'Mission', text: 'Accomplish stimulating learning environment through high quality academic instruction, innovation and industry-institute interface.' },
    { icon: Award, title: 'Core Values', text: 'Excellence, Integrity, Innovation, Inclusivity, and Industry-readiness are the pillars that guide all our academic and co-curricular activities.' },
  ]

  const leadership = [
    {
      name: 'Dr. Sanjay H A',
      role: 'Principal',
      department: '',
      bio: 'Dr. Sanjay H. A is currently serving as the Principal of BMS Institute of Technology and Management, Bangalore. In recognition of his dedicated service to academics, he has recently been nominated by Visvesvaraya Technological University (VTU) as Dean – Faculty of Engineering for a tenure of three years. He has played a pivotal role in revamping the curriculum of VTU, aligning it with the standards of premier institutes such as the IITs. Dr. Sanjay obtained his B.E. in Electrical and Electronics Engineering from Kuvempu University, M.Tech. in Computer Science and Engineering from VTU, and his Ph.D. from the Indian Institute of Science (IISc), Bangalore. He has successfully executed several research and consultancy projects funded by reputed organizations including MeitY, New Delhi, ISRO, AICTE, VGST, VTU, and KSCST-UNESCO. With over 100 research publications in leading international journals and conferences, Dr. Sanjay has also filed four Indian patents based on his research contributions. Under his guidance, five Ph.D. scholars have completed their doctoral work, while five more are currently pursuing their research. In recognition of his outstanding contributions to research and academics, the Vision Group on Science and Technology (VGST) honored him as Young Scientist of the Year 2011–12, providing funding support to advance his research. Dr. Sanjay also serves as an Expert Committee Member for the National Board of Accreditation (NBA) and is a Senior Member of IEEE.'
    },
    {
      name: 'Dr. Anil G N',
      role: 'Vice Principal',
      department: 'Professor, Department of Computer Science & Engineering',
      bio: ''
    },
    {
      name: 'Dr. Satish Kumar K M',
      role: 'Dean (Academic Affairs)',
      department: 'Professor, Department of Mechanical Engineering',
      bio: ''
    },
    {
      name: 'Dr. Ambika R',
      role: 'Dean (Students Welfare)',
      department: 'Professor, Department of Electronics and Communication Engineering',
      bio: ''
    },
    {
      name: 'Dr. Ganesh P',
      role: 'Dean (Career Guidance)',
      department: 'Professor, Master of Computer Applications',
      bio: ''
    },
    {
      name: 'Dr. Seema Singh',
      role: 'Dean (Innovation & Entrepreneurship)',
      department: 'Professor, Department of Electronics and Communication Engineering',
      bio: ''
    },
    {
      name: 'Dr. Ganesh P',
      role: 'Dean (Planning & Development)',
      department: 'Professor, Master of Computer Applications',
      bio: ''
    }
  ]

  return (
    <div className="dark:bg-slate-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a5298] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span>About Us</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">About BMSIT&M</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            BMS Institute of Technology and Management — 22 years of excellence in engineering education.
            Established 2002 | AICTE Approved | NBA Accredited.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#1e3a5f] dark:text-white mb-6">Welcome to BMSIT&M</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                BMS Institute of Technology and Management (BMSIT&M) traces its roots to BMSET, the same trust that set up the first private technical institute, BMS College of Engineering. BMSIT&M is governed by BMS Educational Trust founded by Sri B M Sreenivasaiah and his illustrious son, Sri B S Narayan.
              </p>
              <p>
                Established in 2002, BMSIT&M is managed by a council of trustees appointed by Dr. B.S. Ragini Narayan, the successor of Late Sri B.S Narayan and the Donor Trustee and Member Secretary of BMS Educational Trust. It is recognized as one of the best engineering colleges in Bangalore.
              </p>
              <p>
                The history of BMS institutions rewinds back to the year 1946 with the establishment of the first private engineering college in the country, BMS College of Engineering (BMSCE), by late Sri B.M Sreenivasaiah. He was a philanthropist and a great visionary who realised the necessity of technical education even before the country got independence.
              </p>
              <p>
                RV College of Engineering (RVCE), established in 1963, stands as one of India’s earliest self-financing engineering colleges, run by Rashtreeya Sikshana Samithi Trust (RSST). What started with just 3 engineering branches has grown into a vibrant institution offering 13 undergraduate, 13 postgraduate and doctoral programmes. Nestled on a 16.85-acre campus along Mysore Road, RVCE offers an environment where learning, innovation and creativity thrive. With highly qualified faculty conducting R&D for both industry and defence, the college welcomes over 2,000 students every year and continues to be synonymous with innovation and engineering brilliance.
              </p>
            </div>
            <div className="flex gap-4 mt-6">
              <Link to="/admissions" className="bg-[#1e3a5f] hover:bg-[#152b47] text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                Apply Now
              </Link>
              <Link to="/contact" className="border border-[#1e3a5f] dark:border-white/30 text-[#1e3a5f] dark:text-white hover:bg-[#1e3a5f] hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Users, value: '5000+', label: 'Students', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
              { icon: GraduationCap, value: '200+', label: 'Faculty', color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' },
              { icon: Building, value: '8+', label: 'Departments', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
              { icon: Award, value: 'NBA', label: 'Accredited', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
            ].map((item, i) => (
              <div key={i} className={`p-6 rounded-2xl ${item.color} border border-current/10`}>
                <item.icon size={28} className="mb-3" />
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="text-sm opacity-70 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Vision Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {values.map((v, i) => (
            <div key={i} className="card-hover p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-center">
              <div className="w-14 h-14 bg-[#1e3a5f] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <v.icon size={24} className="text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-[#1e3a5f] dark:text-white mb-3">{v.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>

        {/* Founders */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#1e3a5f] dark:text-white text-center mb-10">Our Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-hover p-8 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-[#1e3a5f] dark:text-white mb-2">Dharmaprakasha Rajakarya Prasakta</h3>
                <h4 className="text-amber-600 dark:text-amber-400 font-semibold">LATE SRI. B.M.SREENIVASAIAH</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Founder, B.M.S. Educational Trust</p>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                The history of BMS institutions rewinds back to the year 1946 with the establishment of the first private engineering college in the country, BMS College of Engineering (BMSCE), by late Sri B.M Sreenivasaiah. He was a philanthropist and a great visionary who realised the necessity of technical education even before the country got independence. He was honoured by the Maharaja of Mysore with the title "Dharmaprakasha Rajakarya Prasakta" for his extraordinary service in the field of education. The legacy he once began is being upheld with the same zeal by his inheritors and they continue to cherish his vision and ideals.
              </p>
            </div>
            <div className="card-hover p-8 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-[#1e3a5f] dark:text-white mb-2">LATE SRI. B. S. NARAYAN</h3>
                <h4 className="text-amber-600 dark:text-amber-400 font-semibold">Donor Trustee, B.M.S. Educational Trust</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                After the sad demise of Sri B.M Sreenivasaiah, his renowned son, Sri B.S Narayan, a vibrant and ingenious personality, moulded BMS College of Engineering into one of the finest engineering colleges. Apart from BMS College of Engineering, he had also established other institutions that promoted higher education which includes BMS College of Law, BMS College of Women and BMS Evening College of Engineering. He was extremely supportive in the initiation of several collaborative programs such as training foreign students under International Co-operative Division, cross cultural program with Melton Foundation U.S.A etc.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#1e3a5f] dark:text-white text-center mb-10">Leadership Team</h2>
          <div className="space-y-8">
            {leadership.map((leader, i) => (
              <div key={i} className="card-hover p-8 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1e3a5f] dark:text-white mb-2">{leader.name}</h3>
                    <h4 className="text-amber-600 dark:text-amber-400 font-semibold mb-2">{leader.role}</h4>
                    {leader.department && <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{leader.department}</p>}
                    {leader.bio && <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{leader.bio}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div>
          <h2 className="text-2xl font-bold text-[#1e3a5f] dark:text-white text-center mb-10">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-0.5 bg-[#1e3a5f]/20 dark:bg-white/10 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className={`flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`w-full md:w-5/12 ${i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 card-hover inline-block w-full">
                      <span className="text-amber-600 dark:text-amber-400 font-bold text-lg">{m.year}</span>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{m.event}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-4 h-4 rounded-full bg-amber-400 border-4 border-[#1e3a5f] mt-3" />
                  </div>
                  <div className="hidden md:block w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
