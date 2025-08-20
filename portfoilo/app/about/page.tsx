import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About Me</h1>
              <div className="h-1 w-20 bg-emerald-500"></div>
              <p className="text-xl text-slate-300">
                Dynamic and detail-oriented B.Tech student specializing in Artificial Intelligence and Machine Learning,
                with a passion for building innovative solutions.
              </p>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-emerald-500 shadow-xl">
                <Image
                  src="/images/farhan-photo.jpg"
                  alt="Farhan Aaqil Durrani"
                  width={320}
                  height={320}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 bg-slate-100 dark:bg-slate-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">My Journey</h2>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg mb-6">
                I am Farhan Aaqil Durrani, a B.Tech student specializing in Artificial Intelligence and Machine
                Learning. My academic journey has equipped me with a strong foundation in both theoretical concepts and
                practical applications of AI and ML technologies.
              </p>

              <p className="text-lg mb-6">
                My passion for technology began early, and I've since developed expertise in building AI-driven
                applications and full-stack web solutions. I believe in creating software that not only solves problems
                efficiently but also provides an excellent user experience.
              </p>

              <p className="text-lg mb-6">
                Throughout my academic career, I've maintained a focus on practical applications of theoretical
                knowledge. This approach has allowed me to develop projects like my Diabetes Prediction System, which
                demonstrates my commitment to using AI for healthcare solutions.
              </p>

              <p className="text-lg">
                I'm constantly learning and exploring new technologies, with a particular interest in how AI can be
                leveraged to create more intuitive, efficient, and accessible software solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interests & Hobbies */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Interests & Hobbies</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 border-none shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold mb-2">AI Research</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Exploring cutting-edge AI technologies and their practical applications in solving real-world
                  problems.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-none shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-xl font-bold mb-2">Coding Challenges</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Participating in competitive programming and solving complex algorithmic problems to sharpen my
                  skills.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-none shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold mb-2">Technical Reading</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Staying updated with the latest research papers and books on machine learning and software
                  development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Personal Values */}
      <section className="py-20 bg-slate-100 dark:bg-slate-900">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What Drives Me</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-slate-600 dark:text-slate-300">
                I believe in pushing boundaries and finding creative solutions to complex problems.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">Attention to Detail</h3>
              <p className="text-slate-600 dark:text-slate-300">
                I'm committed to precision and thoroughness in everything I create.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p className="text-slate-600 dark:text-slate-300">
                I value teamwork and believe the best solutions come from diverse perspectives.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2">Continuous Learning</h3>
              <p className="text-slate-600 dark:text-slate-300">
                I'm dedicated to constantly improving my skills and staying at the forefront of technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">My Expertise</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            I've developed a diverse skill set that allows me to tackle various aspects of software development and AI
            implementation.
          </p>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              "Python",
              "JavaScript",
              "Java",
              "C++",
              "React.js",
              "Node.js",
              "Express.js",
              "MongoDB",
              "Machine Learning",
              "Data Analysis",
              "Scikit-learn",
              "Pandas",
              "NumPy",
              "Matplotlib",
              "OOP",
              "Responsive Design",
              "CRUD Operations",
              "HTML",
              "CSS",
            ].map((skill, index) => (
              <Badge
                key={index}
                className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 text-sm py-1 px-3"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
