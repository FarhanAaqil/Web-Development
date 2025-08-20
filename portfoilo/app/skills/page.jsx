"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SkillCategory from "@/components/skills/skill-category"
import { motion } from "framer-motion"

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const skillCategories = [
    {
      id: "languages",
      name: "Programming Languages",
      icon: "💻",
      skills: [
        { name: "JavaScript", level: 90, icon: "🟨" },
        { name: "Python", level: 95, icon: "🐍" },
        { name: "Java", level: 80, icon: "☕" },
        { name: "C++", level: 85, icon: "🔷" },
        { name: "C", level: 80, icon: "🔵" },
      ],
    },
    {
      id: "web",
      name: "Web Development",
      icon: "🌐",
      skills: [
        { name: "HTML", level: 95, icon: "🌐" },
        { name: "CSS", level: 90, icon: "🎨" },
        { name: "React.js", level: 85, icon: "⚛️" },
        { name: "Node.js", level: 80, icon: "🟢" },
        { name: "Express.js", level: 85, icon: "🚂" },
        { name: "MongoDB", level: 80, icon: "🍃" },
        { name: "Responsive Design", level: 90, icon: "📱" },
        { name: "Tailwind CSS", level: 85, icon: "🎨" },
        { name: "Redux", level: 75, icon: "🔄" },
      ],
    },
    {
      id: "ai",
      name: "AI & Machine Learning",
      icon: "🧠",
      skills: [
        { name: "Scikit-learn", level: 90, icon: "🧠" },
        { name: "Pandas", level: 95, icon: "🐼" },
        { name: "NumPy", level: 90, icon: "🔢" },
        { name: "Matplotlib", level: 85, icon: "📊" },
        { name: "TensorFlow", level: 80, icon: "📊" },
        { name: "Data Analysis", level: 90, icon: "📈" },
        { name: "Regression", level: 85, icon: "📉" },
        { name: "Classification", level: 90, icon: "🏷️" },
      ],
    },
    {
      id: "databases",
      name: "Databases",
      icon: "🗄️",
      skills: [
        { name: "MongoDB", level: 85, icon: "🍃" },
        { name: "SQL", level: 80, icon: "🐬" },
      ],
    },
    {
      id: "concepts",
      name: "Concepts & Methodologies",
      icon: "🧩",
      skills: [
        { name: "Object-Oriented Programming", level: 95, icon: "🧩" },
        { name: "CRUD Operations", level: 90, icon: "🔄" },
        { name: "RESTful APIs", level: 85, icon: "🔌" },
        { name: "Version Control (Git)", level: 85, icon: "🔀" },
        { name: "Problem Solving", level: 95, icon: "🧩" },
      ],
    },
  ]

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
            Technical Skills
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
            A comprehensive overview of my technical expertise across various domains, from programming languages to AI
            and machine learning.
          </motion.p>
        </div>
      </section>

      {/* Skills Tabs */}
      <section className="py-24 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-16">
              <TabsList className="bg-white dark:bg-slate-800 p-1 shadow-lg rounded-full">
                <TabsTrigger value="all" className="text-sm md:text-base rounded-full">
                  All Skills
                </TabsTrigger>
                {skillCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-sm md:text-base rounded-full">
                    <span className="mr-2">{category.icon}</span> {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
              >
                {skillCategories.map((category) => (
                  <SkillCategory key={category.id} category={category} />
                ))}
              </motion.div>
            </TabsContent>

            {skillCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl mx-auto">
                  <SkillCategory category={category} />
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-24 bg-white dark:bg-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              Tools & Technologies
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              The software, platforms, and tools I use to bring ideas to life
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          >
            {[
              { name: "VS Code", icon: "💻" },
              { name: "Git", icon: "🔀" },
              { name: "GitHub", icon: "🐙" },
              { name: "Jupyter Notebook", icon: "📓" },
              { name: "npm", icon: "📦" },
              { name: "Figma", icon: "🎨" },
              { name: "TensorFlow", icon: "📊" },
              { name: "MongoDB Compass", icon: "🍃" },
            ].map((tool, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="text-3xl mb-3">{tool.icon}</div>
                    <h3 className="font-medium">{tool.name}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Learning Journey */}
      <section className="py-24 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              My Learning Journey
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              I'm constantly expanding my skill set and staying up-to-date with the latest technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-xl bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center text-emerald-700 dark:text-emerald-400">
                    <span className="mr-3 text-3xl">🔍</span> Currently Learning
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3 text-xl">•</span>
                      <div>
                        <span className="font-medium text-lg">Deep Learning with TensorFlow</span>
                        <p className="text-slate-600 dark:text-slate-300 mt-1">
                          Building neural networks for complex pattern recognition and prediction tasks
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3 text-xl">•</span>
                      <div>
                        <span className="font-medium text-lg">Advanced Data Structures</span>
                        <p className="text-slate-600 dark:text-slate-300 mt-1">
                          Implementing complex data structures for efficient algorithm design
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3 text-xl">•</span>
                      <div>
                        <span className="font-medium text-lg">Cloud Computing</span>
                        <p className="text-slate-600 dark:text-slate-300 mt-1">
                          Deploying and scaling applications in cloud environments
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3 text-xl">•</span>
                      <div>
                        <span className="font-medium text-lg">Advanced API Development</span>
                        <p className="text-slate-600 dark:text-slate-300 mt-1">
                          Building flexible and efficient APIs for modern applications
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center text-purple-700 dark:text-purple-400">
                    <span className="mr-3 text-3xl">🔮</span> Future Exploration
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 text-xl">•</span>
                      <div>
                        <span className="font-medium text-lg">Computer Vision</span>
                        <p className="text-slate-600 dark:text-slate-300 mt-1">
                          Image recognition, object detection, and visual data analysis
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 text-xl">•</span>
                      <div>
                        <span className="font-medium text-lg">Blockchain Development</span>
                        <p className="text-slate-600 dark:text-slate-300 mt-1">
                          Smart contracts, decentralized applications, and Web3 technologies
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 text-xl">•</span>
                      <div>
                        <span className="font-medium text-lg">Quantum Computing</span>
                        <p className="text-slate-600 dark:text-slate-300 mt-1">
                          Exploring the fundamentals of quantum algorithms and applications
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 text-xl">•</span>
                      <div>
                        <span className="font-medium text-lg">Cybersecurity</span>
                        <p className="text-slate-600 dark:text-slate-300 mt-1">
                          Network security, penetration testing, and secure coding practices
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
