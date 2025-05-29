
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

// Define possible user roles
export type UserRole = 'super_admin' | 'product_manager' | 'order_manager' | 'support_agent';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

// Define permissions for each role
export const rolePermissions = {
  super_admin: {
    canViewDashboard: true,
    canManageProducts: true,
    canManageCategories: true,
    canManageOrders: true,
    canManageStaff: true,
    canManageRoles: true,
  },
  product_manager: {
    canViewDashboard: true,
    canManageProducts: true,
    canManageCategories: true,
    canManageOrders: false,
    canManageStaff: false,
    canManageRoles: false,
  },
  order_manager: {
    canViewDashboard: true,
    canManageProducts: false,
    canManageCategories: false,
    canManageOrders: true,
    canManageStaff: false,
    canManageRoles: false,
  },
  support_agent: {
    canViewDashboard: true,
    canManageProducts: false,
    canManageCategories: false,
    canManageOrders: true,
    canManageStaff: false,
    canManageRoles: false,
  },
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: keyof typeof rolePermissions.super_admin) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'admin@sareecommerce.com',
    role: 'super_admin',
    isActive: true,
  },
  {
    id: '2',
    name: 'Product Manager',
    email: 'product@sareecommerce.com',
    role: 'product_manager',
    isActive: true,
  },
  {
    id: '3',
    name: 'Order Manager',
    email: 'order@sareecommerce.com',
    role: 'order_manager',
    isActive: true,
  },
  {
    id: '4',
    name: 'Support Agent',
    email: 'support@sareecommerce.com',
    role: 'support_agent',
    isActive: true,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('saree-admin-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        localStorage.removeItem('saree-admin-user');
      }
    }
    setLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user with matching email
    const foundUser = mockUsers.find(u => u.email === email);
    
    // Check if user exists and is active
    if (foundUser && foundUser.isActive) {
      // In a real app, you would verify the password here
      // For demo purposes, we'll accept any password
      if (password.length > 0) {
        setUser(foundUser);
        localStorage.setItem('saree-admin-user', JSON.stringify(foundUser));
        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
        navigate('/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid password. Please try again.",
        });
      }
    } else if (foundUser && !foundUser.isActive) {
      toast({
        variant: "destructive",
        title: "Account disabled",
        description: "Your account has been disabled. Please contact administrator.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "No account found with this email.",
      });
    }
    
    setLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('saree-admin-user');
    navigate('/');
    toast({
      title: "Logged out successfully",
    });
  };

  // Check if current user has a specific permission
  const hasPermission = (permission: keyof typeof rolePermissions.super_admin) => {
    if (!user) return false;
    return rolePermissions[user.role][permission];
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
