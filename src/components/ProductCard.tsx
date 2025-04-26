import { Link } from "react-router-dom";
import { Product } from "../types/product";
import { Info } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const nutritionGradeColor =
    {
      a: "bg-green-500",
      b: "bg-lime-500",
      c: "bg-yellow-500",
      d: "bg-orange-500",
      e: "bg-red-500",
    }[product.nutrition_grades?.toLowerCase()] || "bg-gray-600";

  return (
    <Link to={`/product/${product.code}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow">
        <div className="relative h-48">
          <img
            src={
              product.image_url ||
              "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=500"
            }
            alt={product.product_name}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute top-2 right-2 ${nutritionGradeColor} text-black rounded-full w-8 h-8 flex items-center justify-center font-bold`}
          >
            {!product.nutrition_grades ||
            product.nutrition_grades.toLowerCase() === "unknown" ||
            product.nutrition_grades.toLowerCase() === "not-applicable"
              ? "N/A"
              : product.nutrition_grades.toUpperCase()}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.product_name}
          </h3>
          <p className="text-sm text-gray-600 mt-1 truncate">
            {product.categories}
          </p>
          <div className="mt-3 flex items-center text-sm text-gray-500">
            <Info size={16} className="mr-1" />
            <span>Click for details</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
