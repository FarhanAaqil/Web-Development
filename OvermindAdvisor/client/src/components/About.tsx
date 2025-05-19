import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2 
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="mt-4 text-xl text-gray-600">Passionate full-stack developer with a focus on creating seamless user experiences.</p>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-lg z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500/10 rounded-lg z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800" 
                alt="John Doe" 
                className="rounded-lg shadow-lg w-full z-10 relative"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">My Journey</h3>
            <p className="text-gray-600 mb-6">
              I'm John Doe, a passionate full-stack developer with over 5 years of experience building web applications that combine beautiful interfaces with powerful functionality.
            </p>
            <p className="text-gray-600 mb-6">
              My journey in web development began when I created my first website at 16. Since then, I've been constantly learning and evolving my skills to stay at the forefront of modern web technologies.
            </p>
            <p className="text-gray-600 mb-6">
              When I'm not coding, you'll find me hiking local trails, experimenting with photography, or contributing to open-source projects. I believe in creating technology that solves real problems and enhances people's lives.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700">
                Frontend Development
              </div>
              <div className="bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700">
                Backend Systems
              </div>
              <div className="bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700">
                UI/UX Design
              </div>
              <div className="bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700">
                Performance Optimization
              </div>
            </div>
            
            <Button className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </motion.div>
        </div>
        
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <motion.div
            className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-4xl font-bold text-primary mb-2">5+</h3>
            <p className="text-gray-600">Years Experience</p>
          </motion.div>
          
          <motion.div
            className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
            <p className="text-gray-600">Projects Completed</p>
          </motion.div>
          
          <motion.div
            className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-4xl font-bold text-primary mb-2">30+</h3>
            <p className="text-gray-600">Happy Clients</p>
          </motion.div>
          
          <motion.div
            className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-4xl font-bold text-primary mb-2">15+</h3>
            <p className="text-gray-600">Awards Received</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
