import { useEffect, useRef, useState } from 'react';
import { sectors } from '@/mocks/homeData';

export default function Sectors() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="clientes" ref={sectionRef} className="bg-industrial-dark py-16 md:py-24">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content Side */}
          <div
            className={`order-2 lg:order-1 transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="inline-block bg-industrial-yellow/10 px-4 py-1.5 rounded-full mb-4">
              <span className="text-industrial-yellow text-xs font-bold tracking-widest uppercase">Sectores que Atendemos</span>
            </div>
            <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
              SOLUCIONES PARA
              <br />
              CADA <span className="text-industrial-yellow">INDUSTRIA</span>
            </h2>
            <p className="text-industrial-lightgray text-base leading-relaxed mb-8">
              Nuestros productos y servicios están diseñados para satisfacer las demandas específicas de cada sector industrial. Entendemos que cada industria tiene necesidades únicas de mantenimiento y operación.
            </p>

            {/* Sector List */}
            <div className="space-y-4">
              {sectors.map((sector, index) => (
                <div
                  key={sector.id}
                  className={`flex items-start gap-4 p-4 rounded-xl bg-industrial-charcoal/50 hover:bg-industrial-charcoal transition-all duration-300 group ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-industrial-yellow/10 rounded-lg flex-shrink-0 group-hover:bg-industrial-yellow/20 transition-colors">
                    <i className={`${sector.icon} text-industrial-yellow text-xl`} />
                  </div>
                  <div>
                    <h4 className="text-white font-heading font-bold text-base mb-1">{sector.name}</h4>
                    <p className="text-industrial-lightgray text-sm leading-relaxed">{sector.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div
            className={`order-1 lg:order-2 relative transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://static.readdy.ai/image/fd02d3b9d4ed169a20721d0e75352c2a/05c5181cc6d82b576e235043524cef13.png"
                alt="Maquinaria pesada en sitio de construcción y minería"
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-industrial-yellow/10 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-black/50 via-transparent to-transparent" />
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-industrial-yellow/30 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}   