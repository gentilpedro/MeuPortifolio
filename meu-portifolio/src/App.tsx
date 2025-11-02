import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Courses } from "./components/Courses";
import { Blog } from "./components/Blog";
import { Community } from "./components/Community";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Skills />
        <Courses />
        <Blog />
        <Community />
      </main>
      <Footer />
    </div>
  );
}
