import About from "./components/About";
import Projects from "./components/Projects";
import Tools from "./components/Tools";
import Contact from "./components/Contact";
import { LampDemo } from "./components/lamp";
import AiAudit from "./components/AiAudit";

export default function Home() {
  return (
    <>
      <LampDemo />
      <main className="container mx-auto px-4">
        <AiAudit />
        <About />
        <Projects />
        <Tools />
        <Contact />
      </main>
    </>
  );
}
