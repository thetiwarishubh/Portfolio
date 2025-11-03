// Dark mode is temporarily disabled

import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Twitter,
  ExternalLink,
  Sun,
  Moon,
} from "lucide-react";

function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const skillRefs = useRef([]);

  useEffect(() => {
    // Check user's preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleSmoothScroll = (e) => {
      if (e.target.hash && e.target.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(e.target.hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          if (open) setOpen(false);
        }
      }
    };

    document.addEventListener("click", handleSmoothScroll);
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, [open]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-skill-bar");
          }
        });
      },
      { threshold: 0.5 }
    );

    skillRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Valid email is required";
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setFormSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormSubmitted(false), 5000);
    } else {
      setFormErrors(errors);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (formErrors[id]) {
      setFormErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleHireMe = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    if (open) setOpen(false);
  };

  const refresh = () => {
    window.scrollTo({top : 0, behavior : 'smooth'});
    setTimeout(()=> {
      window.location.reload()
    }, 700)
  }

  // Sample projects data
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and MongoDB",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      details:
        "A complete e-commerce solution with user authentication, product catalog, shopping cart, and payment processing. Implemented responsive design and optimized for performance.",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Productivity application with drag-and-drop functionality",
      tags: ["React", "TypeScript", "Firebase", "Tailwind"],
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      details:
        "A Kanban-style task management application with real-time updates, drag-and-drop functionality, and user collaboration features.",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media metrics tracking",
      tags: ["Next.js", "Chart.js", "API", "CSS"],
      image:
        "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      details:
        "An analytics dashboard that connects to multiple social media APIs to provide insights and metrics visualization for content performance.",
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  // Skills data
  const skills = [
    { name: "HTML/CSS"},
    { name: "Bootstrap", level: 90 },
    { name: "Tailwind CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "TypeScript", level: 85 },
    { name: "React", level: 80 },
    { name: "NextJS", level: 80 },
    { name: "Express", level: 80 },
    { name: "Node.js", level: 85 },
    { name: "MongoDB", level: 75 },
  ];

  return (
    <>
      <style>

        {`
          // @keyframes skill-bar {
          //   from { width: 0%; }
          //   to { width: var(--skill-level); }
          // }
          
          .animate-skill-bar {
            animation: skill-bar 1.5s ease-out forwards;
          }
          
          .project-card:hover {
            transform: translateY(-5px);
            transition: transform 0.3s ease;
          }

          /* Improved focus styles for accessibility */
          button:focus-visible,
          a:focus-visible {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
          }

          /* Better contrast for dark mode */
          .dark .text-blue-400 {
            color: #60a5fa;
          }
        `}
        
      </style>

      <header
        className={`fixed top-0 left-0 w-full bg-white dark:bg-gray-900 z-50 transition-all duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm"
        } py-3`}
      >
        <nav className="flex justify-between items-center transition duration-300 h-12 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          {/* Logo */}
          <h1 onClick={refresh} className="text-xl lg:text-3xl font-bold cursor-pointer text-gray-900 dark:text-white">
            Shubham
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex gap-8">
              {["Home", "About", "Portfolio", "Skills", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      className="relative text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                      href={`#${item.toLowerCase()}`}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
            <div className="flex items-center gap-4">
              {/* <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button> */}
              <button 
                onClick={handleHireMe}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm cursor-pointer"
              >
                Hire Me
              </button>
            </div>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="flex items-center gap-4 md:hidden">
            {/* <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button> */}
            <button
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
              onClick={toggleMenu}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <ul className="flex flex-col items-center gap-3 py-4">
            {["Home", "About", "Portfolio", "Skills", "Contact"].map((item) => (
              <li key={item} className="w-full text-center">
                <a
                  className="block py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  href={`#${item.toLowerCase()}`}
                  onClick={toggleMenu}
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="w-full px-4 pt-2">
              <button
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                onClick={() => {
                  handleHireMe();
                  toggleMenu();
                }}
              >
                Hire Me
              </button>
            </li>
          </ul>
        </div>
      </header>

      <main className="min-h-screen pt-16 bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section id="home" className="container mx-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Text Content */}
            <div className="flex-1 items-center py-12 px-6 md:px-12 lg:px-16 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
              <div className="max-w-lg">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
                  Hi, I'm{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    Shubham Tiwari
                  </span>
                </h1>
                <p className="py-6 text-lg md:text-xl text-gray-700 dark:text-gray-300">
                  Full Stack Developer specializing in building performant,
                  accessible web applications with modern technologies. I create
                  digital experiences that users love.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <a
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-md font-semibold transition-all duration-300 bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-lg text-white"
                    href="#portfolio"
                  >
                    View My Work
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                  <a
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-md border-2 border-blue-600 font-semibold transition-all duration-300 hover:bg-blue-600 hover:text-white hover:-translate-y-1 hover:shadow-lg text-blue-600 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
                    href="#contact"
                  >
                    Contact Me
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Image Content */}
            <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
              <div className="relative max-w-md w-full">
                <div className="absolute -inset-4 bg-blue-600/10 dark:bg-blue-400/10 rounded-2xl rotate-3"></div>
                <img
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                  src="./Profile-Pic.JPG"
                  alt="Shubham Tiwari - Full Stack Developer"
                  loading="lazy"
                />

                {/* Experience badge */}
                <div className="absolute -bottom-4 -right-4 bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg">
                  <div className="text-sm font-semibold">
                    1+ Years Experience
                  </div>
                </div>

                {/* Tech stack floating elements */}
                <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 py-2 px-3 rounded-lg shadow-md">
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Full Stack Developer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-white dark:bg-gray-900 container mx-auto">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                About Me
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Crafting Digital Experiences
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  I'm a passionate Full Stack Developer with expertise in
                  creating dynamic, user-friendly web applications. With a
                  strong foundation in both front-end and back-end technologies,
                  I bring ideas to life with clean, efficient code.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  My approach combines technical expertise with an eye for
                  design, ensuring that the applications I build are not only
                  functional but also provide an exceptional user experience.
                </p>
              </div>

              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                    Frontend Development
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    React, Next.js, Tailwind CSS, JavaScript, TypeScript
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                    Backend Development
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Node.js, Express, MongoDB, REST APIs, Authentication
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
                    UI/UX Design
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Figma, User Research, Prototyping, Responsive Design
                  </p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
                    DevOps & Tools
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Git, GitHub, Vercel, Netlify, CI/CD
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-16 bg-gray-50 dark:bg-gray-800 container mx-auto">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                My Portfolio
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
                Here are some of my recent projects. Each project represents my
                skills and dedication to quality.
              </p>
              <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="project-card bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                      View Project <ExternalLink size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 bg-white dark:bg-gray-900 container mx-auto">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                My Skills
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
                I continuously enhance my skills to stay updated with the latest
                technologies and trends in web development.
              </p>
              <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {/* {skill.level}% */}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      ref={(el) => (skillRefs.current[index] = el)}
                      className="bg-blue-600 h-2.5 rounded-full"
                      // style={{ "--skill-level": `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-white dark:bg-gray-900 container mx-auto">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Get In Touch
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
                Have a project in mind or want to discuss potential
                opportunities? Feel free to reach out!
              </p>
              <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Let's talk about your project
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  I'm currently available for freelance work and full-time
                  opportunities. If you have a project that you want to get
                  started or think you need my help with something, then get in
                  touch.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail
                      size={20}
                      className="text-blue-600 dark:text-blue-400 mr-4"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Email
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Linkedin
                      size={20}
                      className="text-blue-600 dark:text-blue-400 mr-4"
                    />
                    <a
                      href="https://linkedin.com/in/thetiwarishubh"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      LinkedIn
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Twitter
                      size={20}
                      className="text-blue-600 dark:text-blue-400 mr-4"
                    />
                    <a
                      href="https://twitter.com/Thetiwarishubh"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Twitter
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Github
                      size={20}
                      className="text-blue-600 dark:text-blue-400 mr-4"
                    />
                    <a
                      href="https://github.com/thetiwarishubh"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Thank you for reaching out. I'll get back to you as soon
                      as possible.
                    </p>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                          formErrors.name
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        placeholder="Enter your name"
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                          formErrors.email
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        placeholder="Enter your email"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                          formErrors.message
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        placeholder="How can I help you?"
                      ></textarea>
                      {formErrors.message && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <div className="h-64 overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                  aria-label="Close project details"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {selectedProject.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Project Details
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedProject.details}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={selectedProject.liveUrl}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo <ExternalLink size={16} className="ml-2" />
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Code <Github size={16} className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Shubham Tiwari</h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Full Stack Developer passionate about creating interactive,
              user-friendly web applications.
            </p>

            <div className="flex justify-center gap-6 mb-8">
              <a
                href="https://github.com/thetiwarishubh"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/thetiwarishubh"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:shubham@example.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
              <a
                href="https://twitter.com/Thetiwarishubh"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Shubham Tiwari. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;