// import React, { useState, useMemo } from "react";
// import { format } from "date-fns";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";
// import { Trash2, Pencil, Plus } from "lucide-react";
// import { toast } from "@/components/ui/use-toast";

// interface Coupon {
//   id: number;
//   name: string;
//   code: string;
//   image: string;
//   discount: number;
//   startDate: string;
//   endDate: string;
//   status: "Published" | "Unpublished";
// }

// const initialCoupons: Coupon[] = [
//   {
//     id: 1,
//     name: "New Year Sale",
//     code: "NY2025",
//     image: "/placeholder.jpg",
//     discount: 25,
//     startDate: "2025-01-01",
//     endDate: "2025-01-10",
//     status: "Published",
//   },
//   {
//     id: 2,
//     name: "Summer Discount",
//     code: "SUMMER25",
//     image: "/placeholder.jpg",
//     discount: 15,
//     startDate: "2025-04-01",
//     endDate: "2025-04-30",
//     status: "Unpublished",
//   },
// ];

// const CouponAndDiscountPage = () => {
//   const [coupons, setCoupons] = useState(initialCoupons);
//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");
//   const [isAddingCoupon, setIsAddingCoupon] = useState(false); // To toggle Add Coupon form visibility
//   const [newCoupon, setNewCoupon] = useState<Coupon>({
//     id: 0,
//     name: "",
//     code: "",
//     image: "/placeholder.jpg",
//     discount: 0,
//     startDate: "",
//     endDate: "",
//     status: "Unpublished",
//   });

//   const filteredCoupons = useMemo(() => {
//     return coupons.filter(c =>
//       c.name.toLowerCase().includes(search.toLowerCase()) &&
//       (filterStatus ? c.status === filterStatus : true)
//     );
//   }, [coupons, search, filterStatus]);

//   const handleDelete = (id: number) => {
//     setCoupons(prev => prev.filter(c => c.id !== id));
//     toast({ title: "Coupon deleted" });
//   };

//   const handleSaveCoupon = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (newCoupon.id === 0) {
//       // Add new coupon
//       setCoupons(prev => [
//         ...prev,
//         { ...newCoupon, id: Date.now() }, // Using Date.now() as unique ID
//       ]);
//       toast({ title: "Coupon created successfully" });
//     } else {
//       // Update existing coupon
//       setCoupons(prev =>
//         prev.map(c => (c.id === newCoupon.id ? newCoupon : c))
//       );
//       toast({ title: "Coupon updated successfully" });
//     }

//     setIsAddingCoupon(false); // Hide the form after saving
//     setNewCoupon({
//       id: 0,
//       name: "",
//       code: "",
//       image: "/placeholder.jpg",
//       discount: 0,
//       startDate: "",
//       endDate: "",
//       status: "Unpublished",
//     });
//   };

//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-2xl font-bold">Coupon & Discount Management</h1>

//       <div className="flex justify-between items-center">
//         <div className="flex gap-2">
//           <Input
//             placeholder="Search by coupon name"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-64"
//           />
//           <select
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className="border rounded px-3 py-2"
//           >
//             <option value="">All Status</option>
//             <option value="Published">Published</option>
//             <option value="Unpublished">Unpublished</option>
//           </select>
//         </div>
//         <Button
//           onClick={() => setIsAddingCoupon(true)}
//           className="bg-saree-500 hover:bg-saree-600"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Add Coupon
//         </Button>
//       </div>

//       {/* Show Add Coupon Form or Coupons List */}
//       {isAddingCoupon ? (
//         <Card className="space-y-4">
//           <CardHeader>
//             <CardTitle>Add New Coupon</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSaveCoupon}>
//               <div className="space-y-2">
//                 <Label htmlFor="name">Coupon Name</Label>
//                 <Input
//                   id="name"
//                   value={newCoupon.name}
//                   onChange={(e) =>
//                     setNewCoupon({ ...newCoupon, name: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="code">Coupon Code</Label>
//                 <Input
//                   id="code"
//                   value={newCoupon.code}
//                   onChange={(e) =>
//                     setNewCoupon({ ...newCoupon, code: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="discount">Discount (%)</Label>
//                 <Input
//                   id="discount"
//                   type="number"
//                   value={newCoupon.discount}
//                   onChange={(e) =>
//                     setNewCoupon({ ...newCoupon, discount: Number(e.target.value) })
//                   }
//                   min="0"
//                   max="100"
//                   required
//                 />
//               </div>

