import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Printer,
  Mail,
  Package,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import InvoicePrint from "@/components/orders/InvoicePrint";
import { formatDate, formatCurrency } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Mock order data (in a real app, this would come from an API)
const mockOrders = [
  {
    id: "ORD-001",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@example.com",
    customerPhone: "+91 9876543210",
    date: "2023-05-01T14:30:00",
    total: 12999,
    subtotal: 11999,
    tax: 600,
    shipping: 400,
    discount: 0,
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    orderStatus: "delivered",
    items: [
      {
        id: 1,
        name: "Banarasi Silk Saree",
        price: 8999,
        quantity: 1,
        total: 8999,
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
      {
        id: 2,
        name: "Designer Blouse",
        price: 3000,
        quantity: 1,
        total: 3000,
        image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
    shippingAddress: {
      name: "Priya Sharma",
      address: "123, Park Street",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      country: "India",
    },
    billingAddress: {
      name: "Priya Sharma",
      address: "123, Park Street",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      country: "India",
    },
    trackingDetails: {
      courier: "BlueDart",
      trackingNumber: "BD1234567890",
      url: "https://www.bluedart.com/tracking/BD1234567890",
    },
    notes: "Please deliver during office hours.",
    history: [
      { status: "Order Placed", date: "2023-05-01T14:30:00", by: "Customer" },
      { status: "Payment Confirmed", date: "2023-05-01T14:35:00", by: "System" },
      { status: "Processing", date: "2023-05-02T09:00:00", by: "Admin User" },
      { status: "Shipped", date: "2023-05-03T11:20:00", by: "Admin User" },
      { status: "Delivered", date: "2023-05-05T16:45:00", by: "Delivery Agent" },
    ],
  },
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status) {
      case "processing":
        return "bg-status-pending text-white";
      case "shipped":
        return "bg-status-info text-white";
      case "delivered":
        return "bg-status-success text-white";
      case "cancelled":
        return "bg-status-error text-white";
      case "paid":
        return "bg-status-success text-white";
      case "pending":
        return "bg-status-pending text-white";
      case "failed":
        return "bg-status-error text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <Badge className={getStatusColor()}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

interface UpdateOrderFormValues {
  status: string;
  courier: string;
  trackingNumber: string;
  trackingUrl: string;
  note: string;
}

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState(
    mockOrders.find((order) => order.id === id) || mockOrders[0]
  );
  const invoiceRef = useRef<HTMLDivElement>(null);

  const form = useForm<UpdateOrderFormValues>({
    defaultValues: {
      status: order.orderStatus,
      courier: order.trackingDetails?.courier || "",
      trackingNumber: order.trackingDetails?.trackingNumber || "",
      trackingUrl: order.trackingDetails?.url || "",
      note: "",
    },
  });

  const handleUpdateOrder = (data: UpdateOrderFormValues) => {
    // In a real app, this would call an API to update the order
    console.log("Updating order with:", data);
    
    // Update local state for demo purposes
    setOrder({
      ...order,
      orderStatus: data.status,
      trackingDetails: {
        courier: data.courier,
        trackingNumber: data.trackingNumber,
        url: data.trackingUrl,
      },
      history: [
        ...order.history,
        {
          status: data.status.charAt(0).toUpperCase() + data.status.slice(1),
          date: new Date().toISOString(),
          by: "Admin User",
        },
      ],
    });

    toast.success("Order updated successfully");
  };

  const handlePrintInvoice = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: `Invoice-${order.id}`,
    onBeforeGetContent: () => {
      toast.info("Preparing invoice...");
      return new Promise<void>((resolve) => {
        setTimeout(resolve, 200);
      });
    },
    onAfterPrint: () => {
      toast.success("Invoice printed successfully");
    },
    pageStyle: `
      @media print {
        @page {
          size: A4;
          margin: 10mm;
        }
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  const handleSendEmail = () => {
    // In a real app, this would send email to customer
    toast.success("Email sent to customer");
  };

  // Hide the invoice from normal view but keep it in the DOM for printing
  const invoiceStyle: React.CSSProperties = {
    display: 'none',
    width: '210mm',
    minHeight: '297mm',
    padding: '20mm',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/orders")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Order {order.id}
            </h2>
            <p className="text-muted-foreground flex items-center gap-2">
               {formatDate(order.date)} • {order.items.length} items
                    <StatusBadge status={order.orderStatus} />
                  </p>

          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePrintInvoice}>
            <Printer className="mr-2 h-4 w-4" /> Print Invoice
          </Button>
         <Dialog>
    <DialogTrigger asChild>
    </DialogTrigger>
    <Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Update Order Status</Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Update Order Status</DialogTitle>
      <DialogDescription>Change the current order status</DialogDescription>
    </DialogHeader>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdateOrder)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Status</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Update Status
        </Button>
      </form>
    </Form>
  </DialogContent>
</Dialog>

  </Dialog>
        </div>
      </div>

      {/* Invoice Print Template - Hidden but available for printing */}
      <div style={invoiceStyle}>
        <InvoicePrint
          ref={invoiceRef}
          id={order.id}
          date={order.date}
          customerName={order.customerName}
          customerEmail={order.customerEmail}
          customerPhone={order.customerPhone}
          items={order.items}
          subtotal={order.subtotal}
          tax={order.tax}
          shipping={order.shipping}
          discount={order.discount}
          total={order.total}
          paymentStatus={order.paymentStatus}
          paymentMethod={order.paymentMethod}
          shippingAddress={order.shippingAddress}
          billingAddress={order.billingAddress}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
            <CardDescription>
              Products purchased in this order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                        <div>{item.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(item.price)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-end">
            <div className="space-y-2 text-right">
              <div className="text-sm">
                Subtotal: <span className="font-medium">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="text-sm">
                Shipping: <span className="font-medium">{formatCurrency(order.shipping)}</span>
              </div>
              <div className="text-sm">
                Tax: <span className="font-medium">{formatCurrency(order.tax)}</span>
              </div>
              {order.discount > 0 && (
                <div className="text-sm text-green-600">
                  Discount: <span className="font-medium">-{formatCurrency(order.discount)}</span>
                </div>
              )}
              <div className="text-lg font-bold">
                Total: <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.customerEmail}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.customerPhone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p className="text-sm">{order.shippingAddress.address}</p>
                <p className="text-sm">
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p className="text-sm">{order.shippingAddress.country}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Status:</span>
                <StatusBadge status={order.paymentStatus} />
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Method:</span>
                <span className="text-sm">{order.paymentMethod}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
  {/* Order Status Update Section */}
  {/* <Card className="w-full md:w-[400px] h-[300px]"> 
    <CardHeader>
      <CardTitle>Update Order Status</CardTitle>
      <CardDescription>Change the current order status</CardDescription>
    </CardHeader>
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdateOrder)} className="space-y-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Status</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Update Status
          </Button>
        </form>
      </Form>
    </CardContent>
  </Card> */}

  {/* Tracking Info Section */}
  <Card>
    <CardHeader className="w-full md:w-[400px]">
      <CardTitle>Add Tracking Information</CardTitle>
      <CardDescription>
        Provide tracking details and notify customer if required
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdateOrder)} className="space-y-4">
          <FormField
            control={form.control}
            name="courier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Courier Service</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="E.g., BlueDart, DTDC" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="trackingNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tracking Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter tracking number" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="trackingUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tracking URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://..." />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Note (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field}
                    placeholder="Add a note about this update" 
                    className="min-h-[80px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Email Notification Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="notifyCustomer"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              onChange={() => { /* You can handle this in state if needed */ }}
            />
            <label htmlFor="notifyCustomer" className="text-sm">
              Send notification email to customer
            </label>
          </div>

          <Button type="submit" className="w-full">
            Save Tracking Info
          </Button>
        </form>
      </Form>
    </CardContent>
  </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Timeline</CardTitle>
            <CardDescription>History of order events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.history.map((event, index) => (
                <div key={index} className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center
                      ${event.status === "Delivered" ? "bg-green-100 text-green-600" : 
                        event.status === "Cancelled" ? "bg-red-100 text-red-600" : 
                        "bg-blue-100 text-blue-600"}`
                    }>
                      {event.status === "Delivered" ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : event.status === "Shipped" ? (
                        <Truck className="h-5 w-5" />
                      ) : event.status === "Processing" ? (
                        <Package className="h-5 w-5" />
                      ) : event.status === "Cancelled" ? (
                        <XCircle className="h-5 w-5" />
                      ) : (
                        <CheckCircle className="h-5 w-5" />
                      )}
                    </div>
                    {index !== order.history.length - 1 && (
                      <div className="h-full w-px bg-border" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="font-medium leading-none">{event.status}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(event.date)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      By: {event.by}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetail;
