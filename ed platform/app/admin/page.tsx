"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  Search,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Brain,
  Database,
  BarChart3,
  Settings,
  Shield,
} from "lucide-react"
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
} from "recharts"

// Mock admin data
const adminStats = {
  totalUsers: 15847,
  activeUsers: 12456,
  totalCourses: 234,
  totalRevenue: 89750,
  newUsersToday: 156,
  coursesCompletedToday: 89,
  supportTickets: 23,
  systemHealth: 98.5,
}

const recentUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "student",
    joinDate: "2024-01-15",
    status: "active",
    courses: 3,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "educator",
    joinDate: "2024-01-14",
    status: "active",
    courses: 8,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "student",
    joinDate: "2024-01-13",
    status: "inactive",
    courses: 1,
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "student",
    joinDate: "2024-01-12",
    status: "active",
    courses: 5,
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    role: "educator",
    joinDate: "2024-01-11",
    status: "active",
    courses: 12,
  },
]

const courseStats = [
  { category: "Programming", count: 45, completion: 78 },
  { category: "Data Science", count: 32, completion: 82 },
  { category: "Design", count: 28, completion: 75 },
  { category: "Business", count: 25, completion: 80 },
  { category: "Marketing", count: 18, completion: 73 },
]

const userGrowthData = [
  { month: "Jan", users: 1200, active: 980 },
  { month: "Feb", users: 1450, active: 1180 },
  { month: "Mar", users: 1680, active: 1350 },
  { month: "Apr", users: 1920, active: 1540 },
  { month: "May", users: 2150, active: 1720 },
  { month: "Jun", users: 2380, active: 1900 },
]

const revenueData = [
  { name: "Free", value: 45, color: "#8884d8" },
  { name: "Basic", value: 30, color: "#82ca9d" },
  { name: "Premium", value: 20, color: "#ffc658" },
  { name: "Enterprise", value: 5, color: "#ff7300" },
]

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("overview")
  const [users, setUsers] = useState(recentUsers)
  const [loading, setLoading] = useState(false)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleUserAction = (action: string, userId: number) => {
    console.log(`${action} user ${userId}`)
    // In real app, this would call API
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">EduAI Platform Management</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              System Healthy
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="ai-models">AI Models</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+{adminStats.newUsersToday}</span> today
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.activeUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((adminStats.activeUsers / adminStats.totalUsers) * 100)}% of total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.totalCourses}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+{adminStats.coursesCompletedToday}</span> completed today
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.supportTickets}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-600">5 urgent</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Total and active users over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={2} name="Total Users" />
                      <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} name="Active Users" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Distribution</CardTitle>
                  <CardDescription>Revenue by subscription tier</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={revenueData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {revenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Users</CardTitle>
                  <CardDescription>Latest user registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Performance</CardTitle>
                  <CardDescription>Completion rates by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseStats.map((stat) => (
                      <div key={stat.category}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{stat.category}</span>
                          <span>{stat.completion}%</span>
                        </div>
                        <Progress value={stat.completion} />
                        <div className="text-xs text-muted-foreground mt-1">{stat.count} courses</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {/* User Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage platform users and their permissions</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                <div className="border rounded-lg">
                  <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 font-medium text-sm">
                    <div>User</div>
                    <div>Role</div>
                    <div>Join Date</div>
                    <div>Status</div>
                    <div>Courses</div>
                    <div>Actions</div>
                  </div>
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="grid grid-cols-6 gap-4 p-4 border-t">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                      <div>
                        <Badge variant={user.role === "educator" ? "default" : "secondary"}>{user.role}</Badge>
                      </div>
                      <div className="text-sm">{user.joinDate}</div>
                      <div>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                      </div>
                      <div className="text-sm">{user.courses}</div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" onClick={() => handleUserAction("edit", user.id)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleUserAction("delete", user.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Course Management</CardTitle>
                    <CardDescription>Manage courses, content, and instructors</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courseStats.map((course) => (
                    <Card key={course.category}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{course.category}</CardTitle>
                          <Badge>{course.count} courses</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Completion Rate</span>
                            <span>{course.completion}%</span>
                          </div>
                          <Progress value={course.completion} />
                        </div>
                        <div className="flex justify-between mt-4">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <BarChart3 className="h-3 w-3 mr-1" />
                            Analytics
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Platform Analytics
                </CardTitle>
                <CardDescription>Detailed insights and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Learning Engagement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={courseStats}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="completion" fill="#6366f1" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">User Activity Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <span>Daily Active Users</span>
                          <span className="font-bold">8,456</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                          <span>Course Completions</span>
                          <span className="font-bold">1,234</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                          <span>AI Chat Interactions</span>
                          <span className="font-bold">15,678</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                          <span>Support Tickets</span>
                          <span className="font-bold">23</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-models" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Models & Datasets
                </CardTitle>
                <CardDescription>Manage machine learning models and training datasets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Chatbot Model</CardTitle>
                      <CardDescription>Educational AI assistant</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Model Version</span>
                          <Badge>v2.1.0</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Accuracy</span>
                          <span>94.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Training Data</span>
                          <span>50K conversations</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Updated</span>
                          <span>2 days ago</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm">Retrain</Button>
                          <Button size="sm" variant="outline">
                            Deploy
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommendation Engine</CardTitle>
                      <CardDescription>Course recommendation system</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Model Version</span>
                          <Badge>v1.8.2</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Precision</span>
                          <span>87.3%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Training Data</span>
                          <span>100K interactions</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Updated</span>
                          <span>1 week ago</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm">Retrain</Button>
                          <Button size="sm" variant="outline">
                            Deploy
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Dataset Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Student Interactions</h4>
                        <p className="text-sm text-muted-foreground mb-2">Learning behavior data</p>
                        <div className="text-2xl font-bold">125K records</div>
                        <Button size="sm" className="mt-2 bg-transparent" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Course Content</h4>
                        <p className="text-sm text-muted-foreground mb-2">Educational materials</p>
                        <div className="text-2xl font-bold">50K items</div>
                        <Button size="sm" className="mt-2 bg-transparent" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Chat Conversations</h4>
                        <p className="text-sm text-muted-foreground mb-2">AI chatbot training data</p>
                        <div className="text-2xl font-bold">75K chats</div>
                        <Button size="sm" className="mt-2 bg-transparent" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Platform Settings
                </CardTitle>
                <CardDescription>Configure system settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">System Configuration</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Maintenance Mode</span>
                          <Badge variant="outline">Disabled</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>User Registration</span>
                          <Badge>Enabled</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>AI Chatbot</span>
                          <Badge>Active</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Email Notifications</span>
                          <Badge>Enabled</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Security Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Two-Factor Auth</span>
                          <Badge>Required</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Password Policy</span>
                          <Badge>Strong</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Session Timeout</span>
                          <Badge variant="outline">30 min</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>API Rate Limiting</span>
                          <Badge>Active</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Database Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">98.5%</div>
                          <div className="text-sm text-muted-foreground">Uptime</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">2.3GB</div>
                          <div className="text-sm text-muted-foreground">Database Size</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">1.2M</div>
                          <div className="text-sm text-muted-foreground">Total Records</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">45ms</div>
                          <div className="text-sm text-muted-foreground">Avg Response</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
