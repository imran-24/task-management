"use client";

import { useAuth } from "@/providers/auth-provider";
import axios from "axios";
import { redirect } from "next/navigation";
import { useState } from "react";

const InviteForm = ({ organization, users }) => {
  const { user, loading } = useAuth();
  const [userId, setUserId] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      const res = await axios.post("/api/invite", {
        userId,
        organizationId: organization.id,
      });
      if (res.status === 200) {
        alert("Invitation sent!");
      }
    } catch (error) {
      console.log(error);
      alert("Already sent invitation");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) redirect("/");

  return (
    <form onSubmit={handleSubmit} className=''>
      <h2 className='text-2xl font-bold mb-4'>Invite Members</h2>

      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className='w-full p-2 mb-4 border rounded'
        required
      >
        <option value=''>Select a user</option>
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.email}
          </option>
        ))}
      </select>
      <button
        type='submit'
        className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
      >
        Send Invitation
      </button>
    </form>
  );
};

export default InviteForm;
