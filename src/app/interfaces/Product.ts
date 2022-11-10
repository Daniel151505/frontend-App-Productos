export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  choose?: boolean;
  createdAt?: Date;
}
