"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const InviteList = ({ invites }) => {
  const router = useRouter();
  const handleAcceptInvite = async (invite) => {
    try {
      await axios.patch(`/api/invite/${invite.id}`, {
        response: true,
        memberId: invite.userId,
        organizationId: invite.organizationId,
      });


      alert("Invitation Accepted");
      router.push(`/dashboard/organization/${invite.organizationId}`);

      // You might want to add success notification or state update here
    } catch (error) {
      console.error("Error accepting invite:", error);
      // You might want to add error notification here
      throw error;
    }
  };

  const handleRejectInvite = async (invite) => {
    try {
      await axios.patch(`/api/invite/${invite.id}`, {
        memberId: invite.userId,
        organizationId: invite.organizationId,
      });

      alert("Invitation Rejected");
      router.refresh();

      // You might want to add success notification or state update here
    } catch (error) {
      console.error("Error accepting invite:", error);
      // You might want to add error notification here
      throw error;
    }
  };

  return (
    <ul className='space-y-4'>
      {invites.map((invite) => (
        <li key={invite.id} className='border p-4 rounded-xl'>
          <p>Organization: {invite.organization.name}</p>
          <p>Status: {invite.status}</p>
          <p>
            Expires:{" "}
            {invite.expiresAt
              ? new Date(invite.expiresAt).toLocaleDateString()
              : "No expiration"}
          </p>
          <div className='mt-4 space-x-4'>
            <button
              onClick={() => handleAcceptInvite(invite)}
              className='bg-green-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-green-600'
            >
              Accept
            </button>
            <button
              onClick={() => handleRejectInvite(invite)}
              className='bg-red-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-red-600'
            >
              Reject
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default InviteList;
