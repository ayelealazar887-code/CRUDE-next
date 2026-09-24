"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { api } from "@/lib/api";
import type { Order, OrderStatus } from "@/types/order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchOrders() {
      try {
        setLoading(true);
        setError("");

        const data = await api.get<Order[]>("/orders");

        if (!cancelled) {
          setOrders(data);
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load orders"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchOrders();

    return () => {
      cancelled = true;
    };
  }, []);

  async function updateStatus(
    orderId: number,
    status: OrderStatus
  ) {
    try {
      await api.patch(`/orders/${orderId}/status`, {
        status,
      });

      // Reload orders after updating the status
      const data = await api.get<Order[]>("/orders");

      setOrders(data);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update order status"
      );
    }
  }

  async function deleteOrder(orderId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/orders/${orderId}`);

      setOrders((currentOrders) =>
        currentOrders.filter(
          (order) => order.id !== orderId
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete order"
      );
    }
  }

  async function refreshOrders() {
    try {
      setLoading(true);
      setError("");

      const data = await api.get<Order[]>("/orders");

      setOrders(data);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="p-8">
        <h1 className="mb-4 text-3xl font-bold">
          Orders
        </h1>

        <p className="text-gray-500">
          Loading orders...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-8">
        <h1 className="mb-4 text-3xl font-bold">
          Orders
        </h1>

        <p className="mb-4 text-red-500">
          {error}
        </p>

        <button
          onClick={refreshOrders}
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="p-8">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Orders
          </h1>

          <p className="text-gray-500">
            Manage customer orders
          </p>
        </div>

        <button
          onClick={refreshOrders}
          className="rounded-lg border bg-white px-4 py-2 hover:bg-gray-50"
        >
          Refresh
        </button>

      </div>

      {/* Orders table */}
      <div className="overflow-hidden rounded-lg border bg-white">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">
                ID
              </th>

              <th className="px-6 py-4 text-left">
                Customer
              </th>

              <th className="px-6 py-4 text-left">
                Items
              </th>

              <th className="px-6 py-4 text-left">
                Total
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Created
              </th>

              <th className="px-6 py-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50"
              >

                {/* ID */}
                <td className="px-6 py-4 font-medium">
                  #{order.id}
                </td>

                {/* Customer */}
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">
                      {order.user.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.user.email}
                    </p>
                  </div>
                </td>

                {/* Items */}
                <td className="px-6 py-4">
                  {order.items.length}
                </td>

                {/* Total */}
                <td className="px-6 py-4 font-medium">
                  ${Number(order.total).toFixed(2)}
                </td>

                {/* Status */}
                <td className="px-6 py-4">

                  <select
                    value={order.status}
                    onChange={(event) =>
                      updateStatus(
                        order.id,
                        event.target.value as OrderStatus
                      )
                    }
                    className="rounded-lg border px-3 py-2"
                  >
                    <option value="PENDING">
                      PENDING
                    </option>

                    <option value="PAID">
                      PAID
                    </option>

                    <option value="CANCELLED">
                      CANCELLED
                    </option>

                    <option value="COMPLETED">
                      COMPLETED
                    </option>
                  </select>

                </td>

                {/* Created */}
                <td className="px-6 py-4">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <Link
                      href={`/orders/${order.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>

                    <button
                      onClick={() =>
                        deleteOrder(order.id)
                      }
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

        {orders.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No orders found.
          </div>
        )}

      </div>

    </main>
  );
}