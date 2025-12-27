import About from "./components/About";
import Projects from "./components/Projects";
import Tools from "./components/Tools";
import Contact from "./components/Contact";
import { LampDemo } from "./components/lamp";

export default function Home() {
  return (
    <>
      <LampDemo />
      <main className="container mx-auto px-4">
        <About />
        <Projects />
        <Tools />
        <Contact />
      </main>
    </>
  );
}
