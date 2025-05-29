import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Mock data
const productLogs = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/40?img=1",
    action: "Create",
    product: "Wireless Mouse",
    image: "https://via.placeholder.com/40",
    category: "Electronics",
    timestamp: "2025-05-27T10:00:00",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/40?img=2",
    action: "Edit",
    product: "Wireless Mouse",
    image: "https://via.placeholder.com/40",
    category: "Electronics",
    timestamp: "2025-05-27T10:15:00",
  },
  {
    id: 3,
    name: "Mark Lee",
    avatar: "https://i.pravatar.cc/40?img=3",
    action: "Delete",
    product: "Wireless Mouse",
    image: "https://via.placeholder.com/40",
    category: "Electronics",
    timestamp: "2025-05-27T11:00:00",
  },
];

const orderLogs = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/40?img=1",
    action: "Pack",
    orderId: "#12345",
    carrier: "FedEx",
    timestamp: "2025-05-27T10:30:00",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/40?img=2",
    action: "Ship",
    orderId: "#12346",
    carrier: "UPS",
    timestamp: "2025-05-27T11:00:00",
  },
  {
    id: 3,
    name: "Mark Lee",
    avatar: "https://i.pravatar.cc/40?img=3",
    action: "Add Info",
    orderId: "#12347",
    carrier: "N/A",
    timestamp: "2025-05-27T11:15:00",
  },
];

export default function AuditLogPage() {
  const [tab, setTab] = useState("products");

  const [staffName, setStaffName] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const filteredProductLogs = productLogs.filter((log) => {
    const matchesStaff = log.name.toLowerCase().includes(staffName.toLowerCase());
    const matchesProduct = log.product.toLowerCase().includes(productName.toLowerCase());
    const matchesCategory = log.category.toLowerCase().includes(category.toLowerCase());
    const logDate = new Date(log.timestamp);
    const inDateRange =
      !dateRange?.from ||
      (!dateRange?.to && logDate >= dateRange.from) ||
      (dateRange?.from && dateRange?.to && logDate >= dateRange.from && logDate <= dateRange.to);
    return matchesStaff && matchesProduct && matchesCategory && inDateRange;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Audit Log</h2>
          <p className="text-muted-foreground">Track staff actions for transparency and control</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
          <CardDescription>Review product and order-related actions by staff</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="products">Product Management</TabsTrigger>
              <TabsTrigger value="orders">Order Management</TabsTrigger>
            </TabsList>

            {tab === "products" && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <Input
                  placeholder="Filter by Staff Name"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                />
                <Input
                  placeholder="Filter by Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <Input
                  placeholder="Filter by Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !dateRange?.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={new Date()}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            <TabsContent value="products">
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Image</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProductLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={log.avatar} />
                            <AvatarFallback>{log.name[0]}</AvatarFallback>
                          </Avatar>
                          {log.name}
                        </TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.product}</TableCell>
                        <TableCell>
                          <img
                            src={log.image}
                            alt={log.product}
                            className="h-10 w-10 object-cover rounded-md"
                          />
                        </TableCell>
                        <TableCell>{log.category}</TableCell>
                        <TableCell>{format(new Date(log.timestamp), "PPP p")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Carrier</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={log.avatar} />
                            <AvatarFallback>{log.name[0]}</AvatarFallback>
                          </Avatar>
                          {log.name}
                        </TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.orderId}</TableCell>
                        <TableCell>{log.carrier}</TableCell>
                        <TableCell>{format(new Date(log.timestamp), "PPP p")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
