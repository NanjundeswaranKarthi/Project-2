import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Trash, Star  } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function getRatingColor(rating) {
  if (rating >= 4.5) return 'bg-green-100 text-green-800';
  if (rating >= 3) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}


// Mock review data with images
const mockReviews = [
  {
    id: 1,
    user: "Ananya Sharma",
    product: "Banarasi Silk Saree",
    productImage: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    comment: "Beautiful saree! The quality is exceptional and looks exactly like the photo. Highly recommend!",
    rating: 5,
    date: "2024-01-15",
  },
  {
    id: 2,
    user: "Ravi Patel",
    product: "Kanjivaram Silk Saree",
    productImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    comment: "Quality is great but delivery was slightly delayed. Overall satisfied with the purchase.",
    rating: 4,
    date: "2024-01-12",
  },
  {
    id: 3,
    user: "Sneha Mehta",
    product: "Cotton Casual Saree",
    productImage: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    comment: "The fabric quality could be better for the price point. Expected more.",
    rating: 2,
    date: "2024-01-10",
  },
  {
    id: 4,
    user: "Priya Singh",
    product: "Designer Wedding Saree",
    productImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    comment: "Absolutely stunning! Perfect for my wedding. The embroidery work is exquisite.",
    rating: 5,
    date: "2024-01-08",
  },
  {
    id: 5,
    user: "Meera Gupta",
    product: "Traditional Handloom Saree",
    productImage: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    comment: "Good quality handloom saree. Colors are vibrant and fabric feels authentic.",
    rating: 4,
    date: "2024-01-05",
  },
];
interface ReviewsTableProps {
  onDelete: (id: number) => void;
}
const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };
const CustomerReviews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [reviews, setReviews] = useState(mockReviews);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      ratingFilter === "all" || review.rating.toString() === ratingFilter;
    return matchesSearch && matchesRating;
  });

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => setCurrentPage(page);

  const handleDelete = (id: number) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Customer Reviews</h2>
        <p className="text-muted-foreground">Manage customer feedback and ratings</p>
      </div>

      {/* Card */}
      <Card>
        <CardHeader>
          <CardTitle>Review List</CardTitle>
          <CardDescription>View or delete customer reviews</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by customer name or product..."
            className="pl-10 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          {/* <Filter className="text-gray-500 h-4 w-4" /> */}
          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-48 border-gray-200">
              <SelectValue placeholder="Filter by rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">⭐⭐⭐⭐⭐ (5 Stars)</SelectItem>
              <SelectItem value="4">⭐⭐⭐⭐ (4 Stars)</SelectItem>
              <SelectItem value="3">⭐⭐⭐ (3 Stars)</SelectItem>
              <SelectItem value="2">⭐⭐ (2 Stars)</SelectItem>
              <SelectItem value="1">⭐ (1 Star)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

          {/* Table */}
   <div className="rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold text-gray-700">Customer</TableHead>
            <TableHead className="font-semibold text-gray-700">Product</TableHead>
            <TableHead className="font-semibold text-gray-700">Image</TableHead>
            <TableHead className="font-semibold text-gray-700">Review</TableHead>
            <TableHead className="font-semibold text-gray-700">Rating</TableHead>
            <TableHead className="font-semibold text-gray-700 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-12">
                <div className="flex flex-col items-center space-y-2">
                  <Search className="w-12 h-12 text-gray-300" />
                  <p className="text-gray-500 font-medium">No reviews found</p>
                  <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            reviews.map((review) => (
              <TableRow key={review.id} className="hover:bg-gray-50 transition-colors">
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900">{review.user}</div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-gray-900 max-w-xs">
                    {review.product}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-100">
                    <img
                      src={review.productImage}
                      alt={review.product}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-md">
                    <p className="text-gray-700 line-clamp-2">{review.comment}</p>
                  </div>
                </TableCell>
                <TableCell>
                <div className="space-y-3">
  <div className="flex items-center space-x-3">
    {/* Stars */}
    <div className="flex items-center space-x-1">
      {renderStars(review.rating)}
    </div>

    {/* Rating Badge */}
    {/* <span className={`${getRatingColor(review.rating)} border px-2 py-1 text-xs font-medium rounded-full`}>
      {review.rating}/5
    </span> */}
  </div>
</div>

                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <Button
                      // onClick={() => onDelete(review.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div>
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                Previous
              </Button>
              <span className="mx-2">{currentPage}</span>
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
            <span>
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredReviews.length)} of{" "}
              {filteredReviews.length} reviews
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerReviews;
