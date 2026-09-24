"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { api } from "@/lib/api";
import type { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await api.get<Product[]>("/products");

        // Don't update state if the component was unmounted
        if (!cancelled) {
          setProducts(data);
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load products"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <main className="p-8">
        <p>Loading products...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-8">
        <h1 className="mb-4 text-3xl font-bold">
          Products
        </h1>

        <p className="text-red-500">
          {error}
        </p>
      </main>
    );
  }

  return (
    <main className="p-8">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-gray-500">
            Manage products and inventory
          </p>
        </div>

        <Link
          href="/products/new"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">
                ID
              </th>

              <th className="px-6 py-4 text-left">
                Name
              </th>

              <th className="px-6 py-4 text-left">
                Description
              </th>

              <th className="px-6 py-4 text-left">
                Price
              </th>

              <th className="px-6 py-4 text-left">
                Stock
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t"
              >
                <td className="px-6 py-4">
                  {product.id}
                </td>

                <td className="px-6 py-4 font-medium">
                  {product.name}
                </td>

                <td className="px-6 py-4">
                  {product.description || "-"}
                </td>

                <td className="px-6 py-4">
                  ${Number(product.price).toFixed(2)}
                </td>

                <td className="px-6 py-4">
                  {product.stock}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        {products.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No products found.
          </div>
        )}

      </div>

    </main>
  );
}