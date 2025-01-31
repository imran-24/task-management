import TaskForm from "./_components/task-form";

const Taskpage = async ({ params }) => {
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
    },
  });

  const task = params.taskId === 'new' ? null : await prisma.task.findUnique({
    where: {
      id: params.taskId
    },
  })

  const members = [...organization?.members.map((member) => member.member), organization.owner];

  console.log(members)
  return (
    <div className='flex items-center justify-center'>
      <TaskForm  initialData={task}  members={members} organizationId={params.organizationId} />
    </div>
  );
};

export default Taskpage;
