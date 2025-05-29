
import React from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  ShoppingBag,
  ListOrdered,
  Users,
  Tag,
  Settings,
  ChevronRight,
  Icon,
  Users2,
  TagsIcon,
  Lock,
  Shield,
  UserCircle,
  Code2Icon,
  Star,
  Ticket,
  Logs,
  TestTube,
} from "lucide-react";

import CustomersPage from "@/pages/Customers";
import { Avatar } from "@radix-ui/react-avatar";
import Orders from "@/pages/Orders";
import CustomerOrdersPage from "@/pages/CustomerOrders";


interface SidebarProps {
  collapsed: boolean;
}

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active: boolean;
  disabled?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  icon,
  label,
  collapsed,
  active,
  disabled = false,
}) => {
  if (disabled) {
    return (
      <div
        className={cn(
          "flex items-center py-3 px-4 my-1 text-sidebar-foreground/60 cursor-not-allowed",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="w-5 h-5">{icon}</div>
          {!collapsed && <span>{label}</span>}
        </div>
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center py-3 px-4 my-1 rounded-lg transition-colors",
        collapsed ? "justify-center" : "justify-between",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-5 h-5">{icon}</div>
        {!collapsed && <span>{label}</span>}
      </div>
      {!collapsed && active && (
        <ChevronRight className="w-4 h-4 text-sidebar-accent-foreground" />
      )}
    </Link>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  const { hasPermission } = useAuth();

  return (
    <div
      className={cn(
        "bg-sidebar h-screen shrink-0 border-r border-sidebar-border transition-all duration-300 overflow-y-auto overflow-x-hidden",
        collapsed ? "w-18" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-center h-16 border-b border-sidebar-border">
        {collapsed ? (
          <div className="w-8 h-8 bg-saree-400 text-white rounded-full flex items-center justify-center font-bold">S</div>
        ) : (
          <div className="text-sidebar-foreground text-xl font-bold flex items-center">
            <span className="text-gold-500">D</span>
            <span>Solutions</span>
          </div>
        )}
      </div>

      <div className="py-4 px-2">
        <SidebarItem
          to="/dashboard"
          icon={<LayoutDashboard />}
          label="Dashboard"
          collapsed={collapsed}
          active={location.pathname === "/dashboard"}
        />
        
        <SidebarItem
          to="/orders"
          icon={<ListOrdered />}
          label="Orders"
          collapsed={collapsed}
          active={location.pathname.startsWith("/orders")}
          disabled={!hasPermission("canManageOrders")}
        />
        
        <SidebarItem
          to="/products"
          icon={<ShoppingBag />}
          label="Products"
          collapsed={collapsed}
          active={location.pathname.startsWith("/products")}
          disabled={!hasPermission("canManageProducts")}
        />
        
        <SidebarItem
          to="/categories"
          icon={<Tag />}
          label="Categories"
          collapsed={collapsed}
          active={location.pathname.startsWith("/categories")}
          disabled={!hasPermission("canManageCategories")}
        />

        
         <SidebarItem
              to="/customers"
              icon={<Users2 />} 
              label="Customers"
              collapsed={collapsed}
              active={location.pathname.startsWith("/customers")}
            />

           <SidebarItem
                to="/customer-orders"
                icon={<UserCircle />} // use any icon you prefer
                label="Customer Orders"
                collapsed={collapsed}
                active={location.pathname.startsWith("/customer-orders")}
              />

                <SidebarItem
                  to="/reviews-section"
                  icon={<Star />}  // Material UI icon
                  label="Customer Reviews"
                  collapsed={collapsed}
                  active={location.pathname.startsWith("/reviews-section")}
/>
        
        <SidebarItem
          to="/staff"
          icon={<Shield />}
          label="Staff Management"
          collapsed={collapsed}
          active={location.pathname.startsWith("/staff")}
          disabled={!hasPermission("canManageStaff")}
        />
        <SidebarItem
          to="/role-management"
          icon={<Lock />} // Using the ShieldLock icon for Role Management
          label="Role Management"
          collapsed={collapsed}
          active={location.pathname.startsWith("/role-management")}
          disabled={!hasPermission("canManageRoles")} // Permission check for Role Management
/>
   <SidebarItem
          to="/Coupon-Management"
          icon={<Ticket />}
          label="Coupon Management"
          collapsed={collapsed}
          active={location.pathname.startsWith("/Coupon-Management")}
        />
        <SidebarItem
          to="/Add-Coupon"
          icon={<Code2Icon />}
          label="Add Coupon"
          collapsed={collapsed}
          active={location.pathname.startsWith("/Add Coupon")}
        />

         <SidebarItem
                  to="/Audit-Logs"
                  icon={<Logs />}  // Material UI icon
                  label="Audit Logs"
                  collapsed={collapsed}
                  active={location.pathname.startsWith("/Audit-Logs")}
/>
 <SidebarItem
                  to="/new-test"
                  icon={<TestTube />}  // Material UI icon
                  label="New Test"
                  collapsed={collapsed}
                  active={location.pathname.startsWith("/new-test")}
/>

        <SidebarItem
          to="/settings"
          icon={<Settings />}
          label="Settings"
          collapsed={collapsed}
          active={location.pathname.startsWith("/settings")}
        />
     
      </div>
    </div>
  );
};

export default Sidebar;
