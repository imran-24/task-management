

import { prisma } from "@/lib/prisma";
import InviteForm from "./_components/invite-form";

export default async function InviteMembers({ params }) {
  // Fetch only users not in the organization in a single query
  const [organization, allUsers] = await Promise.all([
    prisma.organization.findUnique({
      where: {
        id: params.organizationId,
      },
      include: {
        owner: true,
        members: {
          select: {
            member: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    }),
    prisma.user.findMany(),
  ]);

  if (!organization) {
    return null; // Or handle the error case appropriately
  }

  // Create a Set of member IDs for efficient lookup
  const memberIds = new Set([
    ...organization.members.map((m) => m.member.id),
    organization.owner.id,
  ]);

  // Filter users not in the organization
  const filteredUsers = allUsers.filter((user) => !memberIds.has(user.id));

  return (
    <div className='flex items-center justify-center'>
      <InviteForm organization={organization} users={filteredUsers} />
    </div>
  );
}
