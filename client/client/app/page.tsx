"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { api } from "@/lib/api";
import type { Order } from "@/types/order";
import type { Product } from "@/types/product";

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        const [ordersData, productsData] =
          await Promise.all([
            api.get<Order[]>("/orders"),
            api.get<Product[]>("/products"),
          ]);

        if (!cancelled) {
          setOrders(ordersData);
          setProducts(productsData);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "COMPLETED"
  ).length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total),
    0
  );

  if (loading) {
    return (
      <div className="p-8">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Overview of your order system
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-gray-500">
            Total Orders
          </p>

          <p className="mt-2 text-3xl font-bold">
            {orders.length}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-gray-500">
            Pending Orders
          </p>

          <p className="mt-2 text-3xl font-bold">
            {pendingOrders}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-gray-500">
            Completed
          </p>

          <p className="mt-2 text-3xl font-bold">
            {completedOrders}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-gray-500">
            Revenue
          </p>

          <p className="mt-2 text-3xl font-bold">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>

      </div>

      {/* Quick actions */}

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <div className="rounded-xl border bg-white p-6">

          <h2 className="text-xl font-semibold">
            Quick Actions
          </h2>

          <div className="mt-4 flex flex-wrap gap-3">

            <Link
              href="/products"
              className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
            >
              View Products
            </Link>

            <Link
              href="/orders"
              className="rounded-lg border px-4 py-2 hover:bg-gray-50"
            >
              View Orders
            </Link>

            <Link
              href="/users"
              className="rounded-lg border px-4 py-2 hover:bg-gray-50"
            >
              View Users
            </Link>

          </div>

        </div>

        <div className="rounded-xl border bg-white p-6">

          <h2 className="text-xl font-semibold">
            Inventory
          </h2>

          <p className="mt-2 text-gray-500">
            {products.length} products currently available.
          </p>

          <Link
            href="/products"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Manage inventory →
          </Link>

        </div>

      </div>

      {/* Recent orders */}

      <div className="mt-8 rounded-xl border bg-white">

        <div className="flex items-center justify-between border-b p-6">

          <div>
            <h2 className="text-xl font-semibold">
              Recent Orders
            </h2>

            <p className="text-sm text-gray-500">
              Latest customer orders
            </p>
          </div>

          <Link
            href="/orders"
            className="text-sm text-blue-600 hover:underline"
          >
            View all
          </Link>

        </div>

        <div className="divide-y">

          {orders.slice(0, 5).map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="flex items-center justify-between p-6 hover:bg-gray-50"
            >

              <div>
                <p className="font-medium">
                  Order #{order.id}
                </p>

                <p className="text-sm text-gray-500">
                  {order.user.name}
                </p>
              </div>

              <div className="text-right">

                <p className="font-medium">
                  ${Number(order.total).toFixed(2)}
                </p>

                <p className="text-sm text-gray-500">
                  {order.status}
                </p>

              </div>

            </Link>
          ))}

          {orders.length === 0 && (
            <p className="p-6 text-gray-500">
              No orders found.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}