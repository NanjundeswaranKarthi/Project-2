
// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import { PenLine, Trash, Plus, Search } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { toast } from "@/components/ui/use-toast";

// // Mock categories data
// const initialCategories = [
//   { id: 1, name: "Silk", description: "Luxurious silk sarees", productCount: 23, published: true },
//   { id: 2, name: "Cotton", description: "Comfortable cotton sarees", productCount: 18, published: true },
//   { id: 3, name: "Designer", description: "Exclusive designer collections", productCount: 12, published: true },
//   { id: 4, name: "Georgette", description: "Lightweight georgette sarees", productCount: 8, published: true },
//   { id: 5, name: "Chiffon", description: "Elegant chiffon sarees", productCount: 15, published: true },
//   { id: 6, name: "Banarasi", description: "Traditional Banarasi sarees", productCount: 20, published: true },
//   { id: 7, name: "Kanjivaram", description: "Classic Kanjivaram silk sarees", productCount: 16, published: true },
//   { id: 8, name: "Linen", description: "Cool and comfortable linen sarees", productCount: 7, published: false },
//   { id: 9, name: "Printed", description: "Trendy printed sarees", productCount: 10, published: true },
//   { id: 10, name: "Embroidered", description: "Beautifully embroidered sarees", productCount: 9, published: false },
// ];

// interface Category {
//   id: number;
//   name: string;
//   description: string;
//   image?: string; // optional field for image URL
//   productCount: number;
//   published: boolean;
// }


// const Categories = () => {
//   const [categories, setCategories] = useState<Category[]>(initialCategories);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
//   const [newCategory, setNewCategory] = useState({ name: "", description: "", published: true });

//   // Filter categories based on search term
//   const filteredCategories = categories.filter((category) =>
//     category.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Toggle category publish status
//   const togglePublishStatus = (id: number) => {
//     setCategories(
//       categories.map((category) =>
//         category.id === id
//           ? { ...category, published: !category.published }
//           : category
//       )
//     );
    
//     const category = categories.find(c => c.id === id);
//     if (category) {
//       toast({
//         title: `Category ${category.published ? "unpublished" : "published"}`,
//         description: `${category.name} is now ${category.published ? "hidden" : "visible"} in the store`,
//       });
//     }
//   };

//   // Handle adding a new category
//   const handleAddCategory = () => {
//     const newId = Math.max(...categories.map((c) => c.id)) + 1;
//     const categoryToAdd = {
//       ...newCategory,
//       id: newId,
//       productCount: 0,
//     };
    
//     setCategories([...categories, categoryToAdd]);
//     setNewCategory({ name: "", description: "", published: true });
//     setIsAddDialogOpen(false);
    
//     toast({
//       title: "Category added",
//       description: `${categoryToAdd.name} has been added to the list`,
//     });
//   };

//   // Handle editing a category
//   const handleEditCategory = () => {
//     if (!currentCategory) return;
    
//     setCategories(
//       categories.map((category) =>
//         category.id === currentCategory.id ? currentCategory : category
//       )
//     );
//     setIsEditDialogOpen(false);
    
//     toast({
//       title: "Category updated",
//       description: `${currentCategory.name} has been updated`,
//     });
//   };

//   // Handle deleting a category
//   const handleDeleteCategory = () => {
//     if (!currentCategory) return;
    
//     setCategories(
//       categories.filter((category) => category.id !== currentCategory.id)
//     );
//     setIsDeleteDialogOpen(false);
    
