
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const yearlyData = {
  "2024": [
    { month: "Jan", sales: 45000 },
    { month: "Feb", sales: 52000 },
    { month: "Mar", sales: 48000 },
    { month: "Apr", sales: 61000 },
    { month: "May", sales: 55000 },
    { month: "Jun", sales: 67000 },
    { month: "Jul", sales: 70000 },
    { month: "Aug", sales: 68000 },
    { month: "Sep", sales: 75000 },
    { month: "Oct", sales: 72000 },
    { month: "Nov", sales: 78000 },
    { month: "Dec", sales: 85000 }
  ],
  "2023": [
    { month: "Jan", sales: 38000 },
    { month: "Feb", sales: 42000 },
    { month: "Mar", sales: 39000 },
    { month: "Apr", sales: 47000 },
    { month: "May", sales: 44000 },
    { month: "Jun", sales: 51000 },
    { month: "Jul", sales: 55000 },
    { month: "Aug", sales: 52000 },
    { month: "Sep", sales: 58000 },
    { month: "Oct", sales: 55000 },
    { month: "Nov", sales: 62000 },
    { month: "Dec", sales: 68000 }
  ]
};

const monthlyData = {
  "January": Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    sales: Math.floor(Math.random() * 3000) + 1000
  })),
  "February": Array.from({ length: 28 }, (_, i) => ({
    day: i + 1,
    sales: Math.floor(Math.random() * 3000) + 1000
  })),
  "March": Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    sales: Math.floor(Math.random() * 3000) + 1000
  }))
};

export const SalesOverview = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [viewType, setViewType] = useState<"yearly" | "monthly">("yearly");

  const formatCurrency = (value: number) => {
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Sales Overview
          </CardTitle>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Select value={viewType} onValueChange={(value: "yearly" | "monthly") => setViewType(value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yearly">Yearly View</SelectItem>
                <SelectItem value="monthly">Monthly View</SelectItem>
              </SelectContent>
            </Select>
            
            {viewType === "yearly" ? (
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="January">January</SelectItem>
                  <SelectItem value="February">February</SelectItem>
                  <SelectItem value="March">March</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={viewType === "yearly" ? yearlyData[selectedYear as keyof typeof yearlyData] : monthlyData[selectedMonth as keyof typeof monthlyData]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey={viewType === "yearly" ? "month" : "day"}
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                tickFormatter={formatCurrency}
                stroke="#6b7280"
                fontSize={12}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), "Sales"]}
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
                fill="#3b82f6"
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
