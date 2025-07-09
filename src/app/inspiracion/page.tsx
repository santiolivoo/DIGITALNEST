'use client'

export default function InspiracionPage() {
  return (
    <div className="min-h-screen p-6 space-y-16 text-white">
      {/* Sección 1 */}
      <section className="space-y-6 text-center">
        <h1 className="text-3xl font-semibold text-[#FFD944]">
          Inspirate con lo que está en tendencia
        </h1>
        <p className="text-gray-300">Tendencias del momento en TikTok y redes</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {['Producto 1', 'Producto 2', 'Producto 3'].map((p) => (
            <div
              key={p}
              className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20"
            >
              {/* TODO: incrustar video o imagen real */}
              <div className="h-40 bg-black/50 mb-3 rounded" />
              <p className="text-center">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección 2 */}
      <section className="space-y-6 text-center">
        <h2 className="text-3xl font-semibold text-[#FFD944]">
          Explorá ideas populares por categoría
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            'Hogar y decoración',
            'Belleza y cuidado personal',
            'Moda y accesorios',
            'Cursos y servicios digitales',
          ].map((c) => (
            <button
              key={c}
              className="px-6 py-3 bg-white/10 border border-white/20 rounded hover:bg-white/20"
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Sección 3 */}
      <section className="space-y-6 text-center">
        <h2 className="text-3xl font-semibold text-[#FFD944]">Usá la IA para inspirarte</h2>
        <p className="text-gray-300">Contanos un poco sobre vos y te damos ideas</p>
        <form className="space-y-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="¿Qué te gusta hacer?"
            className="w-full p-3 rounded bg-transparent border border-white/30"
          />
          <input
            type="text"
            placeholder="¿En qué sos bueno/a?"
            className="w-full p-3 rounded bg-transparent border border-white/30"
          />
          <input
            type="text"
            placeholder="¿Qué te gustaría aprender o vender?"
            className="w-full p-3 rounded bg-transparent border border-white/30"
          />
          {/* TODO: conectar con API para ideas personalizadas */}
          <button
            type="submit"
            className="w-full bg-[#FFD944] text-gray-900 py-3 rounded hover:bg-yellow-300"
          >
            Obtener ideas
          </button>
        </form>
      </section>
    </div>
  )
}