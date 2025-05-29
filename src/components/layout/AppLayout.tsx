import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const AppLayout = () => {
  const { user, loading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-saree-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Sidebar */}
        <div className={cn(
          "h-full transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-16" : "w-64"
        )}>
          <Sidebar collapsed={sidebarCollapsed} />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <Header
            sidebarCollapsed={sidebarCollapsed}
            toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          
          <main className="flex-1 overflow-y-auto p-6 bg-background">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AppLayout;
