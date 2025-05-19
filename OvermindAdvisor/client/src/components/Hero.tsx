import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="pt-20 pb-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:space-x-16">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">John Doe</span>
              <br />Full Stack Developer
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              I build modern, responsive web applications with cutting-edge technologies to create exceptional user experiences.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="flex items-center" size="lg" asChild>
                <a href="#projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="flex items-center" asChild>
                <a href="#about">
                  <Play className="mr-2 h-4 w-4 text-primary" />
                  Learn More
                </a>
              </Button>
            </div>
            
            <div className="mt-10 flex items-center">
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120" alt="Client" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120" alt="Client" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120" alt="Client" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120" alt="Client" className="w-10 h-10 rounded-full border-2 border-white" />
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-500">Trusted by clients worldwide</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 mt-12 lg:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">John Doe / Portfolio</h3>
                  <div className="flex space-x-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white">
                <div className="space-y-4 custom-scrollbar" style={{ maxHeight: "320px", overflowY: "auto" }}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-mono text-primary-600">$</span>
                    </div>
                    <div>
                      <p className="font-mono text-gray-800">npm install my-portfolio</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="font-mono text-green-600">{'>'}</span>
                    </div>
                    <div>
                      <p className="font-mono text-gray-800">Installing dependencies...</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <span className="font-mono text-yellow-600">!</span>
                    </div>
                    <div>
                      <p className="font-mono text-gray-800">Initializing portfolio components</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="font-mono text-purple-600">#</span>
                    </div>
                    <div>
                      <p className="font-mono text-gray-800">Loading projects and skills...</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="font-mono text-red-600">✓</span>
                    </div>
                    <div>
                      <p className="font-mono text-gray-800 font-bold">Portfolio ready! Welcome!</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 relative">
                  <input 
                    type="text" 
                    placeholder="Type 'help' for commands..." 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary font-mono" 
                  />
                  <button className="absolute right-3 top-3 text-primary hover:text-primary-600">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
