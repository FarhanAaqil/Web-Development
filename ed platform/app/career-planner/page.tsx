"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Target,
  TrendingUp,
  Search,
  MapPin,
  DollarSign,
  Clock,
  BookOpen,
  Zap,
  ArrowRight,
  CheckCircle,
  Circle,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

// Mock data
const careerPaths = [
  {
    id: 1,
    title: "Full-Stack Developer",
    match: 92,
    salary: "$75,000 - $120,000",
    demand: "High",
    location: "Remote/Hybrid",
    description: "Build end-to-end web applications using modern technologies",
    requiredSkills: ["JavaScript", "React", "Node.js", "Databases", "Git"],
    yourSkills: ["JavaScript", "React", "Git"],
    missingSkills: ["Node.js", "Databases"],
    timeToReady: "3-4 months",
    companies: ["Google", "Microsoft", "Spotify", "Airbnb"],
  },
  {
    id: 2,
    title: "Frontend Developer",
    match: 88,
    salary: "$65,000 - $100,000",
    demand: "High",
    location: "Remote/On-site",
    description: "Create beautiful and responsive user interfaces",
    requiredSkills: ["JavaScript", "React", "CSS", "TypeScript", "Testing"],
    yourSkills: ["JavaScript", "React", "CSS"],
    missingSkills: ["TypeScript", "Testing"],
    timeToReady: "2-3 months",
    companies: ["Netflix", "Uber", "Shopify", "Figma"],
  },
  {
    id: 3,
    title: "Data Scientist",
    match: 65,
    salary: "$80,000 - $140,000",
    demand: "Very High",
    location: "Hybrid",
    description: "Analyze data to drive business decisions and insights",
    requiredSkills: ["Python", "Machine Learning", "Statistics", "SQL", "Visualization"],
    yourSkills: ["Python"],
    missingSkills: ["Machine Learning", "Statistics", "SQL", "Visualization"],
    timeToReady: "8-12 months",
    companies: ["Meta", "Amazon", "Tesla", "LinkedIn"],
  },
  {
    id: 4,
    title: "DevOps Engineer",
    match: 58,
    salary: "$85,000 - $130,000",
    demand: "High",
    location: "Remote/On-site",
    description: "Manage infrastructure and deployment pipelines",
    requiredSkills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
    yourSkills: [],
    missingSkills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
    timeToReady: "6-9 months",
    companies: ["AWS", "Docker", "Red Hat", "GitLab"],
  },
]

const skillTree = {
  "Web Development": {
    beginner: ["HTML", "CSS", "JavaScript Basics"],
    intermediate: ["React", "Node.js", "Databases"],
    advanced: ["System Design", "Performance Optimization", "Security"],
  },
  "Data Science": {
    beginner: ["Python", "Statistics", "Data Visualization"],
    intermediate: ["Machine Learning", "SQL", "Pandas"],
    advanced: ["Deep Learning", "Big Data", "MLOps"],
  },
  "Mobile Development": {
    beginner: ["React Native", "Flutter", "Mobile UI/UX"],
    intermediate: ["Native Development", "API Integration", "State Management"],
    advanced: ["Performance Optimization", "App Store Optimization", "Cross-platform"],
  },
}

const learningPaths = [
  {
    title: "Frontend Mastery Path",
    duration: "3 months",
    courses: 8,
    difficulty: "Intermediate",
    skills: ["React", "TypeScript", "Testing", "Performance"],
    progress: 65,
  },
  {
    title: "Full-Stack Journey",
    duration: "6 months",
    courses: 12,
    difficulty: "Advanced",
    skills: ["Frontend", "Backend", "Databases", "DevOps"],
    progress: 30,
  },
  {
    title: "Data Science Bootcamp",
    duration: "9 months",
    courses: 15,
    difficulty: "Beginner to Advanced",
    skills: ["Python", "ML", "Statistics", "Visualization"],
    progress: 0,
  },
]

