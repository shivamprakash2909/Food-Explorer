import { Product, ProductsResponse } from '../types/product';

const BASE_URL = 'https://world.openfoodfacts.org';

export async function searchProducts(query: string, page: number = 1): Promise<ProductsResponse> {
  const response = await fetch(
    `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=true&page=${page}&page_size=24`
  );
  return response.json();
}

export async function getProductByBarcode(barcode: string): Promise<{ product: Product }> {
  const response = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`);
  return response.json();
}

 export async function getProductsByCategory(category: string, page: number = 1): Promise<ProductsResponse> {
  const cat=category.toLowerCase()
   const response = await fetch(`${BASE_URL}/facets/categories/${encodeURIComponent(cat)}&json=true&page=${page}&page_size=24`);
   if(!response){
      console.log("Error fetching product by category:");
   }
   return response.json();
 }

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/facets/categories.json`); //https://world.openfoodfacts.org/facets/categories/dairies.json
  const data = await response.json();
  return data.tags.map((tag: any) => tag.name).slice(0, 50); // Get top 50 categories
}