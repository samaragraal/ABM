import type { Metadata } from "next";
import { CartPageClient } from "./cart-client";

export const metadata: Metadata = {
  title: "Your Cart",
};

export default function CartPage() {
  return <CartPageClient />;
}
