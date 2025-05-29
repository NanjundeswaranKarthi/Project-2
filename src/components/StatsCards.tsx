
import { TrendingUp, Package, ShoppingCart, Users, ListOrdered } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const StatsCards = () => {
  const stats = [
    {
      title: "Total Sales",
      value: "₹2,45,680",
      //change: "+12.5%",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Total Products ",
      value: "1,247",
      //change: "+8.2%",
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    {
      title: "Total Orders",
      value: "320",
      //change: "+3.1%",
      icon: ListOrdered,
      color: "text-purple-600"
    },
    {
      title: "Total Customers",
      value: "892",
      //change: "+15.3%",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                {/* <p className={`text-sm ${stat.color} font-medium`}>
                  {stat.change} from last month
                </p> */}
              </div>
              <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
