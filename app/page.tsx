import Hero from "@/components/sections/Hero";
import WhoAmI from "@/components/sections/WhoAmI";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Achievements from "@/components/sections/Achievements";
import Creator from "@/components/sections/Creator";
import { Resume, Contact } from "@/components/sections/ResumeContact";
import Footer from "@/components/layout/Footer";
import KeyboardEgg from "@/components/ui/KeyboardEgg";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoAmI />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Creator />
      <Resume />
      <Contact />
      <Footer />
      <KeyboardEgg />
    </>
  );
}
