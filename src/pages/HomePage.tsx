import { useState, useEffect } from "react";
import { SearchBar } from "../components/SearchBar";
import { ProductCard } from "../components/ProductCard";
import {
  searchProducts,
  getProductByBarcode,
  getProductsByCategory,
  getCategories,
} from "../api/products";
import { Product } from "../types/product";
import InfiniteScroll from "react-infinite-scroll-component";
import { Filter, Loader, SortAsc, SortDesc } from "lucide-react";

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "grade">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadCategories();
    loadInitialProducts();
  }, []);

  const loadCategories = async () => {
    try {
      const categoriesList = await getCategories();
      setCategories(categoriesList);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const loadInitialProducts = async () => {
    try {
      setLoading(true);
      const response = await searchProducts("", 1);
      setProducts(response.products);
      setHasMore(response.page < response.page_count);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setPage(1);
    try {
      setLoading(true);
      const response = await searchProducts(query, 1);
      setProducts(response.products);
      setHasMore(response.page < response.page_count);
    } catch (error) {
      console.error("Failed to search products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBarcodeSearch = async (barcode: string) => {
    try {
      setLoading(true);
      const response = await getProductByBarcode(barcode);
      if (response.product) {
        setProducts([response.product]);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to search by barcode:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    try {
      let response;
      if (selectedCategory) {
        response = await getProductsByCategory(selectedCategory, nextPage);
      }
      if (searchQuery) {
        response = await searchProducts(searchQuery, nextPage);
      } else {
        response = await searchProducts("", nextPage);
      }
      setProducts([...products, ...response.products]);
      setPage(nextPage);
      setHasMore(response.page < response.page_count);
    } catch (error) {
      console.error("Failed to load more products:", error);
    }
  };

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    setPage(1);
    try {
      setLoading(true);
      const response = await getProductsByCategory(category, 1);
      setProducts(response.products);
      setHasMore(response.page < response.page_count);
    } catch (error) {
      console.error("Failed to load category products:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortProducts = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? (a.product_name || "").localeCompare(b.product_name || "")
          : (b.product_name || "").localeCompare(a.product_name || "");
      } else {
        const gradeA = a.nutrition_grades?.toLowerCase() || "z";
        const gradeB = b.nutrition_grades?.toLowerCase() || "z";
        return sortOrder === "asc"
          ? gradeA.localeCompare(gradeB)
          : gradeB.localeCompare(gradeA);
      }
    });
    setProducts(sortedProducts);
  };

  useEffect(() => {
    sortProducts();
  }, [sortBy, sortOrder]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Food Explorer
        </h1>

        <div className="mb-8 ">
          <SearchBar
            onSearch={handleSearch}
            onBarcodeSearch={handleBarcodeSearch}
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-blue-500 rounded-lg bg-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "name" | "grade")}
            >
              <option value="name">Sort by Name</option>
              <option value="grade">Sort by Grade</option>
            </select>

            <button
              className="px-4 py-2 border border-gray-300 rounded-lg bg-blue-500"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? <SortAsc /> : <SortDesc />}
            </button>
          </div>
        </div>

        {loading && <div className="text-center">Loading...</div>}

        <InfiniteScroll
          dataLength={products.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center mt-4">
              <Loader className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.code} product={product} />
            ))}
          </div>
        </InfiniteScroll>

        {!loading && products.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No products found. Try a different search term or category.
          </div>
        )}
      </div>
    </div>
  );
}
