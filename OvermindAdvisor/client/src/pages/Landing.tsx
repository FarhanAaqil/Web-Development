import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight, Grid, Layers, Network, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export default function Landing() {
  return (
    <>
      <Helmet>
        <title>Overmind | Visualize Your Thoughts</title>
        <meta name="description" content="Overmind is a revolutionary mind-management system designed to visualize, connect, and evolve every aspect of your thoughts, tasks, goals, and ideas." />
        <meta name="keywords" content="mind map, productivity, thought visualization, AI, task management" />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* Navigation */}
        <header className="border-b border-gray-800">
          <div className="container mx-auto flex justify-between items-center py-4 px-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="text-white h-6 w-6" />
              </div>
              <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Overmind</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <div className="text-gray-300 hover:text-white transition-colors duration-200">
                <a href="/login">Login</a>
              </div>
              <div>
                <Button 
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                  onClick={() => window.location.href = '/register'}
                >
                  Get Started
                </Button>
              </div>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Second Brain</span>, Visually Mapped
                </h1>
                <p className="text-xl text-gray-300 mb-10">
                  A revolutionary mind-management system designed to visualize, connect, and evolve every aspect of your thoughts, tasks, goals, and ideas.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="w-full sm:w-auto">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 w-full"
                      onClick={() => window.location.href = '/register'}
                    >
                      Start For Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="w-full sm:w-auto">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="text-white border-gray-700 hover:bg-gray-800 w-full"
                      onClick={() => window.location.href = '/login'}
                    >
                      Explore Demo
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Visual Graph UI Preview */}
              <motion.div 
                className="mt-16 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
                  <div className="border-b border-gray-800 bg-gray-900 p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-sm text-gray-400">Overmind Graph</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-400">
                        <Grid className="h-4 w-4 mr-1" />
                        Filter
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400">
                        <Layers className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-950 p-4 h-[400px] flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Simulated Mind Map Nodes - these would be built with D3.js */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center z-10">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      
                      {/* Connected Nodes */}
                      <div className="absolute top-[30%] left-[30%] w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute top-[70%] left-[40%] w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                        <Network className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute top-[40%] left-[70%] w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center">
                        <Layers className="h-6 w-6 text-white" />
                      </div>
                      
                      {/* Connection Lines - Simplified for demonstration */}
                      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                        <line x1="50%" y1="50%" x2="30%" y2="30%" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" />
                        <line x1="50%" y1="50%" x2="70%" y2="40%" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="2" />
                        <line x1="50%" y1="50%" x2="40%" y2="70%" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl blur-xl opacity-50 -z-10"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Revolutionize Your Thinking</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Overmind is more than a productivity app—it's a thinking engine, a second brain, and an idea evolution system.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div 
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mind Nodes</h3>
                <p className="text-gray-300">
                  Create and connect different types of thoughts—tasks, ideas, notes, projects, and goals—all in one visual space.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-600/60 rounded-lg flex items-center justify-center mb-4">
                  <Network className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Dynamic Graph UI</h3>
                <p className="text-gray-300">
                  Interactive force-directed visualization that adapts to your thinking, making connections visible and intuitive.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-600/60 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Augmented Thinking</h3>
                <p className="text-gray-300">
                  Intelligent suggestions for connections between ideas, task breakdowns, and summaries of related thoughts.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Upgrade Your Thinking?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join Overmind today and transform how you organize thoughts, make connections, and evolve ideas.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                onClick={() => window.location.href = '/register'}
              >
                Get Started for Free
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-950 py-12 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-6 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="text-white h-4 w-4" />
                </div>
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Overmind</span>
              </div>
              <div className="text-center md:text-right text-gray-400 text-sm">
                <p>© {new Date().getFullYear()} Overmind. All rights reserved.</p>
                <p className="mt-1">A revolutionary mind-management system</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}