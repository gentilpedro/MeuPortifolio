import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Download, Mail } from "lucide-react";

export function Hero() {
  return (
    <section id="sobre" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <p className="text-primary">Olá, eu sou</p>
              <h1 className="text-5xl md:text-6xl">
                Desenvolvedor Full Stack
              </h1>
              <p className="text-xl text-muted-foreground">
                Transformando ideias em soluções digitais inovadoras
              </p>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Desenvolvedor apaixonado por criar experiências web modernas e funcionais. 
              Especializado em React, TypeScript, Node.js e design de interfaces intuitivas.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">
                <Mail className="mr-2 h-5 w-5" />
                Entre em Contato
              </Button>
              <Button variant="outline" size="lg">
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Avatar className="h-64 w-64 md:h-80 md:w-80 border-4 border-white shadow-xl">
              <AvatarImage src="https://images.unsplash.com/photo-1614790871804-fe037bdc1214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2MjAyMDA2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
              <AvatarFallback>DEV</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </section>
  );
}
