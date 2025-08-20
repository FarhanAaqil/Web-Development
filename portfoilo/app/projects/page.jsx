"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/projects/project-card"
import { motion } from "framer-motion"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Diabetes Prediction System",
      description:
        "A machine learning model using Logistic Regression & Decision Trees to predict diabetes with 78% accuracy. The system evaluates various health parameters and provides risk assessment.",
      image: "/placeholder.svg?height=400&width=600",
      emoji: "🩺",
      gradient: "from-emerald-500 to-cyan-500",
      technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Logistic Regression", "Decision Trees"],
      links: {
        demo: "https://diabetes-prediction.vercel.app",
        github: "https://github.com/farhanaaqil/diabetes-prediction",
      },
      featured: true,
    },
    {
      id: 2,
      title: "Markdown Editor",
      description:
        "A web-based markdown editor with live preview, syntax highlighting, and export functionality. Built using HTML, CSS, and JavaScript with a clean, responsive interface.",
      image: "/placeholder.svg?height=400&width=600",
      emoji: "📝",
      gradient: "from-blue-500 to-indigo-500",
      technologies: ["HTML", "CSS", "JavaScript", "Marked.js", "LocalStorage API"],
      links: {
        demo: "https://markdown-editor.vercel.app",
        github: "https://github.com/farhanaaqil/markdown-editor",
      },
      featured: false,
    },
    {
      id: 3,
      title: "Drawing Web App",
      description:
        "Interactive drawing application with multiple brush styles, color picker, and canvas manipulation tools. Users can create, save, and share their artwork.",
      image: "/placeholder.svg?height=400&width=600",
      emoji: "🎨",
      gradient: "from-pink-500 to-rose-500",
      technologies: ["HTML", "CSS", "JavaScript", "Canvas API", "LocalStorage"],
      links: {
        demo: "https://drawing-web.vercel.app",
        github: "https://github.com/farhanaaqil/drawing-web",
      },
      featured: false,
    },
    {
      id: 4,
      title: "MindSync",
      description:
        "Full-stack web application for collaborative mind mapping and brainstorming. Features real-time collaboration, user authentication, and project management.",
      image: "/placeholder.svg?height=400&width=600",
      emoji: "🧠",
      gradient: "from-purple-500 to-violet-500",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT Authentication"],
      links: {
        demo: "https://mindsync.vercel.app",
        github: "https://github.com/farhanaaqil/mindsync",
      },
      featured: true,
    },
    {
      id: 5,
      title: "Overmind Advisor",
      description:
        "Web-based advisory platform with personalized recommendations and interactive dashboards. Includes user profiles, progress tracking, and resource management.",
      image: "/placeholder.svg?height=400&width=600",
      emoji: "🧩",
      gradient: "from-amber-500 to-orange-500",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Chart.js", "RESTful API"],
      links: {
        demo: "https://overmind-advisor.vercel.app",
        github: "https://github.com/farhanaaqil/overmind-advisor",
      },
      featured: false,
    },
    {
      id: 6,
      title: "Silhouette",
      description:
        "Web application for creating and customizing silhouette art. Features image manipulation tools, filters, and export options for various formats.",
      image: "/placeholder.svg?height=400&width=600",
      emoji: "👤",
      gradient: "from-slate-500 to-gray-500",
      technologies: ["HTML", "CSS", "JavaScript", "Canvas API", "Image Processing"],
      links: {
        demo: "https://silhouette-app.vercel.app",
        github: "https://github.com/farhanaaqil/silhouette",
      },
      featured: false,
    },
    {
      id: 7,
      title: "Stock Market Prediction (Web)",
      description:
        "Web application for visualizing and analyzing stock market data with interactive charts and predictive indicators. Includes historical data analysis and trend visualization.",
      image: "/placeholder.svg?height=400&width=600",
      emoji: "📊",
      gradient: "from-green-500 to-teal-500",
      technologies: ["React", "Chart.js", "CSS", "API Integration", "Data Visualization"],
      links: {
        demo: "https://stock-market-web.vercel.app",
        github: "https://github.com/farhanaaqil/stock-market-web",
      },
      featured: false,
    },
    {
      id: 8,
      title: "Stock Market Prediction (Python)",
      description:
        "Python-based tool for predicting stock market trends using machine learning algorithms. Features data preprocessing, model training, and result visualization.",
      image: "/placeholder.svg?height=400&width=600",
      emoji: "📈",
      gradient: "from-cyan-500 to-blue-500",
      technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Time Series Analysis"],
      links: {
        demo: "https://stock-predictor.vercel.app",
        github: "https://github.com/farhanaaqil/stock-predictor",
      },
      featured: true,
    },
  ]

  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
          >
            My Projects
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 mx-auto mb-6"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Explore my portfolio of AI, machine learning, and web development projects. Each project demonstrates my
            skills, problem-solving approach, and passion for technology.
          </motion.p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              Featured Projects
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Highlighted projects that showcase my best work and technical expertise
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-24 bg-white dark:bg-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              More Projects
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Additional projects that demonstrate the breadth of my skills and interests
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Interested in Collaborating?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-emerald-600 hover:bg-slate-100 text-lg px-8 py-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                Get In Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
