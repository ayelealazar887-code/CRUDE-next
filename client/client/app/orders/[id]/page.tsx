"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { api } from "@/lib/api";
import type { Order } from "@/types/order";

export default function OrderDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchOrder() {
      try {
        const data = await api.get<Order>(
          `/orders/${id}`
        );

        if (!cancelled) {
          setOrder(data);
          setLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load order"
          );

          setLoading(false);
        }
      }
    }

    fetchOrder();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="p-8">
        Loading order...
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="p-8">
        <p className="text-red-500">
          {error || "Order not found"}
        </p>

        <Link
          href="/orders"
          className="mt-4 inline-block text-blue-600"
        >
          ← Back to orders
        </Link>
      </main>
    );
  }

  return (
    <main className="p-8">

      <Link
        href="/orders"
        className="text-blue-600 hover:underline"
      >
        ← Back to orders
      </Link>

      <div className="mt-6 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Order #{order.id}
          </h1>

          <p className="mt-1 text-gray-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <span className="rounded-full bg-gray-100 px-4 py-2 font-medium">
          {order.status}
        </span>

      </div>

      {/* Customer */}

      <div className="mt-8 rounded-xl border bg-white p-6">

        <h2 className="text-xl font-semibold">
          Customer
        </h2>

        <div className="mt-4">
          <p className="font-medium">
            {order.user.name}
          </p>

          <p className="text-gray-500">
            {order.user.email}
          </p>
        </div>

      </div>

      {/* Items */}

      <div className="mt-6 rounded-xl border bg-white">

        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">
            Order Items
          </h2>
        </div>

        <div className="divide-y">

          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-6"
            >

              <div>
                <p className="font-medium">
                  {item.product.name}
                </p>

                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="font-medium">
                $
                {(
                  Number(item.price) * item.quantity
                ).toFixed(2)}
              </p>

            </div>
          ))}

        </div>

        <div className="flex justify-between border-t p-6">

          <span className="font-semibold">
            Total
          </span>

          <span className="text-xl font-bold">
            ${Number(order.total).toFixed(2)}
          </span>

        </div>

      </div>

    </main>
  );
}