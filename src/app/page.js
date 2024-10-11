import Hero from "@/components/Hero";
import "./home.css";
import Services from "@/components/Servics";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main id="main" className="flex flex-col items-center w-full z-0">
      <Hero />
      <Services />
      <Contact />
    </main>
  );
}
