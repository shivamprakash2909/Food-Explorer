# 🛒 OpenFoodFacts Explorer

A lightweight product search and category browser app using the [OpenFoodFacts API](https://world.openfoodfacts.org). Users can search for food products and view product details via barcode scanning .

## 🕒 Time for Completion
- 4 days

## 🚀 Features

- 🔍 Search food products by name
- 📦 Fetch product details by barcode
- Each food product has its information about Nutrients, Nutrition grades and Ingredients
- ⚡ Paginated API requests

---

## 📁 Project Structure

- **`src/`**: Contains all the source code of the application.
  - **`components/`**: Reusable UI components (e.g., `ProductCard.tsx`, `SearchBar.tsx`).
  - **`pages/`**: Application pages/routes (e.g., `HomePage.tsx`, `ProductDetail.tsx`).
  - **`types/`**: TypeScript type definitions (e.g., `product.ts` for interfaces).
  - **`App.tsx`**: Root component of the React application.
  - **`index.css`**: Global CSS styles (Tailwind setup).
  - **`main.tsx`**: Entry point for rendering the React app.
  
  
- **`.gitignore`**: Specifies files/folders ignored by Git (e.g., `node_modules`, build artifacts).
- **`package.json`**: Manages project dependencies, scripts, and metadata.
- **`package-lock.json`**: Ensures consistent dependency versions.
- **`README.md`**: Project documentation (you're here!).
  
- **Configuration Files**:
  - **`tailwind.config.js`**: Tailwind CSS theming and plugins.
  - **`vite.config.ts`**: Vite build and dev server settings.
  - **`tsconfig.json`**: TypeScript compiler rules.
  - **`eslint.config.js`**: Code linting configurations.
  - **`postcss.config.js`**: PostCSS plugin setup.

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
git clone https://github.com/shivamprakash2909/Food-Explorer.git
cd Food-Explorer
```

### 2. Install Dependencies
```bash
npm install
```
### 3. Start the Development Server
```bash
npm run dev
```
