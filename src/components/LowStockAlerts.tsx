
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

const lowStockItems = [
  { id: 1, name: "Designer Saree - Gold", remaining: 8, category: "Sarees" },
  { id: 2, name: "Printed Kurta - Multi", remaining: 15, category: "Kurtas" },
  { id: 3, name: "Embroidered Blouse", remaining: 20, category: "Blouses" },
  { id: 4, name: "Silk Saree - Red", remaining: 25, category: "Sarees" },
  { id: 5, name: "Silk Saree - Blue", remaining: 25, category: "Sarees" }
].filter(item => item.remaining <= 25); // Filter items with stock <= 25

export const LowStockAlerts = () => {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Low Stock Alerts
        </CardTitle>
        <Badge variant="destructive" className="text-xs">
          {lowStockItems.length} Items
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {lowStockItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg px-4 py-3 bg-red-50 border-red-200 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-600">{item.category}</p>
            </div>
            <div className="flex items-center gap-4 mt-2 md:mt-0">
              <Badge variant="destructive" className="text-xs">
                {item.remaining} remaining
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
              >
                Restock Now
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
