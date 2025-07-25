'use client';

import { useEffect, useState, type FormEvent } from 'react';
import type React from 'react';
import { getTemplateByName } from '@/templates/templateConfig';
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
  const [color, setColor] = useState<string>('#FFD944');
  const [fuente, setFuente] = useState<string>('');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [carrito, setCarrito] = useState<CartItem[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [clienteNombre, setClienteNombre] = useState('');
  const [clienteEmail, setClienteEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [pedidoId, setPedidoId] = useState<string | null>(null);

  const template = getTemplateByName(plantilla);
  const accentColor = color || template?.config.colors.accent || '#FFD944';
  const fontFamily = fuente || template?.config.fonts.body || 'inherit';

  useEffect(() => {
    if (!template) return;
    const root = document.documentElement;
    root.style.setProperty('--background', template.config.colors.background);
    root.style.setProperty('--foreground', template.config.colors.text);
    root.style.setProperty('--font-title', template.config.fonts.title);
    root.style.setProperty('--font-body', template.config.fonts.body);
  }, [template]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', accentColor);
  }, [accentColor]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const tiendaRes = await fetch(`/api/publico/tienda/${tiendaId}`);
        const tiendaData = await tiendaRes.json();
        if (tiendaRes.ok) {
          setNombreTienda(tiendaData.nombre);
          setPlantilla(tiendaData.plantilla || '');
          setColor(tiendaData.color || '#FFD944');
          setFuente(tiendaData.fuente || '');
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
    <div
      className="min-h-screen p-6 text-white"
      style={{ '--accent': accentColor, fontFamily } as React.CSSProperties}
    >
      <h1 className="text-3xl font-semibold text-center mb-8" style={{ color: 'var(--accent)' }}>
        {nombreTienda || 'Tienda'}
      </h1>

      {(() => {
        const props = {
          tienda: {
            id: tiendaId,
            nombre: nombreTienda,
            color: accentColor,
            fuente: fontFamily,
          },
          productos,
          onAdd: agregarAlCarrito,
        };
        switch (template?.config.layout) {
          case 'minimal':
            return <PlantillaMinimal {...props} />;
          case 'carousel':
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
            className="mt-4 text-gray-900 px-4 py-2 rounded transition"
            style={{ backgroundColor: 'var(--accent)' }}
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
            className="w-full text-gray-900 py-3 rounded-md transition font-medium"
            style={{ backgroundColor: 'var(--accent)' }}
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

