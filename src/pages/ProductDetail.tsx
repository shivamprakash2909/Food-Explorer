import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductByBarcode } from "../api/products";
import { Product } from "../types/product";
import { ArrowLeft, AlertCircle } from "lucide-react";

export function ProductDetail() {
  const { barcode } = useParams<{ barcode: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProductByBarcode(barcode!);
        setProduct(response.product);
      } catch (err) {
        setError("Failed to load product details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (barcode) {
      loadProduct();
    }
  }, [barcode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <div className="text-xl text-gray-800 mb-4">
            {error || "Product not found"}
          </div>
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const nutritionGradeColor =
    {
      a: "bg-green-500",
      b: "bg-lime-500",
      c: "bg-yellow-500",
      d: "bg-orange-500",
      e: "bg-red-500",
    }[product.nutrition_grades?.toLowerCase() || "e"] || "bg-gray-500";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={
                  product.image_url ||
                  "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=500"
                }
                alt={product.product_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                  {product.product_name}
                </h1>
                <div
                  className={`${nutritionGradeColor} text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg`}
                >
                  {!product.nutrition_grades ||
                  product.nutrition_grades.toLowerCase() === "unknown"
                    ? "N/A"
                    : product.nutrition_grades.toUpperCase()}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Categories
                </h2>
                <p className="text-gray-600">
                  {product.categories || "No categories available"}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Ingredients
                </h2>
                <p className="text-gray-600">
                  {product.ingredients_text ||
                    "No ingredients information available"}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Nutrition Facts (per 100g)
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-500">Energy</div>
                    <div className="font-semibold">
                      {product.nutriments?.energy_100g || 0} kcal
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-500">Fat</div>
                    <div className="font-semibold">
                      {product.nutriments?.fat_100g || 0}g
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-500">Carbohydrates</div>
                    <div className="font-semibold">
                      {product.nutriments?.carbohydrates_100g || 0}g
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-500">Proteins</div>
                    <div className="font-semibold">
                      {product.nutriments?.proteins_100g || 0}g
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-500">Salts</div>
                    <div className="font-semibold">
                      {product.nutriments?.salt_100g || 0}g
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-500">Alcohol</div>
                    <div className="font-semibold">
                      {product.nutriments?.alcohol_100g || 0}g
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-500">Fibres</div>
                    <div className="font-semibold">
                      {product.nutriments?.fiber_100g || 0}g
                    </div>
                  </div>
                </div>
              </div>

              {product.labels && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Labels
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {product.labels.split(",").map((label, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {label.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
