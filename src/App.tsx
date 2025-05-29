
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "@/components/layout/AppLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Orders from "@/pages/Orders";
import OrderDetail from "@/pages/OrderDetail";
import Products from "@/pages/Products";
import AddProduct from "@/pages/AddProduct";
import Categories from "@/pages/Categories";
import CustomersPage from "@/pages/Customers";
import CustomerOrdersPage from "@/pages/CustomerOrders";
import StaffManagement from "@/pages/StaffManagement";
import AuditLogsPage from "@/pages/AuditLog";
import ReviewsPageSection from "@/pages/CustomerReviews"; 
import RoleManagement from "@/pages/RoleManagement";
import CouponManagement from "@/pages/CouponManagement";
import AddCoupon from "@/pages/AddCoupon"
import NewTest from "@/pages/NewTest"
import NotFound from "@/pages/NotFound";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="categories" element={<Categories />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/customer-orders" element={<CustomerOrdersPage />} />
            <Route path="/Audit-Logs" element={<AuditLogsPage />} />
            <Route path="/reviews-section" element={<ReviewsPageSection />} />
            <Route path="staff" element={<StaffManagement />} />
            <Route path="/role-management" element={<RoleManagement/>} />
            <Route path="/Coupon-management" element={<CouponManagement/>} />
            <Route path="/Add-Coupon" element={<AddCoupon/>} />
             <Route path="/new-test" element={<NewTest/>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster />
        <Sonner />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
