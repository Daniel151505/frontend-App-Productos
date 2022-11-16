export interface Product {
  _id?: string;
  name: string;
  category: {
    name: string;
    slug: string;
  },
  brand: {
    name: string;
    slug: string;
  },
  slug: string;
  status?: boolean;
  description: string;
  price: number;
  createdAt?: Date;
}
