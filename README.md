# 🛒 OpenFoodFacts Explorer

A lightweight product search and category browser app using the [OpenFoodFacts API](https://world.openfoodfacts.org). Users can search for food products and view product details via barcode scanning or category browsing.

## 🚀 Features

- 🔍 Search food products by name
- 📦 Fetch product details by barcode
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
