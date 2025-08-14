import React, { useState } from "react";
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from "../../store/slices/orderSlice";
const OrderManagement = () => {
  const { data: orders = [], isLoading } = useGetOrdersQuery();
  console.log("orders: ", orders);
  const [updateOrderStatus, { isLoading: isUpdatingStatus }] =
    useUpdateOrderStatusMutation();

  const [filterStatus, setFilterStatus] = useState("all");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const statusOptions = [
    {
      value: "pending",
      label: "Күтүлүүдө",
      color: "bg-yellow-100 text-yellow-800",
    },
    { value: "ready", label: "Даяр", color: "bg-green-100 text-green-800" },
    {
      value: "delivered",
      label: "Жеткирилди",
      color: "bg-gray-100 text-gray-800",
    },
  ];

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingOrderId(orderId);
      await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();
    } catch (error) {
      console.error("Статус өзгөртүүдө ката:", error);
      alert("Статус өзгөртүүдө ката кетти");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find((opt) => opt.value === status);
    return statusOption ? statusOption.color : "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status) => {
    const statusOption = statusOptions.find((opt) => opt.value === status);
    return statusOption ? statusOption.label : status;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
        <p className="ml-4 text-gray-600">Заказдар жүктөлүүдө...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Заказ башкаруу</h2>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Статус:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          >
            <option value="all">Баардык</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid gap-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Заказ табылган жок</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className={`bg-white rounded-lg shadow p-6 ${
                updatingOrderId === order.id ? "opacity-50" : ""
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Заказ #{order.order_number}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.created_at).toLocaleDateString("ky-KG")} -
                    {new Date(order.created_at).toLocaleTimeString("ky-KG")}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusLabel(order.status)}
                  </span>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    disabled={updatingOrderId === order.id}
                    className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 disabled:opacity-50"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {updatingOrderId === order.id && (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600 mr-2"></div>
                      <span className="text-sm text-gray-600">
                        Өзгөртүлүүдө...
                      </span>
                    </div>
                  )}
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

export default OrderManagement;
