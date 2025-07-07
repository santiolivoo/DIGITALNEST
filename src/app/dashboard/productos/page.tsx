'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
  imagenUrl: string;
}

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await fetch('/api/productos', {
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          setProductos(data);
        }
      } catch (error) {
        console.error('Error obteniendo productos:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white mt-8 rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-blue-700">Productos</h1>
        <Link
          href="/dashboard/productos/nuevo"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Agregar producto
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-600">Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p className="text-gray-600">No hay productos cargados.</p>
      ) : (
        <table className="w-full border border-blue-100 rounded overflow-hidden">
          <thead className="bg-blue-100 text-left">
            <tr>
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id} className="border-t">
                <td className="px-4 py-2">
                  <img
                    src={producto.imagenUrl}
                    alt={producto.nombre}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{producto.nombre}</td>
                <td className="px-4 py-2">${producto.precio.toFixed(2)}</td>
                <td className="px-4 py-2">{producto.stock}</td>
                <td className="px-4 py-2">
                  <Link
                    href={`/dashboard/productos/${producto.id}/editar`}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
