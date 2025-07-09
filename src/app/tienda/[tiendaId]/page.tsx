'use client';

import { useEffect, useState, type FormEvent } from 'react';
import PlantillaCards from './PlantillaCards';
import PlantillaMinimal from './PlantillaMinimal';
import PlantillaDarkCarousel from './PlantillaDarkCarousel';
import type { Producto } from '@/types/producto';

interface CartItem {
  producto: Producto;
  cantidad: number;
}

export default function TiendaPublicaPage({ params }: { params: { tiendaId: string } }) {
  const { tiendaId } = params;
  const [nombreTienda, setNombreTienda] = useState('');
  const [plantilla, setPlantilla] = useState<string>('');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [carrito, setCarrito] = useState<CartItem[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [clienteNombre, setClienteNombre] = useState('');
  const [clienteEmail, setClienteEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [pedidoId, setPedidoId] = useState<string | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const tiendaRes = await fetch(`/api/publico/tienda/${tiendaId}`);
        const tiendaData = await tiendaRes.json();
        if (tiendaRes.ok) {
          setNombreTienda(tiendaData.nombre);
          setPlantilla(tiendaData.plantilla || '');
        }
        const prodRes = await fetch(`/api/publico/productos/${tiendaId}`);
        const prodData = await prodRes.json();
        if (prodRes.ok) {
          setProductos(prodData);
        }
      } catch (error) {
        console.error('Error cargando datos publicos:', error);
      }
    };

    cargarDatos();
  }, [tiendaId]);

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((prev) => {
      const existente = prev.find((i) => i.producto.id === producto.id);
      if (existente) {
        return prev.map((i) =>
          i.producto.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...prev, { producto, cantidad: 1 }];
    });
  };

  const total = carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);

  const finalizarCompra = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje('');

    try {
      const res = await fetch('/api/pedidos/publico/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente: { nombre: clienteNombre, email: clienteEmail },
          items: carrito.map((c) => ({ productoId: c.producto.id, cantidad: c.cantidad })),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setPedidoId(data.id);
        setCarrito([]);
        setMostrarForm(false);
        setClienteNombre('');
        setClienteEmail('');
      } else {
        setMensaje(data.mensaje || 'Error al crear pedido');
      }
    } catch (error) {
      console.error('Error enviando pedido publico:', error);
      setMensaje('Error de conexión');
    }
  };

  return (
    <div className="min-h-screen p-6 text-white">
      <h1 className="text-3xl font-semibold text-center text-[#FFD944] mb-8">
        {nombreTienda || 'Tienda'}
      </h1>

      {(() => {
        const props = {
          tienda: { id: tiendaId, nombre: nombreTienda },
          productos,
          onAdd: agregarAlCarrito,
        };
        switch (plantilla) {
          case 'Minimal':
            return <PlantillaMinimal {...props} />;
          case 'Moderna':
            return <PlantillaDarkCarousel {...props} />;
          default:
            return <PlantillaCards {...props} />;
        }
      })()}

      {carrito.length > 0 && (
        <div className="mt-10 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Carrito</h2>
          <ul>
            {carrito.map((item) => (
              <li key={item.producto.id} className="flex justify-between mb-2">
                <span>
                  {item.producto.nombre} x {item.cantidad}
                </span>
                <span>
                  ${(item.producto.precio * item.cantidad).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold">Total: ${total.toFixed(2)}</p>
          <button
            onClick={() => setMostrarForm(true)}
            className="mt-4 bg-[#FFD944] text-gray-900 px-4 py-2 rounded hover:bg-yellow-300 transition"
          >
            Finalizar compra
          </button>
        </div>
      )}

      {mostrarForm && (
        <form
          onSubmit={finalizarCompra}
          className="mt-8 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow max-w-md mx-auto space-y-4"
        >
          <div>
            <label className="block mb-1">Nombre</label>
            <input
              type="text"
              value={clienteNombre}
              onChange={(e) => setClienteNombre(e.target.value)}
              required
              className="w-full p-3 border border-white/30 rounded-md bg-transparent"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={clienteEmail}
              onChange={(e) => setClienteEmail(e.target.value)}
              required
              className="w-full p-3 border border-white/30 rounded-md bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#FFD944] text-gray-900 py-3 rounded-md hover:bg-yellow-300 transition font-medium"
          >
            Enviar pedido
          </button>
          {mensaje && <p className="text-center text-red-400">{mensaje}</p>}
        </form>
      )}

      {pedidoId && (
        <p className="mt-8 text-center text-green-400 font-semibold">
          ¡Gracias por tu compra! Número de pedido: {pedidoId}
        </p>
      )}
    </div>
  );
}

