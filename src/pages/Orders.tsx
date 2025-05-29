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
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Eye, Calendar, Filter, Download } from "lucide-react";
import { toast } from "sonner";

// Mock order data
 const mockOrders = [
  {
    id: "ORD-001",
    customerName: "Priya Sharma",
    date: "2023-05-01",
    total: 12999,
    paymentMethod: "CARD",
    orderStatus: "new",
    items: 2,
    trackingAdded: true,
  },
  {
    id: "ORD-002",
    customerName: "Rahul Mehta",
    date: "2023-05-03",
    total: 8499,
    paymentMethod: "UPI",
    orderStatus: "confirmed",
    items: 1,
    trackingAdded: false,
  },
  {
    id: "ORD-003",
    customerName: "Anjali Patel",
    date: "2023-05-05",
    total: 15999,
    paymentMethod: "COD",
    orderStatus: "packed",
    items: 3,
    trackingAdded: false,
  },
  {
    id: "ORD-004",
    customerName: "Vikram Singh",
    date: "2023-05-07",
    total: 4999,
    paymentMethod: "UPI",
    orderStatus: "shipped",
    items: 1,
    trackingAdded: true,
  },
  {
    id: "ORD-005",
    customerName: "Meera Reddy",
    date: "2023-05-10",
    total: 19999,
    paymentMethod: "CARD",
    orderStatus: "delivered",
    items: 2,
    trackingAdded: true,
  },
  // Add more with varied status and methods if needed
];

// Mock return requests
const mockReturns = [
  {
    id: "RET-001",
    orderId: "ORD-001",
    customerName: "Priya Sharma",
    date: "2023-05-15",
    reason: "Wrong size",
    status: "pending",
    items: 1,
  },
  {
    id: "RET-002",
    orderId: "ORD-004",
    customerName: "Vikram Singh",
    date: "2023-05-20",
    reason: "Damaged product",
    status: "approved",
    items: 1,
  },
  {
    id: "RET-003",
    orderId: "ORD-007",
    customerName: "Divya Malhotra",
    date: "2023-05-25",
    reason: "Color different than shown",
    status: "rejected",
    items: 1,
  },
];

