"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api";

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setLoading(true);

      await api.post("/products", {
        name,
        description: description || null,
        price: Number(price),
        stock: Number(stock),
      });

      router.push("/products");
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl p-8">

      <h1 className="mb-6 text-3xl font-bold">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-lg border p-6"
      >

        <div>
          <label className="mb-2 block">
            Name
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-2 block">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
            rows={4}
          />
        </div>

        <div>
          <label className="mb-2 block">
            Price
          </label>

          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-2 block">
            Stock
          </label>

          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>

      </form>

    </main>
  );
}