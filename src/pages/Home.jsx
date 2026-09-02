import Hero from "../components/Hero";
import Services from "../components/Services";
import Projects from "../components/Projects";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <About />
      <Testimonials />
      <Contact />
    </>
  );
}