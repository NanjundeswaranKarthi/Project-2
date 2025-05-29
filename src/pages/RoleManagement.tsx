// import React, { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Eye, Pencil, Trash2, Plus } from "lucide-react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { toast } from "@/components/ui/use-toast";

// const pages = ["Dashboard", "Orders", "Products", "Customers", "Categories"];

// const initialRoles = [
//   { id: 1, name: "Manager", description: "Can manage orders and products", permissions: {} },
//   { id: 2, name: "Support", description: "Can view customer issues", permissions: {} },
// ];

// const RoleManagement = () => {
//   const [roles, setRoles] = useState(initialRoles);
//   const [selectedRole, setSelectedRole] = useState<any>(null);
//   const [permissionDialogOpen, setPermissionDialogOpen] = useState(false);
//   const [addRoleDialogOpen, setAddRoleDialogOpen] = useState(false);
//   const [newRole, setNewRole] = useState({ name: "", description: "" });

//   const handleDelete = (id: number) => {
//     setRoles(prev => prev.filter(role => role.id !== id));
//     toast({ title: "Role deleted" });
//   };

//   const handlePermissionChange = (page: string, action: string, checked: boolean) => {
//     setSelectedRole((prev: any) => {
//       const newPermissions = { ...prev.permissions };
//       newPermissions[page] = newPermissions[page] || {};
//       newPermissions[page][action] = checked;
//       return { ...prev, permissions: newPermissions };
//     });
//   };

//   const handleSavePermissions = () => {
//     setRoles(prev => prev.map(role => (role.id === selectedRole.id ? selectedRole : role)));
//     setPermissionDialogOpen(false);
//     toast({ title: "Permissions updated" });
//   };

//   const handleAddRole = () => {
//     if (!newRole.name.trim()) {
//       toast({ title: "Role name is required", variant: "destructive" });
//       return;
//     }
//     const id = Date.now();
//     const roleToAdd = { id, name: newRole.name, description: newRole.description, permissions: {} };
//     setRoles(prev => [...prev, roleToAdd]);
//     setNewRole({ name: "", description: "" });
//     setAddRoleDialogOpen(false);
//     toast({ title: "Role added successfully" });
//   };

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <h1 className="text-2xl font-semibold">Role Management</h1>
//           <p className="text-muted-foreground">Manage user roles and access permissions</p>
//         </div>
//         <Button onClick={() => setAddRoleDialogOpen(true)}>
//           <Plus className="mr-2 h-4 w-4" /> Add Role
//         </Button>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Roles</CardTitle>
//         </CardHeader>
//         <CardContent className="overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-100 text-left">
//               <tr>
//                 <th className="px-4 py-2 font-medium">Role Name</th>
//                 <th className="px-4 py-2 font-medium">Description</th>
//                 <th className="px-4 py-2 font-medium">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {roles.map(role => (
//                 <tr key={role.id}>
//                   <td className="px-4 py-2">{role.name}</td>
//                   <td className="px-4 py-2">{role.description}</td>
//                   <td className="px-4 py-2 flex gap-2">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => {
//                         setSelectedRole(role);
//                         setPermissionDialogOpen(true);
//                       }}
//                     >
//                       <Eye className="w-4 h-4 text-blue-500" />
//                     </Button>
//                     <Button variant="ghost" size="icon">
//                       <Pencil className="w-4 h-4 text-green-500" />
//                     </Button>
//                     <Button variant="ghost" size="icon" onClick={() => handleDelete(role.id)}>
//                       <Trash2 className="w-4 h-4 text-red-500" />
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </CardContent>
//       </Card>

