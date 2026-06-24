"use client";

import { useState } from "react";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/types";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (product.isComingSoon || !product.inStock) return;
    addItem(product);
    setAdded(true);
    toast.success("Added to cart!");
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <Button
      size="xl"
      variant={added ? "secondary" : "default"}
      onClick={handleAdd}
      disabled={product.isComingSoon || !product.inStock}
      className="w-full gap-3"
    >
      {added ? (
        <>
          <CheckCircle className="h-5 w-5" />
          Added to Cart
        </>
      ) : product.isComingSoon ? (
        "Coming Soon"
      ) : !product.inStock ? (
        "Out of Stock"
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
