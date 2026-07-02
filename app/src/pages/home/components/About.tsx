import { useEffect, useRef, useState } from 'react';

export default function About() {
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="nosotros" ref={sectionRef} className="bg-industrial-dark py-16 md:py-24">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://static.readdy.ai/image/fd02d3b9d4ed169a20721d0e75352c2a/198a439a9319fad13a79dedf448c1524.png"
                alt="Técnico especializado trabajando en motor de camión pesado"
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-black/60 via-transparent to-transparent" />
              {/* Experience Badge */}
              <div className="absolute top-4 left-4 bg-industrial-yellow/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-industrial-black font-heading font-bold text-sm">15+ años de experiencia</p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-industrial-yellow/30 rounded-2xl -z-10" />
          </div>

          {/* Content Side */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="inline-block bg-industrial-yellow/10 px-4 py-1.5 rounded-full mb-4">
              <span className="text-industrial-yellow text-xs font-bold tracking-widest uppercase">Nuestra Historia</span>
            </div>

            <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
              EXPERTOS EN
              <br />
              <span className="text-industrial-yellow">MANTENIMIENTO</span>
            </h2>

            <div className="space-y-4 text-industrial-lightgray leading-relaxed">
              <p>
                Fundada el 17 de junio de 2010, <strong className="text-white">Racores y Mangueras de Nariño</strong> es una empresa especializada en soluciones técnicas para sistemas hidráulicos, neumáticos e industriales. Con más de 15 años de experiencia, nos hemos consolidado como un proveedor confiable que combina conocimiento técnico, atención personalizada y productos de alto desempeño.
              </p>
              <p>
                Nuestro compromiso con la calidad, la mejora continua y el desarrollo regional nos permite ofrecer soluciones adaptadas a cada necesidad. Más que vender componentes, construimos relaciones duraderas basadas en confianza, eficiencia y resultados.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: 'ri-shield-check-line', title: 'Calidad Garantizada', desc: 'Productos certificados internacionalmente' },
                { icon: 'ri-time-line', title: 'Entrega Oportuna', desc: 'Logística eficiente a nivel nacional' },
                { icon: 'ri-customer-service-2-line', title: 'Asesoría Técnica', desc: 'Equipo de ingenieros especializados' },
                { icon: 'ri-hand-heart-line', title: 'Servicio Personalizado', desc: 'Soluciones a la medida de cada cliente' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <i className={`${item.icon} text-industrial-yellow text-xl`} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-industrial-lightgray text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}