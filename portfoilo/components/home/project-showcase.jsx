"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProjectShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const featuredProjects = [
    {
      id: 1,
      title: "AI-Powered Diabetes Prediction System",
      description:
        "A machine learning model using Logistic Regression & Decision Trees to predict diabetes with 78% accuracy. The system evaluates various health parameters and provides risk assessment.",
      image: "/placeholder.svg?height=600&width=800",
      gradient: "from-emerald-500 to-cyan-500",
      emoji: "🩺",
      link: "/projects",
    },
    {
      id: 2,
      title: "Neural Network Stock Predictor",
      description:
        "Advanced time series analysis tool for stock market prediction with 92% accuracy. Uses LSTM neural networks to forecast future stock prices and market trends.",
      image: "/placeholder.svg?height=600&width=800",
      gradient: "from-purple-500 to-pink-500",
      emoji: "📈",
      link: "/projects",
    },
    {
      id: 3,
      title: "NLP-Based Code Generator",
      description:
        "Reverse Coding Engine with NLP capabilities that translates natural language descriptions into functional Python code with 80% success rate.",
      image: "/placeholder.svg?height=600&width=800",
      gradient: "from-amber-500 to-orange-500",
      emoji: "🧠",
      link: "/projects",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProjects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [featuredProjects.length])

  const currentProject = featuredProjects[currentIndex]

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
      <div
        className={`h-[500px] bg-gradient-to-r ${currentProject.gradient} flex items-center justify-center p-8 relative`}
      >
        <div className="absolute inset-0 opacity-20 bg-pattern-grid"></div>

        <div className="absolute top-8 right-8 text-8xl">{currentProject.emoji}</div>

        <motion.div
          key={currentProject.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-white max-w-2xl z-10"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">{currentProject.title}</h3>
          <p className="text-xl mb-8">{currentProject.description}</p>
          <Link href={currentProject.link}>
            <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-lg flex items-center gap-2">
              View Project Details
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {featuredProjects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
