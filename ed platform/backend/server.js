const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { spawn } = require("child_process")
const WebSocket = require("ws")
const http = require("http")

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/eduai_platform", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["student", "educator", "admin"], default: "student" },
  profile: {
    avatar: String,
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    badges: [String],
    skills: [
      {
        name: String,
        level: Number,
        progress: Number,
      },
    ],
  },
  learningPath: [
    {
      courseId: String,
      progress: Number,
      completedLessons: [String],
      startDate: Date,
      lastAccessed: Date,
    },
  ],
  analytics: {
    totalStudyTime: { type: Number, default: 0 },
    coursesCompleted: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    weeklyGoal: { type: Number, default: 20 },
    dailyActivity: [
      {
        date: Date,
        studyTime: Number,
        lessonsCompleted: Number,
        quizScore: Number,
      },
    ],
  },
  createdAt: { type: Date, default: Date.now },
})

// Course Schema
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: {
    name: String,
    avatar: String,
    bio: String,
  },
  category: String,
  level: String,
  duration: String,
  price: String,
  rating: Number,
  students: Number,
  lessons: [
    {
      id: String,
      title: String,
      duration: String,
      type: String, // video, text, quiz, project
      content: String,
      resources: [String],
      completed: Boolean,
    },
  ],
  projects: [
    {
      title: String,
      description: String,
      requirements: [String],
      resources: [String],
    },
  ],
  tags: [String],
  certificate: Boolean,
  createdAt: { type: Date, default: Date.now },
})

// Quiz Schema
const quizSchema = new mongoose.Schema({
  courseId: String,
  title: String,
  questions: [
    {
      question: String,
      type: String, // multiple-choice, text, code
      options: [String],
      correctAnswer: String,
      explanation: String,
      points: Number,
    },
  ],
  timeLimit: Number,
  passingScore: Number,
  attempts: [
    {
      userId: String,
      score: Number,
      answers: [String],
      completedAt: Date,
      timeSpent: Number,
    },
  ],
})

// AI Chat Schema
const chatSchema = new mongoose.Schema({
  userId: String,
  messages: [
    {
      role: String, // user, assistant
      content: String,
      timestamp: Date,
      context: String, // course, general, help
    },
  ],
  sessionId: String,
  createdAt: { type: Date, default: Date.now },
})

// Analytics Schema
const analyticsSchema = new mongoose.Schema({
  userId: String,
  date: Date,
  metrics: {
    studyTime: Number,
    lessonsCompleted: Number,
    quizzesAttempted: Number,
    averageScore: Number,
    skillsImproved: [String],
    goalsAchieved: [String],
  },
  behaviorData: {
    loginTime: Date,
    logoutTime: Date,
    pagesVisited: [String],
    timeSpentPerPage: Object,
    clickPatterns: [Object],
  },
})

// Models
const User = mongoose.model("User", userSchema)
const Course = mongoose.model("Course", courseSchema)
const Quiz = mongoose.model("Quiz", quizSchema)
const Chat = mongoose.model("Chat", chatSchema)
const Analytics = mongoose.model("Analytics", analyticsSchema)

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.sendStatus(401)
  }

  jwt.verify(token, "your-secret-key", (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// Admin Middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" })
  }
  next()
}

// Routes

