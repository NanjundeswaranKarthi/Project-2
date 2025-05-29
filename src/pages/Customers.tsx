import React, { useState } from 'react';
import { Search, PenLine, Trash, Eye, Plus, Download } from "lucide-react";

const customersData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    joined: '2024-02-15',
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    joined: '2024-03-12',
    avatar: 'https://i.pravatar.cc/100?img=2',
  },
  {
    id: 3,
    name: 'Alex Johnson',
    email: 'alex@example.com',
    joined: '2024-01-28',
    avatar: 'https://i.pravatar.cc/100?img=3',
  },
];

export default function CustomersPage() {
  const [searchName, setSearchName] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const filteredCustomers = customersData.filter((customer) =>
    customer.name.toLowerCase().includes(searchName.toLowerCase()) &&
    (!filterDate || customer.joined === filterDate)
  );

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Customers</h1>
      <p className="text-gray-600 mb-6">Manage your store's customers</p>

      {/* Card */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* Card Title */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Customer List</h2>
          <p className="text-sm text-gray-500">Manage your customer base</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4 space-y-3 md:space-y-0">
          <input
            type="text"
            placeholder="Search by name"
            className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/3 focus:outline-none focus:ring"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/3 focus:outline-none focus:ring"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-t">
            <thead className="bg-gray-100 text-gray-700 font-medium">
              <tr>
                <th className="px-6 py-3">Joining Date</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{customer.joined}</td>
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-800">{customer.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{customer.email}</td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <button className="text-blue-700 hover:text-blue-600">
                      <Eye size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {/* {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No customers found.
                  </td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
