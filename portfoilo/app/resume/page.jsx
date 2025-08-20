"use client"

import { Mail, Phone, MapPin, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import ResumeDownload from "@/components/resume-download"

export default function ResumePage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Resume</h1>
          <div className="h-1 w-20 bg-emerald-500 mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            AI Enthusiast & Full-Stack Developer with expertise in Machine Learning and Software Development
          </p>
          <ResumeDownload className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto" />
        </div>
      </section>

      {/* Resume Content */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Farhan Aaqil Durrani</h1>
            <div className="flex flex-wrap justify-center gap-6 text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Mahbubnagar</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>fadurrani543@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91-6300825009</span>
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                <span>linkedin.com/in/farhan-aaqil</span>
              </div>
            </div>
          </motion.div>

          {/* Professional Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-emerald-600 dark:text-emerald-400">Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Dynamic and detail-oriented B.Tech student in Artificial Intelligence & Machine Learning with strong
                  foundations in data science, machine learning, and software development. Experienced in building
                  AI-driven applications and full-stack web solutions using Python, JavaScript, C++, and C. Skilled in
                  problem-solving, teamwork, and delivering efficient, user-friendly technology solutions.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-emerald-600 dark:text-emerald-400">Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Jayaprakash Narayan College of Engineering</h3>
                  <p className="text-emerald-600 dark:text-emerald-400">
                    Bachelor of Technology – Artificial Intelligence & Machine Learning
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">2023 – 2027</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Prathibha Junior College</h3>
                  <p className="text-slate-700 dark:text-slate-300">Intermediate (MPC), Marks: 82%</p>
                  <p className="text-slate-600 dark:text-slate-400">2020 – 2022</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Jamia Darul Huda High School</h3>
                  <p className="text-slate-700 dark:text-slate-300">SSC, Marks: 10/10 GPA</p>
                  <p className="text-slate-600 dark:text-slate-400">2020</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-emerald-600 dark:text-emerald-400">Technical Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Programming Languages:</h4>
                  <div className="flex flex-wrap gap-2">
                    {["JavaScript", "Python", "Java", "C++", "C"].map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Web Development:</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Frontend:</span> HTML, CSS, JavaScript
                    </div>
                    <div>
                      <span className="font-medium">Backend:</span> React.js, Node.js, Express.js
                    </div>
                    <div>
                      <span className="font-medium">Database:</span> MongoDB
                    </div>
                    <div>
                      <span className="font-medium">APIs:</span> RESTful APIs
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Machine Learning Tools:</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Scikit-learn", "Pandas", "NumPy", "Matplotlib"].map((tool) => (
                      <Badge key={tool} variant="secondary">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Concepts:</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Object-Oriented Programming (OOP)", "Responsive Web Design", "CRUD Operations"].map(
                      (concept) => (
                        <Badge key={concept} variant="outline">
                          {concept}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-emerald-600 dark:text-emerald-400">Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Diabetes Prediction Using Python (Machine Learning)</h3>
                  <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mt-2 space-y-1">
                    <li>Developed a machine learning model using Logistic Regression and Decision Trees</li>
                    <li>Evaluated performance using accuracy score and confusion matrix</li>
                    <li>Achieved an accuracy of 78%</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Markdown Editor (HTML/CSS/JavaScript)</h3>
                  <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mt-2 space-y-1">
                    <li>Built a lightweight markdown editor with live preview functionality</li>
                    <li>Implemented export to plain text feature</li>
                    <li>Used HTML for structure, CSS for styling, and JavaScript for dynamic behavior</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Stock Market Prediction Using Python (Machine Learning)</h3>
                  <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mt-2 space-y-1">
                    <li>Designed system to forecast stock prices using historical data</li>
                    <li>Implemented regression and time series analysis techniques</li>
                    <li>Achieved prediction accuracy of 92% using Pandas and Scikit-learn</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">AI-Powered Reverse Coding Engine (Python + ML)</h3>
                  <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mt-2 space-y-1">
                    <li>Created NLP tool that interprets problem statements and generates Python code</li>
                    <li>Utilized NLP models and ML algorithms for code generation</li>
                    <li>Achieved 80% success rate in generating correct code snippets</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-emerald-600 dark:text-emerald-400">Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• C++ Programming, SkillUp</li>
                  <li>• Python for Data Analysis, SkillUp</li>
                  <li>• Database Management Systems (DBMS), NPTEL</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Research Publication */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-emerald-600 dark:text-emerald-400">Research Publication</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <h3 className="text-lg font-semibold">Diabetes Prediction System Using Machine Learning</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-2">2025</p>
                  <p className="text-slate-700 dark:text-slate-300 mb-3">
                    Published in the Journal of Advancement in Parallel Computing, Volume 08, Issue 02
                    <br />
                    Published by HBRP Publication Pvt. Ltd.
                  </p>
                  <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1">
                    <li>Explores application of ML techniques for diabetes prediction</li>
                    <li>Demonstrates commitment to AI-driven healthcare solutions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
