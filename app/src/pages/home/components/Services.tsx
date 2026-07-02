import { useEffect, useRef, useState } from 'react';
import { services } from '@/mocks/homeData';

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicios" ref={sectionRef} className="bg-industrial-black py-16 md:py-24">
      <div className="w-full px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 mb-12 md:mb-16">
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block bg-industrial-yellow/10 px-4 py-1.5 rounded-full mb-4">
              <span className="text-industrial-yellow text-xs font-bold tracking-widest uppercase">Servicios</span>
            </div>
            <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              SERVICIOS
              <br />
              <span className="text-industrial-yellow">ESPECIALIZADOS</span>
            </h2>
          </div>
          <div className={`lg:col-span-2 flex items-end transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-industrial-lightgray text-base md:text-lg leading-relaxed">
              Más allá de la venta de productos, ofrecemos un portafolio integral de servicios diseñados para optimizar el rendimiento de su flota y reducir los costos operativos. Nuestro equipo técnico está a su disposición para brindar soluciones personalizadas.
            </p>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`bg-industrial-charcoal rounded-2xl p-6 md:p-8 lg:p-10 group hover:bg-industrial-gray/20 transition-all duration-300 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="w-14 h-14 flex items-center justify-center bg-industrial-yellow/10 rounded-xl mb-6 group-hover:bg-industrial-yellow/20 transition-colors">
                <i className={`${service.icon} text-industrial-yellow text-2xl`} />
              </div>
              <h3 className="text-white font-heading font-bold text-xl md:text-2xl mb-4">
                {service.title}
              </h3>
              <p className="text-industrial-lightgray text-sm md:text-base leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-industrial-lightgray text-sm">
                    <div className="w-1.5 h-1.5 bg-industrial-yellow rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-industrial-yellow font-semibold text-sm hover:gap-3 transition-all duration-200"
              >
                Consultar
                <i className="ri-arrow-right-line" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}