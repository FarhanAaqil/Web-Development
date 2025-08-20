"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
              Farhan Aaqil Durrani
            </h3>
            <p className="text-slate-300 mb-6 text-lg">
              AI Enthusiast and Full-Stack Developer specializing in building smart, scalable, and efficient software
              solutions that make a difference.
            </p>
            <div className="flex space-x-4">
              <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                <Link href="https://github.com/farhanaaqil" target="_blank" rel="noopener noreferrer" className="block">
                  <div className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors">
                    <Github className="h-5 w-5 text-slate-300 hover:text-white" />
                  </div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                <Link
                  href="https://linkedin.com/in/farhan-aaqil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors">
                    <Linkedin className="h-5 w-5 text-slate-300 hover:text-white" />
                  </div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1, y: -2 }}>
                <Link href="mailto:fadurrani543@gmail.com" className="block">
                  <div className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors">
                    <Mail className="h-5 w-5 text-slate-300 hover:text-white" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> About Me
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/skills"
                  className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/education"
                  className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> Education
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> Research
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center"
                >
                  <span className="mr-2">→</span> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5 text-emerald-400" />
                <span className="text-slate-300">fadurrani543@gmail.com</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-emerald-400">📱</span>
                <span className="text-slate-300">+91-6300825009</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-emerald-400">🏫</span>
                <span className="text-slate-300">Jayaprakash Narayan College of Engineering</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <p className="text-slate-400 flex items-center justify-center">
            © {new Date().getFullYear()} Farhan Aaqil Durrani. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