//               <div className="flex gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="startDate">Start Date</Label>
//                   <Input
//                     id="startDate"
//                     type="date"
//                     value={newCoupon.startDate}
//                     onChange={(e) =>
//                       setNewCoupon({ ...newCoupon, startDate: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="endDate">End Date</Label>
//                   <Input
//                     id="endDate"
//                     type="date"
//                     value={newCoupon.endDate}
//                     onChange={(e) =>
//                       setNewCoupon({ ...newCoupon, endDate: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="status">Coupon Status</Label>
//                 <Switch
//                   checked={newCoupon.status === "Published"}
//                   onCheckedChange={() =>
//                     setNewCoupon({
//                       ...newCoupon,
//                       status: newCoupon.status === "Published" ? "Unpublished" : "Published",
//                     })
//                   }
//                 />
//               </div>

//               <div className="flex justify-end gap-2 pt-4">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setIsAddingCoupon(false)}
//                 >
//                   Cancel
//                 </Button>
//                 <Button type="submit" className="bg-saree-500 hover:bg-saree-600">
//                   Save Coupon
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       ) : (
//         <Card>
//           <CardHeader>
//             <CardTitle>Coupons List</CardTitle>
//           </CardHeader>
//           <CardContent className="overflow-x-auto">
//             <table className="min-w-full text-sm">
//               <thead className="bg-gray-100 text-left">
//                 <tr>
//                   <th className="px-4 py-2">Image</th>
//                   <th className="px-4 py-2">Name</th>
//                   <th className="px-4 py-2">Code</th>
//                   <th className="px-4 py-2">Discount (%)</th>
//                   <th className="px-4 py-2">Start Date</th>
//                   <th className="px-4 py-2">End Date</th>
//                   <th className="px-4 py-2">Status</th>
//                   <th className="px-4 py-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredCoupons.map(coupon => (
//                   <tr key={coupon.id} className="border-t">
//                     <td className="px-4 py-2">
//                       <img
//                         src={coupon.image}
//                         alt="coupon"
//                         className="w-12 h-12 object-cover rounded"
//                       />
//                     </td>
//                     <td className="px-4 py-2">{coupon.name}</td>
//                     <td className="px-4 py-2">{coupon.code}</td>
//                     <td className="px-4 py-2">{coupon.discount}%</td>
//                     <td className="px-4 py-2">{format(new Date(coupon.startDate), "yyyy-MM-dd")}</td>
//                     <td className="px-4 py-2">{format(new Date(coupon.endDate), "yyyy-MM-dd")}</td>
//                     <td className="px-4 py-2">{coupon.status}</td>
//                     <td className="px-4 py-2 flex gap-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => {}}
//                       >
//                         <Pencil className="w-4 h-4 text-saree-500" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => handleDelete(coupon.id)}
//                       >
//                         <Trash2 className="w-4 h-4 text-red-500" />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default CouponAndDiscountPage;

// import React, { useState, useMemo } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Switch } from "@/components/ui/switch";
// import { toast } from "@/components/ui/use-toast";
// import { Trash2, Pencil, Plus } from "lucide-react";
// import { format } from "date-fns";

// interface Coupon {
//   id: number;
//   name: string;
//   code: string;
//   image: string;
//   discount: number;
//   startDate: string;
//   endDate: string;
//   status: "Published" | "Unpublished";
// }

// const initialCoupons: Coupon[] = [
  // {
  //   id: 1,
  //   name: "New Year Sale",
  //   code: "NY2025",
  //   image: "/placeholder.jpg",
  //   discount: 25,
  //   startDate: "2025-01-01",
  //   endDate: "2025-01-10",
  //   status: "Published",
  // },
  // {
  //   id: 2,
  //   name: "Summer Discount",
  //   code: "SUMMER25",
  //   image: "/placeholder.jpg",
  //   discount: 15,
  //   startDate: "2025-04-01",
  //   endDate: "2025-04-30",
  //   status: "Unpublished",
  // },
// ];

// const CouponAndDiscountPage = () => {
//   const [coupons, setCoupons] = useState(initialCoupons);
//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

//   const filteredCoupons = useMemo(() => {
//     return coupons.filter(c =>
//       c.name.toLowerCase().includes(search.toLowerCase()) &&
//       (filterStatus ? c.status === filterStatus : true)
//     );
//   }, [coupons, search, filterStatus]);

//   const handleSaveCoupon = (e: React.FormEvent) => {
//     e.preventDefault();
//     const form = e.target as HTMLFormElement;
//     const formData = new FormData(form);
//     const newCoupon: Coupon = {
//       id: editingCoupon ? editingCoupon.id : Date.now(),
//       name: formData.get("name") as string,
//       code: formData.get("code") as string,
//       image: "/placeholder.jpg",
//       discount: Number(formData.get("discount")),
//       startDate: formData.get("startDate") as string,
//       endDate: formData.get("endDate") as string,
//       status: formData.get("status") === "true" ? "Published" : "Unpublished",
//     };

//     if (editingCoupon) {
//       setCoupons(prev =>
//         prev.map(c => (c.id === editingCoupon.id ? newCoupon : c))
//       );
//       toast({ title: "Coupon updated" });
//     } else {
//       setCoupons(prev => [...prev, newCoupon]);
//       toast({ title: "Coupon created" });
//     }

//     setModalOpen(false);
//     setEditingCoupon(null);
//   };

//   const handleDelete = (id: number) => {
//     setCoupons(prev => prev.filter(c => c.id !== id));
//     toast({ title: "Coupon deleted" });
//   };

//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-2xl font-bold">Coupon & Discount Management</h1>
//       <div className="flex justify-between items-center">
//         <div className="flex gap-2">
//           <Input
//             placeholder="Search by coupon name"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-64"
//           />
//           <select
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className="border rounded px-3 py-2"
//           >
//             <option value="">All Status</option>
//             <option value="Published">Published</option>
//             <option value="Unpublished">Unpublished</option>
//           </select>
//         </div>
//         <Button onClick={() => setModalOpen(true)} className="bg-saree-500 hover:bg-saree-600">
//           <Plus className="w-4 h-4 mr-2" />
//           Add Coupon
//         </Button>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Coupons List</CardTitle>
//         </CardHeader>
//         <CardContent className="overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-100 text-left">
//               <tr>
//                 <th className="px-4 py-2">Image</th>
//                 <th className="px-4 py-2">Name</th>
//                 <th className="px-4 py-2">Code</th>
//                 <th className="px-4 py-2">Discount (%)</th>
//                 <th className="px-4 py-2">Start Date</th>
//                 <th className="px-4 py-2">End Date</th>
//                 <th className="px-4 py-2">Status</th>
//                 <th className="px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredCoupons.map(coupon => (
//                 <tr key={coupon.id} className="border-t">
//                   <td className="px-4 py-2">
//                     <img src={coupon.image} alt="coupon" className="w-12 h-12 object-cover rounded" />
//                   </td>
//                   <td className="px-4 py-2">{coupon.name}</td>
//                   <td className="px-4 py-2">{coupon.code}</td>
//                   <td className="px-4 py-2">{coupon.discount}%</td>
//                   <td className="px-4 py-2">{format(new Date(coupon.startDate), "yyyy-MM-dd")}</td>
//                   <td className="px-4 py-2">{format(new Date(coupon.endDate), "yyyy-MM-dd")}</td>
//                   <td className="px-4 py-2">{coupon.status}</td>
//                   <td className="px-4 py-2 flex gap-2">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => {
//                         setEditingCoupon(coupon);
//                         setModalOpen(true);
//                       }}
//                     >
//                       <Pencil className="w-4 h-4 text-saree-500" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => handleDelete(coupon.id)}
//                     >
//                       <Trash2 className="w-4 h-4 text-red-500" />
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </CardContent>
//       </Card>

//       {/* Modal */}
//       <Dialog open={modalOpen} onOpenChange={(open) => { setModalOpen(open); if (!open) setEditingCoupon(null); }}>
//         <DialogContent className="max-w-xl">
//           <DialogHeader>
//             <DialogTitle>{editingCoupon ? "Edit Coupon" : "Add Coupon"}</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSaveCoupon} className="space-y-4">
//             <div>
//               <Label htmlFor="name">Coupon Name</Label>
//               <Input name="name" defaultValue={editingCoupon?.name} required />
//             </div>
//             <div>
//               <Label htmlFor="code">Coupon Code</Label>
//               <Input name="code" defaultValue={editingCoupon?.code} required />
//             </div>
//             <div>
//               <Label htmlFor="discount">Discount (%)</Label>
//               <Input
//                 name="discount"
//                 type="number"
//                 min={0}
//                 max={100}
//                 defaultValue={editingCoupon?.discount}
//                 required
//               />
//             </div>
//             <div className="flex gap-4">
//               <div className="flex-1">
//                 <Label htmlFor="startDate">Start Date</Label>
//                 <Input name="startDate" type="date" defaultValue={editingCoupon?.startDate} required />
//               </div>
//               <div className="flex-1">
//                 <Label htmlFor="endDate">End Date</Label>
//                 <Input name="endDate" type="date" defaultValue={editingCoupon?.endDate} required />
//               </div>
//             </div>
//             <div className="flex items-center justify-between">
//               <div>
//                 <Label htmlFor="status">Publish Status</Label>
//               </div>
//               <Switch
//                 name="status"
//                 defaultChecked={editingCoupon?.status === "Published"}
//               />
//             </div>
//             <div className="flex justify-end gap-2 pt-4">
//               <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
//                 Cancel
//               </Button>
//               <Button type="submit" className="bg-saree-500 hover:bg-saree-600">
//                 Save Coupon
//               </Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default CouponAndDiscountPage;

import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, PenLine, Trash, Plus } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

