import { EmploymentType, IWorkExperienceDTO } from "@/types/profile";
import { ProfileWorkExperienceSectionContent } from "./profile-work-experience-section-content";

  
const experiences: IWorkExperienceDTO[] = [
    {
      id: "1",
      userId: "user123",
      company: "Tech Innovations Inc.",
      position: "Senior Full Stack Developer",
      employmentType: EmploymentType.FULL_TIME,
      location: "San Francisco, CA",
      remote: true,
      startDate: "2022-01-15",
      currentlyWorking: true,
      description: "Leading development of microservices architecture and mentoring junior developers. Responsible for designing and implementing scalable solutions for high-traffic applications.",
      achievements: [
        "Reduced API response time by 40% through optimization",
        "Led migration from monolith to microservices architecture",
        "Mentored 5 junior developers, 3 promoted to mid-level"
      ],
      technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "2",
      userId: "user123",
      company: "Digital Solutions Ltd.",
      position: "Full Stack Developer",
      employmentType: EmploymentType.FULL_TIME,
      location: "New York, NY",
      remote: false,
      startDate: "2019-06-01",
      endDate: "2021-12-31",
      currentlyWorking: false,
      description: "Developed and maintained web applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      achievements: [
        "Built customer portal used by 50,000+ users",
        "Implemented automated testing, increasing code coverage to 85%"
      ],
      technologies: ["React", "Express", "MongoDB", "Redux"],
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

export default function ProfileWorkExperienceSectionWrapper() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Work Experience</h1>
          <p className="text-gray-600">Professional journey and accomplishments</p>
        </div>
        
        {experiences.map((experience) => (
          <ProfileWorkExperienceSectionContent key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  );
} 

