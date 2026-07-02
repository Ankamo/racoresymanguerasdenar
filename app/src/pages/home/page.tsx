import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MissionVision from './components/MissionVision';
import Products from './components/Products';
import Services from './components/Services';
import Sectors from './components/Sectors';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-industrial-black font-body">
      <Navbar />
      <main>
        <Hero />
        <About />
        <MissionVision />
        <Products />
        <Services />
        <Sectors />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}