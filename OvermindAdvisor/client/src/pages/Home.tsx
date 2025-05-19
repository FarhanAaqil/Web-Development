import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>John Doe | Full-Stack Developer</title>
        <meta name="description" content="John Doe is a full-stack developer specializing in building exceptional digital experiences with modern web technologies." />
        <meta name="keywords" content="web developer, full stack developer, React developer, portfolio, javascript, web design" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://johndoe.dev/" />
        <meta property="og:title" content="John Doe | Full-Stack Developer" />
        <meta property="og:description" content="Full-stack developer specializing in building exceptional digital experiences with modern web technologies." />
        <meta property="og:image" content="https://johndoe.dev/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://johndoe.dev/" />
        <meta property="twitter:title" content="John Doe | Full-Stack Developer" />
        <meta property="twitter:description" content="Full-stack developer specializing in building exceptional digital experiences with modern web technologies." />
        <meta property="twitter:image" content="https://johndoe.dev/og-image.jpg" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
