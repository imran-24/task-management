import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const Dropdown = ({ list = [], title, error, organizationId }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    if (!id) return;

    try {
      await axios.delete(`/api/tasks/${id}`);
      window.location.reload();
      router.push(`/dashboard/organization/${organizationId}`);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  const ChevronIcon = () => (
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
  );

  const DeleteIcon = () => (
    <svg
      className='h-5 w-5 text-red-500 hover:text-red-700'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
      />
    </svg>
  );

  return (
    <section className='px-2'>
      <details className='group'>
        <summary className='flex cursor-pointer items-center justify-between text-lg font-medium hover:text-gray-500'>
          <p className='text-base'>{title}</p>
          <ChevronIcon />
        </summary>
        <div className='space-y-2 mt-1'>
          {list.length > 0 ? (
            list.map(({ id, email, title: itemTitle }) => (
              <div
                key={id}
                className='w-full flex items-center justify-between pl-2 text-neutral-700 hover:text-gray-500 transition-colors border rounded-lg px-2 py-1 hover:bg-neutral-200'
              >
                {itemTitle && (
                  <Link
                    className='flex-1'
                    href={`/dashboard/organization/${organizationId}/task/${id}`}
                  >
                    <p className='text-sm capitalize'>{itemTitle}</p>
                  </Link>
                )}
                {email && (
                  <div className='flex-1'>
                    <p className='text-sm'>{email}</p>
                  </div>
                )}
                {itemTitle && (
                  <button className='z-10' onClick={() => handleDelete(id)}>
                    <DeleteIcon />
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className='text-gray-500 pl-2'>{error}</p>
          )}
        </div>
      </details>
    </section>
  );
};

export default Dropdown;
