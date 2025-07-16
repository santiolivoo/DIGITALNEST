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

export default function PlantillaMinimal({ tienda, productos, onAdd }: Props) {
  return (
    <PlantillaBase tienda={tienda} productos={productos}>
      <ul className="space-y-4">
        {productos.map((producto) => (
          <li
            key={producto.id}
            className="flex items-center justify-between border-b border-white/20 pb-2"
          >
            <div className="flex items-center space-x-3">
              {producto.imagenUrl && (
                <Image
                  src={producto.imagenUrl}
                  alt={producto.nombre}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-cover rounded"
                />
              )}
              <span>{producto.nombre}</span>
            </div>
            <span>${producto.precio.toFixed(2)}</span>
            {onAdd && (
              <button
                onClick={() => onAdd(producto)}
                className="ml-4 text-gray-900 px-2 py-1 rounded transition"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                Añadir
              </button>
            )}
          </li>
        ))}
      </ul>
    </PlantillaBase>
  );
}