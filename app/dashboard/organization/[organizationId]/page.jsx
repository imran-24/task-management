import React from "react";

const OrganizationPage = async ({ params }) => {
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

  if (!organization) return null;

  return (
    <div className='flex flex-col gap-4 p-4 border rounded-xl mx-4'>
      <h1 className='text-2xl font-semibold '>{organization.name}</h1>

      <div className=''>
        <h2 className='text-lg font-medium mb-2'>
          Organization Details:
        </h2>
        <div className='text-base '>
          <p>Owner: <span className="capitalize">{organization.owner.name}</span></p>
          <p>Total Members: {members.length}</p>
          <p>Total Tasks: {tasks.length}</p>
        </div>
      </div>

      <div className=''>
        <h2 className='text-lg font-medium mb-2'>Members:</h2>
        <ul className='list-disc pl-4'>
          {members.map((member) => (
            <li key={member.id} className="capitalize">{member.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrganizationPage;
