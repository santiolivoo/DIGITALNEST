'use client';
import { ReactNode } from 'react';
import type { Producto } from '@/types/producto';

interface Tienda {
  id: string;
  nombre: string;
  color?: string;
}

interface PlantillaBaseProps {
  tienda: Tienda;
  productos: Producto[];
  className?: string;
  children: ReactNode;
}

export default function PlantillaBase({ tienda, className = '', children }: PlantillaBaseProps) {
  const accent = tienda.color || '#FFD944';

  return (
    <div className={`p-6 text-white ${className}`.trim()} style={{ '--accent': accent } as React.CSSProperties}>
      <h2 className="text-3xl font-semibold text-center mb-8" style={{ color: 'var(--accent)' }}>
        {tienda.nombre}
      </h2>
      {children}
    </div>
  );
}