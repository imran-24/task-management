"use client";

import React from "react";
import Dropdown from "../_components/dropdown";

const Sidebar = ({ myorgs, otherorgs }) => {
  return (
    <div className='fixed left-0 top-[4rem] h-full w-64 p-6 border-r shadow'>
      <h1 className='text-2xl mb-8'>Dashboard</h1>

      <div className="flex flex-col space-y-4  transition-all duration-200 ease-in-out"> 
        {/* Owned Organizations */}
        <Dropdown list={myorgs} title='Your Organizations' />

        {/* Member Organizations */}
        <Dropdown list={otherorgs} title='Other Organizations' />
      </div>
    </div>
  );
};

export default Sidebar;
