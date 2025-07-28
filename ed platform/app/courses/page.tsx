"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Search, Star, Clock, Users, Play, CheckCircle, Award, Video, Code } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

// Mock data
const courses = [
  {
    id: 1,
    title: "Advanced JavaScript Concepts",
    instructor: "Sarah Johnson",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    students: 12543,
    duration: "8 hours",
    level: "Intermediate",
    category: "Programming",
    price: "Free",
    enrolled: true,
    progress: 65,
    description: "Master advanced JavaScript concepts including closures, prototypes, and async programming.",
    lessons: 24,
    projects: 3,
    certificate: true,
    tags: ["JavaScript", "ES6+", "Async/Await", "Closures"],
  },
  {
    id: 2,
    title: "React.js Complete Guide",
    instructor: "Mike Chen",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    students: 8932,
    duration: "12 hours",
    level: "Beginner",
    category: "Frontend",
    price: "$49",
    enrolled: false,
    progress: 0,
    description: "Learn React from scratch with hooks, context, and modern patterns.",
    lessons: 36,
    projects: 5,
    certificate: true,
    tags: ["React", "Hooks", "Components", "State Management"],
  },
  {
    id: 3,
    title: "Python for Data Science",
    instructor: "Dr. Emily Rodriguez",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.7,
    students: 15678,
    duration: "16 hours",
    level: "Intermediate",
    category: "Data Science",
    price: "$79",
    enrolled: true,
    progress: 30,
    description: "Comprehensive Python course covering pandas, numpy, and machine learning basics.",
    lessons: 42,
    projects: 8,
    certificate: true,
    tags: ["Python", "Pandas", "NumPy", "Machine Learning"],
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    instructor: "Alex Thompson",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.6,
    students: 6789,
    duration: "10 hours",
    level: "Beginner",
    category: "Design",
    price: "$39",
    enrolled: false,
    progress: 0,
    description: "Learn the principles of user interface and user experience design.",
    lessons: 28,
    projects: 4,
    certificate: true,
    tags: ["UI/UX", "Figma", "Design Thinking", "Prototyping"],
  },
  {
    id: 5,
    title: "Node.js Backend Development",
    instructor: "James Wilson",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    students: 9876,
    duration: "14 hours",
    level: "Intermediate",
    category: "Backend",
    price: "$59",
    enrolled: false,
    progress: 0,
    description: "Build scalable backend applications with Node.js, Express, and MongoDB.",
    lessons: 38,
    projects: 6,
    certificate: true,
    tags: ["Node.js", "Express", "MongoDB", "REST APIs"],
  },
  {
    id: 6,
    title: "Machine Learning Basics",
    instructor: "Dr. Lisa Park",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    students: 11234,
    duration: "20 hours",
    level: "Advanced",
    category: "AI/ML",
    price: "$99",
    enrolled: true,
    progress: 15,
    description: "Introduction to machine learning algorithms and practical applications.",
    lessons: 48,
    projects: 10,
    certificate: true,
    tags: ["Machine Learning", "Algorithms", "TensorFlow", "Scikit-learn"],
  },
]

const categories = ["All", "Programming", "Frontend", "Backend", "Data Science", "Design", "AI/ML"]
const levels = ["All", "Beginner", "Intermediate", "Advanced"]
const prices = ["All", "Free", "Paid"]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [selectedPrice, setSelectedPrice] = useState("All")
  const [activeTab, setActiveTab] = useState("all")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel
    const matchesPrice =
      selectedPrice === "All" ||
      (selectedPrice === "Free" && course.price === "Free") ||
      (selectedPrice === "Paid" && course.price !== "Free")
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "enrolled" && course.enrolled) ||
      (activeTab === "completed" && course.progress === 100) ||
      (activeTab === "wishlist" && !course.enrolled)

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice && matchesTab
  })

  const enrolledCourses = courses.filter((course) => course.enrolled)
  const completedCourses = courses.filter((course) => course.progress === 100)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Catalog</h1>
          <p className="text-gray-600 mt-2">Discover and enroll in courses to advance your skills</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                  <div className="text-sm text-muted-foreground">Enrolled</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{completedCourses.length}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-muted-foreground">Certificates</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">47h</div>
                  <div className="text-sm text-muted-foreground">Learning Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="enrolled">My Courses</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search courses, instructors, or topics..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="Price" />
                      </SelectTrigger>
                      <SelectContent>
                        {prices.map((price) => (
                          <SelectItem key={price} value={price}>
                            {price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge
                        variant={
                          course.level === "Beginner"
                            ? "secondary"
                            : course.level === "Intermediate"
                              ? "default"
                              : "destructive"
                        }
                        className="mb-2"
                      >
                        {course.level}
                      </Badge>
                      <Badge
                        variant={course.price === "Free" ? "secondary" : "outline"}
                        className={course.price === "Free" ? "bg-green-100 text-green-800" : ""}
                      >
                        {course.price}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Instructor */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={course.instructorAvatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {course.instructor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{course.instructor}</div>
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Course Details */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Video className="h-4 w-4" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Code className="h-4 w-4" />
                        <span>{course.projects} projects</span>
                      </div>
                      {course.certificate && (
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          <span>Certificate</span>
                        </div>
                      )}
                    </div>

                    {/* Progress (if enrolled) */}
                    {course.enrolled && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} />
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {course.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {course.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{course.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      {course.enrolled ? (
                        <Button className="w-full" variant={course.progress > 0 ? "default" : "outline"}>
                          <Play className="h-4 w-4 mr-2" />
                          {course.progress > 0 ? "Continue Learning" : "Start Course"}
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button className="flex-1">Enroll Now</Button>
                          <Button variant="outline" size="icon">
                            <BookOpen className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or browse different categories.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
