'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditarProductoPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [mensaje, setMensaje] = useState('');
  const router = useRouter();

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const res = await fetch(`/api/productos/${id}`, { credentials: 'include' });
        const data = await res.json();
        if (res.ok) {
          setNombre(data.nombre);
          setPrecio(String(data.precio));
          setStock(String(data.stock));
          setImagenUrl(data.imagenUrl || '');
        } else {
          setMensaje(data.mensaje || 'Error al cargar producto');
        }
      } catch (error) {
        console.error('Error obteniendo producto:', error);
        setMensaje('Error de conexión');
      }
    };

    obtenerProducto();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          precio: parseFloat(precio),
          stock: parseInt(stock, 10),
          imagenUrl,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('Producto actualizado exitosamente!');
        setTimeout(() => router.push('/dashboard/productos'), 1500);
      } else {
        setMensaje(data.mensaje || 'Error al actualizar producto');
      }
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      setMensaje('Error de conexión');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <Link href="/dashboard/productos" className="text-blue-600 mb-4 inline-block">
        &larr; Volver a Productos
      </Link>

      <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Precio</label>
          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Imagen URL</label>
          <input
            type="text"
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-black"
          />
        </div>
        {imagenUrl && (
          <img
            src={imagenUrl}
            alt="Vista previa"
            className="mt-2 max-h-40 rounded-md border border-gray-200"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-medium"
        >
          Guardar cambios
        </button>
      </form>

      {mensaje && (
        <p className={`mt-4 text-center ${mensaje.includes('exitosamente') ? 'text-green-600' : 'text-red-600'}`}> {mensaje} </p>
      )}
    </div>
  );
}
