"use client";

import { useAuth } from "@/providers/auth-provider";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateOrganization() {
  //   const { data: session } = useSession();
  const router = useRouter();
  const { user } = useAuth();
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) return;

    try {
      const res = await axios.post("/api/organizations", {
        name,
        ownerId: user.id,
      });
      if (res.status === 200) {
        router.refresh();
        router.push(`/dashboard/organization/${res.data.id}`);
      }
    } catch (error) {
      console.error("Error creating organization:", error);
    }
  };

  if (!user) redirect("/");

  return (
    <div className='h-full flex items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded-xl shadow border'
      >
        <h2 className='text-2xl font-bold mb-4'>Create Organization</h2>
        <input
          type='text'
          placeholder='Organization Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className='w-full p-2 pl-4 bg-neutral-100  mb-4 border rounded-xl'
        />
        <button
          type='submit'
          className='w-full bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600'
        >
          Create
        </button>
      </form>
    </div>
  );
}
