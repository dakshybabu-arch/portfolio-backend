"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import { 
  Mail, 
  ExternalLink, 
  Code, 
  Database, 
  Layout, 
  Server,
  ChevronRight,
  Menu,
  ArrowUp,
  Star,
  GitFork,
  Eye,
  LoaderCircle,
  BookOpen,
  Sparkles,
  Monitor,
  Rocket,
  Briefcase,
  Award,
  Terminal
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [contactError, setContactError] = useState('');
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 10,
      y: (e.clientY / window.innerHeight) * 10
    });
  };

  const submitContactForm = async (event?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (event) event.preventDefault();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      setContactError('Please enter a valid email address.');
      setContactStatus('error');
      return;
    }

    setContactStatus('sending');
    setContactError('');

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: contactForm.name,
          reply_to: contactForm.email,
          subject: contactForm.subject,
          message: contactForm.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );

      if (result.status !== 200) {
        throw new Error('Failed to send message.');
      }

      setContactForm({ name: '', email: '', subject: '', message: '' });
      setContactStatus('success');
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setContactStatus('idle');
      }, 5000);
    } catch (error) {
      setContactError(error instanceof Error ? error.message : 'Unable to send your message.');
      setContactStatus('error');
    }
  };

  const skills = [
    { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"], icon: Layout },
    { category: "Tools", items: ["VS Code", "GitHub", "Vercel"], icon: Terminal }
  ];

  const learningBadges = [
    "AI Tools", "React", "Tailwind CSS", "Modern Web Development", "Responsive Web Design", "UI Design"
  ];

  const projects = [
    {
      id: 1,
      name: "Travels Website Frontend",
      description: "A sample frontend for a travels website featuring destination showcases and a clean, responsive UI.",
      technologies: ["TypeScript", "Next.js"],
      link: "https://frontend-of-sample-websit.vercel.app",
      github: "https://github.com/dakshybabu-arch/frontend-of-sample-websit"
    },
    {
      id: 2,
      name: "Portfolio Backend API",
      description: "A backend API powering my portfolio, built with Express.js and MongoDB for data storage and management.",
      technologies: ["TypeScript", "Express.js", "MongoDB"],
      link: "https://your-protfolio-daksh.vercel.app",
      github: "https://github.com/dakshybabu-arch/portfolio-backend"
    },
    {
      id: 3,
      name: "Portfolio Website",
      description: "My personal developer portfolio built with Next.js and Framer Motion, showcasing my journey and projects.",
      technologies: ["Next.js", "TypeScript", "Framer Motion"],
      link: "https://your-protfolio-daksh.vercel.app",
      github: "https://github.com/dakshybabu-arch/protfolio"
    }
  ];

  const services = [
    { title: "Portfolio Websites", description: "Personal brands and portfolios that stand out with modern design." },
    { title: "Business Websites", description: "Professional online presence for local businesses and agencies." },
    { title: "Landing Pages", description: "High-converting, fast-loading pages for marketing campaigns." },
    { title: "Responsive Frontend Development", description: "Pixel-perfect implementation of designs that work on all devices." },
    { title: "Modern UI Design", description: "Clean, Apple-inspired aesthetics with smooth animations and glassmorphism." }
  ];

  const stats = [
    { label: "Student Developer", icon: BookOpen },
    { label: "Building Real Projects", icon: Code },
    { label: "Always Learning", icon: Rocket },
    { label: "Open to Opportunities", icon: Briefcase }
  ];

  return (
    <div className="min-h-screen bg-black text-white" onMouseMove={handleMouseMove}>
      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <motion.span 
              className="text-xl font-bold gradient-text cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              DYB
            </motion.span>
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu size={24} />
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-black/90 backdrop-blur-md"
          >
            <div className="px-4 py-4 space-y-3">
              {['About', 'Skills', 'Projects', 'Services', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.a
                href="https://github.com/dakshybabu-arch"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-blue-400"
                whileHover={{ x: 5 }}
              >
                GitHub
              </motion.a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 glass-button rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={24} />
        </motion.button>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"
        />
        
        <motion.div 
          style={{ opacity }}
          className="text-center z-10 max-w-4xl px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            style={{
              textShadow: `0 0 ${mousePosition.x}px rgba(59, 130, 246, 0.3), 0 0 ${mousePosition.y}px rgba(37, 99, 235, 0.3)`
            }}
          >
            Building Modern <br className="hidden sm:block" />
            <span className="gradient-text">Web Experiences.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-400 mb-10 px-2 leading-relaxed max-w-3xl mx-auto"
          >
            I'm a Class 12 Commerce student passionate about creating beautiful, fast, and responsive websites. I enjoy learning new technologies, building real-world projects, and continuously improving my skills.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              className="px-8 py-4 glass-button rounded-full font-semibold text-center text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-4 glass-card rounded-full font-semibold text-center text-white"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex gap-6 justify-center mt-12"
          >
            <motion.a 
              href="https://github.com/dakshybabu-arch" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.1, color: "#60a5fa" }}
            >
              <GitFork size={20} />
              <span className="text-sm sm:text-base font-medium">GitHub</span>
            </motion.a>
            <motion.a 
              href="mailto:dakshybabu@gmail.com" 
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.1, color: "#60a5fa" }}
            >
              <Mail size={20} />
              <span className="text-sm sm:text-base font-medium">Email</span>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronRight className="w-8 h-8 text-blue-400/50 rotate-90" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 rounded-3xl"
            >
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I am a passionate student from Kerala, India, currently pursuing my Class 12 Commerce studies. Outside of academics, my true passion lies in the world of web development.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                As a self-taught frontend web developer, I spend my time exploring modern technologies, building responsive user interfaces, and striving to become a future full stack developer. I believe in learning by doing and constantly pushing my boundaries.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                { title: "Class 12 Commerce Student", icon: BookOpen },
                { title: "Student Developer", icon: Code },
                { title: "Passionate Learner", icon: Rocket },
                { title: "Frontend Web Developer", icon: Layout },
                { title: "Future Full Stack Developer", icon: Database }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 ${idx === 4 ? 'sm:col-span-2' : ''}`}
                >
                  <item.icon className="w-8 h-8 text-blue-400" />
                  <span className="font-medium text-gray-200">{item.title}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills & Learning Section */}
      <section id="skills" className="py-20 sm:py-32 px-4 sm:px-6 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Skills & <span className="gradient-text">Growth</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Current Skills */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                <Code className="text-blue-400" /> Technologies I Know
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card rounded-3xl p-8"
                  >
                    <skill.icon size={28} className="text-blue-400 mb-6" />
                    <h4 className="text-xl font-bold mb-6">{skill.category}</h4>
                    <div className="space-y-4">
                      {skill.items.map((item, i) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 + i * 0.1 }}
                          className="flex items-center text-gray-300 font-medium"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Currently Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                <Rocket className="text-indigo-400" /> Currently Learning
              </h3>
              <div className="glass-card rounded-3xl p-8 sm:p-10 border-indigo-500/20">
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  I'm currently learning how to use AI tools to build better websites and improve my frontend development skills. My focus is on creating responsive, modern, and user-friendly web applications while continuously improving my coding knowledge.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {learningBadges.map((badge, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-medium"
                    >
                      {badge}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 sm:py-32 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              A selection of real-world projects I've built to practice my skills and solve problems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card rounded-3xl overflow-hidden flex flex-col group"
              >
                <div className="p-8 flex-grow">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Monitor className="text-blue-400 w-7 h-7" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
      
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map(tech => (
                      <span key={tech} className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="px-8 py-5 border-t border-white/10 flex items-center justify-between bg-black/20">
                  <a 
                    href={project.link}
                    className="text-sm font-semibold text-white hover:text-blue-400 flex items-center gap-2 transition-colors"
                  >
                    Live Demo <ExternalLink size={14} />
                  </a>
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
                  >
                    GitHub <GitFork size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services / What I Can Build */}
      <section id="services" className="py-20 sm:py-32 px-4 sm:px-6 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              What I Can <span className="gradient-text">Build</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                  <Sparkles className="text-blue-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-black to-indigo-900/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <stat.icon className="w-10 h-10 text-blue-400 mb-4 opacity-80" />
                <h4 className="text-lg font-semibold text-gray-200">{stat.label}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Award className="w-16 h-16 text-indigo-500/50 mx-auto mb-8" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">
              Client <span className="gradient-text">Testimonials</span>
            </h2>
            <div className="glass-card p-10 sm:p-16 rounded-3xl inline-block relative">
              <span className="text-6xl text-blue-500/20 absolute top-4 left-6">"</span>
              <p className="text-xl sm:text-2xl text-gray-300 font-medium italic relative z-10 leading-relaxed px-4 sm:px-8">
                Testimonials will be added as I complete projects and work with future clients.
              </p>
              <span className="text-6xl text-blue-500/20 absolute bottom-0 right-6 rotate-180">"</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 bg-black/50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 text-lg">
              Have a project in mind or just want to say hi? Let's connect!
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 glass-card rounded-3xl p-8 sm:p-12 shadow-2xl shadow-blue-900/10"
            onSubmit={submitContactForm}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Name</label>
                <motion.input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={contactForm.name}
                  onChange={(event) => setContactForm({ ...contactForm, name: event.target.value })}
                  required
                  maxLength={120}
                  disabled={contactStatus === 'sending'}
                  className="w-full px-6 py-4 glass-input rounded-2xl text-base focus:ring-2 focus:ring-blue-500/50"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Email</label>
                <motion.input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={contactForm.email}
                  onChange={(event) => setContactForm({ ...contactForm, email: event.target.value })}
                  required
                  maxLength={254}
                  disabled={contactStatus === 'sending'}
                  className="w-full px-6 py-4 glass-input rounded-2xl text-base focus:ring-2 focus:ring-blue-500/50"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Subject</label>
              <motion.input
                type="text"
                name="subject"
                placeholder="Project Inquiry"
                value={contactForm.subject}
                onChange={(event) => setContactForm({ ...contactForm, subject: event.target.value })}
                required
                maxLength={200}
                disabled={contactStatus === 'sending'}
                className="w-full px-6 py-4 glass-input rounded-2xl text-base focus:ring-2 focus:ring-blue-500/50"
                whileFocus={{ scale: 1.01 }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Message</label>
              <motion.textarea
                placeholder="How can I help you?"
                name="message"
                value={contactForm.message}
                onChange={(event) => setContactForm({ ...contactForm, message: event.target.value })}
                required
                maxLength={5000}
                disabled={contactStatus === 'sending'}
                rows={6}
                className="w-full px-6 py-4 glass-input rounded-2xl resize-none text-base focus:ring-2 focus:ring-blue-500/50"
                whileFocus={{ scale: 1.01 }}
              />
            </div>
            <motion.button
              type="submit"
              disabled={contactStatus === 'sending'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 glass-button rounded-2xl font-bold text-lg disabled:cursor-not-allowed disabled:opacity-60 text-white"
              aria-busy={contactStatus === 'sending'}
            >
              <span className="flex items-center justify-center gap-2">
                {contactStatus === 'sending' && (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    aria-hidden="true"
                  >
                    <LoaderCircle size={20} />
                  </motion.span>
                )}
                {contactStatus === 'sending' ? 'Sending message...' : 'Send Message'}
              </span>
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Toast Notification */}
      <AnimatePresence>
        {(contactStatus === 'success' || contactStatus === 'error') && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl glass-modal border flex items-center gap-3 shadow-2xl ${
              contactStatus === 'success' ? 'border-green-500/30' : 'border-red-500/30'
            }`}
          >
            {contactStatus === 'success' ? (
              <>
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <p className="text-gray-200 font-medium">Message sent successfully! I'll get back to you soon.</p>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-200 font-medium">Failed to send message.</p>
                  <button 
                    type="button"
                    onClick={(e) => submitContactForm(e as any)} 
                    className="text-sm text-red-400 hover:text-red-300 text-left mt-1 underline"
                  >
                    Click to retry
                  </button>
                </div>
              </>
            )}
            <button 
              type="button"
              onClick={() => setContactStatus('idle')}
              className="ml-4 text-gray-500 hover:text-gray-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm font-medium">
            © {new Date().getFullYear()} Daksh Y Babu. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="https://github.com/dakshybabu-arch" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
              <GitFork size={20} />
            </a>
            <a href="mailto:dakshybabu@gmail.com" className="text-gray-500 hover:text-blue-400 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
