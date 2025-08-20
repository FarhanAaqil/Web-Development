"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function SkillsCloud() {
  const containerRef = useRef(null)

  const skills = [
    { name: "Python", level: 95, category: "language" },
    { name: "JavaScript", level: 90, category: "language" },
    { name: "React.js", level: 85, category: "frontend" },
    { name: "Node.js", level: 80, category: "backend" },
    { name: "Machine Learning", level: 90, category: "ai" },
    { name: "TensorFlow", level: 85, category: "ai" },
    { name: "MongoDB", level: 80, category: "database" },
    { name: "SQL", level: 75, category: "database" },
    { name: "HTML/CSS", level: 90, category: "frontend" },
    { name: "Express.js", level: 85, category: "backend" },
    { name: "Data Analysis", level: 90, category: "ai" },
    { name: "Git", level: 85, category: "tool" },
    { name: "Docker", level: 70, category: "tool" },
    { name: "AWS", level: 65, category: "cloud" },
    { name: "Scikit-learn", level: 90, category: "ai" },
    { name: "Pandas", level: 95, category: "ai" },
    { name: "NumPy", level: 90, category: "ai" },
    { name: "REST APIs", level: 85, category: "backend" },
  ]

  const getColor = (category) => {
    const colors = {
      language:
        "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/30",
      frontend:
        "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800/30",
      backend:
        "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800/30",
      ai: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800/30",
      database:
        "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/30",
      tool: "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800/30",
      cloud: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/30",
    }
    return (
      colors[category] ||
      "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/30 dark:text-slate-300 dark:border-slate-800/30"
    )
  }

  const getSize = (level) => {
    if (level >= 90) return "text-lg px-4 py-2"
    if (level >= 80) return "text-base px-3 py-1.5"
    return "text-sm px-2.5 py-1"
  }

  return (
    <div className="relative min-h-[300px] flex flex-wrap justify-center gap-3 max-w-4xl mx-auto p-8 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-xl border border-slate-200 dark:border-slate-700">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
            type: "spring",
            stiffness: 100,
          }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
          className="m-1"
        >
          <Badge
            className={`${getColor(skill.category)} ${getSize(skill.level)} font-medium border shadow-sm hover:shadow-md transition-all duration-300`}
          >
            {skill.name}
          </Badge>
        </motion.div>
      ))}
    </div>
  )
}
