import { useState, useEffect, useRef } from 'react';
import { testimonials } from '@/mocks/homeData';

export default function Testimonials() {
  const [active, setActive] = useState(0);
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

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[active];

  return (
    <section ref={sectionRef} className="bg-industrial-charcoal py-16 md:py-24">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className={`text-center mb-10 md:mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block bg-industrial-yellow/10 px-4 py-1.5 rounded-full mb-4">
            <span className="text-industrial-yellow text-xs font-bold tracking-widest uppercase">Testimonios</span>
          </div>
          <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-white">
            LO QUE DICEN <span className="text-industrial-yellow">NUESTROS CLIENTES</span>
          </h2>
        </div>

        <div className={`max-w-5xl mx-auto transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-industrial-dark rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* Image */}
              <div className="md:col-span-2 relative">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-industrial-dark/80 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark/80 to-transparent md:hidden" />
              </div>

              {/* Content */}
              <div className="md:col-span-3 p-6 md:p-10 lg:p-12 flex flex-col justify-center">
                <p className="text-industrial-yellow text-xs font-bold tracking-wider uppercase mb-4">
                  (TESTIMONIO VERIFICADO)
                </p>
                <h3 className="font-heading font-bold text-xl md:text-2xl text-white mb-2">
                  CONFIABILIDAD COMPROBADA
                </h3>
                <p className="text-industrial-lightgray text-sm mb-6">en cada entrega</p>

                <blockquote className="text-industrial-lightgray text-base md:text-lg leading-relaxed italic mb-8">
                  "{current.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-industrial-yellow/20 flex items-center justify-center">
                    <i className="ri-user-line text-industrial-yellow text-xl" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">— {current.name}</p>
                    <p className="text-industrial-lightgray text-xs">
                      {current.position}, {current.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-industrial-gray text-industrial-lightgray hover:border-industrial-yellow hover:text-industrial-yellow flex items-center justify-center transition-colors duration-200"
              aria-label="Testimonio anterior"
            >
              <i className="ri-arrow-left-line text-lg" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    i === active ? 'bg-industrial-yellow w-8' : 'bg-industrial-gray'
                  }`}
                  aria-label={`Ver testimonio ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-industrial-yellow text-industrial-black hover:bg-industrial-yellowhover flex items-center justify-center transition-colors duration-200"
              aria-label="Siguiente testimonio"
            >
              <i className="ri-arrow-right-line text-lg" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}