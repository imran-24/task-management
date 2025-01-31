"use client";

import { useAuth } from "@/providers/auth-provider";
import axios from "axios";
import { useEffect, useState } from "react";
import InviteList from "./_components/invite-list";
import { redirect } from "next/navigation";

const InvitesPage = () => {
  const { user, loading } = useAuth();
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    const fetchInvites = async () => {
      if (!user?.id) return;
      try {
        const { data } = await axios.get(`/api/invite/pending/${user.id}`);
        setInvites(data);
      } catch (error) {
        console.error("Error fetching invites:", error);
      }
    };

    fetchInvites();
  }, [user?.id]);

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <p className='text-gray-600'>Loading...</p>
      </div>
    );
  }

  if (!user) return redirect("/");

  return (
    <div className='max-w-5xl mx-auto w-full px-4 xl:px-0'>
      <h2 className='text-xl font-sans font-medium mb-4'>My Invites</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {invites.length === 0 ? (
          <p className='text-gray-500 text-center col-span-full py-8'>
            No invites found
          </p>
        ) : (
          <InviteList invites={invites} />
        )}
      </div>
    </div>
  );
};

export default InvitesPage;
