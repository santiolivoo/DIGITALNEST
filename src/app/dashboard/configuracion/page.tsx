'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ConfiguracionPage() {
  const [nombre, setNombre] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [tiposProducto, setTiposProducto] = useState('');
  const [referencia, setReferencia] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch('/api/configuracion');
        const data = await res.json();
        if (res.ok) {
          setNombre(data.nombre || '');
          setExperiencia(data.experiencia || '');
          setTiposProducto(data.tiposProducto || '');
          setReferencia(data.referencia || '');
        } else {
          setMensaje(data.error || 'Error al cargar configuración');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error obteniendo configuración:', error);
        setMensaje('Error al cargar configuración');
        setIsLoading(false);
      }
    };

    obtenerDatos();
  }, []);

  const guardar = async () => {
    try {
      const res = await fetch('/api/configuracion', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, experiencia, tiposProducto, referencia }),
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje('Configuración actualizada!');
        setTimeout(() => router.push('/dashboard'), 1500);
      } else {
        setMensaje(data.error || 'Error al actualizar');
      }
    } catch (error) {
      console.error('Error actualizando configuración:', error);
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
      <h1 className="text-2xl font-bold mb-6">Configuración de cuenta</h1>
      <div className="space-y-4">
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
          <label className="block text-gray-200 mb-2">Experiencia</label>
          <input
            type="text"
            value={experiencia}
            onChange={(e) => setExperiencia(e.target.value)}
            className="w-full p-3 border border-white/30 rounded-md bg-transparent text-white"
          />
        </div>
        <div>
          <label className="block text-gray-200 mb-2">Tipos de producto</label>
          <input
            type="text"
            value={tiposProducto}
            onChange={(e) => setTiposProducto(e.target.value)}
            className="w-full p-3 border border-white/30 rounded-md bg-transparent text-white"
          />
        </div>
        <div>
          <label className="block text-gray-200 mb-2">¿Cómo nos conociste?</label>
          <input
            type="text"
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            className="w-full p-3 border border-white/30 rounded-md bg-transparent text-white"
          />
        </div>
        <button
          onClick={guardar}
          className="w-full py-3 px-4 rounded-md font-medium bg-[#FFD944] text-gray-900 hover:bg-yellow-300"
        >
          Guardar cambios
        </button>
        {mensaje && (
          <p className={`mt-4 text-center ${mensaje.includes('actualizada') ? 'text-green-400' : 'text-red-400'}`}>{mensaje}</p>
        )}
      </div>
    </div>
  );
}