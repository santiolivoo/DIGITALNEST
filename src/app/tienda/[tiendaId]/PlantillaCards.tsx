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

export default function PlantillaCards({ tienda, productos }: Props) {
  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-semibold text-center text-[#FFD944] mb-8">
        {tienda.nombre}
      </h2>
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
          </div>
        ))}
      </div>
    </div>
  );
}