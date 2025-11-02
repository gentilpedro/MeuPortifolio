import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Award, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const courses = [
  {
    title: "Desenvolvimento Web Full Stack",
    institution: "Udemy",
    date: "2024",
    duration: "120 horas",
    status: "Concluído",
    certificate: "#",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    description: "Curso completo de desenvolvimento web, desde fundamentos até deploy de aplicações completas."
  },
  {
    title: "TypeScript: Do Zero ao Avançado",
    institution: "Rocketseat",
    date: "2024",
    duration: "40 horas",
    status: "Concluído",
    certificate: "#",
    skills: ["TypeScript", "JavaScript", "Design Patterns"],
    description: "Domínio completo de TypeScript aplicado a projetos reais e modernos."
  },
  {
    title: "React Native - Desenvolvimento Mobile",
    institution: "Alura",
    date: "2023",
    duration: "60 horas",
    status: "Concluído",
    certificate: "#",
    skills: ["React Native", "Expo", "Mobile"],
    description: "Criação de aplicativos mobile multiplataforma com React Native."
  },
  {
    title: "UI/UX Design Essencial",
    institution: "Coursera",
    date: "2023",
    duration: "30 horas",
    status: "Concluído",
    certificate: "#",
    skills: ["Figma", "UI/UX", "Design"],
    description: "Princípios de design de interface e experiência do usuário aplicados a produtos digitais."
  },
  {
    title: "DevOps e Cloud Computing",
    institution: "AWS Training",
    date: "2024",
    duration: "80 horas",
    status: "Em andamento",
    certificate: null,
    skills: ["Docker", "AWS", "CI/CD", "Linux"],
    description: "Práticas DevOps e infraestrutura em nuvem com Amazon Web Services."
  },
  {
    title: "PostgreSQL e Banco de Dados",
    institution: "Udemy",
    date: "2023",
    duration: "45 horas",
    status: "Concluído",
    certificate: "#",
    skills: ["PostgreSQL", "SQL", "Database Design"],
    description: "Modelagem, otimização e administração de bancos de dados relacionais."
  }
];

export function Courses() {
  return (
    <section id="cursos" className="py-20 bg-gradient-to-br from-slate-50 to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">Formação e Cursos</h2>
          <p className="text-xl text-muted-foreground">
            Meu desenvolvimento profissional contínuo
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={course.status === "Concluído" ? "default" : "secondary"}>
                    {course.status}
                  </Badge>
                  {course.certificate && (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Award className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.institution}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4">
                  {course.description}
                </p>
                <div className="space-y-3 mt-auto">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {course.date} • {course.duration}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  {course.certificate && (
                    <Button variant="outline" className="w-full" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ver Certificado
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
