export interface Post {
  id:number;
  title:string;
  description: string;
  price: number;
  stock:number;
  brand:string;
  category:string;
  thumbnail:string;
  images:string[];
  discountPercentage: number;
  rating:number;
}

export interface ProductObject
{
  totalPages: number;
  Title: any;
  limit: number;
  skip:number;
  total:number;
  products:Post[];
}
