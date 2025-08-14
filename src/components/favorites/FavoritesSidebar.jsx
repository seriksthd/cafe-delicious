import { Trash2Icon, ShoppingCartIcon } from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext";
import { Sidebar } from "../ui/Sidebar";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
export function FavoritesSidebar({ isOpen, onClose }) {
  const { favorites, removeFromFavorites } = useFavorites();
  const dispatch = useDispatch();
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
  return (
    <Sidebar isOpen={isOpen} onClose={onClose} title="Избранное">
      {favorites.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          У вас пока нет избранных блюд
        </div>
      ) : (
        <div className="p-4">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border-b last:border-b-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-orange-600 font-semibold">
                  {item.price} сом
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center gap-1 px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                  >
                    <ShoppingCartIcon className="w-4 h-4" />
                    <span>В корзину</span>
                  </button>
                  <button
                    onClick={() => removeFromFavorites(item.id)}
                    className="p-1 hover:bg-red-50 hover:text-red-500 rounded"
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Sidebar>
  );
}
