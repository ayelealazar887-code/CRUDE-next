"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";
import type { User } from "@/types/user";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await api.get<User[]>("/users");

        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) {
    return (
      <main className="p-8">
        Loading users...
      </main>
    );
  }

  return (
    <main className="p-8">

      <h1 className="mb-6 text-3xl font-bold">
        Users
      </h1>

      <div className="overflow-hidden rounded-lg border">

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
                Email
              </th>

              <th className="px-6 py-4 text-left">
                Created
              </th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t"
              >

                <td className="px-6 py-4">
                  {user.id}
                </td>

                <td className="px-6 py-4">
                  {user.name}
                </td>

                <td className="px-6 py-4">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}