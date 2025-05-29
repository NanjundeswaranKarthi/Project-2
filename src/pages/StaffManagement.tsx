import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole, useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { Plus, Search, PenLine, Trash, Eye } from "lucide-react";

// Mock staff data
const initialStaff = [
  {
    id: "1",
    name: "Super Admin",
    email: "admin@sareecommerce.com",
    role: "super_admin" as UserRole,
    isActive: true,
    lastLogin: "2023-05-01T10:30:00",
  },
  {
    id: "2",
    name: "Product Manager",
    email: "product@sareecommerce.com",
    role: "product_manager" as UserRole,
    isActive: true,
    lastLogin: "2023-05-02T09:15:00",
  },
  {
    id: "3",
    name: "Order Manager",
    email: "order@sareecommerce.com",
    role: "order_manager" as UserRole,
    isActive: true,
    lastLogin: "2023-05-03T14:45:00",
  },
  {
    id: "4",
    name: "Support Agent",
    email: "support@sareecommerce.com",
    role: "support_agent" as UserRole,
    isActive: true,
    lastLogin: "2023-05-04T11:20:00",
  },
  {
    id: "5",
    name: "John Doe",
    email: "john@sareecommerce.com",
    role: "product_manager" as UserRole,
    isActive: false,
    lastLogin: "2023-04-28T16:10:00",
  },
];

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  lastLogin: string;
}

const roleLabels = {
  super_admin: "Super Admin",
  product_manager: "Product Manager",
  order_manager: "Order Manager",
  support_agent: "Support Agent",
};

// Helper function to get initials
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-IN", options);
};

