import { motion } from "framer-motion";
import { 
  Code, 
  Database, 
  Layers, 
  PenTool, 
  Server, 
  ShieldCheck, 
  Smartphone, 
  Workflow 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const skills = [
  { 
    name: "Frontend Development", 
    icon: Code, 
    description: "Building responsive, accessible, and performant user interfaces with modern frameworks.",
    technologies: ["React", "Vue.js", "HTML5/CSS3", "JavaScript/TypeScript", "Next.js"]
  },
  { 
    name: "Backend Development", 
    icon: Server, 
    description: "Creating robust server-side applications with scalable architectures.",
    technologies: ["Node.js", "Express", "Python/Django", "Java Spring", "GraphQL"]
  },
  { 
    name: "Database Management", 
    icon: Database, 
    description: "Designing and optimizing database schemas for efficiency and performance.",
    technologies: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase"]
  },
  { 
    name: "UI/UX Design", 
    icon: PenTool, 
    description: "Crafting intuitive user experiences with a focus on usability and aesthetics.",
    technologies: ["Figma", "Adobe XD", "Sketch", "User Research", "Wireframing"]
  },
  { 
    name: "DevOps & Deployment", 
    icon: Workflow, 
    description: "Setting up CI/CD pipelines and managing cloud infrastructure.",
    technologies: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Terraform"]
  },
  { 
    name: "Mobile Development", 
    icon: Smartphone, 
    description: "Building cross-platform mobile applications with native-like experiences.",
    technologies: ["React Native", "Flutter", "Progressive Web Apps", "iOS/Android"]
  },
  { 
    name: "Architecture", 
    icon: Layers, 
    description: "Designing scalable system architectures following best practices.",
    technologies: ["Microservices", "Serverless", "Event-driven", "Domain-driven", "REST"]
  },
  { 
    name: "Security & Testing", 
    icon: ShieldCheck, 
    description: "Implementing security best practices and comprehensive testing strategies.",
    technologies: ["Jest", "Cypress", "OWASP", "Auth Systems", "E2E Testing"]
  }
];

const skillRatings = [
  { name: "JavaScript", rating: 95 },
  { name: "React", rating: 90 },
  { name: "Node.js", rating: 85 },
  { name: "TypeScript", rating: 88 },
  { name: "HTML/CSS", rating: 92 },
  { name: "SQL", rating: 80 },
  { name: "Docker", rating: 75 },
  { name: "AWS", rating: 78 },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            My Skills
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="mt-4 text-xl text-gray-600">A diverse set of technical skills and expertise in various domains.</p>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-5">
                <skill.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{skill.name}</h3>
              <p className="text-gray-600 mb-4">{skill.description}</p>
              <div className="flex flex-wrap gap-2">
                {skill.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">Proficiency Levels</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {skillRatings.map((skill, index) => (
              <motion.div
                key={index}
                className="mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  <span className="text-sm font-medium text-gray-700">{skill.rating}%</span>
                </div>
                <Progress value={skill.rating} className="h-2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