// Authentication Routes
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
    })

    await user.save()

    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, "your-secret-key")

    res.json({ token, user: { id: user._id, name, email, role } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, "your-secret-key")

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// User Routes
app.get("/api/user/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password")
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put("/api/user/profile", authenticateToken, async (req, res) => {
  try {
    const updates = req.body
    const user = await User.findByIdAndUpdate(req.user.userId, { $set: updates }, { new: true }).select("-password")

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Course Routes
app.get("/api/courses", async (req, res) => {
  try {
    const { category, level, search } = req.query
    const filter = {}

    if (category && category !== "All") filter.category = category
    if (level && level !== "All") filter.level = level
    if (search) {
      filter.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    const courses = await Course.find(filter)
    res.json(courses)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/api/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    res.json(course)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/api/courses/:id/enroll", authenticateToken, async (req, res) => {
  try {
    const courseId = req.params.id
    const userId = req.user.userId

    await User.findByIdAndUpdate(userId, {
      $push: {
        learningPath: {
          courseId,
          progress: 0,
          completedLessons: [],
          startDate: new Date(),
          lastAccessed: new Date(),
        },
      },
    })

    res.json({ message: "Enrolled successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Quiz Routes
app.get("/api/quizzes/:courseId", async (req, res) => {
  try {
    const quizzes = await Quiz.find({ courseId: req.params.courseId })
    res.json(quizzes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/api/quizzes/:id/submit", authenticateToken, async (req, res) => {
  try {
    const { answers, timeSpent } = req.body
    const quiz = await Quiz.findById(req.params.id)

    let score = 0
    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0)

    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += question.points
      }
    })

    const percentage = (score / totalPoints) * 100

    await Quiz.findByIdAndUpdate(req.params.id, {
      $push: {
        attempts: {
          userId: req.user.userId,
          score: percentage,
          answers,
          completedAt: new Date(),
          timeSpent,
        },
      },
    })

    // Update user analytics
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { "analytics.totalStudyTime": timeSpent },
      $push: {
        "analytics.dailyActivity": {
          date: new Date(),
          studyTime: timeSpent,
          quizScore: percentage,
        },
      },
    })

    res.json({ score: percentage, passed: percentage >= quiz.passingScore })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// AI Chat Routes
app.post("/api/chat", authenticateToken, async (req, res) => {
  try {
    const { message, context } = req.body
    const userId = req.user.userId

    // Call Python AI model
    const pythonProcess = spawn("python", ["ml_models/chatbot.py", message, context])

    let aiResponse = ""
    pythonProcess.stdout.on("data", (data) => {
      aiResponse += data.toString()
    })

    pythonProcess.on("close", async (code) => {
      // Save chat to database
      let chat = await Chat.findOne({ userId })
      if (!chat) {
        chat = new Chat({ userId, messages: [], sessionId: Date.now().toString() })
      }

      chat.messages.push(
        { role: "user", content: message, timestamp: new Date(), context },
        { role: "assistant", content: aiResponse.trim(), timestamp: new Date(), context },
      )

      await chat.save()
      res.json({ response: aiResponse.trim() })
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Analytics Routes
app.get("/api/analytics/dashboard", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const user = await User.findById(userId)

    // Get recent analytics
    const recentAnalytics = await Analytics.find({ userId }).sort({ date: -1 }).limit(30)

    // Calculate performance metrics
    const performanceData = recentAnalytics.map((a) => ({
      date: a.date,
      studyTime: a.metrics.studyTime,
      score: a.metrics.averageScore,
      lessonsCompleted: a.metrics.lessonsCompleted,
    }))

    res.json({
      user: user.analytics,
      performanceData,
      skillProgress: user.profile.skills,
      recentActivity: user.analytics.dailyActivity.slice(-7),
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Admin Routes
app.get("/api/admin/dashboard", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalCourses = await Course.countDocuments()
    const activeUsers = await User.countDocuments({
      "analytics.dailyActivity.date": {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    })

    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(10).select("-password")

    const courseStats = await Course.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }])

    res.json({
      stats: {
        totalUsers,
        totalCourses,
        activeUsers,
        completionRate: 85, // Calculate from actual data
      },
      recentUsers,
      courseStats,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/api/admin/users", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query
    const filter = {}

    if (search) {
      filter.$or = [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }]
    }

    const users = await User.find(filter)
      .select("-password")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })

    const total = await User.countDocuments(filter)

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/api/admin/courses", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const course = new Course(req.body)
    await course.save()
    res.json(course)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put("/api/admin/users/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).select("-password")

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.delete("/api/admin/users/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: "User deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// WebSocket for real-time features
wss.on("connection", (ws) => {
  console.log("New WebSocket connection")

  ws.on("message", (message) => {
    const data = JSON.parse(message)

    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data))
      }
    })
  })

  ws.on("close", () => {
    console.log("WebSocket connection closed")
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
