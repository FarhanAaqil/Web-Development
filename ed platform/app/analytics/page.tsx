"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Clock, Target, Award, Brain, Zap, Calendar, Users } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Mock data
const performanceData = [
  { month: "Jan", score: 65, time: 120 },
  { month: "Feb", score: 72, time: 135 },
  { month: "Mar", score: 78, time: 145 },
  { month: "Apr", score: 85, time: 160 },
  { month: "May", score: 88, time: 175 },
  { month: "Jun", score: 92, time: 190 },
]

const subjectData = [
  { subject: "JavaScript", score: 92, color: "#8884d8" },
  { subject: "React", score: 85, color: "#82ca9d" },
  { subject: "Python", score: 78, color: "#ffc658" },
  { subject: "Data Science", score: 65, color: "#ff7300" },
  { subject: "Machine Learning", score: 58, color: "#00ff88" },
]

const skillRadarData = [
  { skill: "Problem Solving", current: 85, target: 90 },
  { skill: "Coding", current: 92, target: 95 },
  { skill: "Communication", current: 75, target: 85 },
  { skill: "Teamwork", current: 88, target: 90 },
  { skill: "Leadership", current: 65, target: 80 },
  { skill: "Creativity", current: 78, target: 85 },
]

const learningTimeData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3.2 },
  { day: "Wed", hours: 1.8 },
  { day: "Thu", hours: 4.1 },
  { day: "Fri", hours: 2.9 },
  { day: "Sat", hours: 5.2 },
  { day: "Sun", hours: 3.7 },
]

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Learning Analytics</h1>
          <p className="text-gray-600 mt-2">Track your progress and identify areas for improvement</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">88.5%</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5.2% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23.4h</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.1h this week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <div className="flex items-center text-xs text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                -1.2% from last week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak Days</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                Personal best!
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="time">Time Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>Your test scores and study time over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="score"
                        stroke="#6366f1"
                        strokeWidth={2}
                        name="Score %"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="time"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Study Time (min)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Goal Progress</CardTitle>
                  <CardDescription>Track your learning objectives</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Complete Full-Stack Course</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} />
                    <p className="text-xs text-muted-foreground mt-1">6 of 8 modules completed</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Achieve 90% Average Score</span>
                      <span>88%</span>
                    </div>
                    <Progress value={88} />
                    <p className="text-xs text-muted-foreground mt-1">2% away from goal</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>30-Day Study Streak</span>
                      <span>50%</span>
                    </div>
                    <Progress value={50} />
                    <p className="text-xs text-muted-foreground mt-1">15 of 30 days completed</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Earn 5 New Badges</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} />
                    <p className="text-xs text-muted-foreground mt-1">3 of 5 badges earned</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your learning activity over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <div className="font-medium">JavaScript Advanced Quiz</div>
                        <div className="text-sm text-muted-foreground">Scored 94% • 2 hours ago</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Excellent
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <div className="font-medium">React Components Lesson</div>
                        <div className="text-sm text-muted-foreground">Completed • Yesterday</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Completed
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div>
                        <div className="font-medium">Python Data Structures</div>
                        <div className="text-sm text-muted-foreground">In Progress • 65% complete</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      In Progress
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                  <CardDescription>Your scores across different subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subjectData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="score" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subject Distribution</CardTitle>
                  <CardDescription>Time spent on each subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={subjectData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="score"
                        label={({ subject, score }) => `${subject}: ${score}%`}
                      >
                        {subjectData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Subject Details</CardTitle>
                <CardDescription>Detailed breakdown of your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectData.map((subject) => (
                    <div key={subject.subject} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: subject.color }}></div>
                        <div>
                          <div className="font-medium">{subject.subject}</div>
                          <div className="text-sm text-muted-foreground">
                            {subject.score >= 90
                              ? "Excellent"
                              : subject.score >= 80
                                ? "Good"
                                : subject.score >= 70
                                  ? "Average"
                                  : "Needs Improvement"}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{subject.score}%</div>
                        <div className="text-sm text-muted-foreground">
                          {subject.score >= 85 ? "+" : ""}
                          {subject.score - 80}% vs target
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skill Assessment</CardTitle>
                  <CardDescription>Current vs target skill levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={skillRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="Current" dataKey="current" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                      <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skill Recommendations</CardTitle>
                  <CardDescription>AI-powered suggestions for improvement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">Leadership Development</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your leadership score is 20 points below target. Consider taking our leadership fundamentals
                      course.
                    </p>
                    <Badge variant="outline" className="text-purple-700 border-purple-300">
                      High Priority
                    </Badge>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Communication Skills</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Join our public speaking workshop to boost your communication skills by 10 points.
                    </p>
                    <Badge variant="outline" className="text-blue-700 border-blue-300">
                      Medium Priority
                    </Badge>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Creativity Enhancement</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Explore our design thinking course to enhance your creative problem-solving abilities.
                    </p>
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      Low Priority
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="time" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Study Time</CardTitle>
                  <CardDescription>Hours spent learning each day this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={learningTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Study Patterns</CardTitle>
                  <CardDescription>When you're most productive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium">Peak Learning Time</div>
                      <div className="text-sm text-muted-foreground">2:00 PM - 4:00 PM</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Most Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium">Best Performance Day</div>
                      <div className="text-sm text-muted-foreground">Saturday</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Highest Scores</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <div className="font-medium">Average Session</div>
                      <div className="text-sm text-muted-foreground">45 minutes</div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Optimal Length</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <div className="font-medium">Weekly Goal</div>
                      <div className="text-sm text-muted-foreground">20 hours target</div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">117% Complete</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Time Management Insights</CardTitle>
                <CardDescription>AI-powered recommendations to optimize your study schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Optimal Study Duration</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your performance peaks at 45-minute sessions with 15-minute breaks.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Best Study Days</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You're most productive on weekends. Consider scheduling challenging topics then.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">Consistency Tip</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Try to maintain at least 2 hours of study time on weekdays for better retention.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-red-600" />
                      <span className="font-medium">Focus Improvement</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your attention drops after 60 minutes. Consider shorter, more frequent sessions.
                    </p>
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
