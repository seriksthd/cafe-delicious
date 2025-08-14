import React, { useState } from "react";

import { useGetProductsQuery } from "../store/slices/productSlice";

import { DishCard } from "./DishCard";

const Products = () => {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (isLoading) {
    return (
      <div>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
            <p className="mt-4 text-gray-600">Продуктулар жүктөлүүдө...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            Продуктуларды жүктөөдө ката кетти
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Биздин меню</h1>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedCategory === category
                  ? "bg-amber-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category === "all" ? "Бардыгы" : category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Бул категорияда продукт табылган жок
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
