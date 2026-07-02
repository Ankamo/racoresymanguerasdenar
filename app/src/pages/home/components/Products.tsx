import { useState, useEffect, useRef } from 'react';
import { products } from '@/mocks/homeData';
import HosesSection from './HosesSection';

const categories = ['Todos', 'Mangueras', 'Racores', 'Acoples', 'Adaptadores', 'Aire', 'Tubos', 'Abrazaderas', 'Válvulas'];
const productCategories = ['Mangueras', 'Racores', 'Acoples', 'Adaptadores', 'Aire', 'Tubos', 'Abrazaderas', 'Válvulas'];

const categoryIcons: Record<string, string> = {
  Mangueras: 'ri-loop-right-line',
  Racores: 'ri-settings-3-line',
  Acoples: 'ri-links-line',
  Adaptadores: 'ri-swap-line',
  Aire: 'ri-windy-line',
  Tubos: 'ri-drop-line',
  Abrazaderas: 'ri-lock-line',
  Válvulas: 'ri-toggle-line',
  default: 'ri-box-3-line',
};

const categoryDescriptions: Record<string, string> = {
  Mangueras: 'Hidráulicas, neumáticas y especiales',
  Racores: 'Bronce alta presión y temperatura',
  Acoples: 'Macho, hembra, flanche, rápidos',
  Adaptadores: 'YIC, NPT, BSP, ORS, Tee, Tapones',
  Aire: 'VIGIA y Prestolook para frenos de aire',
  Tubos: 'Acero, cobre y aluminio industrial',
  Abrazaderas: 'Para mangueras, tubos y conexiones',
  Válvulas: 'Bola, antirretorno y control',
};

