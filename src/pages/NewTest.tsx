import React, { useState } from "react";

const ordersData = [
  {
    orderId: "8A6E",
    datetime: "2025-04-05T15:27",
    address: "Coimbatore",
    phone: "8098629606",
    method: "Cash",
    amount: "Rs. 879.32",
    status: "Pending",
  },
  {
    orderId: "5B3C",
    datetime: "2025-04-06T11:15",
    address: "Chennai",
    phone: "9876543210",
    method: "Card",
    amount: "Rs. 150.00",
    status: "Delivered",
  },
  {
    orderId: "2D9F",
    datetime: "2025-04-06T14:40",
    address: "Bangalore",
    phone: "9123456780",
    method: "UPI",
    amount: "Rs. 420.50",
    status: "Cancelled",
  },
];

const statusColors = {
  Pending: "bg-blue-100 text-blue-600",
  Delivered: "bg-green-100 text-green-600",
  Cancelled: "bg-red-100 text-red-600",
};

const CustomerOrdersPage = () => {
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch = order.orderId.toLowerCase().includes(search.toLowerCase());
    const matchesDate = !filterDate || order.datetime.startsWith(filterDate);
    const matchesMethod = !paymentMethod || order.method === paymentMethod;
    return matchesSearch && matchesDate && matchesMethod;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-1">Customer Orders</h1>
      <p className="text-gray-600 mb-4">View and manage individual customer order history.</p>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Customer Order List - Mainul Islam Jidan</h2>
          <p className="text-sm text-gray-500">Manage your customer order base</p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by Order ID"
            className="border rounded px-3 py-2 w-full sm:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="date"
            className="border rounded px-3 py-2 w-full sm:w-1/3"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border rounded px-3 py-2 w-full sm:w-1/3"
          >
            <option value="">All Methods</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-700">ORDER ID</th>
                <th className="px-4 py-3 font-medium text-gray-700">DATETIME</th>
                <th className="px-4 py-3 font-medium text-gray-700">SHIPPING ADDRESS</th>
                <th className="px-4 py-3 font-medium text-gray-700">PHONE</th>
                <th className="px-4 py-3 font-medium text-gray-700">METHOD</th>
                <th className="px-4 py-3 font-medium text-gray-700">AMOUNT</th>
                <th className="px-4 py-3 font-medium text-gray-700">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{order.orderId}</td>
                  <td className="px-4 py-3">
                    {new Date(order.datetime).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-4 py-3">{order.address}</td>
                  <td className="px-4 py-3">{order.phone}</td>
                  <td className="px-4 py-3">{order.method}</td>
                  <td className="px-4 py-3">{order.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-6">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrdersPage;
