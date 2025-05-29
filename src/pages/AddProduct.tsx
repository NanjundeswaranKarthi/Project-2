
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Upload, X } from "lucide-react";

// Mock categories
const categories = [
  { id: 1, name: "Silk" },
  { id: 2, name: "Cotton" },
  { id: 3, name: "Designer" },
  { id: 4, name: "Georgette" },
  { id: 5, name: "Chiffon" },
];

// ...all imports remain the same

const AddProduct = () => {
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(false);
  const [images, setImages] = useState<{ id: number; file: File | null; preview: string }[]>([
    { id: 1, file: null, preview: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImages(prevImages =>
        prevImages.map(img =>
          img.id === id ? { ...img, file, preview: URL.createObjectURL(file) } : img
        )
      );

      const lastImage = images[images.length - 1];
      if (lastImage.id === id && images.length < 5) {
        setImages(prev => [...prev, { id: Date.now(), file: null, preview: "" }]);
      }
    }
  };

  const handleRemoveImage = (id: number) => {
    if (images.length === 1) {
      setImages([{ id: Date.now(), file: null, preview: "" }]);
      return;
    }

    setImages(prevImages => {
      const updatedImages = prevImages.filter(img => img.id !== id);
      const hasEmptySlot = updatedImages.some(img => !img.file);
      if (!hasEmptySlot && updatedImages.length < 5) {
        updatedImages.push({ id: Date.now(), file: null, preview: "" });
      }
      return updatedImages;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Product created successfully",
        description: "Your new product has been added to the catalog",
      });
      navigate("/products");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => navigate("/products")} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Add New Product</h2>
          <p className="text-muted-foreground">
            Create a new product in your inventory
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>Basic information about the product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Inventory */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Inventory</CardTitle>
              <CardDescription>
                Set product price and inventory information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="actualPrice">Actual Price (₹)</Label>
                  <Input
                    id="actualPrice"
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sellingPrice">Selling Price (₹)</Label>
                  <Input
                    id="sellingPrice"
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity in Stock</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              {/* NEW DISCOUNT FIELD */}
              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                />
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="published">Published Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Product will be {isPublished ? "visible" : "hidden"} on the store
                  </p>
                </div>
                <Switch
                  id="published"
                  checked={isPublished}
                  onCheckedChange={setIsPublished}
                />
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>
                Upload images of your product (up to 5 images)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative aspect-square rounded-md border border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden"
                  >
                    {image.preview ? (
                      <>
                        <img
                          src={image.preview}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(image.id)}
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
                          onChange={(e) => handleImageChange(e, image.id)}
                        />
                      </label>
                    )}
                  </div>
                ))}
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
                  onClick={() => navigate("/products")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-saree-500 hover:bg-saree-600"
                >
                  {loading ? "Saving..." : "Save Product"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