//     toast({
//       title: "Category deleted",
//       description: `${currentCategory.name} has been removed`,
//       variant: "destructive",
//     });
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
//           <p className="text-muted-foreground">
//             Manage product categories for your store
//           </p>
//         </div>
//         <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="mr-2 h-4 w-4" /> Add Category
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Add New Category</DialogTitle>
//               <DialogDescription>
//                 Create a new category for your products
//               </DialogDescription>
//             </DialogHeader>
//             <div className="space-y-4 py-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Category Name</Label>
//                 <Input
//                   id="name"
//                   placeholder="Enter category name"
//                   value={newCategory.name}
//                   onChange={(e) =>
//                     setNewCategory({ ...newCategory, name: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="description">Description</Label>
//                 <Input
//                   id="description"
//                   placeholder="Enter category description"
//                   value={newCategory.description}
//                   onChange={(e) =>
//                     setNewCategory({
//                       ...newCategory,
//                       description: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Switch
//                   id="published"
//                   checked={newCategory.published}
//                   onCheckedChange={(checked) =>
//                     setNewCategory({ ...newCategory, published: checked })
//                   }
//                 />
//                 <Label htmlFor="published">Published</Label>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={handleAddCategory} disabled={!newCategory.name}>
//                 Add Category
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Product Categories</CardTitle>
//           <CardDescription>
//             Manage categories to organize your product catalog
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//               <Input
//                 placeholder="Search categories..."
//                 className="pl-9"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Description</TableHead>
//                   <TableHead>Products</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredCategories.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={5}
//                       className="h-24 text-center"
//                     >
//                       No categories found.
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredCategories.map((category) => (
//                     <TableRow key={category.id}>
//                       <TableCell className="font-medium">
//                         {category.name}
//                       </TableCell>
//                       <TableCell className="max-w-xs truncate">
//                         {category.description}
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant="secondary">
//                           {category.productCount}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Switch
//                           checked={category.published}
//                           onCheckedChange={() =>
//                             togglePublishStatus(category.id)
//                           }
//                         />
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <div className="flex justify-end gap-2">
//                           {/* Edit Dialog */}
//                           <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//                             <DialogTrigger asChild>
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 onClick={() => setCurrentCategory(category)}
//                               >
//                                 <PenLine className="h-4 w-4" />
//                               </Button>
//                             </DialogTrigger>
//                             {currentCategory && (
//                               <DialogContent>
//                                 <DialogHeader>
//                                   <DialogTitle>Edit Category</DialogTitle>
//                                   <DialogDescription>
//                                     Make changes to the category
//                                   </DialogDescription>
//                                 </DialogHeader>
//                                 <div className="space-y-4 py-4">
//                                   <div className="space-y-2">
//                                     <Label htmlFor="edit-name">
//                                       Category Name
//                                     </Label>
//                                     <Input
//                                       id="edit-name"
//                                       value={currentCategory.name}
//                                       onChange={(e) =>
//                                         setCurrentCategory({
//                                           ...currentCategory,
//                                           name: e.target.value,
//                                         })
//                                       }
//                                     />
//                                   </div>
//                                   <div className="space-y-2">
//                                     <Label htmlFor="edit-description">
//                                       Description
//                                     </Label>
//                                     <Input
//                                       id="edit-description"
//                                       value={currentCategory.description}
//                                       onChange={(e) =>
//                                         setCurrentCategory({
//                                           ...currentCategory,
//                                           description: e.target.value,
//                                         })
//                                       }
//                                     />
//                                   </div>
//                                   <div className="flex items-center space-x-2">
//                                     <Switch
//                                       id="edit-published"
//                                       checked={currentCategory.published}
//                                       onCheckedChange={(checked) =>
//                                         setCurrentCategory({
//                                           ...currentCategory,
//                                           published: checked,
//                                         })
//                                       }
//                                     />
//                                     <Label htmlFor="edit-published">
//                                       Published
//                                     </Label>
//                                   </div>
//                                 </div>
//                                 <DialogFooter>
//                                   <Button
//                                     variant="outline"
//                                     onClick={() => setIsEditDialogOpen(false)}
//                                   >
//                                     Cancel
//                                   </Button>
//                                   <Button 
//                                     onClick={handleEditCategory}
//                                     disabled={!currentCategory.name}
//                                   >
//                                     Save Changes
//                                   </Button>
//                                 </DialogFooter>
//                               </DialogContent>
//                             )}
//                           </Dialog>

//                           {/* Delete Dialog */}
//                           <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//                             <DialogTrigger asChild>
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 className="text-red-500 hover:text-red-700 hover:bg-red-50"
//                                 onClick={() => setCurrentCategory(category)}
//                               >
//                                 <Trash className="h-4 w-4" />
//                               </Button>
//                             </DialogTrigger>
//                             {currentCategory && (
//                               <DialogContent>
//                                 <DialogHeader>
//                                   <DialogTitle>Delete Category</DialogTitle>
//                                   <DialogDescription>
//                                     Are you sure you want to delete this category?
//                                     This action cannot be undone.
//                                   </DialogDescription>
//                                 </DialogHeader>
//                                 <div className="py-4">
//                                   <p>
//                                     You are about to delete{" "}
//                                     <span className="font-semibold">
//                                       {currentCategory.name}
//                                     </span>
//                                     {currentCategory.productCount > 0 && (
//                                       <span className="text-red-500">
//                                         {" "}
//                                         which contains {currentCategory.productCount} products.
//                                       </span>
//                                     )}
//                                   </p>
//                                 </div>
//                                 <DialogFooter>
//                                   <Button
//                                     variant="outline"
//                                     onClick={() => setIsDeleteDialogOpen(false)}
//                                   >
//                                     Cancel
//                                   </Button>
//                                   <Button
//                                     variant="destructive"
//                                     onClick={handleDeleteCategory}
//                                   >
//                                     Delete Category
//                                   </Button>
//                                 </DialogFooter>
//                               </DialogContent>
//                             )}
//                           </Dialog>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Categories;

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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { PenLine, Trash, Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

// Mock categories data
const initialCategories = [
  {
    id: 1,
    name: "Silk",
    image: "src/components/layout/images/2_538.jpeg",
    description: "Luxurious silk sarees",
    productCount: 23,
    published: true,
  },
  {
    id: 2,
    name: "Cotton",
    image: "src/components/layout/images/2_564.jpeg",
    description: "Comfortable cotton sarees",
    productCount: 18,
    published: true,
  },
  {
    id: 3,
    name: "Designer",
    image: "src/components/layout/images/4_507.jpeg",
    description: "Exclusive designer collections",
    productCount: 12,
    published: true,
  },
  {
    id: 4,
    name: "Georgette",
    image: "src/components/layout/images/4_510.jpeg",
    description: "Lightweight georgette sarees",
    productCount: 8,
    published: true,
  },
];

interface Category {
  id: number;
  name: string;
  image?: string;
  description: string;
  productCount: number;
  published: boolean;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: "",
    description: "",
    published: true,
  });

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePublishStatus = (id: number) => {
    setCategories(
      categories.map((category) =>
        category.id === id
          ? { ...category, published: !category.published }
          : category
      )
    );

    const category = categories.find((c) => c.id === id);
    if (category) {
      toast({
        title: `Category ${category.published ? "unpublished" : "published"}`,
        description: `${category.name} is now ${category.published ? "hidden" : "visible"} in the store`,
      });
    }
  };

  const handleAddCategory = () => {
    const newId = Math.max(...categories.map((c) => c.id)) + 1;
    const categoryToAdd: Category = {
      ...newCategory,
      id: newId,
      productCount: 0,
    };
    setCategories([...categories, categoryToAdd]);
    setNewCategory({ name: "", image: "", description: "", published: true });
    setIsAddDialogOpen(false);
    toast({
      title: "Category added",
      description: `${categoryToAdd.name} has been added to the list`,
    });
  };

  const handleEditCategory = () => {
    if (!currentCategory) return;

    setCategories(
      categories.map((category) =>
        category.id === currentCategory.id ? currentCategory : category
      )
    );
    setIsEditDialogOpen(false);
    toast({
      title: "Category updated",
      description: `${currentCategory.name} has been updated`,
    });
  };

  const handleDeleteCategory = () => {
    if (!currentCategory) return;

    setCategories(categories.filter((c) => c.id !== currentCategory.id));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Category deleted",
      description: `${currentCategory.name} has been removed`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">Manage product categories for your store</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Create a new category for your products</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  placeholder="Enter category name"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  placeholder="Enter image URL"
                  value={newCategory.image}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, image: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={newCategory.published}
                  onCheckedChange={(checked) =>
                    setNewCategory({ ...newCategory, published: checked })
                  }
                />
                <Label htmlFor="published">Published</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCategory} disabled={!newCategory.name}>
                Add Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Categories</CardTitle>
          <CardDescription>
            Manage categories to organize your product catalog
          </CardDescription>
        </CardHeader>
      
          <CardContent>
  <div className="flex flex-wrap items-center gap-4 mb-6">
    {/* Search Input */}
    <div className="relative w-full sm:w-[40%]">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search categories..."
        className="pl-9"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    {/* Filter by Name */}
    <div className="w-full sm:w-auto">
      <Label htmlFor="name-filter" className="sr-only">
        Filter by Name
      </Label>
      <select
        id="name-filter"
        className="border rounded-md h-10 px-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      >
        <option value="">All Names</option>
        {Array.from(new Set(categories.map((c) => c.name))).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>

    {/* Filter by Status */}
    <div className="w-full sm:w-auto">
      <Label htmlFor="status-filter" className="sr-only">
        Filter by Status
      </Label>
      <select
        id="status-filter"
        className="border rounded-md h-10 px-3"
        onChange={(e) => {
          const val = e.target.value;
          setSearchTerm(""); // Clear search term when status filter is applied
          if (val === "all") {
            setCategories(initialCategories);
          } else {
            const published = val === "published";
            setCategories(initialCategories.filter((c) => c.published === published));
          }
        }}
      >
        <option value="all">All Statuses</option>
        <option value="published">Published</option>
        <option value="unpublished">Unpublished</option>
      </select>
    </div>
  </div>


          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No categories found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{category.productCount}</Badge>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={category.published}
                          onCheckedChange={() => togglePublishStatus(category.id)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {/* Edit Dialog */}
                          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setCurrentCategory(category)}
                              >
                                <PenLine className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            {currentCategory && (
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Category</DialogTitle>
                                  <DialogDescription>Make changes to the category</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-name">Category Name</Label>
                                    <Input
                                      id="edit-name"
                                      value={currentCategory.name}
                                      onChange={(e) =>
                                        setCurrentCategory({
                                          ...currentCategory,
                                          name: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-image">Image URL</Label>
                                    <Input
                                      id="edit-image"
                                      value={currentCategory.image || ""}
                                      onChange={(e) =>
                                        setCurrentCategory({
                                          ...currentCategory,
                                          image: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      id="edit-published"
                                      checked={currentCategory.published}
                                      onCheckedChange={(checked) =>
                                        setCurrentCategory({
                                          ...currentCategory,
                                          published: checked,
                                        })
                                      }
                                    />
                                    <Label htmlFor="edit-published">Published</Label>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    variant="outline"
                                    onClick={() => setIsEditDialogOpen(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button onClick={handleEditCategory}>
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
                                onClick={() => setCurrentCategory(category)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            {currentCategory && (
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete Category</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to delete this category?
                                    This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <p>
                                    You are about to delete{" "}
                                    <span className="font-semibold">
                                      {currentCategory.name}
                                    </span>
                                    {currentCategory.productCount > 0 && (
                                      <span className="text-red-500">
                                        {" "}
                                        which contains {currentCategory.productCount} products.
                                      </span>
                                    )}
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
                                    onClick={handleDeleteCategory}
                                  >
                                    Delete Category
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

export default Categories;
