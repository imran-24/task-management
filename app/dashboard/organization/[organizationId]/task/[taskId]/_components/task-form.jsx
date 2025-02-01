"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const TaskForm = ({ initialData, members = [] }) => {
  const { organizationId } = useParams();
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [priority, setPriority] = useState(initialData?.priority || "Medium");
  const [deadline, setDeadline] = useState(initialData?.deadline || new Date());
  const [assignedToId, setAssignedToId] = useState(
    initialData?.assignedToId || ""
  );
  const router = useRouter();

  const header = initialData ? "Edit task" : "Create task";
  const details = initialData
    ? "Edit task details"
    : "Create task for your team";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title,
        description,
        priority,
        deadline,
        assignedToId,
        organizationId,
      };
      if (initialData) {
        const response = await axios.put(`/api/tasks/${initialData.id}`, data);
        if (response.status === 200) {
          alert("Update successful!")
          router.refresh();
        }
      } else {
        const response = await axios.post("/api/tasks", data);
        if (response.status === 200) {
          // window.location.reload()
          router.refresh()
          router.push(`/dashboard/organization/${organizationId}`);
        }
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className='p-6 max-w-xl w-full'>
      <h2 className='text-3xl font-semibold capitalize'>{header}</h2>
      <p className='text-sm  text-neutral-500'>{details}</p>
      <form onSubmit={handleSubmit} className='mt-10 space-y-6'>
        <input
          placeholder='Task Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors'
        />
        <textarea
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors min-h-[100px]'
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors bg-white'
        >
          <option value='High'>High</option>
          <option value='Medium'>Medium</option>
          <option value='Low'>Low</option>
        </select>
        <input
          type='datetime-local'
          value={deadline.toISOString().slice(0, 16)}
          onChange={(e) => setDeadline(new Date(e.target.value))}
          required
          className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors'
        />
        <select
          value={assignedToId}
          onChange={(e) => setAssignedToId(e.target.value)}
          className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors bg-white'
        >
          <option value=''>Assign to...</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          {initialData ? "Save changes" : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
