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
}

export default function PlantillaMinimal({ tienda, productos }: Props) {
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold text-center mb-6">{tienda.nombre}</h2>
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
          </li>
        ))}
      </ul>
    </div>
  );
}