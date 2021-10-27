export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  stock: number;
  marcaId: number;
  marcaNombre: string;
  categoriaId: number;
  categoriaNombre: string;
  precio: number;
  imagen: string;
}

export interface PaginationRequest {
  pageIndex: number | null;
  pagesize: number | null;
  search: string | null;
  sort: string | null;
  marca: number | null;
  categoria: number | null;
}

export interface Pagination {
  count: number;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  data: Product[];
}