export default function CareerPlannerPage() {
  const [selectedCareer, setSelectedCareer] = useState(careerPaths[0])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCareers = careerPaths.filter(
    (career) =>
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Career Planner</h1>
          <p className="text-gray-600 mt-2">
            Discover your ideal career path and create a personalized learning roadmap
          </p>
        </div>

        <Tabs defaultValue="explore" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="explore">Explore Careers</TabsTrigger>
            <TabsTrigger value="skills">Skill Tree</TabsTrigger>
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="roadmap">My Roadmap</TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search careers, skills, or companies..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Career List */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="font-semibold text-lg">Career Matches</h3>
                {filteredCareers.map((career) => (
                  <Card
                    key={career.id}
                    className={`cursor-pointer transition-all ${
                      selectedCareer.id === career.id ? "ring-2 ring-indigo-500" : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedCareer(career)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{career.title}</h4>
                        <Badge
                          variant={career.match >= 80 ? "default" : career.match >= 60 ? "secondary" : "outline"}
                          className={
                            career.match >= 80
                              ? "bg-green-100 text-green-800"
                              : career.match >= 60
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {career.match}% match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {career.salary.split(" - ")[0]}+
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {career.demand}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Career Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{selectedCareer.title}</CardTitle>
                        <CardDescription className="text-base mt-2">{selectedCareer.description}</CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-lg px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50"
                      >
                        {selectedCareer.match}% Match
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Key Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-1" />
                        <div className="font-medium text-sm">Salary Range</div>
                        <div className="text-xs text-muted-foreground">{selectedCareer.salary}</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                        <div className="font-medium text-sm">Demand</div>
                        <div className="text-xs text-muted-foreground">{selectedCareer.demand}</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <MapPin className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                        <div className="font-medium text-sm">Work Style</div>
                        <div className="text-xs text-muted-foreground">{selectedCareer.location}</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <Clock className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                        <div className="font-medium text-sm">Time to Ready</div>
                        <div className="text-xs text-muted-foreground">{selectedCareer.timeToReady}</div>
                      </div>
                    </div>

                    {/* Skills Analysis */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Skills You Have
                        </h4>
                        <div className="space-y-2">
                          {selectedCareer.yourSkills.map((skill) => (
                            <div key={skill} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Circle className="h-4 w-4 text-orange-600" />
                          Skills to Learn
                        </h4>
                        <div className="space-y-2">
                          {selectedCareer.missingSkills.map((skill) => (
                            <div key={skill} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                              <div className="flex items-center gap-2">
                                <Circle className="h-4 w-4 text-orange-600" />
                                <span className="text-sm">{skill}</span>
                              </div>
                              <Button size="sm" variant="outline">
                                Learn
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Top Companies */}
                    <div>
                      <h4 className="font-medium mb-3">Top Hiring Companies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCareer.companies.map((company) => (
                          <Badge key={company} variant="outline" className="px-3 py-1">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1">
                        Start Learning Path
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                      <Button variant="outline">Save to Roadmap</Button>
                      <Button variant="outline">Share</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {Object.entries(skillTree).map(([category, levels]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(levels).map(([level, skills]) => (
                      <div key={level}>
                        <h4 className="font-medium mb-2 capitalize flex items-center gap-2">
                          {level === "beginner" && <div className="w-3 h-3 bg-green-500 rounded-full" />}
                          {level === "intermediate" && <div className="w-3 h-3 bg-yellow-500 rounded-full" />}
                          {level === "advanced" && <div className="w-3 h-3 bg-red-500 rounded-full" />}
                          {level}
                        </h4>
                        <div className="space-y-1">
                          {skills.map((skill) => (
                            <div
                              key={skill}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
                            >
                              <span>{skill}</span>
                              <Button size="sm" variant="ghost">
                                <Zap className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="paths" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPaths.map((path, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{path.title}</CardTitle>
                    <CardDescription>
                      {path.duration} • {path.courses} courses • {path.difficulty}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Skills You'll Learn</h4>
                      <div className="flex flex-wrap gap-1">
                        {path.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1" size="sm">
                        {path.progress > 0 ? "Continue" : "Start Path"}
                      </Button>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  My Career Roadmap
                </CardTitle>
                <CardDescription>Your personalized journey to your dream career</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Current Goal */}
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Current Goal: Full-Stack Developer</h3>
                      <Badge className="bg-indigo-100 text-indigo-800">92% Match</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Estimated completion: 3-4 months with consistent learning
                    </p>
                    <Progress value={65} className="mb-2" />
                    <div className="text-sm text-muted-foreground">65% complete</div>
                  </div>

                  {/* Roadmap Steps */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Master JavaScript Fundamentals</h4>
                        <p className="text-sm text-muted-foreground">Completed • 2 weeks ago</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary">JavaScript</Badge>
                          <Badge variant="secondary">ES6+</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Learn React & Component Architecture</h4>
                        <p className="text-sm text-muted-foreground">In Progress • 65% complete</p>
                        <Progress value={65} className="mt-2 mb-2" />
                        <div className="flex gap-2">
                          <Badge variant="secondary">React</Badge>
                          <Badge variant="secondary">JSX</Badge>
                          <Badge variant="secondary">Hooks</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Circle className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Backend Development with Node.js</h4>
                        <p className="text-sm text-muted-foreground">Next up • Starts in 2 weeks</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">Node.js</Badge>
                          <Badge variant="outline">Express</Badge>
                          <Badge variant="outline">APIs</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Circle className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Database Design & Management</h4>
                        <p className="text-sm text-muted-foreground">Upcoming • Estimated 1 month</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">SQL</Badge>
                          <Badge variant="outline">MongoDB</Badge>
                          <Badge variant="outline">Database Design</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button>Continue Learning</Button>
                    <Button variant="outline">Adjust Timeline</Button>
                    <Button variant="outline">Add Milestone</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
