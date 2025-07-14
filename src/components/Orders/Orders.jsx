import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getOrders() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/`,
        {
          headers: {
            token: localStorage.getItem("usertoken"),
          },
        }
      );

      // تأكد إن البيانات Array
      setOrders(data?.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);


  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">All Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-300 rounded-lg p-6 bg-white shadow"
            >
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Order ID: {order.id}
              </h3>
              <p className="text-gray-600 mb-1">
                Payment Method:{" "}
                <span className="text-black font-medium">
                  {order.paymentMethodType}
                </span>
              </p>
              <p className="text-gray-600 mb-1">
                Total Price:{" "}
                <span className="text-black font-medium">
                  {order.totalOrderPrice} EGP
                </span>
              </p>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Products:</h4>
                <ul className="list-disc ml-6 space-y-1">
                  {order.cartItems.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item.product.title} - Quantity: {item.count}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}