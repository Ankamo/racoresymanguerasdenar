import { certifications, brandPartners } from '@/mocks/homeData';

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-industrial-black border-t border-industrial-charcoal">
      {/* Main Footer */}
      <div className="w-full px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://static.readdy.ai/image/fd02d3b9d4ed169a20721d0e75352c2a/7cb7fd20c2ef580fe7b5b54e5b570d07.jpeg"
                alt="Racores y Mangueras de Nariño"
                className="h-12 w-12 object-contain rounded-md"
              />
              <div>
                <p className="text-white font-heading font-bold text-sm leading-tight">Racores y Mangueras</p>
                <p className="text-industrial-yellow text-xs font-heading font-semibold tracking-wider">DE NARIÑO</p>
              </div>
            </div>
            <p className="text-industrial-lightgray text-sm leading-relaxed mb-4">
              Soluciones confiables para el mantenimiento de vehículos pesados y maquinaria industrial desde 2010.
            </p>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert.name}
                  className="bg-industrial-charcoal text-industrial-lightgray text-xs px-2.5 py-1 rounded-md"
                  title={cert.description}
                >
                  {cert.name}
                </span>
              ))}
            </div>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-4">Productos</h4>
            <ul className="space-y-2.5">
              {['Repuestos Mecánicos', 'Herramientas Especializadas', 'Accesorios'].map((item) => (
                <li key={item}>
                  <a
                    href="#productos"
                    onClick={(e) => handleNavClick(e, '#productos')}
                    className="text-industrial-lightgray text-sm hover:text-industrial-yellow transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-4">Empresa</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Quiénes Somos', href: '#nosotros' },
                { label: 'Servicios', href: '#servicios' },
                { label: 'Clientes', href: '#clientes' },
                { label: 'Contacto', href: '#contacto' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-industrial-lightgray text-sm hover:text-industrial-yellow transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-4">Síguenos</h4>
            <div className="flex gap-3 mb-6">
              {[
                { icon: 'ri-facebook-fill', label: 'Facebook' },
                { icon: 'ri-instagram-line', label: 'Instagram' },
                { icon: 'ri-linkedin-fill', label: 'LinkedIn' },
                { icon: 'ri-whatsapp-line', label: 'WhatsApp' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 flex items-center justify-center bg-industrial-charcoal rounded-lg text-industrial-lightgray hover:bg-industrial-yellow hover:text-industrial-black transition-all duration-200"
                  aria-label={social.label}
                  rel="nofollow"
                >
                  <i className={`${social.icon} text-lg`} />
                </a>
              ))}
            </div>
            <p className="text-industrial-lightgray text-xs mb-2">
              <i className="ri-phone-line mr-1.5" />
              +57 317 478 1702
            </p>
            <p className="text-industrial-lightgray text-xs">
              <i className="ri-mail-line mr-1.5" />
              <span className="text-white text-sm bg-industrial-charcoal/50 px-1 rounded">racoresymanguerasdenar@hotmail.com</span>
            </p>
          </div>
        </div>

        {/* Brand Partners */}
        <div className="mt-10 pt-8 border-t border-industrial-charcoal">
          <p className="text-industrial-lightgray text-xs uppercase tracking-wider text-center mb-4">Marcas Aliadas</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {brandPartners.map((brand) => (
              <span
                key={brand}
                className="text-industrial-gray font-heading font-bold text-sm md:text-base tracking-wider"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-industrial-charcoal">
        <div className="w-full px-4 md:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-industrial-gray text-xs text-center sm:text-left">
            © 2024 Racores y Mangueras de Nariño. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="text-industrial-gray text-xs hover:text-industrial-yellow transition-colors" rel="nofollow">
              Política de Privacidad
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-industrial-gray text-xs hover:text-industrial-yellow transition-colors" rel="nofollow">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>

      {/* Big Brand Text */}
      <div className="overflow-hidden py-6 md:py-10 border-t border-industrial-charcoal">
        <p className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-industrial-beige/10 text-center tracking-tighter whitespace-nowrap select-none">
          RACORES Y John DeereGUERAS
        </p>
      </div>
    </footer>
  );
}