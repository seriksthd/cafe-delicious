import { useState } from "react";
import { ShoppingCartIcon, HeartIcon } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { DishModal } from "./menu/DishModal";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
export function DishCard({ dish }) {
  console.log("dish: ", dish);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        image: product.image,
      })
    );
  };
  const handleToggleFavorite = () => {
    if (isFavorite(dish.id)) {
      removeFromFavorites(dish.id);
    } else {
      addToFavorites(dish);
    }
  };
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-60 object-cover cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full ${
              isFavorite(dish.id)
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-500"
            } transition-colors duration-200`}
          >
            <HeartIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <h3
            className="text-xl font-semibold text-gray-900 mb-2 cursor-pointer hover:text-orange-600 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            {dish.name}
          </h3>
          <p className="text-gray-600 mb-4 text-sm">{dish.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-orange-600">
              {dish.price} сом
            </span>
            <button
              onClick={() => handleAddToCart(dish)}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <ShoppingCartIcon className="w-4 h-4" />
              <span>в корзину</span>
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <DishModal dish={dish} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