// Helper function to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-IN", options);
};

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Status badge component
// const StatusBadge = ({ status }: { status: string }) => {
//   const getStatusColor = () => {
//   switch (status) {
//     case "new":
//       return "bg-blue-200 text-blue-900";
//     case "confirmed":
//       return "bg-yellow-200 text-yellow-900";
//     case "packed":
//       return "bg-orange-200 text-orange-900";
//     case "shipped":
//       return "bg-purple-200 text-purple-900";
//     case "delivered":
//       return "bg-green-200 text-green-900";
//     case "CARD":
//        return "bg-blue-200 text-blue-900";
//     case "UPI":
//         return "bg-orange-200 text-orange-900";
//     case "COD":
//       return "bg-gray-200 text-purple-900"; // For payment method display
//     default:
//       return "bg-gray-500 text-white";
//   }
// };
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status) {
      case "new":
        return "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200 shadow-sm";
      case "confirmed":
        return "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border-amber-200 shadow-sm";
      case "packed":
        return "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 border-orange-200 shadow-sm";
      case "shipped":
        return "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 border-purple-200 shadow-sm";
      case "delivered":
        return "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 border-emerald-200 shadow-sm";
      case "CARD":
        return "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200 shadow-sm";
      case "UPI":
        return "bg-gradient-to-r from-violet-50 to-violet-100 text-violet-800 border-violet-200 shadow-sm";
      case "COD":
        return "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-800 border-slate-200 shadow-sm";
      case "pending":
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-200 shadow-sm";
      case "approved":
        return "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200 shadow-sm";
      case "rejected":
        return "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200 shadow-sm";
      default:
        return "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200 shadow-sm";
    }
  };

  return (
    <Badge className={getStatusColor()}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const Orders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [returnDialog, setReturnDialog] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState<any>(null);
  const [returnResponse, setReturnResponse] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState<"today" | "week" | "month" | "custom">("month");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");

  const ordersPerPage = 5;

  // Filter orders based on search term, status, date, and payment
  const filteredOrders = mockOrders.filter((order) => {
    // Search filter
    const searchMatch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const statusMatch =
      statusFilter === "all" || order.orderStatus === statusFilter;

    // Date filter
    const dateMatch = !dateFilter || order.date === dateFilter;

    // Payment filter
    const paymentMatch = 
      paymentFilter === "all" || order.paymentMethod === paymentFilter;

    return searchMatch && statusMatch && dateMatch && paymentMatch;
  });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleViewOrder = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };

  const handleViewReturnRequest = (returnReq: any) => {
    setSelectedReturn(returnReq);
    setReturnDialog(true);
  };

  const handleApproveReturn = () => {
    // In a real app, this would call an API to approve the return
    toast.success(`Return request ${selectedReturn.id} approved`);
    setReturnDialog(false);
  };

  const handleRejectReturn = () => {
    // In a real app, this would call an API to reject the return
    toast.success(`Return request ${selectedReturn.id} rejected with response: ${returnResponse}`);
    setReturnDialog(false);
  };

  const handleExportOrders = () => {
    // In a real app, this would generate a CSV or PDF export
    toast.success("Orders exported successfully");
  };

  const applyDateRange = (range: "today" | "week" | "month" | "custom") => {
    setSelectedDateRange(range);
    // In a real app, this would filter based on date range
    toast.info(`Filtering by date range: ${range}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl font-bold tracking-tight">Orders</h2>
        <p className="text-muted-foreground">Manage customer orders and replacements</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={activeTab === "orders" ? "default" : "outline"} 
            onClick={() => setActiveTab("orders")}
            className="flex-1 sm:flex-none"
          >
            All Orders
          </Button>
          <Button 
            variant={activeTab === "returns" ? "default" : "outline"} 
            onClick={() => setActiveTab("returns")}
            className="flex-1 sm:flex-none"
          >
            Replacement Requests
          </Button>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleExportOrders}
            className="bg-white hover:bg-yellow-500 border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
      
      {activeTab === "orders" ? (
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>View and manage customer orders</CardDescription>
          </CardHeader>
          {/* <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search orders, customers..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="processing">New</SelectItem>
                      <SelectItem value="shipped">Confirmed</SelectItem>
                      <SelectItem value="delivered">Packed</SelectItem>
                      <SelectItem value="cancelled">Shipped</SelectItem>
                      <SelectItem value="cancelled">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>

              {showAdvancedFilters && (
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 pt-2 border-t">
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-2">Date Range</p>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant={selectedDateRange === "today" ? "default" : "outline"}
                        onClick={() => applyDateRange("today")}
                      >
                        Today
                      </Button>
                      <Button 
                        size="sm" 
                        variant={selectedDateRange === "week" ? "default" : "outline"}
                        onClick={() => applyDateRange("week")}
                      >
                        This Week
                      </Button>
                      <Button 
                        size="sm" 
                        variant={selectedDateRange === "month" ? "default" : "outline"}
                        onClick={() => applyDateRange("month")}
                      >
                        This Month
                      </Button>
                      <Button 
                        size="sm" 
                        variant={selectedDateRange === "custom" ? "default" : "outline"}
                        onClick={() => applyDateRange("custom")}
                      >
                        Custom Range
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Payment Status</p>
                    <Select
                      value={paymentFilter}
                      onValueChange={setPaymentFilter}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Payment Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Payments</SelectItem>
                        <SelectItem value="paid">card</SelectItem>
                        <SelectItem value="pending">UPI</SelectItem>
                        <SelectItem value="failed">COD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-md border mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Tracking Info</TableHead>
                    <TableHead className="text-left pl-6">Actions</TableHead>

                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentOrders.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="h-24 text-center"
                      >
                        No orders found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{formatDate(order.date)}</TableCell>
                        <TableCell>{formatCurrency(order.total)}</TableCell>
                        <TableCell>
                          <StatusBadge status={order.paymentMethod} />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={order.orderStatus} />
                        </TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>
                              {order.trackingAdded ? (
                                <Badge className="bg-green-100 text-green-800">Added</Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-800">Not Added</Badge>
                              )}
                            </TableCell>

                        <TableCell className="text-Center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewOrder(order.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent> */}
           <CardContent className="p-6">
              <div className="space-y-4">
<div className="space-y-4">
  {/* Search and Filters */}
  <div className="flex flex-wrap gap-6 items-end">
    {/* Search Input */}
    <div className="relative w-72">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input
        placeholder="Search orders, customers..."
        className="pl-10 h-14 w-full text-base border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    {/* Status Filter */}
    <div className="w-60">
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="h-14 w-full text-base border-gray-200 bg-white shadow-sm">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-200 shadow-lg">
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="confirmed">Confirmed</SelectItem>
          <SelectItem value="packed">Packed</SelectItem>
          <SelectItem value="shipped">Shipped</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Advanced Filters Button */}
    <div className="w-60">
      <Button 
        variant="outline" 
        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        className="h-14 w-full text-base border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition-all duration-200"
      >
        <Filter className="h-5 w-5 mr-2" />
        Advanced Filters
      </Button>
    </div>

    {/* Payment Filter */}
    <div className="w-60">
      <Select value={paymentFilter} onValueChange={setPaymentFilter}>
        <SelectTrigger className="h-14 w-full text-base bg-white border-gray-200 shadow-sm">
          <SelectValue placeholder="Payment Method" />
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-200 shadow-lg">
          <SelectItem value="all">All Methods</SelectItem>
          <SelectItem value="CARD">Card</SelectItem>
          <SelectItem value="UPI">UPI</SelectItem>
          <SelectItem value="COD">Cash on Delivery</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</div>


                {/* Advanced Filters */}
                {showAdvancedFilters && (
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 space-y-4 border border-gray-200">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-3">Date Range</p>
                        <div className="flex flex-wrap gap-2">
                          {["today", "week", "month", "custom"].map((range) => (
                            <Button 
                              key={range}
                              size="sm" 
                              variant={selectedDateRange === range ? "default" : "outline"}
                              onClick={() => applyDateRange(range as any)}
                              className={`transition-all duration-200 ${
                                selectedDateRange === range 
                                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" 
                                  : "hover:bg-white"
                              }`}
                            >
                              {range.charAt(0).toUpperCase() + range.slice(1)}
                            </Button>
                          ))}
                        </div>
                      </div>
                     
                    </div>
                  </div>
                )}

                {/* Orders Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50">
                        <TableHead className="font-semibold text-gray-700 py-4">Order ID</TableHead>
                        <TableHead className="font-semibold text-gray-700">Customer</TableHead>
                        <TableHead className="font-semibold text-gray-700">Date</TableHead>
                        <TableHead className="font-semibold text-gray-700">Total</TableHead>
                        <TableHead className="font-semibold text-gray-700">Payment</TableHead>
                        <TableHead className="font-semibold text-gray-700">Status</TableHead>
                        <TableHead className="font-semibold text-gray-700">Items</TableHead>
                        <TableHead className="font-semibold text-gray-700">Tracking</TableHead>
                        <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentOrders.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="h-32 text-center">
                            <div className="flex flex-col items-center justify-center space-y-3">
                              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                <Search className="w-8 h-8 text-gray-400" />
                              </div>
                              <p className="text-gray-500 text-lg">No orders found</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        currentOrders.map((order, index) => (
                          <TableRow 
                            key={order.id} 
                            className={`transition-all duration-200 hover:bg-blue-50 ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                            }`}
                          >
                            <TableCell className="font-bold text-blue-600 py-4">
                              {order.id}
                            </TableCell>
                            <TableCell className="font-medium">{order.customerName}</TableCell>
                            <TableCell className="text-gray-600">{formatDate(order.date)}</TableCell>
                            <TableCell className="font-semibold text-green-600">
                              {formatCurrency(order.total)}
                            </TableCell>
                            <TableCell>
                              <StatusBadge status={order.paymentMethod} />
                            </TableCell>
                            <TableCell>
                              <StatusBadge status={order.orderStatus} />
                            </TableCell>
                            <TableCell className="text-center font-medium">{order.items}</TableCell>
                            <TableCell>
                              {order.trackingAdded ? (
                                <Badge className="bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 border-emerald-200 shadow-sm">
                                  ✓ Added
                                </Badge>
                              ) : (
                                <Badge className="bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200 shadow-sm">
                                  ✗ Pending
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewOrder(order.id)}
                                className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                              >
                                <Eye className="h-4 w-4 mr-1" /> View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
{/*             
          <CardFooter>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} 
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter> */}
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Replacement Requests</CardTitle>
            <CardDescription>Manage customer replacement requests</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-gray-50 to-purple-50">
                      <TableHead className="font-semibold text-gray-700 py-4">Return ID</TableHead>
                      <TableHead className="font-semibold text-gray-700">Order ID</TableHead>
                      <TableHead className="font-semibold text-gray-700">Customer</TableHead>
                      <TableHead className="font-semibold text-gray-700">Date</TableHead>
                      <TableHead className="font-semibold text-gray-700">Reason</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Items</TableHead>
                      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockReturns.map((returnReq, index) => (
                      <TableRow 
                        key={returnReq.id}
                        className={`transition-all duration-200 hover:bg-purple-50 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}
                      >
                        <TableCell className="font-bold text-purple-600 py-4">
                          {returnReq.id}
                        </TableCell>
                        <TableCell className="font-medium text-blue-600">{returnReq.orderId}</TableCell>
                        <TableCell className="font-medium">{returnReq.customerName}</TableCell>
                        <TableCell className="text-gray-600">{formatDate(returnReq.date)}</TableCell>
                        <TableCell className="max-w-xs truncate">{returnReq.reason}</TableCell>
                        <TableCell>
                          <StatusBadge status={returnReq.status} />
                        </TableCell>
                        <TableCell className="text-center font-medium">{returnReq.items}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewReturnRequest(returnReq)}
                            className="hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          {/* <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Return ID</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockReturns.map((returnReq) => (
                    <TableRow key={returnReq.id}>
                      <TableCell className="font-medium">
                        {returnReq.id}
                      </TableCell>
                      <TableCell>{returnReq.orderId}</TableCell>
                      <TableCell>{returnReq.customerName}</TableCell>
                      <TableCell>{formatDate(returnReq.date)}</TableCell>
                      <TableCell>{returnReq.reason}</TableCell>
                      <TableCell>
                        <StatusBadge status={returnReq.status} />
                      </TableCell>
                      <TableCell>{returnReq.items}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewReturnRequest(returnReq)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent> */}
        </Card>
      )}
       {/* Return Request Dialog */}
        <Dialog open={returnDialog} onOpenChange={setReturnDialog}>
          <DialogContent className="sm:max-w-lg bg-white border-0 shadow-2xl">
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Return Request {selectedReturn?.id}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Review the return request details and take appropriate action
              </DialogDescription>
            </DialogHeader>
            
            {selectedReturn && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Order ID</p>
                    <p className="font-semibold text-blue-600">{selectedReturn.orderId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Customer</p>
                    <p className="font-semibold">{selectedReturn.customerName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Date</p>
                    <p className="font-semibold">{formatDate(selectedReturn.date)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <StatusBadge status={selectedReturn.status} />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <p className="text-sm font-medium text-gray-500">Reason for Return</p>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-900">{selectedReturn.reason}</p>
                    </div>
                  </div>
                </div>
                
                {selectedReturn.status === "pending" && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700">Response to Customer (Optional)</p>
                    <Textarea 
                      placeholder="Enter your response or instructions for the customer..."
                      value={returnResponse}
                      onChange={(e) => setReturnResponse(e.target.value)}
                      className="border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            )}
            
            <DialogFooter className="gap-3">
              {selectedReturn?.status === "pending" ? (
                <>
                  <Button variant="outline" onClick={() => setReturnDialog(false)}>
                    Cancel
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      variant="destructive" 
                      onClick={handleRejectReturn}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                    >
                      Reject
                    </Button>
                    <Button 
                      onClick={handleApproveReturn}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      Approve
                    </Button>
                  </div>
                </>
              ) : (
                <Button onClick={() => setReturnDialog(false)}>
                  Close
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
   
  );
};

export default Orders;

      {/* Return Request Dialog */}
      {/* <Dialog open={returnDialog} onOpenChange={setReturnDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Return Request {selectedReturn?.id}</DialogTitle>
            <DialogDescription>
              Review the return request details and take action
            </DialogDescription>
          </DialogHeader>
          
          {selectedReturn && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                  <p>{selectedReturn.orderId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customer</p>
                  <p>{selectedReturn.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p>{formatDate(selectedReturn.date)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <StatusBadge status={selectedReturn.status} />
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Reason for Return</p>
                  <p>{selectedReturn.reason}</p>
                </div>
              </div>
              
              {selectedReturn.status === "pending" && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Response to Customer (Optional)</p>
                  <Textarea 
                    placeholder="Enter your response or instructions for the customer..."
                    value={returnResponse}
                    onChange={(e) => setReturnResponse(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="sm:justify-between">
            {selectedReturn?.status === "pending" ? (
              <>
                <Button variant="outline" onClick={() => setReturnDialog(false)}>
                  Cancel
                </Button>
                <div className="flex gap-2">
                  <Button variant="destructive" onClick={handleRejectReturn}>
                    Reject
                  </Button>
                  <Button onClick={handleApproveReturn}>
                    Approve
                  </Button>
                </div>
              </>
            ) : (
              <Button onClick={() => setReturnDialog(false)}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders; */}
