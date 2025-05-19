import { motion } from "framer-motion";
import { 
  Button 
} from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ExternalLink, Github, Lightbulb, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured online store with product listings, cart functionality, user authentication, and payment processing.",
    image: "https://images.unsplash.com/photo-1523289333742-be1143f6b766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    tags: ["React", "Node.js", "MongoDB", "Stripe API", "Redux"],
    liveUrl: "#",
    repoUrl: "#"
  },
  {
    title: "Task Management App",
    description: "A collaborative project management tool with drag-and-drop interfaces, real-time updates, and team collaboration features.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    tags: ["Vue.js", "Express", "PostgreSQL", "Socket.io", "Docker"],
    liveUrl: "#",
    repoUrl: "#"
  },
  {
    title: "Fitness Tracking Dashboard",
    description: "A comprehensive fitness tracking application with workout planning, progress visualization, and social features.",
    image: "https://images.unsplash.com/photo-1544216717-3bbf52512659?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    tags: ["React", "Node.js", "MySQL", "Chart.js", "Auth0"],
    liveUrl: "#",
    repoUrl: "#"
  },
  {
    title: "Real Estate Marketplace",
    description: "A platform for listing and exploring properties with advanced filtering, interactive maps, and virtual tours.",
    image: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    tags: ["Next.js", "Express", "MongoDB", "Google Maps API", "AWS S3"],
    liveUrl: "#",
    repoUrl: "#"
  },
  {
    title: "Recipe Sharing Community",
    description: "A social platform for food enthusiasts to share, discover, and discuss recipes with an AI-powered recommendation system.",
    image: "https://images.unsplash.com/photo-1513862778472-6b2bd663ca71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    tags: ["React", "Django", "PostgreSQL", "ElasticSearch", "TensorFlow"],
    liveUrl: "#",
    repoUrl: "#"
  },
  {
    title: "AI Chatbot Assistant",
    description: "An intelligent virtual assistant that uses natural language processing to answer questions and complete tasks.",
    image: "https://images.unsplash.com/photo-1560472355-a3b4bcfe790c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    tags: ["React", "Python", "Flask", "OpenAI API", "WebSockets"],
    liveUrl: "#",
    repoUrl: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Projects
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="mt-4 text-xl text-gray-600">A showcase of my recent work and the technologies I've been working with.</p>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="overflow-hidden h-48">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="flex items-center" asChild>
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" className="flex items-center" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Live Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="flex flex-col items-center space-y-8">
            <div className="flex items-center space-x-3 bg-blue-50 text-blue-700 rounded-full px-4 py-2 text-sm">
              <Lightbulb className="h-4 w-4" />
              <span>Have a project in mind?</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Let's create something amazing together</h3>
            <Button size="lg" className="flex items-center" asChild>
              <a href="#contact">
                Contact Me
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
