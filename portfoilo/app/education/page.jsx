"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import TimelineItem from "@/components/education/timeline-item"
import { motion } from "framer-motion"

export default function EducationPage() {
  const education = [
    {
      id: 1,
      degree: "B.Tech in Artificial Intelligence & Machine Learning",
      institution: "Jayaprakash Narayan College of Engineering",
      duration: "2023 - 2027",
      description:
        "Currently pursuing a Bachelor's degree in AI & ML, focusing on developing a strong foundation in both theoretical concepts and practical applications of artificial intelligence and machine learning technologies.",
      courses: [
        "Data Structures & Algorithms",
        "Machine Learning",
        "Artificial Intelligence",
        "Database Management Systems",
        "Web Development",
        "Computer Networks",
        "Neural Networks",
        "Deep Learning",
        "Natural Language Processing",
      ],
      achievements: [
        "Prepared multiple projects using Python",
        "Worked as a teamed leader in project groups",
        "Selected for the college's AI research group",
      ],
    },
    {
      id: 2,
      degree: "Intermediate (MPC)",
      institution: "Prathibha Junior College",
      duration: "2021 - 2023",
      description:
        "Completed intermediate education with a focus on Mathematics, Physics, and Chemistry, achieving 82% marks. Developed strong analytical and problem-solving skills that formed the foundation for engineering studies.",
      courses: ["Mathematics", "Physics", "Chemistry", "English", "Computer Science"],
     
    },
    {
      id: 3,
      degree: "SSC (10th Grade)",
      institution: "Jamia Darul Huda High School",
      duration: "2020 - 2021",
      description:
        "Completed secondary education with a perfect 10/10 GPA, demonstrating exceptional academic abilities and a strong foundation for higher studies. Received recognition for excellence in mathematics and science.",
      courses: ["Mathematics", "Science", "Social Studies", "English", "Hindi", "Telugu", "Urdu"],
      achievements: [
        "Perfect 10/10 GPA",
        "School topper in Mathematics and Science",
        "Received merit scholarship for academic excellence",
      ],
    },
  ]

  const certifications = [
    {
      id: 1,
      name: "Advanced C++ Programming",
      issuer: "SkillUp",
      date: "June 2023",
      description:
        "Comprehensive certification covering C++ fundamentals, object-oriented programming, STL, memory management, and advanced concepts like templates and multithreading.",
      skills: ["Object-Oriented Programming", "STL", "Memory Management", "Templates", "Multithreading"],
    },
    {
      id: 2,
      name: "Python for Data Analysis & Machine Learning",
      issuer: "SkillUp",
      date: "August 2023",
      description:
        "In-depth training on using Python for data manipulation, analysis, and visualization with libraries like Pandas, NumPy, and Matplotlib. Includes introduction to machine learning with Scikit-learn.",
      skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn", "Data Visualization"],
    },
    {
      id: 3,
      name: "Database Management Systems",
      issuer: "NPTEL",
      date: "December 2023",
      description:
        "Certification in database design, SQL, normalization, transaction management, and database management principles. Includes practical experience with MySQL and PostgreSQL.",
      skills: ["SQL", "Database Design", "Normalization", "Transaction Management", "MySQL", "PostgreSQL"],
    },
    {
      id: 4,
      name: "Full-Stack Web Development",
      issuer: "Udemy",
      date: "February 2024",
      description:
        "Comprehensive course on modern web development covering front-end and back-end technologies. Built multiple projects including e-commerce platforms and social media applications.",
      skills: ["React.js", "Node.js", "Express.js", "MongoDB", "RESTful APIs", "Authentication"],
    },
    {
      id: 5,
      name: "Deep Learning Specialization",
      issuer: "Coursera",
      date: "April 2024",
      description:
        "Five-course specialization covering neural networks, deep learning, convolutional networks, sequence models, and practical aspects of machine learning projects.",
      skills: ["Neural Networks", "Deep Learning", "CNN", "RNN", "TensorFlow", "Keras"],
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
            Education & Certifications
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
            My academic journey and professional certifications that have shaped my knowledge and expertise.
          </motion.p>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="py-24 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              Academic Journey
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              The educational path that has equipped me with the knowledge and skills for success
            </p>
          </div>

          <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto">
            {education.map((item, index) => (
              <TimelineItem key={item.id} item={item} isLast={index === education.length - 1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-white dark:bg-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              Professional Certifications
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Specialized training and certifications that complement my formal education
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{cert.name}</CardTitle>
                    <div className="flex justify-between items-center text-sm text-slate-500">
                      <span>{cert.issuer}</span>
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                      >
                        {cert.date}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">{cert.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, idx) => (
                        <Badge key={idx} className="bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Research & Publications */}
      <section className="py-24 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              Research & Publications
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Academic contributions to the field of artificial intelligence and machine learning
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-none shadow-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-emerald-600 to-teal-600 p-8 flex items-center justify-center">
                  <div className="text-8xl text-white">🩺</div>
                </div>
                <div className="md:w-2/3 p-8">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl">Diabetes Prediction System Using Machine Learning</CardTitle>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-slate-500 gap-2 mt-2">
                      <span>Journal of Advancement in Parallel Computing</span>
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                      >
                        Volume 08, Issue 02, 2025
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      Published research on developing a machine learning-based system for predicting diabetes risk
                      using various health parameters. The paper demonstrates the application of Logistic Regression and
                      Decision Tree algorithms for healthcare solutions with 78% prediction accuracy.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[
                        "Machine Learning",
                        "Healthcare",
                        "Predictive Analytics",
                        "Classification",
                        "Medical Informatics",
                      ].map((tag, idx) => (
                        <Badge
                          key={idx}
                          className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      <strong>Publisher:</strong> HBRP Publication Pvt. Ltd.
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Academic Achievements */}
      <section className="py-24 bg-white dark:bg-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              Academic Achievements
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Recognition and accomplishments throughout my educational journey
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <span className="mr-2 text-2xl">🏆</span> Perfect 10/10 GPA in SSC
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300">
                    Achieved a perfect score in secondary education, demonstrating exceptional academic abilities and
                    dedication to learning. Received recognition from the school board for outstanding performance.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <span className="mr-2 text-2xl">📊</span> 82% in Intermediate (MPC)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300">
                    Secured high marks in Mathematics, Physics, and Chemistry, establishing a strong foundation for
                    engineering studies. Particularly excelled in Mathematics with a score of 92%.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <span className="mr-2 text-2xl">📝</span> Research Publication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300">
                    Published research paper on diabetes prediction during undergraduate studies, showcasing research
                    capabilities and domain expertise in healthcare applications of machine learning.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <span className="mr-2 text-2xl">💻</span> Technical Skill Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300">
                    Consistently pursued additional certifications and self-learning opportunities to expand technical
                    knowledge beyond the curriculum, demonstrating a commitment to continuous learning.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
