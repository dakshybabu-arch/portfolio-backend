"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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
  LoaderCircle
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [githubProjects, setGithubProjects] = useState<any[]>([]);
  const [loadingGithub, setLoadingGithub] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [contactError, setContactError] = useState('');
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const heroRef = useRef<HTMLDivElement>(null);

  // Handle scroll to show/hide scroll-to-top button
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

  const fetchGithubProjects = async () => {
    setLoadingGithub(true);
    try {
      const response = await fetch('https://api.github.com/users/dakshybabu-arch/repos?sort=updated&per_page=10');
      const data = await response.json();
      setGithubProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching GitHub projects:', error);
      setGithubProjects([]);
    } finally {
      setLoadingGithub(false);
    }
  };

  useEffect(() => {
    fetchGithubProjects();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 10,
      y: (e.clientY / window.innerHeight) * 10
    });
  };

  const submitContactForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactStatus('sending');
    setContactError('');

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your message.');
      }

      setContactForm({ name: '', email: '', message: '' });
      setContactStatus('success');
    } catch (error) {
      setContactError(error instanceof Error ? error.message : 'Unable to send your message.');
      setContactStatus('error');
    }
  };


  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"], icon: Layout },
    { category: "Styling", items: ["CSS", "SASS", "CSS Modules", "Styled Components", "Responsive Design"], icon: Code },
    { category: "Tools", items: ["Git", "VS Code", "Figma", "Chrome DevTools", "Netlify/Vercel"], icon: Server },
    { category: "Forms", items: ["React Hook Form", "Form Validation", "Email Integration", "Booking Systems"], icon: Database }
  ];


  return (
    <div className="min-h-screen bg-black text-white" onMouseMove={handleMouseMove}>
      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <motion.span 
              className="text-xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
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
            className="border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              <motion.a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ x: 5 }}
              >
                Projects
              </motion.a>
              <motion.a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ x: 5 }}
              >
                Contact
              </motion.a>
              <motion.a
                href="https://github.com/dakshybabu-arch"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ x: 5 }}
              >
                GitHub
              </motion.a>
              <motion.a
                href="#"
                className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ x: 5 }}
              >
                LinkedIn
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
        {/* Animated Background Elements */}
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
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
        />
        
        <motion.div 
          style={{ opacity }}
          className="text-center z-10 max-w-4xl px-4"
        >

          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4"
            style={{
              textShadow: `0 0 ${mousePosition.x}px rgba(59, 130, 246, 0.5), 0 0 ${mousePosition.y}px rgba(37, 99, 235, 0.5)`
            }}
          >
            Hi, I'm{" "}
            <span className="gradient-text">Daksh Y Babu</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 px-2"
          >
            Frontend Developer specializing in landing pages for entrepreneurs
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              className="px-8 py-3 glass-button rounded-full font-semibold text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-3 glass-card rounded-full font-semibold text-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex gap-4 sm:gap-6 justify-center mt-8 sm:mt-12"
          >
            <motion.a 
              href="https://github.com/dakshybabu-arch" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.1, color: "#fff" }}
            >
              <span className="text-sm sm:text-base">GitHub</span>
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.1, color: "#fff" }}
            >
              <span className="text-sm sm:text-base">LinkedIn</span>
            </motion.a>
            <motion.a 
              href="mailto:contact@dakshybabu.com" 
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, color: "#fff" }}
            >
              <Mail size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronRight className="w-6 h-6 text-gray-400 rotate-90" />
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-center mb-8 max-w-2xl mx-auto px-4 text-sm sm:text-base"
          >
            Explore my latest work from GitHub
          </motion.p>

          {loadingGithub ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-400">Loading projects from GitHub...</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.isArray(githubProjects) && githubProjects.length > 0 ? (
                githubProjects.map((repo, index) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-card rounded-2xl p-6 cursor-pointer group block"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                      <Code size={24} className="text-white" />
                    </div>
                    <motion.div 
                      className="flex gap-2"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Star size={14} className="text-yellow-500" />
                        {repo.stargazers_count}
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <GitFork size={14} />
                        {repo.forks_count}
                      </div>
                    </motion.div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {repo.name}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 text-sm line-clamp-2">
                    {repo.description || "No description available"}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      {repo.watchers_count}
                    </div>
                    <span>•</span>
                    <span>{repo.language || "Unknown"}</span>
                  </div>

                  <div className="mt-4 flex items-center text-blue-400 text-sm">
                    <ExternalLink size={16} className="mr-2" />
                    View on GitHub
                  </div>
                </motion.a>
              ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <p className="text-gray-400">No projects found on GitHub.</p>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>



      {/* Skills Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            Skills & <span className="gradient-text">Expertise</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-16">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card rounded-2xl p-6 group"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <skill.icon size={32} className="text-blue-400 mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold mb-4">{skill.category}</h3>
                <div className="space-y-2">
                  {skill.items.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors"
                    >
                      <ChevronRight size={14} className="mr-2 text-blue-400" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            Get in <span className="gradient-text">Touch</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-center mb-12 sm:mb-16 px-4 text-sm sm:text-base"
          >
            Have a project in mind? Let's work together to bring your ideas to life.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4 sm:space-y-6 glass-card rounded-2xl p-6 sm:p-8"
            onSubmit={submitContactForm}
          >
            <div>
              <motion.input
                type="text"
                name="name"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={(event) => setContactForm({ ...contactForm, name: event.target.value })}
                required
                maxLength={120}
                disabled={contactStatus === 'sending'}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 glass-input rounded-xl text-sm sm:text-base"
                whileFocus={{ scale: 1.02 }}
              />
            </div>
            <div>
              <motion.input
                type="email"
                name="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={(event) => setContactForm({ ...contactForm, email: event.target.value })}
                required
                maxLength={254}
                disabled={contactStatus === 'sending'}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 glass-input rounded-xl text-sm sm:text-base"
                whileFocus={{ scale: 1.02 }}
              />
            </div>
            <div>
              <motion.textarea
                placeholder="Your Message"
                name="message"
                value={contactForm.message}
                onChange={(event) => setContactForm({ ...contactForm, message: event.target.value })}
                required
                maxLength={5000}
                disabled={contactStatus === 'sending'}
                rows={5}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 glass-input rounded-xl resize-none text-sm sm:text-base"
                whileFocus={{ scale: 1.02 }}
              />
            </div>
            <motion.button
              type="submit"
              disabled={contactStatus === 'sending'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 sm:py-4 glass-button rounded-xl font-semibold text-sm sm:text-base disabled:cursor-not-allowed disabled:opacity-60"
              aria-busy={contactStatus === 'sending'}
            >
              <span className="flex items-center justify-center gap-2">
                {contactStatus === 'sending' && (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    aria-hidden="true"
                  >
                    <LoaderCircle size={18} />
                  </motion.span>
                )}
                {contactStatus === 'sending' ? 'Sending message...' : 'Send Message'}
              </span>
            </motion.button>
            {contactStatus === 'sending' && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-blue-300"
                role="status"
              >
                Your message is on its way…
              </motion.p>
            )}
            {contactStatus === 'success' && (
              <p className="text-center text-sm text-green-400" role="status">
                Thanks! Your message has been sent.
              </p>
            )}
            {contactStatus === 'error' && (
              <p className="text-center text-sm text-red-400" role="alert">
                {contactError}
              </p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-4 sm:gap-6 justify-center mt-8 sm:mt-12"
          >
            <motion.a 
              href="https://github.com/dakshybabu-arch" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <span className="text-sm sm:text-base">GitHub</span>
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <span className="text-sm sm:text-base">LinkedIn</span>
            </motion.a>
            <motion.a 
              href="mailto:contact@dakshybabu.com" 
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <Mail size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm sm:text-base">
          <p>© 2024 Daksh Y Babu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
