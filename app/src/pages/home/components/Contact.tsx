import { useState, useEffect, useRef } from 'react';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    mensaje: '',
    sector: '',
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      const form = e.target as HTMLFormElement;
      const formDataObj = new FormData(form);
      const response = await fetch('https://readdy.ai/api/form/d7o405ekigrt6ihdr5ig', {
        method: 'POST',
        body: new URLSearchParams(formDataObj as any),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({ nombre: '', empresa: '', email: '', telefono: '', mensaje: '', sector: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <section id="contacto" ref={sectionRef} className="bg-industrial-black py-16 md:py-24">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
          {/* Left - CTA */}
          <div
            className={`relative bg-industrial-yellow rounded-2xl lg:rounded-r-none overflow-hidden p-8 md:p-12 lg:p-16 flex flex-col justify-end min-h-[400px] lg:min-h-[600px] transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <img
              src="https://readdy.ai/api/search-image?query=Professional%20mechanic%20inspecting%20heavy%20truck%20engine%20with%20flashlight%20in%20industrial%20workshop%2C%20close%20up%20detail%20shot%2C%20warm%20yellow%20workshop%20lighting%2C%20professional%20documentary%20photography%2C%20dark%20background%20with%20dramatic%20light%20rays%2C%20high%20detail%20mechanical%20components%2C%204k%20quality&width=800&height=900&seq=4&orientation=portrait"
              alt="Técnico inspeccionando motor de camión"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-industrial-yellow via-industrial-yellow/80 to-industrial-yellow/40" />
            <div className="relative z-10">
              <p className="text-industrial-black/70 text-xs font-bold tracking-widest uppercase mb-3">Contacto Directo</p>
              <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-industrial-black leading-none">
                MANTÉN
                <br />
                TU FLOTA
                <br />
                EN MOVIMIENTO
              </h2>
            </div>
          </div>

          {/* Right - Form */}
          <div
            className={`bg-white rounded-2xl lg:rounded-l-none p-8 md:p-12 lg:p-16 transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-industrial-black mb-2">
              ¿Listo para optimizar tu operación?
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-8">
              Completa el formulario y nuestro equipo técnico se pondrá en contacto contigo en menos de 2 horas.
            </p>

            {formStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-check-line text-green-600 text-2xl" />
                </div>
                <h4 className="text-green-800 font-bold text-lg mb-2">¡Mensaje enviado!</h4>
                <p className="text-green-700 text-sm">Gracias por contactarnos. Nuestro equipo se comunicará contigo pronto.</p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="mt-4 text-green-700 font-semibold text-sm hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-readdy-form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-industrial-black text-sm font-semibold mb-1.5">Nombre completo *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full border-b-2 border-gray-200 focus:border-industrial-yellow px-0 py-2.5 text-industrial-black text-sm outline-none transition-colors bg-transparent"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-industrial-black text-sm font-semibold mb-1.5">Empresa</label>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="w-full border-b-2 border-gray-200 focus:border-industrial-yellow px-0 py-2.5 text-industrial-black text-sm outline-none transition-colors bg-transparent"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-industrial-black text-sm font-semibold mb-1.5">Correo electrónico *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border-b-2 border-gray-200 focus:border-industrial-yellow px-0 py-2.5 text-industrial-black text-sm outline-none transition-colors bg-transparent"
                      placeholder="correo@empresa.com"
                    />
                  </div>
                  <div>
                    <label className="block text-industrial-black text-sm font-semibold mb-1.5">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full border-b-2 border-gray-200 focus:border-industrial-yellow px-0 py-2.5 text-industrial-black text-sm outline-none transition-colors bg-transparent"
                      placeholder="+57 300 000 0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-industrial-black text-sm font-semibold mb-1.5">Sector industrial</label>
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    className="w-full border-b-2 border-gray-200 focus:border-industrial-yellow px-0 py-2.5 text-industrial-black text-sm outline-none transition-colors bg-transparent"
                  >
                    <option value="">Selecciona tu sector</option>
                    <option value="transporte">Transporte de Carga</option>
                    <option value="construccion">Construcción</option>
                    <option value="mineria">Minería</option>
                    <option value="agricultura">Agricultura</option>
                    <option value="industria">Industria General</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-industrial-black text-sm font-semibold mb-1.5">Mensaje *</label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    maxLength={500}
                    rows={4}
                    className="w-full border-b-2 border-gray-200 focus:border-industrial-yellow px-0 py-2.5 text-industrial-black text-sm outline-none transition-colors bg-transparent resize-none"
                    placeholder="Cuéntanos qué necesitas..."
                  />
                  <p className="text-gray-400 text-xs mt-1 text-right">{formData.mensaje.length}/500</p>
                </div>

                {formStatus === 'error' && (
                  <p className="text-red-600 text-sm">Hubo un error al enviar. Por favor intenta de nuevo.</p>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-industrial-black text-white py-4 rounded-full font-bold text-base hover:bg-industrial-charcoal transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      SOLICITAR COTIZACIÓN
                      <i className="ri-arrow-right-line text-industrial-yellow" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { icon: 'ri-map-pin-line', label: 'Dirección', value: 'Cra 19 #15-39, Av Las Américas. Pasto - Nariño, Colombia' },
            { icon: 'ri-phone-line', label: 'Teléfono', value: '+57 315 478 1702' },
            { icon: 'ri-mail-line', label: 'Correo', value: 'racoresymanguerasdenar @hotmail.com' },
            { icon: 'ri-time-line', label: 'Horario', value: 'Lun - Vie: 7:45 AM - 6:00 PM. Sab: 8:00 AM- 5:00 PM.' },
          ].map((item) => (
            <div key={item.label} className="bg-industrial-charcoal/50 rounded-xl p-5 flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-industrial-yellow/10 rounded-lg flex-shrink-0">
                <i className={`${item.icon} text-industrial-yellow text-lg`} />
              </div>
              <div>
                <p className="text-industrial-lightgray text-xs uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-white text-sm font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="mt-8 rounded-2xl overflow-hidden h-64 md:h-80">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8166!2d-77.2816!3d1.2136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2ed5c5e3b5b5b5%3A0x5b5b5b5b5b5b5b5b!2sPasto%2C%20Nari%C3%B1o%2C%20Colombia!5e0!3m2!1ses!2sco!4v1600000000000!5m2!1ses!2sco"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Racores y Mangueras de Nariño"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
}