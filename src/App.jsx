import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";
import { Footer } from "./layout/Footer";
import { PortfolioChatbot } from "@/components/PortfolioChatbot";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <PortfolioChatbot />
    </div>
  );
}

export default App;
