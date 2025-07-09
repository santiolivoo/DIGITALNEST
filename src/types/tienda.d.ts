declare namespace Tienda {
  export interface TiendaData {
    id: string;
    nombre: string;
    plantilla?: string;
    userId: string;
    createdAt: string;
    productos?: Producto.ProductoData[];
  }
}

declare namespace Producto {
  export interface ProductoData {
    id: string;
    nombre: string;
    precio: number;
    stock: number;
    imagenUrl: string;
    tiendaId: string;
    createdAt: string;
  }
}