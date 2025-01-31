import Link from "next/link";
import React from "react";

const Dropdown = ({ list, title }) => {
  return (
    <section className=''>
      <details className='group'>
        <summary className='flex cursor-pointer items-center justify-between py-2 text-lg font-medium hover:text-gray-500'>
          <p className="text-base">{title}</p>
          <svg
            className='h-5 w-5 transition-transform group-open:rotate-180'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </summary>
        <div className='pl-4 mt-2'>
          {list?.length > 0 ? (
            list.map((org) => (
              <Link
                key={org.id}
                href={`/dashboard/organization/${org.id}/invite`}
                className='block py-2 hover:text-gray-500 transition-colors'
              >
                <p className="text-sm">{org.name}</p>
              </Link>
            ))
          ) : (
            <p className='text-gray-500'>No organizations found</p>
          )}
        </div>
      </details>
    </section>
  );
};

export default Dropdown;
