import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Productos', href: '#productos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-industrial-black/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')} className="flex items-center gap-3">
            <img
              src="https://public.readdy.ai/ai/img_res/7d82202e-0395-4cde-acfc-eabaa1856247.png"
              alt="Racores y Mangueras de Nariño"
              className="h-14 w-14 md:h-18 md:w-18 object-contain"
            />
            <div className="hidden sm:block">
              <p className="text-white font-heading font-bold text-lg md:text-2xl leading-tight">
                Racores y Mangueras
              </p>
              <p className="text-industrial-yellow text-sm md:text-lg font-heading font-semibold tracking-widest">
                DE NARIÑO
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-industrial-lightgray hover:text-industrial-yellow px-4 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={(e) => handleNavClick(e, '#contacto')}
              className="ml-3 bg-industrial-yellow text-industrial-black px-5 py-2.5 rounded-md text-sm font-bold hover:bg-industrial-yellowhover transition-colors duration-200 whitespace-nowrap"
            >
              Cotizar Ahora
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
            aria-label="Toggle menu"
          >
            <i className={`ri-${mobileOpen ? 'close' : 'menu'}-line text-2xl`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-industrial-black/98 backdrop-blur-md border-t border-industrial-charcoal">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-industrial-lightgray hover:text-industrial-yellow px-3 py-3 text-base font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={(e) => handleNavClick(e, '#contacto')}
              className="block mt-3 bg-industrial-yellow text-industrial-black px-5 py-3 rounded-md text-center font-bold"
            >
              Cotizar Ahora
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}