export interface Post {
  filter(arg0: (post: any) => boolean): Post;
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  branch: string; // Add branch property here
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
