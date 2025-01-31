"use client";

import React from "react";
import Dropdown from "../_components/dropdown";
import Link from "next/link";
import { useAuth } from "@/providers/auth-provider";

export const IconPlus = () => (
  <svg
    className='h-5 w-5'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M12 4v16m8-8H4'
    />
  </svg>
);

const IconInvite = () => (
  <svg
    className='h-5 w-5'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
    />
  </svg>
);

const NavLink = ({ href, text, icon: Icon }) => (
  <Link
    href={href}
    className="flex items-center justify-between w-full rounded-lg px-2 py-1 hover:bg-neutral-200"
  >
    <p>{text}</p>
    <Icon />
  </Link>
);

const Sidebar = ({ members, tasks, organizationId, owner }) => {
  const {user} = useAuth();
  return (
    <div className='fixed left-0 top-[4rem] h-full w-64 p-4 border-r shadow space-y-4 font-mono'>
      <h1 className='text-2xl mb-4'>Organization</h1>
      <div className='flex flex-col transition-all duration-200 ease-in-out space-y-2'>
        <Dropdown list={members} title='All members' error="No member found" />
        <Dropdown list={tasks} title='All tasks' error="No task found" organizationId={organizationId} />
      </div>
      <hr />
      {user?.id === owner.id && <div>
        <NavLink 
          href={`/dashboard/organization/${organizationId}/task/new`}
          text="Create task"
          icon={IconPlus}
        />
        <NavLink 
          href={`/dashboard/organization/${organizationId}/invite`}
          text="Invite"
          icon={IconInvite}
        />
      </div>}
    </div>
  );
};

export default Sidebar;
