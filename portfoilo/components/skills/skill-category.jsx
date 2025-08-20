"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SkillCategory({ category }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <span className="mr-2 text-2xl">{category.icon}</span> {category.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {category.skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="mr-2">{skill.icon}</span>
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  <span className="text-sm text-slate-500">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(to right, 
                        ${skill.level >= 90 ? "#10b981" : skill.level >= 80 ? "#06b6d4" : skill.level >= 70 ? "#8b5cf6" : "#f43f5e"}, 
                        ${skill.level >= 90 ? "#059669" : skill.level >= 80 ? "#0891b2" : skill.level >= 70 ? "#7c3aed" : "#e11d48"})`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
