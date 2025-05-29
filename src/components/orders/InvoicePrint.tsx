
import React, { forwardRef } from "react";
import { formatDate, formatCurrency } from "@/lib/utils";

interface InvoiceItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface InvoiceAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface InvoiceProps {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  paymentStatus: string;
  paymentMethod: string;
  shippingAddress: InvoiceAddress;
  billingAddress: InvoiceAddress;
}

const InvoicePrint = forwardRef<HTMLDivElement, InvoiceProps>(
  (
    {
      id,
      date,
      customerName,
      customerEmail,
      customerPhone,
      items,
      subtotal,
      tax,
      shipping,
      discount,
      total,
      paymentStatus,
      paymentMethod,
      shippingAddress,
      billingAddress,
    },
    ref
  ) => {
    return (
      <div 
        ref={ref} 
        className="bg-white p-8 max-w-4xl mx-auto"
        data-print="invoice"
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
            <p className="text-gray-600">{id}</p>
            <p className="text-gray-600">Date: {formatDate(date)}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold">Saree E-Commerce</h2>
            <p className="text-gray-600">123 Fashion Street</p>
            <p className="text-gray-600">Mumbai, Maharashtra 400001</p>
            <p className="text-gray-600">India</p>
            <p className="text-gray-600">GST: 27AAAAA0000A1Z5</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Bill To:</h3>
            <p className="text-gray-700">{billingAddress.name}</p>
            <p className="text-gray-600">{billingAddress.address}</p>
            <p className="text-gray-600">
              {billingAddress.city}, {billingAddress.state} {billingAddress.postalCode}
            </p>
            <p className="text-gray-600">{billingAddress.country}</p>
            <p className="text-gray-600 mt-2">{customerEmail}</p>
            <p className="text-gray-600">{customerPhone}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Ship To:</h3>
            <p className="text-gray-700">{shippingAddress.name}</p>
            <p className="text-gray-600">{shippingAddress.address}</p>
            <p className="text-gray-600">
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
            </p>
            <p className="text-gray-600">{shippingAddress.country}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-2">Payment Information:</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">
                <span className="font-medium">Status:</span> {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <span className="font-medium">Method:</span> {paymentMethod}
              </p>
            </div>
          </div>
        </div>

        <table className="min-w-full border-collapse mb-8">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="py-2 px-4 text-left">Item</th>
              <th className="py-2 px-4 text-right">Price</th>
              <th className="py-2 px-4 text-right">Quantity</th>
              <th className="py-2 px-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(item.price)}</td>
                <td className="py-3 px-4 text-right">{item.quantity}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Subtotal:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Shipping:</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Tax:</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between py-1 text-green-600">
                <span>Discount:</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between py-1 text-lg font-bold border-t mt-2">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-4">
          <p className="text-center text-gray-600 text-sm">
            Thank you for your business! For any questions regarding this invoice, please contact us at
            support@saree-ecommerce.com or call +91 9876543210.
          </p>
        </div>
      </div>
    );
  }
);

InvoicePrint.displayName = "InvoicePrint";

export default InvoicePrint;
