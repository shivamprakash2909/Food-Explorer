# 🛒 OpenFoodFacts Explorer

A lightweight product search and category browser app using the [OpenFoodFacts API](https://world.openfoodfacts.org). Users can search for food products and view product details via barcode scanning .

## 🕒 Time for Completion

## 🚀 Features

- 🔍 Search food products by name
- 📦 Fetch product details by barcode
- Each food product has its information about Nutrients, Nutrition grades and Ingredients
- ⚡ Paginated API requests

---

## 📁 Project Structure

src/
│
├── api/
│ └── products.ts # API utility functions to fetch data from OpenFoodFacts
│
├── pages/
│ └── HomePage.tsx # Main homepage that loads categories and products
│
├── types/
│ └── product.ts # TypeScript interfaces for Product and API responses
│
├── components/ # Reusable UI components (if any)
│
└── App.tsx # App entry point

## 💡 Step for problem solving

    1.🧠 Understanding the OpenFoodFacts API
    •Explored multiple endpoints like product search, barcode lookup.
    •Built TypeScript models (Product, ProductsResponse) to ensure type-safe API integration.

    2. 🔁 Infinite Scrolling
    • Implemented smooth infinite scroll for product listings using react-infinite-scroll-component, with loading indicators and page-wise API requests.

    3. ⚠️ Handling Incomplete or Unknown Data
    • Issue: Some products returned undefined or "unknown" values for fields like nutrition_grades.
    • Solution: Gracefully handled such cases by displaying "NA" and ensuring consistent UI fallback behavior.

    4. ⚡ Performance Optimization
    • Limited the number of products fetched per page (page_size=24) and ensured efficient state updates to maintain responsiveness.

    5. 💅 User Experience Enhancements
    • Added loading indicators using lucide-react icons.
    • Provided clear feedback when no results are found or during network errors.

---

## 💻 Tech Stack

🔷 Frontend
• React – UI library for building interactive interfaces
• TypeScript – Type-safe JavaScript for maintainable code
• Vite – Fast build tool and dev server for modern web projects
• Tailwind CSS – Utility-first CSS framework for rapid UI development
• Lucide React – Icon library used for interactive UI elements like loaders
• React Infinite Scroll Component – For smooth infinite scrolling behavior

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/shiqamprakash2907/openfoodfacts-explorer.git
cd openfoodfacts-explorer
```

Install Dependencies:
npm install

Start the Development Server:
npm start
