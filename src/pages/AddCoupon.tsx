import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Upload, X } from "lucide-react";

const AddCoupon = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState<{ file: File | null; preview: string }>({
    file: null,
    preview: "",
  });
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage({ file, preview: URL.createObjectURL(file) });
    }
  };

  const handleRemoveImage = () => {
    setImage({ file: null, preview: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Coupon created successfully",
        description: "Your coupon is now available for customers",
      });
      navigate("/coupons");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => navigate("/coupons")} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Add New Coupon</h2>
          <p className="text-muted-foreground">
            Create a new discount coupon for customers
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Coupon Details */}
          <Card>
            <CardHeader>
              <CardTitle>Coupon Details</CardTitle>
              <CardDescription>Information about the discount offer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Coupon Name</Label>
                <Input id="name" placeholder="Enter coupon name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Coupon Code</Label>
                <Input id="code" placeholder="Enter unique code" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxAmount">Max Purchase Amount (₹)</Label>
                <Input
                  id="maxAmount"
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="status">Coupon Status</Label>
                  <p className="text-sm text-muted-foreground">
                    {isActive ? "Active" : "Inactive"} on the store
                  </p>
                </div>
                <Switch
                  id="status"
                  checked={isActive}
                  onCheckedChange={setIsActive}
                />
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Coupon Image</CardTitle>
              <CardDescription>
                Optional: Upload an image to represent the coupon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square rounded-md border border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
                {image.preview ? (
                  <>
                    <img
                      src={image.preview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground text-center">
                      Click to upload
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="lg:col-span-2">
            <Card>
              <CardFooter className="flex justify-end gap-2 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/coupons")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-saree-500 hover:bg-saree-600"
                >
                  {loading ? "Saving..." : "Save Coupon"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCoupon;
