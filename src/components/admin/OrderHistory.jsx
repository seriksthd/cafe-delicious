import { useState } from "react";
import {
  useGetOrderHistoryQuery,
  useDeleteOrderMutation,
  useBulkDeleteOrdersMutation,
  useClearOrderHistoryMutation,
} from "../../store/slices/orderSlice";

const OrderHistory = () => {
  const { data: orders = [], isLoading } = useGetOrderHistoryQuery();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const [bulkDeleteOrders, { isLoading: isBulkDeleting }] =
    useBulkDeleteOrdersMutation();
  const [clearOrderHistory, { isLoading: isClearing }] =
    useClearOrderHistoryMutation();

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(orders.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders((prev) => {
      if (prev.includes(orderId)) {
        return prev.filter((id) => id !== orderId);
      } else {
        return [...prev, orderId];
      }
    });
  };

  const handleDeleteSingle = async (orderId) => {
    if (window.confirm("Бул заказды өчүрөсүзбү?")) {
      try {
        setDeletingId(orderId);
        await deleteOrder(orderId).unwrap();
      } catch (error) {
        console.error("Заказ өчүрүүдө ката:", error);
        alert("Заказ өчүрүүдө ката кетти");
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedOrders.length === 0) {
      alert("Өчүрүү үчүн заказдарды тандаңыз");
      return;
    }

    if (window.confirm(`${selectedOrders.length} заказды өчүрөсүзбү?`)) {
      try {
        await bulkDeleteOrders(selectedOrders).unwrap();
        setSelectedOrders([]);
        setShowBulkActions(false);
      } catch (error) {
        console.error("Заказдарды өчүрүүдө ката:", error);
        alert("Заказдарды өчүрүүдө ката кетти");
      }
    }
  };

  const handleClearHistory = async () => {
    if (
      window.confirm("Бардык историяны тазалоосузбу? Бул аракет кайтарылбайт!")
    ) {
      try {
        await clearOrderHistory().unwrap();
        setSelectedOrders([]);
        setShowBulkActions(false);
      } catch (error) {
        console.error("Историяны тазалоодо ката:", error);
        alert("Историяны тазалоодо ката кетти");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
        <p className="ml-4 text-gray-600">Тарых жүктөлүүдө...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Заказдар тарыхы</h2>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowBulkActions(!showBulkActions)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showBulkActions ? "Жашыруу" : "Тандоо режими"}
          </button>

          {showBulkActions && (
            <>
              <button
                onClick={handleBulkDelete}
                disabled={selectedOrders.length === 0 || isBulkDeleting}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center"
              >
                {isBulkDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Өчүрүлүүдө...
                  </>
                ) : (
                  `Тандалганды өчүрүү (${selectedOrders.length})`
                )}
              </button>
              <button
                onClick={handleClearHistory}
                disabled={isClearing}
                className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900 transition-colors disabled:opacity-50 flex items-center"
              >
                {isClearing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Тазалануудо...
                  </>
                ) : (
                  "Бардыгын тазалоо"
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {showBulkActions && (
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={
                  selectedOrders.length === orders.length && orders.length > 0
                }
                onChange={handleSelectAll}
                className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                disabled={isBulkDeleting || isClearing}
              />
              <span className="text-sm font-medium">Баардыгын тандоо</span>
            </label>

            <div className="text-sm text-gray-600">
              {selectedOrders.length} заказ тандалды {orders.length} ичинен
            </div>
          </div>
        </div>
      )}

      {/* Orders Grid */}
      <div className="grid gap-6">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Тарыхта заказ жок</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className={`bg-white rounded-lg shadow p-6 border-l-4 border-green-500 ${
                deletingId === order.id || isBulkDeleting || isClearing
                  ? "opacity-50"
                  : ""
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  {showBulkActions && (
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                      disabled={isBulkDeleting || isClearing}
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">
                      Заказ #{order.id.slice(-8)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString("ru-RU")} -{" "}
                      {new Date(order.created_at).toLocaleTimeString("ru-RU")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    ✅ Жеткирилди
                  </span>

                  <button
                    onClick={() => handleDeleteSingle(order.id)}
                    disabled={
                      deletingId === order.id || isBulkDeleting || isClearing
                    }
                    className="text-red-600 hover:text-red-800 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 flex items-center"
                  >
                    {deletingId === order.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                        Өчүрүлүүдө...
                      </>
                    ) : (
                      "🗑️ Өчүрүү"
                    )}
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium mb-2">Клиент маалыматы:</h4>
                  <p className="text-sm text-gray-600">
                    Аты: {order.client_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Телефон: {order.phone}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Заказ маалыматы:</h4>
                  <p className="text-sm text-gray-600">
                    Продукт саны: {order.cart_items.length}
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">
                    Жалпы сумма: {order.total_price} сом
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Продуктулар:</h4>
                <div className="space-y-2">
                  {order.cart_items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.product_name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.product_name}</p>
                        <p className="text-sm text-gray-600">
                          {item.price} сом x {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {item.price * item.quantity} сом
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
