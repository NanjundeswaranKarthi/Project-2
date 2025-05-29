
// import React from "react";
// import { 
//   Card, 
//   CardContent, 
//   CardDescription, 
//   CardHeader, 
//   CardTitle 
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
// import { ShoppingBag, Users, Clock, Package, RefreshCcw, Truck } from "lucide-react";
// import { LineChart, Line } from 'recharts';
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


// // Mock data for the dashboard
// const orderData = [
//   { name: 'Jan', orders: 65 },
//   { name: 'Feb', orders: 59 },
//   { name: 'Mar', orders: 80 },
//   { name: 'Apr', orders: 81 },
//   { name: 'May', orders: 56 },
//   { name: 'Jun', orders: 55 },
//   { name: 'Jul', orders: 40 },
// ];

// const salesData = [
//   { name: 'Jan', sales: 4000 },
//   { name: 'Feb', sales: 3000 },
//   { name: 'Mar', sales: 5000 },
//   { name: 'Apr', sales: 8000 },
//   { name: 'May', sales: 6000 },
//   { name: 'Jun', sales: 7000 },
//   { name: 'Jul', sales: 9000 },
// ];

// const orderStatusData = [
//   { name: 'Processing', value: 25, color: '#f59e0b' },
//   { name: 'Shipped', value: 35, color: '#3b82f6' },
//   { name: 'Delivered', value: 30, color: '#10b981' },
//   { name: 'Cancelled', value: 10, color: '#ef4444' },
// ];

// const yearlySalesData = [
//   { year: '2020', sales: 45000 },
//   { year: '2021', sales: 62000 },
//   { year: '2022', sales: 78000 },
//   { year: '2023', sales: 91000 },
//   { year: '2024', sales: 105000 },
// ];

// const inventoryData = [
//   {
//     category: 'Sarees',
//     products: [
//       { name: 'Red Silk Saree', stock: 10, sold: 40, price: 2000 },
//       { name: 'Green Cotton Saree', stock: 5, sold: 25, price: 1500 },
//     ],
//   },
//   {
//     category: 'Blouses',
//     products: [
//       { name: 'Embroidered Blouse', stock: 8, sold: 20, price: 1200 },
//       { name: 'Plain Cotton Blouse', stock: 15, sold: 30, price: 800 },
//     ],
//   },
// ];


// const Dashboard = () => {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
//         <p className="text-muted-foreground">
//           Overview of your store's performance and statistics.
//         </p>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         <Card className="border-l-4 border-l-saree-500">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
//             <ShoppingBag className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">1,456</div>
//           </CardContent>
//         </Card>
        
//         <Card className="border-l-4 border-l-status-pending">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Total Customer</CardTitle>
//             <Clock className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">25</div>
//           </CardContent>
//         </Card>

//         <Card className="border-l-4 border-l-gold-500">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               className="h-4 w-4 text-muted-foreground"
//             >
//               <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//             </svg>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">₹2,45,600</div>
//           </CardContent>
//         </Card>

//         <Card className="border-l-4 border-l-status-info">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Products in Stock</CardTitle>
//             <Package className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">258</div>
//           </CardContent>
//         </Card>

//         <Card className="border-l-4 border-l-status-error">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Out of Stocks Products</CardTitle>
//             <RefreshCcw className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">12</div>
            
//           </CardContent>
//         </Card>

//         <Card className="border-l-4 border-l-status-success">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">Active Staff</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">8</div>
//             <p className="text-xs text-muted-foreground mt-1">
//               2 new staff added this month
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//      <div className="grid gap-40 md:grid-cols-2">
//   {/* First Card */}
//   <Card className="w-full">
//     <CardHeader className="flex items-center justify-between">
//       <CardTitle>Low Stock Alerts</CardTitle>
//       <div className="text-sm font-medium text-muted-foreground bg-red-100 text-red-600 px-3 py-1 rounded-full">
//         4 Items
//       </div>
//     </CardHeader>
//     <CardContent className="space-y-4">
//       {[
//         { name: "Maroon Wedding Silk Saree", remaining: 5 },
//         { name: "Royal Blue Kanjeevaram Saree", remaining: 4 },
//         { name: "Gold Zari Banarasi Saree", remaining: 3 },
//         { name: "Red Bridal Pure Silk Saree", remaining: 2 },
//       ].map((item, index) => (
//         <div
//           key={index}
//           className="border rounded-lg px-4 py-3 bg-red-50 flex flex-col md:flex-row md:items-center md:justify-between"
//         >
//           <p className="font-medium">{item.name}</p>
//           <div className="flex items-center gap-4 mt-2 md:mt-0">
//             <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded-full">
//               {item.remaining} remaining
//             </span>
//             <button className="text-sm bg-white border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100 transition">
//               Restock Now
//             </button>
//           </div>
//         </div>
//       ))}
//     </CardContent>
//   </Card>

//   {/* Second Card */}
//   <Card className="w-[600px]">

//     <CardHeader className="flex items-center justify-between">
//       <CardTitle>Top Selling Sarees</CardTitle>
//     </CardHeader>
//     <CardContent className="space-y-4">
//       {[
//         { name: "Pink Banarasi Silk Saree", sold: 152, revenue: 164000 },
//         { name: "Royal Blue Kanjeevaram Saree", sold: 134, revenue: 140700 },
//         { name: "Maroon Wedding Silk Saree", sold: 126, revenue: 138600, lowStock: 5 },
//         { name: "Beige Embroidered Georgette Saree", sold: 115, revenue: 97750 },
//         { name: "Green Chanderi Cotton Saree", sold: 102, revenue: 86700 },
//       ].map((item, index) => (
//         <div
//           key={index}
//           className="flex flex-col md:flex-row md:justify-between md:items-center"
//         >
//           <div>
//             <p className="font-medium">{item.name}</p>
//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <span>Sold: {item.sold}</span>
//               {item.lowStock && (
//                 <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
//                   Low stock: {item.lowStock}
//                 </span>
//               )}
//             </div>
//           </div>
//           <div className="text-right md:text-left mt-2 md:mt-0">
//             <p className="text-lg font-semibold text-gold-700">
//               ₹{item.revenue.toLocaleString()}
//             </p>
//             <p className="text-xs text-muted-foreground">Revenue</p>
//           </div>
//         </div>
//       ))}
//     </CardContent>
//   </Card>
  
// </div>


//       </div>

//   );
// };

// export default Dashboard;


import { useState } from "react";
import { SalesOverview } from "@/components/SalesOverview";
import { InventoryManagement } from "@/components/InventoryManagement";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatsCards } from "@/components/StatsCards";
import { LowStockAlerts } from "@/components/LowStockAlerts";
import { TopSellingSarees } from "@/components/TopSellingSarees";
import { YearlySalesGraph } from "@/components/YearlySalesGraph";

// const Index = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//         <div className="sidebar w-100 bg-white shadow-md"> {/* Sidebar component here */} </div>
//       <div className="container mx-auto px-4 py-6 max-w-9xl">
//         <DashboardHeader />
//         <StatsCards />
//         <div className="space-y-6 mt-6">
//           <SalesOverview />
//           <InventoryManagement />
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <LowStockAlerts />
//             <TopSellingSarees />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Index;

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Sidebar */}
      <div className="w-10 bg-white shadow-md">
        {/* Sidebar content */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 py-6">
          <DashboardHeader />
          <StatsCards />
          <div className="space-y-6 mt-6">
            <SalesOverview />
               <YearlySalesGraph />
            <InventoryManagement />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LowStockAlerts />
              <TopSellingSarees />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

