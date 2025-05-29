
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, PenLine, Trash, Eye, Plus, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Banarasi Silk Saree",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    category: "Silk",
    actualPrice: 15999,
    sellingPrice: 12999,
    quantity: 45,
    published: true,
  },
  {
    id: 2,
    name: "Kanjivaram Silk Saree",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    category: "Silk",
    actualPrice: 25999,
    sellingPrice: 21999,
    quantity: 32,
    published: true,
  },
  {
    id: 3,
    name: "Cotton Casual Saree",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    category: "Cotton",
    actualPrice: 3999,
    sellingPrice: 2999,
    quantity: 78,
    published: true,
  },
  {
    id: 4,
    name: "Designer Party Wear Saree",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    category: "Designer",
    actualPrice: 9999,
    sellingPrice: 7999,
    quantity: 0,
    published: true,
  },
  {
    id: 5,
    name: "Georgette Casual Saree",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    category: "Georgette",
    actualPrice: 5999,
    sellingPrice: 4999,
    quantity: 28,
    published: false, // RED BADGE
  },
  {
    id: 6,
    name: "Chiffon Party Wear Saree",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    category: "Chiffon",
    actualPrice: 7999,
    sellingPrice: 6499,
    quantity: 0,
    published: true,
  },
  {
    id: 7,
    name: "Handloom Cotton Saree",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    category: "Cotton",
    actualPrice: 4599,
    sellingPrice: 3999,
    quantity: 0,
    published: false, // RED BADGE
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [products, setProducts] = useState(mockProducts);

  // Pagination States
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch =
      categoryFilter === "all" || product.category === categoryFilter;
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "published" && product.published) ||
      (statusFilter === "draft" && !product.published);
    const stockMatch =
      stockFilter === "all" ||
      (stockFilter === "in-stock" && product.quantity > 0) ||
      (stockFilter === "out-of-stock" && product.quantity === 0);

    return searchMatch && categoryMatch && statusMatch && stockMatch;
  });

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleAddProduct = () => {
    // Open the add product form (you can use a modal or navigate to another page)
    navigate("/products/add");
  };

  const handleExport = () => {
    // You can implement your export logic here (e.g., downloading CSV, Excel)
    console.log("Exporting products...");
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={handleAddProduct}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
          <CardDescription>
            View, edit, or delete products from your inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-6">
            {/* <div className="relative flex-1"> */}
            <div className="relative flex-1" style={{ flexGrow: 0.5 }}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Silk">Silk</SelectItem>
                <SelectItem value="Cotton">Cotton</SelectItem>
                <SelectItem value="Designer">Designer</SelectItem>
                <SelectItem value="Georgette">Georgette</SelectItem>
                <SelectItem value="Chiffon">Chiffon</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

            {/* Enhanced Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-gray-50 to-purple-50">
                  <TableHead className="font-semibold text-gray-700 py-4">Image</TableHead>
                  <TableHead className="font-semibold text-gray-700">Name</TableHead>
                  <TableHead className="font-semibold text-gray-700">Category</TableHead>
                  <TableHead className="font-semibold text-gray-700">Original Price</TableHead>
                  <TableHead className="font-semibold text-gray-700">Selling Price</TableHead>
                  <TableHead className="font-semibold text-gray-700">Qty</TableHead>
                  <TableHead className="font-semibold text-gray-700">Stock</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-lg">No products found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  currentProducts.map((product, index) => (
                    <TableRow 
                      key={product.id}
                      className={`transition-all duration-200 hover:bg-purple-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <TableCell className="py-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-16 w-16 object-cover rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
                        />
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">{product.name}</TableCell>
                      <TableCell>
                        <Badge className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200">
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600 line-through">{formatCurrency(product.actualPrice)}</TableCell>
                      <TableCell className="font-semibold text-green-600">{formatCurrency(product.sellingPrice)}</TableCell>
                      <TableCell className="font-medium">{product.quantity}</TableCell>
                      <TableCell>
                        {product.quantity > 0 ? (
                          <Badge className="bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 border-emerald-200 shadow-sm">
                            In Stock
                          </Badge>
                        ) : (
                          <Badge className="bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200 shadow-sm">
                            Out of Stock
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {product.published ? (
                          <Badge className="bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200 shadow-sm">
                            Published
                          </Badge>
                        ) : (
                          <Badge className="bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200 shadow-sm">
                            Unpublished
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={() => navigate(`/products/${product.id}`)}
                            variant="outline"
                            size="sm"
                            className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => navigate(`/products/edit/${product.id}`)}
                            variant="outline"
                            size="sm"
                            className="hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                          >
                            <PenLine className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              console.log(`Deleting product ${product.id}`);
                            }}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Table
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Original Price</TableHead>
                  <TableHead>Selling Price</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center h-24">
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  currentProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{formatCurrency(product.actualPrice)}</TableCell>
                      <TableCell>{formatCurrency(product.sellingPrice)}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        {product.quantity > 0 ? (
                          <Badge className="bg-green-500 text-white">In Stock</Badge>
                        ) : (
                          <Badge className="bg-red-500 text-white">Out of Stock</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {product.published ? (
                          <Badge className="bg-green-600 text-white">Published</Badge>
                        ) : (
                          <Badge className="bg-red-500 text-white">Unpublished</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          onClick={() => navigate(`/products/${product.id}`)}
                          variant="outline"
                          size="sm"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => navigate(`/products/edit/${product.id}`)}
                          variant="outline"
                          size="sm"
                        >
                          <PenLine className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => {
                            // Handle delete action here
                            console.log(`Deleting product ${product.id}`);
                          }}
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
          </div> */}

          {/* Pagination Controls
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            </span>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
