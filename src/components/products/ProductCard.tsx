import type { ProductWithImages } from "@/interfaces";

interface Props {
  product: ProductWithImages;
}

export const ProductCard = ({ product }: Props) => {
  return <div>{product.title}</div>;
};
