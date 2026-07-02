import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const img = el.querySelector('.hero-bg') as HTMLElement;
      if (img) {
        img.style.transform = `translateY(${scrollY * 0.4}px) scale(1.1)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 hero-bg will-change-transform">
        <img
          src="https://static.readdy.ai/image/fd02d3b9d4ed169a20721d0e75352c2a/c10a8b25eb0c0023edb0c0a29dc59247.png"
          alt="Maquinaria pesada amarilla en patio industrial"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-black/80 via-industrial-black/60 to-industrial-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-industrial-black via-transparent to-industrial-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 pt-24 pb-8">
        <div className="max-w-4xl">
          {/* Trust Badge */}
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="flex -space-x-2">
              {['Volvo', 'CAT', 'MB'].map((brand, i) => (
                <div
                  key={brand}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-industrial-charcoal border-2 border-industrial-yellow flex items-center justify-center text-xs font-bold text-white"
                  style={{ zIndex: 3 - i }}
                >
                  {brand}
                </div>
              ))}
            </div>
            <p className="text-industrial-lightgray text-sm md:text-base">
              <span className="text-industrial-yellow font-bold">+50</span> empresas confían en nosotros
            </p>
          </div>

          {/* Main Title */}
          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
            SOLUCIONES TÉCNICAS
            <br />
            <span className="text-industrial-yellow">DE RESPUESTA INMEDIATA</span>
          </h1>

          {/* Description */}
          <p className="text-industrial-lightgray text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed mb-8">
            Repuestos certificados y asesoría técnica especializada para mantener tu flota operativa 24/7. Más de 15 años de experiencia en el sector &nbsp;industrial y de repuestos para el mantenimiento de vehículos de tipo liviano, medio y pesado.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleScrollTo('#contacto')}
              className="bg-industrial-yellow text-industrial-black px-8 py-4 rounded-md font-bold text-base hover:bg-industrial-yellowhover transition-all duration-200 flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              COTIZAR AHORA
              <i className="ri-arrow-right-up-line text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <button
              onClick={() => handleScrollTo('#productos')}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-md font-semibold text-base hover:border-industrial-yellow hover:text-industrial-yellow transition-all duration-200 whitespace-nowrap"
            >
              Ver Productos
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Stats - Moved lower */}
      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 mt-auto pb-12 md:pb-16 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { value: '16+', label: 'Años de Experiencia' },
            { value: '500+', label: 'Clientes Satisfechos' },
            { value: '1.000+', label: 'Productos en Stock' },
            { value: '98%', label: 'Tasa de Entrega' },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="text-industrial-yellow font-heading font-black text-2xl md:text-3xl lg:text-4xl">
                {stat.value}
              </p>
              <p className="text-industrial-lightgray text-xs md:text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}