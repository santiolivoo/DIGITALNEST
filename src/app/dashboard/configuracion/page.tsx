'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const MODULOS_OPCIONES = ['Pagos', 'Envíos', 'Marketing'];

export default function ConfiguracionPage() {
  const [nombre, setNombre] = useState('');
  const [plantilla, setPlantilla] = useState('');
  const [color, setColor] = useState('#FFD944');
  const [fuente, setFuente] = useState('');
  const [tipoNegocio, setTipoNegocio] = useState('');
  const [modulos, setModulos] = useState<string[]>([]);
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const obtenerTienda = async () => {
      try {
        const res = await fetch('/api/tienda', { credentials: 'include' });
        const data = await res.json();
        if (res.ok && data) {
          setNombre(data.nombre || '');
          setPlantilla(data.plantilla || '');
          setColor(data.color || '#FFD944');
          setFuente(data.fuente || '');
          setTipoNegocio(data.tipoNegocio || '');
          setModulos(data.modulos || []);
        }
      } catch (error) {
        console.error('Error obteniendo tienda:', error);
        setMensaje('Error al cargar datos');
      } finally {
        setIsLoading(false);
      }
    };

    obtenerTienda();
  }, []);

  const toggleModulo = (m: string) => {
    setModulos((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  const guardar = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/tienda', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, plantilla, color, fuente, tipoNegocio, modulos }),
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje('Tienda actualizada exitosamente!');
        setTimeout(() => router.refresh(), 1500);
      } else {
        setMensaje(data.error || 'Error al actualizar');
      }
    } catch (error) {
      console.error('Error actualizando tienda:', error);
      setMensaje('Error de conexión');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/10 backdrop-blur-md rounded-xl text-white">
      <Link href="/dashboard" className="text-[#FFD944] mb-4 inline-block">
        &larr; Volver al Dashboard
      </Link>

      <h1 className="text-2xl font-bold mb-6">Configuración de Tienda</h1>

      <form onSubmit={guardar} className="space-y-4">
        <div>
          <label className="block text-gray-200 mb-2">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-3 border border-white/30 rounded-md bg-transparent text-white"
          />
        </div>
        <div>
          <label className="block text-gray-200 mb-2">Plantilla</label>
          <input
            type="text"
            value={plantilla}
            onChange={(e) => setPlantilla(e.target.value)}
            className="w-full p-3 border border-white/30 rounded-md bg-transparent text-white"
          />
        </div>
        <div>
          <label className="block text-gray-200 mb-2">Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-24 h-10 rounded border border-white/30"
          />
        </div>
        <div>
          <label className="block text-gray-200 mb-2">Fuente</label>
          <select
            value={fuente}
            onChange={(e) => setFuente(e.target.value)}
            className="w-full p-3 border border-white/30 rounded-md bg-transparent text-white"
          >
            <option value="">Por defecto</option>
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
            <option value="Arial">Arial</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-200 mb-2">Tipo de negocio</label>
          <input
            type="text"
            value={tipoNegocio}
            onChange={(e) => setTipoNegocio(e.target.value)}
            className="w-full p-3 border border-white/30 rounded-md bg-transparent text-white"
          />
        </div>
        <div>
          <label className="block text-gray-200 mb-2">Módulos</label>
          <div className="flex flex-col gap-1">
            {MODULOS_OPCIONES.map((m) => (
              <label key={m} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={modulos.includes(m)}
                  onChange={() => toggleModulo(m)}
                />
                <span>{m}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 rounded-md font-medium bg-[#FFD944] text-gray-900 hover:bg-yellow-300"
        >
          Guardar cambios
        </button>
        {mensaje && (
          <p className={`mt-4 text-center ${mensaje.includes('exitosamente') ? 'text-green-400' : 'text-red-400'}`}>{mensaje}</p>
        )}
      </form>
    </div>
  );
}
