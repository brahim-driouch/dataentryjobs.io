import { Edit2, Github, Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export const ProfileHeader = () => {    
 const profile = { personalInfo: {
      fullName: "Alex Johnson",
      email: "alex.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      title: "Senior Software Engineer",
      summary: "Passionate software engineer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture.",
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    experience: [
      {
        id: 1,
        company: "Tech Corp",
        position: "Senior Software Engineer",
        startDate: "Jan 2020",
        endDate: "Present",
        description: "Led development of microservices architecture serving 10M+ users. Mentored junior developers and established coding standards.",
        technologies: ["React", "Node.js", "AWS", "Docker"]
      },
      {
        id: 2,
        company: "StartupXYZ",
        position: "Full Stack Developer",
        startDate: "Jun 2017",
        endDate: "Dec 2019",
        description: "Built customer-facing features using React and Node.js. Improved page load times by 40% through optimization.",
        technologies: ["React", "Express", "MongoDB"]
      }
    ],
     certifications: [
      { id: 1, name: "AWS Certified Solutions Architect", issuer: "Amazon", year: "2022" },
      { id: 2, name: "Professional Scrum Master", issuer: "Scrum.org", year: "2021" }
    ],
    skills: [
      "JavaScript", "React", "Node.js", "TypeScript", "Python", 
      "AWS", "Docker", "PostgreSQL", "MongoDB", "GraphQL"

    ]
}
 return (
     <div className="relative bg-linear-to-r from-blue-600 via-blue-700 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-size[20px_20px]"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Photo */}
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-xl">
                <img 
                  src={profile.personalInfo.profilePhoto} 
                  alt={profile.personalInfo.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
                <Edit2 size={16} className="text-gray-600" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {profile.personalInfo.fullName}
              </h1>
              <p className="text-xl text-blue-100 mb-4">{profile.personalInfo.title}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{profile.personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{profile.personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>{profile.personalInfo.phone}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center md:justify-start gap-3 mt-4">
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all">
                  <Linkedin size={18} className="text-white" />
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all">
                  <Github size={18} className="text-white" />
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all">
                  <Globe size={18} className="text-white" />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4 md:gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{profile.experience.length}</div>
                <div className="text-sm text-blue-200">Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{profile.skills.length}</div>
                <div className="text-sm text-blue-200">Skills</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{profile.certifications.length}</div>
                <div className="text-sm text-blue-200">Certs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
 )
}