//       {/* Permissions Dialog */}
//       <Dialog open={permissionDialogOpen} onOpenChange={setPermissionDialogOpen}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Set Permissions for {selectedRole?.name}</DialogTitle>
//           </DialogHeader>
//           <div className="grid grid-cols-1 gap-4">
//             {pages.map(page => (
//               <div key={page} className="flex items-center gap-4 border-b pb-2">
//                 <div className="w-32 font-medium">{page}</div>
//                 {["view", "create", "edit", "delete"].map(action => (
//                   <label key={action} className="flex items-center gap-2">
//                     <Checkbox
//                       checked={selectedRole?.permissions?.[page]?.[action] || false}
//                       onCheckedChange={checked =>
//                         handlePermissionChange(page, action, Boolean(checked))
//                       }
//                     />
//                     <span className="capitalize text-sm">{action}</span>
//                   </label>
//                 ))}
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-end mt-4 gap-2">
//             <Button variant="outline" onClick={() => setPermissionDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleSavePermissions}>Save</Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Add Role Dialog */}
//       <Dialog open={addRoleDialogOpen} onOpenChange={setAddRoleDialogOpen}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>Add New Role</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div>
//               <label className="text-sm font-medium">Role Name</label>
//               <Input
//                 value={newRole.name}
//                 onChange={e => setNewRole({ ...newRole, name: e.target.value })}
//                 placeholder="Enter role name"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium">Description</label>
//               <Input
//                 value={newRole.description}
//                 onChange={e => setNewRole({ ...newRole, description: e.target.value })}
//                 placeholder="Enter role description"
//               />
//             </div>
//           </div>
//           <div className="flex justify-end gap-2 mt-4">
//             <Button variant="outline" onClick={() => setAddRoleDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleAddRole}>Save</Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default RoleManagement;

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Eye, Edit2, Trash2, Plus } from "lucide-react";

const pages = [
  "Dashboard",
  "Orders",
  "Products",
  "Customers",
  "Categories",
  "Reviews",
  "Roles",
];

const defaultPermissions = pages.reduce((acc, page) => {
  acc[page] = { view: false, create: false, edit: false, delete: false };
  return acc;
}, {} as Record<string, { view: boolean; create: boolean; edit: boolean; delete: boolean }>);

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      description: "System Administrator with full access",
      permissions: pages.reduce((acc, page) => {
        acc[page] = { view: true, create: true, edit: true, delete: true };
        return acc;
      }, {} as typeof defaultPermissions),
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [newRole, setNewRole] = useState({ name: "", description: "" });

  const handleAddRole = () => {
    const newId = roles.length + 1;
    setRoles([
      ...roles,
      {
        id: newId,
        name: newRole.name,
        description: newRole.description,
        permissions: JSON.parse(JSON.stringify(defaultPermissions)),
      },
    ]);
    setNewRole({ name: "", description: "" });
    setShowAddModal(false);
  };

  const togglePermission = (roleId: number, page: string, perm: string) => {
    setRoles(prev =>
      prev.map(role => {
        if (role.id === roleId && role.name !== "Admin") {
          return {
            ...role,
            permissions: {
              ...role.permissions,
              [page]: {
                ...role.permissions[page],
                [perm]: !role.permissions[page][perm],
              },
            },
          };
        }
        return role;
      })
    );
  };

  const handleDelete = (id: number) => {
    const roleToDelete = roles.find(r => r.id === id);
    if (roleToDelete?.name === "Admin") return;
    setRoles(prev => prev.filter(role => role.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Role Management</h2>
          <p className="text-muted-foreground">Manage user roles and page permissions</p>
        </div>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Role Name</Label>
                <Input
                  value={newRole.name}
                  onChange={e => setNewRole({ ...newRole, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  value={newRole.description}
                  onChange={e => setNewRole({ ...newRole, description: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button onClick={handleAddRole}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Roles</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Role Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {roles.map(role => (
                <tr key={role.id}>
                  <td className="px-4 py-2">{role.name}</td>
                  <td className="px-4 py-2">{role.description}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setSelectedRole(role);
                        setShowViewModal(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" disabled={role.name === "Admin"}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(role.id)}
                      disabled={role.name === "Admin"}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* View Permissions Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Role Permissions - {selectedRole?.name}</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto space-y-2">
            <table className="w-full text-sm border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Page</th>
                  <th className="px-4 py-2 text-center">View</th>
                  <th className="px-4 py-2 text-center">Create</th>
                  <th className="px-4 py-2 text-center">Edit</th>
                  <th className="px-4 py-2 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {pages.map(page => (
                  <tr key={page}>
                    <td className="px-4 py-2">{page}</td>
                    {["view", "create", "edit", "delete"].map(perm => (
                      <td key={perm} className="px-4 py-2 text-center">
                        <Checkbox
                          checked={selectedRole?.permissions[page][perm]}
                          onCheckedChange={() =>
                            togglePermission(selectedRole.id, page, perm)
                          }
                          disabled={selectedRole?.name === "Admin"}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <Button onClick={() => setShowViewModal(false)}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
