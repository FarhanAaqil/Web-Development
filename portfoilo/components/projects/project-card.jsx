"use client"

import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function ProjectCard({ project }) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div variants={item}>
      <Card className="overflow-hidden flex flex-col h-full border-none shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 rounded-xl">
        <div
          className={`h-48 bg-gradient-to-r ${project.gradient} flex items-center justify-center relative overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-20 bg-pattern-grid"></div>
          <span className="text-6xl text-white z-10">{project.emoji}</span>
        </div>

        <CardContent className="p-6 flex-grow">
          <h3 className="text-xl font-bold mb-3">{project.title}</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-5">{project.description}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200 shadow-sm"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge
                variant="secondary"
                className="bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200 shadow-sm"
              >
                +{project.technologies.length - 4} more
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex justify-between">
          <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="flex items-center gap-1 rounded-lg">
              <Github className="h-4 w-4" />
              Code
            </Button>
          </Link>

          <Link href={project.links.demo} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              className="flex items-center gap-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
