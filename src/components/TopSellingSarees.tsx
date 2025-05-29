
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

const topSellingSarees = [
  { id: 1, name: "Silk Saree - Red", sold: 152, Sales: 228000, lowStock: null },
  { id: 2, name: "Cotton Saree - Blue", sold: 134, Sales: 201000, lowStock: null },
  { id: 3, name: "Designer Saree - Gold", sold: 126, Sales: 378000, lowStock: 8 },
  { id: 4, name: "Silk Kurta - Navy", sold: 115, Sales: 86250, lowStock: null },
  { id: 5, name: "Printed Kurta - Multi", sold: 102, Sales: 81600, lowStock: 15 }
];

export const TopSellingSarees = () => {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          Top Selling Products
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topSellingSarees.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:justify-between md:items-center p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                    <span>Sold: {item.sold}</span>
                    {item.lowStock && (
                      <Badge variant="destructive" className="text-xs">
                        Low stock: {item.lowStock}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right mt-2 md:mt-0">
              <p className="text-lg font-semibold text-green-600">
                ₹{item.Sales.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">Sales</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
