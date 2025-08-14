import { DishCard } from "./DishCard";
import { Link } from "react-router-dom";
import { menuItems } from "../utils/constants/menu";

export function PopularDishes() {
  const allDishes = Object.values(menuItems).flat();

  const popularDishes = allDishes.filter((dish) => dish.isPopular);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Популярные сегодня
          </h2>
          <p className="text-xl text-gray-600">
            Самые любимые блюда наших гостей
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </div>
      <div className="text-center">
        <Link
          to="/menu"
          className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200"
        >
          Смотреть всю меню
        </Link>
      </div>
    </section>
  );
}
