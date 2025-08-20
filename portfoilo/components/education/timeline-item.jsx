"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function TimelineItem({ item, isLast }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className="relative pl-10 pb-16"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-3 top-5 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-teal-500"></div>
      )}

      {/* Timeline dot */}
      <div className="absolute left-0 top-5 w-7 h-7 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
        <div className="w-2 h-2 rounded-full bg-white"></div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl border border-slate-100 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
            {item.degree}
          </h3>
          <span className="text-sm bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 font-medium mt-1 sm:mt-0 px-3 py-1 rounded-full">
            {item.duration}
          </span>
        </div>

        <h4 className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-4">{item.institution}</h4>

        <p className="text-slate-600 dark:text-slate-300 mb-6">{item.description}</p>

        <div className="mb-6">
          <h5 className="font-medium mb-3 text-slate-800 dark:text-slate-200">Key Courses:</h5>
          <div className="flex flex-wrap gap-2">
            {item.courses.map((course, index) => (
              <Badge
                key={index}
                className="bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200 shadow-sm"
              >
                {course}
              </Badge>
            ))}
          </div>
        </div>

        {item.achievements && (
          <div>
            <h5 className="font-medium mb-3 text-slate-800 dark:text-slate-200">Achievements:</h5>
            <ul className="space-y-2">
              {item.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-emerald-600 dark:text-emerald-400 mr-2">•</span>
                  <span className="text-slate-600 dark:text-slate-300">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  )
}
