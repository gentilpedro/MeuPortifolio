import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl mb-4">
              <span className="text-primary">{"<"}</span>
              Portfólio
              <span className="text-primary">{" />"}</span>
            </h3>
            <p className="text-slate-400">
              Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e
              compartilhar conhecimento.
            </p>
          </div>
          <div>
            <h3 className="text-xl mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#competencias" className="hover:text-white transition-colors">
                  Competências
                </a>
              </li>
              <li>
                <a href="#cursos" className="hover:text-white transition-colors">
                  Cursos
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#comunidade" className="hover:text-white transition-colors">
                  Comunidade
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl mb-4">Conecte-se</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="bg-transparent border-slate-700 hover:bg-slate-800">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="bg-transparent border-slate-700 hover:bg-slate-800">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="bg-transparent border-slate-700 hover:bg-slate-800">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
          <p className="flex items-center justify-center gap-2">
            Feito com <Heart className="h-4 w-4 text-red-500 fill-current" /> em 2024
          </p>
        </div>
      </div>
    </footer>
  );
}
