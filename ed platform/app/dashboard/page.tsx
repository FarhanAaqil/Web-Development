"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  TrendingUp,
  Target,
  Award,
  Clock,
  Users,
  MessageCircle,
  Calendar,
  Star,
  Zap,
  Trophy,
  Play,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data
const progressData = [
  { name: "Week 1", progress: 20 },
  { name: "Week 2", progress: 35 },
  { name: "Week 3", progress: 45 },
  { name: "Week 4", progress: 60 },
  { name: "Week 5", progress: 75 },
  { name: "Week 6", progress: 85 },
]

const skillData = [
  { skill: "JavaScript", level: 85 },
  { skill: "React", level: 70 },
  { skill: "Python", level: 60 },
  { skill: "Data Science", level: 45 },
]

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
              <p className="text-indigo-100">Ready to continue your learning journey?</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">Level 12</div>
              <div className="text-indigo-200">2,450 XP</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress to Level 13</span>
              <span>2,450 / 3,000 XP</span>
            </div>
            <Progress value={82} className="bg-indigo-400" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">+3 this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Learning Path */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Current Learning Path
                </CardTitle>
                <CardDescription>Full-Stack Web Development Track</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">6/8 modules completed</span>
                  </div>
                  <Progress value={75} />

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <div className="font-medium">HTML & CSS Fundamentals</div>
                        <div className="text-sm text-muted-foreground">Completed • 4.8/5 rating</div>
                      </div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Play className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <div className="font-medium">JavaScript Advanced Concepts</div>
                        <div className="text-sm text-muted-foreground">In Progress • 65% complete</div>
                      </div>
                      <Badge>In Progress</Badge>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <div className="font-medium">React.js Mastery</div>
                        <div className="text-sm text-muted-foreground">Locked • Complete JavaScript first</div>
                      </div>
                      <Badge variant="outline">Locked</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Your progress over the last 6 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="progress" stroke="#6366f1" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">JavaScript Quiz</div>
                    <div className="text-xs text-muted-foreground">2:00 PM - 2:30 PM</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
                  <Users className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Study Group</div>
                    <div className="text-xs text-muted-foreground">4:00 PM - 5:00 PM</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-purple-50 rounded">
                  <MessageCircle className="h-4 w-4 text-purple-600" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Mentor Session</div>
                    <div className="text-xs text-muted-foreground">6:00 PM - 6:30 PM</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skill Levels */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Levels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillData.map((skill) => (
                  <div key={skill.skill}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.skill}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">JavaScript Master</div>
                    <div className="text-xs text-muted-foreground">Completed advanced JS course</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Zap className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Speed Learner</div>
                    <div className="text-xs text-muted-foreground">Completed 5 lessons in one day</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Team Player</div>
                    <div className="text-xs text-muted-foreground">Helped 10 classmates</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="font-medium text-sm mb-1">Practice More Algorithms</div>
                  <div className="text-xs text-muted-foreground mb-2">Based on your recent quiz performance</div>
                  <Button size="sm" variant="outline">
                    Start Practice
                  </Button>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                  <div className="font-medium text-sm mb-1">Join React Study Group</div>
                  <div className="text-xs text-muted-foreground mb-2">Perfect for your current learning level</div>
                  <Button size="sm" variant="outline">
                    Join Group
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump back into your learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/courses">
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <BookOpen className="h-6 w-6" />
                  Browse Courses
                </Button>
              </Link>
              <Link href="/quiz">
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <Target className="h-6 w-6" />
                  Take Quiz
                </Button>
              </Link>
              <Link href="/analytics">
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <TrendingUp className="h-6 w-6" />
                  View Analytics
                </Button>
              </Link>
              <Link href="/career-planner">
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <Award className="h-6 w-6" />
                  Career Planner
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
