"use client";

import { useAuth } from "@/providers/auth-provider";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className='bg-blue-600 p-4 h-16 text-white z-50 fixed top-0 left-0 right-0 font-mono'>
      <div className=' mx-auto flex justify-between items-center'>
        <Link href='/' className='text-2xl font-bold'>
          TaskFlow Solutions
        </Link>
        {user ? (
          <div className='space-x-4'>
            <Link href='/dashboard' className='hover:underline'>
              Dashboard
            </Link>
            <Link href='/dashboard/organization' className='hover:underline'>
              Organizations
            </Link>
            <Link href='/dashboard/tasks' className='hover:underline'>
              Tasks
            </Link>

            <Link href='/dashboard/invites' className='hover:underline'>
              Invites
            </Link>
          </div>
        ) : (
          <p className='text-white text-sm'>Loading...</p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
