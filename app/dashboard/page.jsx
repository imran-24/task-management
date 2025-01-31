"use client";

import { useAuth } from "@/providers/auth-provider";
import { redirect } from "next/navigation";
import { IconPlus } from "./organization/[organizationId]/_components/sidebar";
import Link from "next/link";

const DashboardPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <p className=' text-gray-600'>Loading...</p>
      </div>
    );
  }

  if (!user) return redirect("/");

  const allOrgs = [
    ...(user?.ownedOrgs || []),
    ...(user?.organizations?.map((org) => org.organization) || []),
  ];

  return (
    <div className='max-w-5xl mx-auto w-full border rounded-xl p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold '>Dashboard</h2>
        <Link href={"/dashboard/organization/create"}  className="flex items-center space-x-1 border rounded-lg p-2 bg-neutral-100 hover:bg-neutral-200 transition-all ease-in-out">
          <p>Create organization</p>
          <IconPlus />
        </Link>
      </div>
      <div className='bg-white rounded-lg shadow-sm  '>
        <div className='flex items-center space-x-2'>
          <span className='text-gray-500'>Name:</span>
          <span className='font-medium'>{user.name}</span>
        </div>
        <div className='flex items-center space-x-2'>
          <span className='text-gray-500'>Email:</span>
          <span className='font-medium'>{user.email}</span>
        </div>
        <div className='flex items-center space-x-2'>
          <span className='text-gray-500'>Organizations:</span>
          <span className='font-medium'>{allOrgs.length}</span>
        </div>
        <div className='flex items-center space-x-2'>
          <span className='text-gray-500'>Assigned Tasks:</span>
          <span className='font-medium'>{user.tasks.length}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
