"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  Bot,
  User,
  Sparkles,
  BookOpen,
  Brain,
  MessageCircle,
  Lightbulb,
  Calculator,
  Beaker,
  Palette,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  context?: string
}

const quickPrompts = [
  { icon: BookOpen, text: "Explain JavaScript closures", category: "programming" },
  { icon: Calculator, text: "Help me with calculus derivatives", category: "mathematics" },
  { icon: Beaker, text: "What is photosynthesis?", category: "science" },
  { icon: Lightbulb, text: "Give me study tips", category: "study_tips" },
  { icon: Brain, text: "Career advice for data science", category: "career" },
  { icon: Palette, text: "UI/UX design principles", category: "design" },
]

const aiPersonality = {
  name: "EduAI Assistant",
  description: "Your intelligent learning companion trained on educational datasets",
  capabilities: [
    "Answer questions on any academic subject",
    "Provide personalized study recommendations",
    "Explain complex concepts in simple terms",
    "Help with programming and coding problems",
    "Offer career guidance and learning paths",
    "Generate practice questions and exercises",
  ],
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hello! I'm ${aiPersonality.name}, your AI-powered learning assistant. I'm trained on extensive educational datasets and can help you with:\n\n• Programming and computer science\n• Mathematics and statistics\n• Science subjects (physics, chemistry, biology)\n• Study techniques and learning strategies\n• Career guidance and skill development\n\nWhat would you like to learn about today?`,
      timestamp: new Date(),
      context: "greeting",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [context, setContext] = useState("general")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim()
    if (!text) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
      context,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      // Simulate AI response (in real app, this would call the Python ML model)
      const response = await simulateAIResponse(text, context)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
        context,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
        timestamp: new Date(),
        context: "error",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const simulateAIResponse = async (message: string, context: string): Promise<string> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    const messageLower = message.toLowerCase()

    // Programming responses
    if (messageLower.includes("javascript") || messageLower.includes("closure")) {
      return `Great question about JavaScript closures! 🚀

A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned. Here's a simple example:

\`\`\`javascript
function outerFunction(x) {
  // This is the outer function's scope
  
  function innerFunction(y) {
    // This inner function has access to 'x'
    return x + y;
  }
  
  return innerFunction;
}

const addFive = outerFunction(5);
console.log(addFive(3)); // Output: 8
\`\`\`

Key points about closures:
• They "remember" the environment in which they were created
• Useful for data privacy and creating function factories
• Common in callbacks, event handlers, and module patterns

Would you like me to show you more advanced closure examples or explain how they work in memory?`
    }

    // Mathematics responses
    if (messageLower.includes("calculus") || messageLower.includes("derivative")) {
      return `Calculus derivatives - let me help you understand! 📊

A derivative represents the rate of change of a function. Think of it as the slope of a curve at any given point.

**Basic derivative rules:**
• Power rule: d/dx(x^n) = nx^(n-1)
• Constant rule: d/dx(c) = 0
• Sum rule: d/dx(f + g) = f' + g'
• Product rule: d/dx(fg) = f'g + fg'
• Chain rule: d/dx(f(g(x))) = f'(g(x)) × g'(x)

**Example:**
Find the derivative of f(x) = 3x² + 2x - 5

Solution:
f'(x) = d/dx(3x²) + d/dx(2x) - d/dx(5)
f'(x) = 6x + 2 - 0
f'(x) = 6x + 2

Would you like me to work through a more complex example or explain the geometric interpretation of derivatives?`
    }

    // Science responses
    if (messageLower.includes("photosynthesis")) {
      return `Photosynthesis is fascinating! 🌱 Let me break it down for you:

**What is photosynthesis?**
It's the process by which plants convert light energy (usually from the sun) into chemical energy (glucose) using carbon dioxide and water.

**The equation:**
6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂

**Two main stages:**

1. **Light-dependent reactions (in thylakoids):**
   • Chlorophyll absorbs light energy
   • Water molecules are split (H₂O → 2H⁺ + ½O₂ + 2e⁻)
   • ATP and NADPH are produced

2. **Light-independent reactions/Calvin Cycle (in stroma):**
   • CO₂ is "fixed" into organic molecules
   • ATP and NADPH from stage 1 are used
   • Glucose is produced

**Why it matters:**
• Produces oxygen we breathe
• Forms the base of most food chains
• Removes CO₂ from atmosphere

Want to dive deeper into any specific part of photosynthesis?`
    }

    // Study tips responses
    if (messageLower.includes("study") && messageLower.includes("tip")) {
      return `Here are some evidence-based study techniques! 📚✨

**Most Effective Methods:**

1. **Active Recall** 🧠
   • Test yourself instead of just re-reading
   • Use flashcards, practice problems
   • Explain concepts out loud

2. **Spaced Repetition** ⏰
   • Review material at increasing intervals
   • Day 1 → Day 3 → Day 7 → Day 21
   • Helps move info to long-term memory

3. **Pomodoro Technique** 🍅
   • 25 minutes focused study
   • 5 minute break
   • Repeat 4 cycles, then longer break

4. **Interleaving** 🔄
   • Mix different topics in one session
   • Don't just block practice one skill
   • Improves discrimination and transfer

5. **Elaborative Interrogation** ❓
   • Ask "why" and "how" questions
   • Connect new info to what you know
   • Create meaningful associations

**Bonus Tips:**
• Study in different locations
• Teach someone else the material
• Use visual aids and diagrams
• Get enough sleep (memory consolidation!)

Which technique would you like me to explain in more detail?`
    }

    // Career advice responses
    if (messageLower.includes("career") || messageLower.includes("data science")) {
      return `Data Science is an exciting career path! 📊🚀 Let me guide you:

**What Data Scientists Do:**
• Analyze large datasets to find patterns
• Build predictive models and algorithms
• Create visualizations and reports
• Solve business problems with data
• Work with machine learning and AI

**Essential Skills to Develop:**

**Technical Skills:**
• **Programming:** Python, R, SQL
• **Statistics:** Descriptive/inferential statistics, probability
• **Machine Learning:** Supervised/unsupervised learning
• **Data Visualization:** Matplotlib, Seaborn, Tableau
• **Big Data Tools:** Spark, Hadoop (for large datasets)

**Soft Skills:**
• Problem-solving and critical thinking
• Communication (explaining complex findings)
• Business acumen
• Curiosity and continuous learning

**Learning Path:**
1. **Foundation** (3-6 months): Python/R, statistics basics
2. **Intermediate** (6-12 months): Machine learning, data manipulation
3. **Advanced** (12+ months): Deep learning, specialized domains

**Project Ideas:**
• Analyze public datasets (Kaggle)
• Build a recommendation system
• Create a data dashboard
• Predict stock prices or weather

**Job Market:**
• High demand across industries
• Average salary: $95,000-$165,000
• Remote work opportunities
• Growing field with job security

Would you like specific resources for any of these areas?`
    }

    // Default responses based on context
    const responses = {
      programming:
        "I'd be happy to help with programming concepts! Whether you're learning JavaScript, Python, Java, or any other language, I can explain syntax, help debug code, or walk through algorithms. What specific programming topic interests you?",
      mathematics:
        "Mathematics is all about patterns and problem-solving! I can help with algebra, calculus, statistics, geometry, or any other math topic. What mathematical concept would you like to explore?",
      science:
        "Science helps us understand the natural world! I can explain concepts in physics, chemistry, biology, or earth science. What scientific phenomenon would you like to learn about?",
      study_tips:
        "Effective studying is a skill that can be learned! I can share evidence-based techniques like active recall, spaced repetition, and the Pomodoro technique. What aspect of studying would you like to improve?",
      career:
        "Career planning is important for your future success! I can provide guidance on different career paths, required skills, job market trends, and learning roadmaps. What career field interests you?",
      general:
        "I'm here to help you learn! I can assist with academic subjects, study strategies, career advice, or any educational topic. What would you like to explore today?",
    }

    return responses[context as keyof typeof responses] || responses.general
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleQuickPrompt = (prompt: string, category: string) => {
    setContext(category)
    sendMessage(prompt)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  {aiPersonality.name}
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI Powered
                  </Badge>
                </CardTitle>
                <CardDescription>{aiPersonality.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Quick Prompts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Start Prompts</CardTitle>
            <CardDescription>Click on any prompt to get started with common learning topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 text-left justify-start bg-transparent"
                  onClick={() => handleQuickPrompt(prompt.text, prompt.category)}
                >
                  <prompt.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="text-sm">{prompt.text}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Chat with AI Assistant
              </CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Context: {context}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600">
                        <AvatarFallback>
                          <Bot className="h-4 w-4 text-white" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-3 ${
                        message.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                      <div className={`text-xs mt-2 opacity-70`}>{message.timestamp.toLocaleTimeString()}</div>
                    </div>

                    {message.role === "user" && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600">
                      <AvatarFallback>
                        <Bot className="h-4 w-4 text-white" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about learning, programming, math, science..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={() => sendMessage()}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Brain className="h-3 w-3" />
                Powered by custom educational datasets and machine learning models
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Capabilities */}
        <Card>
          <CardHeader>
            <CardTitle>AI Assistant Capabilities</CardTitle>
            <CardDescription>What I can help you with using advanced machine learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiPersonality.capabilities.map((capability, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  <span className="text-sm">{capability}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
