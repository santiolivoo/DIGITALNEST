'use client';

import { useEffect, useState } from 'react';

interface Pedido {
  id: string;
  nombre: string | null;
  email: string | null;
  total: number;
  createdAt: string;
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const res = await fetch('/api/pedidos', { credentials: 'include' });
        const data = await res.json();
        if (res.ok) {
          setPedidos(data);
        }
      } catch (error) {
        console.error('Error obteniendo pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerPedidos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white/10 backdrop-blur-md mt-8 rounded-xl shadow text-white">
      <h1 className="text-3xl font-semibold text-[#FFD944] mb-6">Pedidos</h1>
      {loading ? (
        <p className="text-gray-300">Cargando pedidos...</p>
      ) : pedidos.length === 0 ? (
        <p className="text-gray-300">No hay pedidos registrados.</p>
      ) : (
        <table className="w-full border border-white/20 rounded overflow-hidden text-sm">
          <thead className="bg-white/10 text-left">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Cliente</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => (
              <tr key={p.id} className="border-t border-white/20">
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2">{p.nombre ?? '-'}</td>
                <td className="px-4 py-2">{p.email ?? '-'}</td>
                <td className="px-4 py-2">${p.total.toFixed(2)}</td>
                <td className="px-4 py-2">{new Date(p.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}