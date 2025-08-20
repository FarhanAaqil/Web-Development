"use client"

import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroAnimation from "@/components/home/hero-animation"
import { motion } from "framer-motion"
import ResumeDownload from "@/components/resume-download"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <HeroAnimation />
        </div>

        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Farhan Aaqil Durrani
          </motion.h1>

          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 mb-6"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 1.2, delay: 0.4 }}
          ></motion.div>

          <motion.h2
            className="text-xl md:text-2xl font-medium text-slate-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="text-emerald-400">AI Enthusiast</span> |
            <span className="text-cyan-400"> Full-Stack Developer</span> |
            <span className="text-purple-400"> Tech Problem-Solver</span>
          </motion.h2>

          <motion.p
            className="max-w-2xl text-lg text-slate-300 mb-10 backdrop-blur-sm bg-slate-900/30 p-4 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            I'm a passionate B.Tech student specializing in Artificial Intelligence and Machine Learning, building
            smart, scalable, and efficient software solutions that solve real-world problems.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link href="/projects">
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-6 rounded-lg flex items-center gap-2 text-lg shadow-lg hover:shadow-emerald-700/20 transition-all duration-300">
                View My Projects
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>

            <ResumeDownload />
          </motion.div>

          <motion.div
            className="flex gap-6 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Link href="https://github.com/farhanaaqil" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white backdrop-blur-sm border border-slate-700 hover:border-slate-600 shadow-lg hover:shadow-emerald-700/10 transition-all duration-300"
              >
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://linkedin.com/in/farhan-aaqil" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white backdrop-blur-sm border border-slate-700 hover:border-slate-600 shadow-lg hover:shadow-emerald-700/10 transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="mailto:fadurrani543@gmail.com">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white backdrop-blur-sm border border-slate-700 hover:border-slate-600 shadow-lg hover:shadow-emerald-700/10 transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <Link href="#featured-projects">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-slate-800/50 hover:bg-slate-700 text-white border border-slate-700/50"
            >
              <ArrowRight className="h-6 w-6 rotate-90" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Featured Projects Preview */}
      <section
        id="featured-projects"
        className="py-24 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-800"
      >
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              Featured Projects
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Explore my latest work showcasing AI, machine learning, and full-stack development skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Project 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Diabetes Prediction System</h3>
                <p className="text-white/80 mb-4">
                  AI-powered system to predict diabetes risk using machine learning algorithms
                </p>
                <Link href="/projects">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30"
                  >
                    View Project
                  </Button>
                </Link>
              </div>
              <div className="h-64 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-6xl">🩺</div>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-bold mb-2">MindSync</h3>
                <p className="text-white/80 mb-4">
                  Full-stack web application for collaborative mind mapping and brainstorming
                </p>
                <Link href="/projects">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30"
                  >
                    View Project
                  </Button>
                </Link>
              </div>
              <div className="h-64 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-6xl">🧠</div>
            </motion.div>

            {/* Project 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Stock Market Prediction</h3>
                <p className="text-white/80 mb-4">
                  Python-based tool for predicting stock market trends using machine learning
                </p>
                <Link href="/projects">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30"
                  >
                    View Project
                  </Button>
                </Link>
              </div>
              <div className="h-64 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-6xl">📈</div>
            </motion.div>
          </div>

          <div className="flex justify-center mt-16">
            <Link href="/projects">
              <Button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-6 rounded-lg text-lg shadow-lg hover:shadow-slate-700/20 transition-all duration-300">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-100 dark:from-slate-800 dark:to-slate-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              Technical Skills
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              A diverse skill set that allows me to tackle complex problems and build innovative solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Programming Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-4">Programming Languages</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Python</span>
                    <span>95%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>JavaScript</span>
                    <span>90%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>C++</span>
                    <span>85%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Web Development */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-4">Web Development</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>React.js</span>
                    <span>85%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>HTML/CSS</span>
                    <span>90%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Node.js</span>
                    <span>80%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI & Machine Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-4">AI & Machine Learning</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Scikit-learn</span>
                    <span>90%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Pandas</span>
                    <span>95%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>NumPy</span>
                    <span>90%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center mt-16">
            <Link href="/skills">
              <Button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-6 rounded-lg text-lg shadow-lg hover:shadow-slate-700/20 transition-all duration-300">
                Explore All Skills
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-grid opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/50 to-teal-600/50 backdrop-blur-sm"></div>

        <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's Build Something Amazing Together</h2>
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