const StaffManagement = () => {
  const { user } = useAuth();
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState<StaffMember | null>(null);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    role: "order_manager" as UserRole,
    password: "",
    confirmPassword: "",
  });

  // Check if user can edit another user based on roles
  const canEditUser = (staffRole: UserRole) => {
    if (!user) return false;
    // Super admin can edit anyone
    if (user.role === "super_admin") return true;
    // Others can't edit super_admin
    if (staffRole === "super_admin") return false;
    // Others can only edit users with lower privileges
    return user.id !== staffRole;
  };

  // Filter staff based on search term
  const filteredStaff = staff.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle staff active status
  const toggleActiveStatus = (id: string) => {
    setStaff(
      staff.map((member) =>
        member.id === id
          ? { ...member, isActive: !member.isActive }
          : member
      )
    );
    
    const staffMember = staff.find(s => s.id === id);
    if (staffMember) {
      toast({
        title: `Account ${staffMember.isActive ? "disabled" : "enabled"}`,
        description: `${staffMember.name}'s account is now ${staffMember.isActive ? "disabled" : "enabled"}`,
      });
    }
  };

  // Handle adding a new staff member
  const handleAddStaff = () => {
    if (newStaff.password !== newStaff.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match",
        variant: "destructive",
      });
      return;
    }
    
    const newId = (parseInt(staff[staff.length - 1].id) + 1).toString();
    const staffToAdd = {
      id: newId,
      name: newStaff.name,
      email: newStaff.email,
      role: newStaff.role,
      isActive: true,
      lastLogin: "",
    };
    
    setStaff([...staff, staffToAdd]);
    setNewStaff({
      name: "",
      email: "",
      role: "order_manager",
      password: "",
      confirmPassword: "",
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Staff member added",
      description: `${staffToAdd.name} has been added as ${roleLabels[staffToAdd.role]}`,
    });
  };

  // Handle editing a staff member
  const handleEditStaff = () => {
    if (!currentStaff) return;
    
    setStaff(
      staff.map((member) =>
        member.id === currentStaff.id ? currentStaff : member
      )
    );
    setIsEditDialogOpen(false);
    
    toast({
      title: "Staff member updated",
      description: `${currentStaff.name}'s information has been updated`,
    });
  };

  // Handle deleting a staff member
  const handleDeleteStaff = () => {
    if (!currentStaff) return;
    
    setStaff(staff.filter((member) => member.id !== currentStaff.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Staff member deleted",
      description: `${currentStaff.name} has been removed from the system`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Staff Management</h2>
          <p className="text-muted-foreground">
            Manage staff accounts and permissions
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[475px]">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>
                Create a new account for staff with appropriate role
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={newStaff.name}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={newStaff.email}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newStaff.role}
                  onValueChange={(value) =>
                    setNewStaff({ ...newStaff, role: value as UserRole })
                  }
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="product_manager">Product Manager</SelectItem>
                    <SelectItem value="order_manager">Order Manager</SelectItem>
                    <SelectItem value="support_agent">Support Agent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={newStaff.password}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, password: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={newStaff.confirmPassword}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddStaff}
                disabled={!newStaff.name || !newStaff.email || !newStaff.password || newStaff.password !== newStaff.confirmPassword}
              >
                Add Staff
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
          <CardDescription>
            View and manage staff accounts and their roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search staff..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center"
                    >
                      No staff members found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStaff.map((staffMember) => (
                    <TableRow key={staffMember.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-saree-500 text-white">
                              {getInitials(staffMember.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{staffMember.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{staffMember.email}</TableCell>
                      <TableCell>
                        <Badge variant={staffMember.role === "super_admin" ? "default" : "secondary"}>
                          {roleLabels[staffMember.role]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={staffMember.isActive}
                          onCheckedChange={() =>
                            toggleActiveStatus(staffMember.id)
                          }
                          disabled={!canEditUser(staffMember.role) || user?.id === staffMember.id}
                        />
                      </TableCell>
                      <TableCell>
                        {staffMember.lastLogin
                          ? formatDate(staffMember.lastLogin)
                          : "Never"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>

                          {/* Edit Dialog */}
                          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={!canEditUser(staffMember.role) || user?.id === staffMember.id}
                                onClick={() => setCurrentStaff(staffMember)}
                              >
                                <PenLine className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            {currentStaff && (
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Staff Member</DialogTitle>
                                  <DialogDescription>
                                    Update staff information and role
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-name">Full Name</Label>
                                    <Input
                                      id="edit-name"
                                      value={currentStaff.name}
                                      onChange={(e) =>
                                        setCurrentStaff({
                                          ...currentStaff,
                                          name: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-email">
                                      Email Address
                                    </Label>
                                    <Input
                                      id="edit-email"
                                      type="email"
                                      value={currentStaff.email}
                                      onChange={(e) =>
                                        setCurrentStaff({
                                          ...currentStaff,
                                          email: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-role">Role</Label>
                                    <Select
                                      value={currentStaff.role}
                                      onValueChange={(value) =>
                                        setCurrentStaff({
                                          ...currentStaff,
                                          role: value as UserRole,
                                        })
                                      }
                                    >
                                      <SelectTrigger id="edit-role">
                                        <SelectValue placeholder="Select role" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="super_admin">
                                          Super Admin
                                        </SelectItem>
                                        <SelectItem value="product_manager">
                                          Product Manager
                                        </SelectItem>
                                        <SelectItem value="order_manager">
                                          Order Manager
                                        </SelectItem>
                                        <SelectItem value="support_agent">
                                          Support Agent
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="reset-password">
                                      Reset Password (optional)
                                    </Label>
                                    <Input
                                      id="reset-password"
                                      type="password"
                                      placeholder="Leave blank to keep unchanged"
                                    />
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      id="edit-active"
                                      checked={currentStaff.isActive}
                                      onCheckedChange={(checked) =>
                                        setCurrentStaff({
                                          ...currentStaff,
                                          isActive: checked,
                                        })
                                      }
                                    />
                                    <Label htmlFor="edit-active">
                                      Account Active
                                    </Label>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    variant="outline"
                                    onClick={() => setIsEditDialogOpen(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    onClick={handleEditStaff}
                                    disabled={!currentStaff.name || !currentStaff.email}
                                  >
                                    Save Changes
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            )}
                          </Dialog>

                          {/* Delete Dialog */}
                          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                disabled={!canEditUser(staffMember.role) || user?.id === staffMember.id}
                                onClick={() => setCurrentStaff(staffMember)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            {currentStaff && (
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete Staff Member</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to delete this staff account?
                                    This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <p>
                                    You are about to delete{" "}
                                    <span className="font-semibold">
                                      {currentStaff.name}
                                    </span>
                                    's account ({roleLabels[currentStaff.role]}).
                                  </p>
                                </div>
                                <DialogFooter>
                                  <Button
                                    variant="outline"
                                    onClick={() => setIsDeleteDialogOpen(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={handleDeleteStaff}
                                  >
                                    Delete Account
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            )}
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffManagement;
