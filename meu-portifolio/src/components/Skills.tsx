import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Code2, Database, Layout, Server, Smartphone, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Layout,
    skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Next.js", "Vue.js"],
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express", "Python", "Django", "REST API", "GraphQL", "PostgreSQL", "MongoDB"],
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Mobile",
    icon: Smartphone,
    skills: ["React Native", "Flutter", "Expo", "iOS", "Android"],
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    title: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase", "Firebase"],
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  },
  {
    title: "DevOps",
    icon: Wrench,
    skills: ["Git", "Docker", "CI/CD", "AWS", "Vercel", "Linux", "Nginx"],
    color: "text-red-600",
    bgColor: "bg-red-100"
  },
  {
    title: "Outras",
    icon: Code2,
    skills: ["Figma", "UI/UX", "Agile", "Scrum", "Testing", "SEO"],
    color: "text-indigo-600",
    bgColor: "bg-indigo-100"
  }
];

export function Skills() {
  return (
    <section id="competencias" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">Minhas Competências</h2>
          <p className="text-xl text-muted-foreground">
            Tecnologias e ferramentas que domino
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg ${category.bgColor}`}>
                    <category.icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <h3 className="text-2xl">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
