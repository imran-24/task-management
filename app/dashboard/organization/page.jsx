

"use client";

import { useAuth } from "@/providers/auth-provider";
import { redirect } from "next/navigation";
import Link from "next/link";

const OrganizationCard = ({ org, user }) => (

  <Link
    href={`/dashboard/organization/${org.id}` }
    className='block p-4 hover:bg-gray-50 transition-all duration-200 border rounded-lg shadow-sm hover:shadow-md'
  >
    <h3 className='text-xl mb-2'>{org.name}</h3>
    <div className='text-sm text-gray-600 space-y-1'>
      <p>Members: {org.members.length + 1}</p>
      <p>Tasks: {org.tasks.length}</p>
      <p>Admin: <span className="capitalize">{org.owner.id === user.id ? "you" : org.owner.name}</span></p>
    </div>
  </Link>
);

// export default function CreateOrganization() {
//   //   const { data: session } = useSession();
//   const router = useRouter();
//   const { user } = useAuth();
//   const [name, setName] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user?.id) return;

//     try {
//       const res = await axios.post("/api/organizations", {
//         name,
//         ownerId: user.id,
//       });
//       if (res.status === 200) {
//         router.refresh();
//         router.push("/dashboard");
//       }
//     } catch (error) {
//       console.error("Error creating organization:", error);
//     }
//   };

//   if (!user) redirect("/");

//   return (
//     <div className='h-full flex items-center justify-center'>
//       <form
//         onSubmit={handleSubmit}
//         className='bg-white p-6 rounded-xl shadow border'
//       >
//         <h2 className='text-2xl font-bold mb-4'>Create Organization</h2>
//         <input
//           type='text'
//           placeholder='Organization Name'
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className='w-full p-2 pl-4 bg-neutral-100  mb-4 border rounded-xl'
//         />
//         <button
//           type='submit'
//           className='w-full bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600'
//         >
//           Create
//         </button>
//       </form>
//     </div>
//   );
// }


import React from 'react'

const OrganizationPage = () => {
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
      <div className='max-w-5xl mx-auto w-full px-4 xl:px-0'>
        <h2 className='text-xl font-sans font-medium mb-4'>
          All Organizations
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {allOrgs.length > 0 ? (
            allOrgs.map((org) => <OrganizationCard user={user} key={org.id} org={org} />)
          ) : (
            <p className='text-gray-500 text-center col-span-full py-8'>
              No organizations found
            </p>
          )}
        </div>
      </div>
    );
  };

export default OrganizationPage