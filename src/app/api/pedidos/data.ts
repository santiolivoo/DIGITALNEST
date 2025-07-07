export interface Pedido {
  id: string;
  cliente: string;
  total: number;
  estado: string;
  fecha: string;
}

export const pedidos: Pedido[] = [
  {
    id: '1',
    cliente: 'Juan Pérez',
    total: 45.5,
    estado: 'Pendiente',
    fecha: '2025-07-01',
  },
  {
    id: '2',
    cliente: 'María Gómez',
    total: 99.99,
    estado: 'Enviado',
    fecha: '2025-07-02',
  },
];