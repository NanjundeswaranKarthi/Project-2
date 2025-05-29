
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const inventoryData = [
  {
    id: 1,
    category: "Sarees",
    name: "Silk Saree - Red",
    image: "/placeholder.svg",
    stock: 25,
    sold: 15,
    totalSales: 22500
  },
  {
    id: 2,
    category: "Sarees",
    name: "Cotton Saree - Blue",
    image: "/placeholder.svg",
    stock: 30,
    sold: 12,
    totalSales: 18000
  },
  {
    id: 3,
    category: "Sarees",
    name: "Designer Saree - Gold",
    image: "/placeholder.svg",
    stock: 8,
    sold: 22,
    totalSales: 66000
  },
  {
    id: 4,
    category: "Blouses",
    name: "Embroidered Blouse",
    image: "/placeholder.svg",
    stock: 45,
    sold: 28,
    totalSales: 14000
  },
  {
    id: 5,
    category: "Blouses",
    name: "Designer Blouse",
    image: "/placeholder.svg",
    stock: 20,
    sold: 35,
    totalSales: 17500
  },
  {
    id: 6,
    category: "Kurtas",
    name: "Cotton Kurta - White",
    image: "/placeholder.svg",
    stock: 35,
    sold: 18,
    totalSales: 9000
  },
  {
    id: 7,
    category: "Kurtas",
    name: "Silk Kurta - Navy",
    image: "/placeholder.svg",
    stock: 22,
    sold: 25,
    totalSales: 18750
  },
  {
    id: 8,
    category: "Kurtas",
    name: "Printed Kurta - Multi",
    image: "/placeholder.svg",
    stock: 15,
    sold: 30,
    totalSales: 12000
  }
];

export const InventoryManagement = () => {
  const getStockStatus = (stock: number) => {
    if (stock <= 10) return { label: "Low Stock", variant: "destructive" as const };
    if (stock <= 20) return { label: "Medium", variant: "default" as const };
    return { label: "In Stock", variant: "secondary" as const };
  };

  // Group products by category
  const groupedProducts = inventoryData.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof inventoryData>);

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Inventory Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {Object.entries(groupedProducts).map(([category, products]) => (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                <div className="flex items-center space-x-3">
                  <span>{category}</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {products.length} items
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Sold</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total Sales</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => {
                      const stockStatus = getStockStatus(product.stock);
                      return (
                        <TableRow key={product.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                              />
                              <span className="font-medium text-gray-900">
                                {product.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{product.stock}</TableCell>
                          <TableCell className="font-medium">{product.sold}</TableCell>
                          <TableCell>
                            <Badge variant={stockStatus.variant} className="text-xs">
                              {stockStatus.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-semibold text-green-600">
                            ₹{product.totalSales.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
