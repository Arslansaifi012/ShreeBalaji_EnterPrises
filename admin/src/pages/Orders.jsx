import React from "react";
import { useEffect, useState } from "react";
import {
  backendUrl,
  currency,
} from "../../../frontend/src/context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllOrders();
    }
  }, [token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: newStatus },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Order status updated successfully");
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status");
    }
  };


  const downloadInvoice = async (id) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/order/pdf/${id}`,
      {
        responseType: "blob", // IMPORTANT
        headers: { token }
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `order-${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.log('download invoice Error',error.message);
    toast.error("Failed to download invoice");
  }
};

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-3xl font-bold mb-8 text-gray-800">Order History</h3>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <img
                      src={assets.parcel_icon}
                      alt="Parcel"
                      className="w-8 h-8"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          Order #{order._id.slice(-6).toUpperCase()}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleString()}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {currency}
                        {order.amount}
                      </span>
                    </div>

                    <div className="mt-4">
                      <h5 className="font-medium text-gray-700 mb-2">Items:</h5>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <p className="text-gray-600">
                              {item.name} x {item.quantity}{" "}
                              {item.size && (
                                <span className="text-gray-500">
                                  ({item.size})
                                </span>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">
                          Shipping Address:
                        </h5>
                        <p className="text-gray-600">
                          {order.address.firstName} {order.address.lastName}
                        </p>
                        <p className="text-gray-600">{order.address.street}</p>
                        <p className="text-gray-600">
                          {order.address.city}, {order.address.state}{" "}
                          {order.address.zipcode}
                        </p>
                        <p className="text-gray-600">{order.address.country}</p>
                        <p className="text-gray-600 mt-2">
                          Phone: {order.address.phone}
                        </p>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">
                          Order Details:
                        </h5>
                        <div className="space-y-1">
                          <p className="text-gray-600">
                            Items: {order.items.length}
                          </p>
                          <p className="text-gray-600">
                            Method: {order.paymentMethod}
                          </p>
                          <p className="text-gray-600">
                            Payment:{" "}
                            <span
                              className={
                                order.payment
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              {order.payment ? "Paid" : "Not Paid"}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <select
                        defaultValue={order.status || "OrderPlaced"}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="OrderPlaced">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">
                          Out for delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                      </select>

                    <button
  onClick={() => downloadInvoice(order._id)}
  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
>
  Download Invoice
</button>


                      <div className="text-sm text-gray-500">
                        Current status:{" "}
                        <span className="font-medium capitalize">
                          {order.status?.replace(/([A-Z])/g, " $1").trim() ||
                            "Order Placed"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
