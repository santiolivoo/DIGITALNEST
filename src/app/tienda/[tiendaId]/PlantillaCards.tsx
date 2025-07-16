import Image from 'next/image';
import type { Producto } from '@/types/producto';
import PlantillaBase from './PlantillaBase';

interface Tienda {
  id: string;
  nombre: string;
  color?: string;
}


interface Props {
  tienda: Tienda;
  productos: Producto[];
  onAdd?: (producto: Producto) => void;
}

export default function PlantillaCards({ tienda, productos, onAdd }: Props) {
  return (
    <PlantillaBase tienda={tienda} productos={productos}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow flex flex-col items-center"
          >
            {producto.imagenUrl && (
              <Image
                src={producto.imagenUrl}
                alt={producto.nombre}
                width={160}
                height={160}
                className="mb-2 h-40 w-40 object-cover rounded"
              />
            )}
            <h3 className="text-xl font-semibold mb-1">{producto.nombre}</h3>
            <p className="mb-2">${producto.precio.toFixed(2)}</p>
            {onAdd && (
              <button
                onClick={() => onAdd(producto)}
                className="text-gray-900 px-3 py-1 rounded mt-2 transition"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                Agregar al carrito
              </button>
            )}
          </div>
        ))}
      </div>
    </PlantillaBase>
  );
}