"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Mail, 
  ExternalLink, 
  Code, 
  Database, 
  Layout, 
  Server,
  ChevronRight,
  X,
  FileCode,
  FolderOpen
} from "lucide-react";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showOnlyRealProjects, setShowOnlyRealProjects] = useState(true);

  const projects = [
    {
      id: 1,
      title: "FitZone Gym Landing Page",
      description: "Modern landing page for local gym with membership pricing and class schedules",
      tech: ["React", "Tailwind CSS", "Framer Motion"],
      color: "from-orange-500 to-red-500",
      featured: true,
      realProject: true,
      files: [
        { name: "components/Hero.tsx", content: "export const Hero = () => {\n  return <section className='hero'>Join FitZone Today</section>;\n}" },
        { name: "components/Pricing.tsx", content: "export const Pricing = () => {\n  return <div className='pricing-cards'>Membership Plans</div>;\n}" },
        { name: "components/Classes.tsx", content: "export const Classes = () => {\n  return <div className='class-schedule'>Weekly Classes</div>;\n}" }
      ]
    },
    {
      id: 2,
      title: "Dr. Smith Medical Clinic",
      description: "Professional medical clinic website with appointment booking and services overview",
      tech: ["Next.js", "Tailwind CSS", "React Hook Form"],
      color: "from-blue-500 to-cyan-500",
      featured: true,
      realProject: true,
      files: [
        { name: "app/page.tsx", content: "export default function Home() {\n  return <ClinicLanding />;\n}" },
        { name: "components/Booking.tsx", content: "export const BookingForm = () => {\n  return <form>Book Appointment</form>;\n}" },
        { name: "components/Services.tsx", content: "export const Services = () => {\n  return <div>Medical Services</div>;\n}" }
      ]
    },
    {
      id: 3,
      title: "FreshBite Restaurant",
      description: "Restaurant landing page with menu display and online reservation system",
      tech: ["React", "CSS Modules", "Framer Motion"],
      color: "from-green-500 to-emerald-500",
      featured: true,
      realProject: true,
      files: [
        { name: "components/Menu.tsx", content: "export const Menu = () => {\n  return <div className='menu-grid'>Our Menu</div>;\n}" },
        { name: "components/Reservation.tsx", content: "export const Reservation = () => {\n  return <form>Table Reservation</form>;\n}" }
      ]
    },
    {
      id: 4,
      title: "EduLearn Academy",
      description: "Educational institution website with course listings and enrollment forms",
      tech: ["Next.js", "Tailwind CSS", "React Query"],
      color: "from-purple-500 to-pink-500",
      featured: true,
      realProject: true,
      files: [
        { name: "app/courses/page.tsx", content: "export default function Courses() {\n  return <CourseGrid />;\n}" },
        { name: "components/Enrollment.tsx", content: "export const EnrollmentForm = () => {\n  return <form>Enroll Now</form>;\n}" }
      ]
    },
    {
      id: 5,
      title: "AutoCare Service Center",
      description: "Automotive service center website with service booking and testimonials",
      tech: ["React", "Styled Components", "Framer Motion"],
      color: "from-yellow-500 to-orange-500",
      featured: true,
      realProject: true,
      files: [
        { name: "components/Services.tsx", content: "export const AutoServices = () => {\n  return <div>Car Services</div>;\n}" },
        { name: "components/Testimonials.tsx", content: "export const Reviews = () => {\n  return <div>Customer Reviews</div>;\n}" }
      ]
    },
    {
      id: 6,
      title: "BeautySalon Studio",
      description: "Beauty salon website with service menu and appointment scheduling",
      tech: ["Next.js", "Tailwind CSS", "React Datepicker"],
      color: "from-pink-500 to-rose-500",
      featured: true,
      realProject: true,
      files: [
        { name: "components/Services.tsx", content: "export const BeautyServices = () => {\n  return <div>Salon Services</div>;\n}" },
        { name: "components/Appointment.tsx", content: "export const Appointment = () => {\n  return <form>Book Appointment</form>;\n}" }
      ]
    }
  ];

  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"], icon: Layout },
    { category: "Styling", items: ["CSS", "SASS", "CSS Modules", "Styled Components", "Responsive Design"], icon: Code },
    { category: "Tools", items: ["Git", "VS Code", "Figma", "Chrome DevTools", "Netlify/Vercel"], icon: Server },
    { category: "Forms", items: ["React Hook Form", "Form Validation", "Email Integration", "Booking Systems"], icon: Database }
  ];

  const experiences = [
    {
      role: "Frontend Developer",
      company: "Freelance",
      period: "2022 - Present",
      description: "Building landing pages and websites for local businesses including gyms, medical clinics, restaurants, and educational institutions"
    },
    {
      role: "Web Developer",
      company: "Digital Agency",
      period: "2020 - 2022",
      description: "Created responsive websites and landing pages for various clients using React and modern CSS frameworks"
    },
    {
      role: "Junior Developer",
      company: "StartUp Studio",
      period: "2018 - 2020",
      description: "Developed frontend components and learned modern web development practices"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
                <span className="text-4xl font-bold gradient-text">DYB</span>
              </div>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            Hi, I'm{" "}
            <span className="gradient-text">Daksh Y Babau</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-400 mb-8"
          >
            Frontend Developer specializing in landing pages for entrepreneurs
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <a
              href="#projects"
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-white/20 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex gap-6 justify-center mt-12"
          >
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Mail size={24} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronRight className="w-6 h-6 text-gray-400 rotate-90" />
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-center mb-8 max-w-2xl mx-auto"
          >
            Explore my latest work and click on projects to view their code structure
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mb-12"
          >
            <button
              onClick={() => setShowOnlyRealProjects(!showOnlyRealProjects)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                showOnlyRealProjects
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {showOnlyRealProjects ? "Showing My Real Projects" : "Show All Projects"}
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(project => showOnlyRealProjects ? project.realProject : true).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-2xl p-6 cursor-pointer group"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className={`w-full h-48 rounded-xl bg-gradient-to-br ${project.color} mb-4 flex items-center justify-center`}>
                  <Code size={48} className="text-white/80" />
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-4 text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.realProject && (
                  <div className="mt-4 flex items-center text-purple-400 text-sm">
                    <FolderOpen size={16} className="mr-2" />
                    Click to view files
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* File Viewer Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => {
            setSelectedProject(null);
            setSelectedFile(null);
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#1a1a1a] rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold">
                {projects.find(p => p.id === selectedProject)?.title}
              </h3>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setSelectedFile(null);
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex h-[calc(80vh-80px)]">
              {/* File Tree */}
              <div className="w-64 border-r border-white/10 p-4 overflow-y-auto">
                <h4 className="text-sm font-semibold text-gray-400 mb-4">Project Files</h4>
                <div className="space-y-2">
                  {projects.find(p => p.id === selectedProject)?.files.map((file) => (
                    <button
                      key={file.name}
                      onClick={() => setSelectedFile(file.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                        selectedFile === file.name
                          ? "bg-purple-500/20 text-purple-400"
                          : "hover:bg-white/5 text-gray-300"
                      }`}
                    >
                      <FileCode size={16} className="mr-2" />
                      {file.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* File Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {selectedFile ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-400">{selectedFile}</span>
                      <a
                        href="#"
                        className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
                      >
                        <ExternalLink size={14} className="mr-1" />
                        Open in GitHub
                      </a>
                    </div>
                    <pre className="bg-black/50 rounded-xl p-4 text-sm text灰色-300 overflow-x-auto">
                      <code>
                        {projects.find(p => p.id === selectedProject)?.files.find(f => f.name === selectedFile)?.content}
                      </code>
                    </pre>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <FolderOpen size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Select a file to view its contents</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Skills Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            Skills & <span className="gradient-text">Expertise</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass-card rounded-2xl p-6 group"
              >
                <skill.icon size={32} className="text-purple-400 mb-4 group-hover:text-purple-300 transition-colors" />
                <h3 className="text-xl font-bold mb-4">{skill.category}</h3>
                <div className="space-y-2">
                  {skill.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors"
                    >
                      <ChevronRight size={14} className="mr-2 text-purple-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-16 text-center"
          >
            Work <span className="gradient-text">Experience</span>
          </motion.h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 relative"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-2xl" />
                <div className="pl-6">
                  <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                  <p className="text-purple-400 mb-2">{exp.company}</p>
                  <p className="text-gray-400 text-sm mb-4">{exp.period}</p>
                  <p className="text-gray-300">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-t from-transparent to-purple-900/10">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            Get in <span className="gradient-text">Touch</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-center mb-16"
          >
            Have a project in mind? Let's work together to bring your ideas to life.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Send Message
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-6 justify-center mt-12"
          >
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Mail size={24} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2024 Daksh Y Babau. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
