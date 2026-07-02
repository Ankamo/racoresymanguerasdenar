import { useEffect, useRef, useState } from 'react';

export default function MissionVision() {
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
    <section ref={sectionRef} className="bg-industrial-black py-16 md:py-24">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
          {/* Mission */}
          <div
            className={`bg-industrial-charcoal rounded-2xl p-8 md:p-12 lg:rounded-r-none transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-14 h-14 flex items-center justify-center bg-industrial-yellow/10 rounded-xl mb-6">
              <i className="ri-focus-3-line text-industrial-yellow text-2xl" />
            </div>
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4">Nuestra Misión</h3>
            <p className="text-industrial-lightgray leading-relaxed text-base">
              Ser el aliado estratégico de las empresas que operan con vehículos pesados y maquinaria industrial, proporcionando productos de la más alta calidad, asesoría técnica especializada y un servicio logístico que garantice la continuidad operativa de sus flotas. Nos comprometemos a reducir los tiempos de inactividad y optimizar los costos de mantenimiento de nuestros clientes.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Excelencia', 'Compromiso', 'Innovación'].map((tag) => (
                <span key={tag} className="bg-industrial-dark text-industrial-yellow px-3 py-1 rounded-full text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Vision */}
          <div
            className={`bg-industrial-yellow rounded-2xl p-8 md:p-12 lg:rounded-l-none transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-14 h-14 flex items-center justify-center bg-industrial-black/10 rounded-xl mb-6">
              <i className="ri-eye-line text-industrial-black text-2xl" />
            </div>
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-industrial-black mb-4">Nuestra Visión</h3>
            <p className="text-industrial-black/80 leading-relaxed text-base">
              Para 2030, posicionarnos como el proveedor líder de soluciones de mantenimiento industrial en Nariño, reconocidos por la calidad insuperable de nuestros productos, la excelencia en el servicio al cliente y nuestra capacidad de innovación. Seremos la primera opción de las empresas de transporte, construcción, minería e industria que buscan maximizar la vida útil de su equipamiento pesado.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Liderazgo', 'Sostenibilidad', 'Crecimiento'].map((tag) => (
                <span key={tag} className="bg-industrial-black/10 text-industrial-black px-3 py-1 rounded-full text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}