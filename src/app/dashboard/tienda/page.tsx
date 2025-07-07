'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TiendaPage() {
  const [nombreTienda, setNombreTienda] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [tiendaExistente, setTiendaExistente] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const obtenerTienda = async () => {
      try {
        const res = await fetch('/api/tienda');
        const data = await res.json();
        
        if (res.ok && data && data.nombre) {
          setNombreTienda(data.nombre);
          setTiendaExistente(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error obteniendo tienda:', error);
        setMensaje('Error al cargar la tienda');
        setIsLoading(false);
      }
    };

    obtenerTienda();
  }, []);

  const guardarTienda = async () => {
    if (!nombreTienda.trim()) {
      setMensaje('El nombre de la tienda es requerido');
      return;
    }

    try {
      const res = await fetch('/api/tienda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombreTienda }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setMensaje(tiendaExistente 
          ? 'Tienda actualizada exitosamente!' 
          : 'Tienda creada exitosamente!');
        
        setTimeout(() => router.push('/dashboard'), 1500);
      } else {
        setMensaje(data.error || 'Error guardando tienda');
      }
    } catch (error) {
      setMensaje('Error de conexión');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link href="/dashboard" className="text-blue-600 mb-4 inline-block">
        &larr; Volver al Dashboard
      </Link>
      
      <h1 className="text-2xl font-bold mb-6">
        {tiendaExistente ? 'Editar tu tienda' : 'Crear tu tienda'}
      </h1>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Nombre de tu tienda</label>
        <input
          type="text"
          value={nombreTienda}
          onChange={(e) => setNombreTienda(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md text-black"
          placeholder="Ej: Mi Tienda Online"
        />
      </div>
      
      <button
        onClick={guardarTienda}
        disabled={!nombreTienda.trim()}
        className={`w-full py-3 px-4 rounded-md text-white font-medium ${
          !nombreTienda.trim() 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {tiendaExistente ? 'Actualizar Tienda' : 'Crear Tienda'}
      </button>
      
      {mensaje && (
        <p className={`mt-4 text-center ${
          mensaje.includes('éxito') ? 'text-green-600' : 'text-red-600'
        }`}>
          {mensaje}
        </p>
      )}
    </div>
  );
}