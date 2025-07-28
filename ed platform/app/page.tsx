import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Brain, TrendingUp, Target, Award, MessageCircle, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">EduAI Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
            🤖 AI-Powered Learning with Custom Datasets
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Smart Education Platform
            <span className="text-indigo-600 block">Powered by Machine Learning</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience personalized learning with our AI chatbot trained on educational datasets, real-time analytics,
            and adaptive content delivery using MongoDB and machine learning algorithms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                Start Learning with AI
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">
                Try AI Chatbot Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced AI Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with Python ML models, MongoDB datasets, and React.js for seamless user experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-indigo-500">
              <CardHeader>
                <Brain className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>AI Chatbot Assistant</CardTitle>
                <CardDescription>
                  Trained on educational datasets using Python NLP models for instant student support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>ML-Powered Analytics</CardTitle>
                <CardDescription>
                  Machine learning algorithms analyze learning patterns stored in MongoDB
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
              <CardHeader>
                <Target className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Custom Datasets</CardTitle>
                <CardDescription>
                  Proprietary educational datasets for personalized learning recommendations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Adaptive Learning Paths</CardTitle>
                <CardDescription>
                  React.js frontend with Redux state management for dynamic content delivery
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-yellow-500">
              <CardHeader>
                <Award className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>
                  Comprehensive admin panel built with Node.js and Express.js for platform management
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Real-time Communication</CardTitle>
                <CardDescription>
                  WebSocket integration for live chat and collaborative learning experiences
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Built with Modern Technology</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-2xl">🐍</span>
              </div>
              <span className="font-medium">Python ML</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-2xl">🍃</span>
              </div>
              <span className="font-medium">MongoDB</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-2xl">⚛️</span>
              </div>
              <span className="font-medium">React.js</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-2xl">🟢</span>
              </div>
              <span className="font-medium">Node.js</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-2xl">🎨</span>
              </div>
              <span className="font-medium">Tailwind</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-2xl">🔄</span>
              </div>
              <span className="font-medium">Redux</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Platform Statistics</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-white mb-2">100K+</div>
              <div className="text-indigo-200">Dataset Records</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-indigo-200">Active Learners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-indigo-200">AI Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-indigo-200">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Experience AI-Powered Learning?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of students already learning with our advanced AI platform powered by machine learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                <Zap className="h-5 w-5 mr-2" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline">
                <Users className="h-5 w-5 mr-2" />
                Admin Access
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6" />
                <span className="text-lg font-bold">EduAI Pro</span>
              </div>
              <p className="text-gray-400">
                Advanced AI-powered education platform with machine learning capabilities and custom datasets.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/courses" className="hover:text-white">
                    AI Courses
                  </Link>
                </li>
                <li>
                  <Link href="/analytics" className="hover:text-white">
                    ML Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/chatbot" className="hover:text-white">
                    AI Chatbot
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Technology</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/datasets" className="hover:text-white">
                    Custom Datasets
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-white">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/ml-models" className="hover:text-white">
                    ML Models
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact AI Support
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white">
                    Developer Community
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EduAI Pro. Powered by Python ML, MongoDB, and React.js</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
