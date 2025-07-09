"use client";
import { useState } from 'react';
import Image from 'next/image';

interface Tienda {
  id: string;
  nombre: string;
}

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagenUrl: string;
}

interface Props {
  tienda: Tienda;
  productos: Producto[];
  onAdd?: (producto: Producto) => void;
}

export default function PlantillaDarkCarousel({ tienda, productos, onAdd }: Props) {
  const [index, setIndex] = useState(0);

  if (productos.length === 0) {
    return null;
  }

  const prev = () => setIndex((index - 1 + productos.length) % productos.length);
  const next = () => setIndex((index + 1) % productos.length);

  const producto = productos[index];

  return (
    <div className="p-6 text-white bg-black/50 rounded-xl">
      <h2 className="text-3xl font-semibold text-center text-[#FFD944] mb-8">
        {tienda.nombre}
      </h2>
      <div className="relative flex items-center justify-center">
        <button
          onClick={prev}
          className="absolute left-0 z-10 bg-white/20 hover:bg-white/30 p-2 rounded-full"
        >
          &lt;
        </button>
        <div className="w-full flex flex-col items-center">
          {producto.imagenUrl && (
            <Image
              src={producto.imagenUrl}
              alt={producto.nombre}
              width={300}
              height={300}
              className="rounded mb-4 object-cover"
            />
          )}
          <h3 className="text-xl font-semibold mb-1">{producto.nombre}</h3>
          <p>${producto.precio.toFixed(2)}</p>
          {onAdd && (
            <button
              onClick={() => onAdd(producto)}
              className="mt-4 bg-[#FFD944] text-gray-900 px-3 py-1 rounded hover:bg-yellow-300 transition"
            >
              Agregar al carrito
            </button>
          )}
        </div>
        <button
          onClick={next}
          className="absolute right-0 z-10 bg-white/20 hover:bg-white/30 p-2 rounded-full"
        >
          &gt;
        </button>
      </div>
      <div className="mt-4 text-center space-x-2">
        {productos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`inline-block h-2 w-2 rounded-full ${
              i === index ? 'bg-[#FFD944]' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}