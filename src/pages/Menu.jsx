import { useState } from "react";
import { MenuTabs } from "../components/menu/MenuTabs";
import { MenuSection } from "../components/menu/MenuSection";
import { SearchBar } from "../components/menu/SearchBar";
const categories = [
  "Основные блюда",
  "Завтраки",
  "Супы",
  "Салаты",
  "Пицца",
  "Бургеры",
  "Паста",
  "Десерты",
  "Напитки",
];
export function Menu() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Наше Меню</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Откройте для себя богатый вкус нашей кухни. Все блюда готовятся из
            свежих и качественных ингредиентов.
          </p>
        </div>
        <SearchBar onSearch={setSearchQuery} />
        <div className="mt-8">
          <MenuTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
        <div className="mt-8">
          <MenuSection category={activeCategory} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}
