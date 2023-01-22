import React from "react";

const Order = ({ orderInfo }) => {
  if (!orderInfo.length) return <p>No Order available</p>;
  return (
    <div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-lg font-medium mb-4">
            Order ID: {orderInfo.orderId}
          </div>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="text-gray-600 font-medium p-2">Title</th>
                <th className="text-gray-600 font-medium p-2">Count</th>
              </tr>
            </thead>
            <tbody>
              {orderInfo.order.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.title}</td>
                  <td className="border p-2">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default Order;
