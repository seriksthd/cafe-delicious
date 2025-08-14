import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartIcon, HeartIcon, MenuIcon, XIcon } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { FavoritesSidebar } from "./favorites/FavoritesSidebar";
import { Icons } from "../assets";
import { useSelector } from "react-redux";
export function Header() {
  const { totalItems } = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const handleToCart = () => {
    navigate("/cart");
  };
  const handleAdminLogin = () => {
    navigate("/admin/login");
  };
  return (
    <>
      <header className="sticky top-0 left-0 right-0 bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="w-32">
              <Icons.LogoName />
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link
                to="/menu"
                className="text-gray-700 hover:text-orange-600 transition"
              >
                Меню
              </Link>
              <Link
                to="/gallery"
                className="text-gray-700 hover:text-orange-600 transition"
              >
                Галерея
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <a
                href="tel:+996700123456"
                className="hidden lg:block text-orange-600 font-semibold"
              >
                +996 700 123 456
              </a>
              <button
                onClick={handleToCart}
                className="relative p-2 text-gray-700 hover:text-orange-600"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsFavoritesOpen(true)}
                className="relative p-2 text-gray-700 hover:text-orange-600"
              >
                <HeartIcon className="w-6 h-6" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700"
              >
                {isMenuOpen ? (
                  <XIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
              <button
                onClick={handleAdminLogin}
                className="relative p-2 text-gray-700 hover:text-orange-600"
              >
                login
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-2 bg-white rounded shadow-md p-4 space-y-4">
              <Link
                to="/menu"
                className="block text-gray-700 hover:text-orange-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Меню
              </Link>
              <Link
                to="/gallery"
                className="block text-gray-700 hover:text-orange-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Галерея
              </Link>

              <a
                href="tel:+996700123456"
                className="block text-orange-600 font-semibold"
              >
                +996 700 123 456
              </a>
            </div>
          )}
        </div>
      </header>

      <FavoritesSidebar
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
      />
    </>
  );
}
