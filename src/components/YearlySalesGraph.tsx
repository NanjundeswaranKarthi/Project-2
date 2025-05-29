import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const yearlySalesData = [
  { year: "2020", sales: 4800000 },
  { year: "2021", sales: 5600000 },
  { year: "2022", sales: 6200000 },
  { year: "2023", sales: 7100000 },
  { year: "2024", sales: 8350000 },
];

export const YearlySalesGraph = () => {
  const formatCurrency = (value: number) => {
    // return `₹${(value / 100000).toFixed(1)}M`;
    return `₹${value.toLocaleString('en-IN')}`;


  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Yearly Sales Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={yearlySalesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="year"
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                tickFormatter={formatCurrency}
                stroke="#6b7280"
                fontSize={12}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), "Total Sales"]}
                labelStyle={{ color: "#374151" }}
                contentStyle={{ 
                  backgroundColor: "white", 
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
              />
              <Bar 
                dataKey="sales" 
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};