// Mock coupon data
const mockCoupons = [
  
  {
    id: 1,
  
    name: "New Year Sale",
    code: "NY2025",
    minPurchaseAmount: "45",
    image: "src/components/layout/images/a6133ede006407219c7d13953e5e2a80.jpg",
    discount: 25,
    startDate: "2025-01-01",
    expiry: "2025-01-10",
    status: "Published",
  },
  {
    id: 2,
    name: "Summer Discount",
    code: "SUMMER25",
     minPurchaseAmount: "50",
    image: "src/components/layout/images/discount-coupon-691734643d878ecd02b9ed36aba6fb31_screen.jpg",
    discount: 15,
    startDate: "2025-04-01",
    expiry: "2025-04-30",
    status: "Unpublished",
  },
  {
    id: 3,
    name: "Diwali Discount",
    code: "Diwali2025",
    minPurchaseAmount: "100",
    image: "src/components/layout/images/istockphoto-1433779963-612x612.jpg",
    discount: 15,
    startDate: "2025-04-01",
    expiry: "2025-04-30",
    status: "Unpublished",
  },
  // {
  //   id: 3,
  //   code: "SUMMER20",
  //   type: "Percentage",
  //   value: 20,
  //   status: "Active",
  //   expiry: "2025-06-30",
  // },
];

const CouponAndDiscountPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [coupons, setCoupons] = useState(mockCoupons);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredCoupons = coupons.filter((coupon) => {
    const searchMatch = coupon.code
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const statusMatch =
      statusFilter === "all" || coupon.status === statusFilter;
    return searchMatch && statusMatch;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCoupons = filteredCoupons.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);

  const handleAddCoupon = () => {
    console.log("Redirect to add coupon");
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Coupons & Discounts</h2>
          <p className="text-muted-foreground">Manage promotional offers and discounts</p>
        </div>
        <div>
          <Button onClick={handleAddCoupon}>
            <Plus className="mr-2 h-4 w-4" /> Add Coupon
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coupon List</CardTitle>
          <CardDescription>
            View, edit, or remove coupons and discounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search coupons..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
<div className="rounded-md border">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Image</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Code</TableHead>
        <TableHead>Min Purchase Amount</TableHead>
        <TableHead>Discount Value</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Start Date</TableHead>
        <TableHead>Expiry</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {currentCoupons.length === 0 ? (
        <TableRow>
          <TableCell colSpan={8} className="text-center h-24">
            No coupons found.
          </TableCell>
        </TableRow>
      ) : (
        currentCoupons.map((coupon) => (
          <TableRow key={coupon.code}>
              <TableCell className="font-medium">
  <img
    src={coupon.image}  // The image URL
    alt={coupon.name}    // Alt text for accessibility
    className="h-16 w-16 object-cover rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
  />
</TableCell>


            {/* Name Column */}
            <TableCell className="font-medium">{coupon.name}</TableCell>

            {/* Code Column */}
            <TableCell>{coupon.code}</TableCell>

            {/* Min Purchase Amount Column */}
            <TableCell>{`₹${coupon.minPurchaseAmount}`}</TableCell>

            {/* Discount Value Column */}
            <TableCell>{`${coupon.discount}%`}</TableCell>

            {/* Status Column with Badge */}
            <TableCell>
              <Badge className={coupon.status === "Published" ? "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200 shadow-sm" : 
                "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200 shadow-sm"}>
                {coupon.status}
              </Badge>
            </TableCell>

            {/* Start Date Column */}
            <TableCell>{new Date(coupon.startDate).toLocaleDateString()}</TableCell>

            {/* Expiry Column */}
            <TableCell>{new Date(coupon.expiry).toLocaleDateString()}</TableCell>

            {/* Actions Column */}
            <TableCell className="text-right space-x-2">
              <Button
                onClick={() => console.log(`Edit coupon ${coupon.code}`)}
                variant="outline"
                size="sm"
              >
                <PenLine className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => console.log(`Delete coupon ${coupon.code}`)}
                variant="outline"
                size="sm"
                className="text-red-600"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
</div>




          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div>
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                Previous
              </Button>
              <span className="mx-2">{currentPage}</span>
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
            <span>
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredCoupons.length)} of{" "}
              {filteredCoupons.length} coupons
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CouponAndDiscountPage;
