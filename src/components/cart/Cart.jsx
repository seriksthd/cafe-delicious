import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../store/slices/cartSlice";
import { useCreateOrderMutation } from "../../store/slices/orderSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const [customerInfo, setCustomerInfo] = useState({
    client_name: "",
    phone: "",
  });

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(
        updateQuantity({ product_id: productId, quantity: newQuantity })
      );
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!customerInfo.client_name || !customerInfo.phone) {
      alert("Аты-жөнүңүздү жана телефон номуруңузду жазыңыз");
      return;
    }

    if (items.length === 0) {
      alert("Корзина бош");
      return;
    }

    try {
      const orderData = {
        cart_items: items,
        client_name: customerInfo.client_name,
        phone: customerInfo.phone,
        total_price: totalPrice,
      };

      await createOrder(orderData).unwrap();
      dispatch(clearCart());
      navigate("/order-success");
    } catch (error) {
      console.error("Заказ берүүдө ката:", error);
      alert("Заказ берүүдө ката кетти. Кайра аракет кылыңыз.");
    }
  };

  return (
    <div>

      <div className=" mx-auto px-4 py-8 ">
        <h1 className="text-3xl font-bold mb-8">Корзина</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Корзина бош</p>
            <button
              onClick={() => navigate("/menu")}
              className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Продуктуларды көрүү
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {items.map((item) => (
                <div
                  key={item.product_id}
                  className="bg-white rounded-lg shadow-md p-6 mb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.product_name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">
                        {item.product_name}
                      </h3>
                      <p className="text-amber-600 font-semibold">
                        {item.price} сом
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.product_id,
                            item.quantity - 1
                          )
                        }
                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-gray-100 rounded">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.product_id,
                            item.quantity + 1
                          )
                        }
                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {item.price * item.quantity} сом
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.product_id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Өчүрүү
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Заказ берүү</h2>

                <form onSubmit={handleSubmitOrder}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Аты-жөнү *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.client_name}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          client_name: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Телефон номуру *
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                      placeholder="+996 700 123 456"
                      required
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">
                        Жалпы сумма:
                      </span>
                      <span className="text-xl font-bold text-amber-600">
                        {totalPrice} сом
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? "Жөнөтүлүүдө..." : "Заказ берүү"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
