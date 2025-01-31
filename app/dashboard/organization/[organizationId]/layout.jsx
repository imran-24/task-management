import { prisma } from "@/lib/prisma";
import Sidebar from "./_components/sidebar";

export default async function OrganizationLayout({ children, params }) {
  const organization = await prisma.organization.findUnique({
    where: {
      id: params.organizationId,
    },
    include: {
      members: {
        include: {
          member: true,
        },
      },
      owner: true,
      tasks: true,
    },
  });

  const tasks = organization?.tasks;
  const members = [...organization?.members.map((member) => member.member), organization.owner];
  const owner = organization.owner;

  if (!organization) return null;

  return (
    <div className='flex relative '>
      <Sidebar members={members} tasks={tasks} organizationId={params.organizationId}  owner={owner}  />
      <div className='w-full pl-64'>
        {children}
      </div>
    </div>
  );
}