const INITIAL_VISIBLE_CATEGORIES = 4;

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [showAllCategories, setShowAllCategories] = useState(false);
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

  const filtered = activeCategory === 'Todos'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const visibleCategories = showAllCategories
    ? productCategories
    : productCategories.slice(0, INITIAL_VISIBLE_CATEGORIES);

  return (
    <section id="productos" ref={sectionRef} className="bg-industrial-dark py-16 md:py-24">
      <div className="w-full px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-10 md:mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block bg-industrial-yellow/10 px-4 py-1.5 rounded-full mb-4">
            <span className="text-industrial-yellow text-xs font-bold tracking-widest uppercase">Catálogo</span>
          </div>
          <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-white">
            PRODUCTOS <span className="text-industrial-yellow">CERTIFICADOS</span>
          </h2>
          <p className="text-industrial-lightgray mt-4 max-w-2xl mx-auto text-base">
            Distribuimos productos de las marcas más reconocidas del sector, garantizando calidad, durabilidad y rendimiento óptimo para su maquinaria.
          </p>
        </div>

        {/* Category Tabs */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 md:mb-14 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-industrial-yellow text-industrial-black'
                  : 'bg-industrial-charcoal text-industrial-lightgray hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vista Todos — una tarjeta representativa por categoría */}
        {activeCategory === 'Todos' && (
          <>
            <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {visibleCategories.map((cat, index) => {
                const iconClass = categoryIcons[cat] ?? categoryIcons.default;
                const rep = products.find((p) => p.category === cat);
                void iconClass;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className="group bg-industrial-charcoal rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer text-left w-full"
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    {/* Image area */}
                    <div className="relative h-36 md:h-44 w-full bg-industrial-dark/60 overflow-hidden">
                      {rep?.image ? (
                        <>
                          <img
                            src={rep.image}
                            alt={cat}
                            className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark/80 via-industrial-dark/20 to-transparent" />
                          <div className="absolute inset-0 bg-gradient-to-br from-industrial-yellow/10 via-transparent to-transparent group-hover:from-industrial-yellow/20 transition-all duration-500" />
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #f5c518 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                          <div className="absolute inset-0 bg-gradient-to-br from-industrial-yellow/5 via-transparent to-transparent group-hover:from-industrial-yellow/15 transition-all duration-500" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl bg-industrial-yellow/10 border border-industrial-yellow/20 group-hover:bg-industrial-yellow/25 group-hover:border-industrial-yellow/50 transition-all duration-300">
                              <i className={`${iconClass} text-industrial-yellow text-3xl md:text-4xl`} />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {/* Content */}
                    <div className="p-4 border-t border-industrial-gray/20">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white font-heading font-bold text-sm md:text-base group-hover:text-industrial-yellow transition-colors duration-200 whitespace-nowrap">
                          {cat}
                        </h3>
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-industrial-yellow/10 group-hover:bg-industrial-yellow transition-all duration-300 shrink-0 ml-2">
                          <i className="ri-arrow-right-line text-industrial-yellow group-hover:text-industrial-black text-xs" />
                        </div>
                      </div>
                      <p className="text-industrial-lightgray/70 text-xs leading-relaxed line-clamp-1">
                        {categoryDescriptions[cat]}
                      </p>
                      {rep && (
                        <p className="text-industrial-yellow/60 text-xs font-mono mt-2 truncate">
                          {rep.specs.split('|')[0].trim()}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Expand / Collapse Button */}
            <div className="flex justify-center mt-8">
              <button
                type="button"
                onClick={() => setShowAllCategories((prev) => !prev)}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-industrial-charcoal text-industrial-lightgray font-semibold text-sm hover:bg-industrial-gray hover:text-white transition-all duration-300 cursor-pointer"
              >
                <span className="whitespace-nowrap">
                  {showAllCategories ? 'Mostrar menos categorías' : 'Ver más categorías'}
                </span>
                <div className={`w-5 h-5 flex items-center justify-center rounded-full bg-industrial-yellow/10 group-hover:bg-industrial-yellow transition-all duration-300 ${showAllCategories ? 'rotate-180' : ''}`}>
                  <i className="ri-arrow-down-line text-industrial-yellow group-hover:text-industrial-black text-xs transition-transform duration-300" />
                </div>
              </button>
            </div>
          </>
        )}

        {/* Hoses Section — layout especial */}
        {activeCategory === 'Mangueras' && (
          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <HosesSection />
          </div>
        )}

        {/* Product Grid — otras categorías */}
        {activeCategory !== 'Mangueras' && activeCategory !== 'Todos' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6" data-product-shop>
          {filtered.map((product, index) => {
            const iconClass = categoryIcons[product.category] ?? categoryIcons.default;
            return (
              <div
                key={product.id}
                className={`group bg-industrial-charcoal rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${150 + index * 80}ms` }}
              >
                {/* Image area */}
                <div className="relative h-44 md:h-48 w-full bg-industrial-dark/60 overflow-hidden">
                  {product.image ? (
                    <>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark/80 via-industrial-dark/20 to-transparent" />
                      <span className="absolute top-3 left-3 z-10 text-industrial-yellow/80 text-xs font-bold tracking-widest uppercase bg-industrial-dark/60 px-2 py-0.5 rounded-full">
                        {product.category}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #f5c518 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                      <div className="absolute inset-0 bg-gradient-to-br from-industrial-yellow/5 via-transparent to-transparent group-hover:from-industrial-yellow/10 transition-all duration-500" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-industrial-yellow/10 border border-industrial-yellow/20 group-hover:bg-industrial-yellow/20 group-hover:border-industrial-yellow/40 transition-all duration-300">
                          <i className={`${iconClass} text-industrial-yellow text-4xl`} />
                        </div>
                        <span className="text-industrial-yellow/70 text-xs font-bold tracking-widest uppercase">
                          {product.category}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                {/* Content */}
                <div className="p-5 border-t border-industrial-gray/20">
                  <h3 className="text-white font-heading font-bold text-sm md:text-base line-clamp-2 group-hover:text-industrial-yellow transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="text-industrial-lightgray text-xs mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-industrial-yellow/80 text-xs font-mono truncate pr-2">{product.specs.split('|')[0].trim()}</span>
                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-industrial-yellow/10 group-hover:bg-industrial-yellow group-hover:text-industrial-black transition-all duration-300 shrink-0">
                      <i className="ri-arrow-right-line text-industrial-yellow group-hover:text-industrial-black text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
}