"use client";
import { useAuth } from "@/providers/auth-provider";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskList() {
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchTasks = async () => {
      const { data } = await axios.get(`/api/tasks/${user?.id}`);

      setTasks(data.filter(item => {
        const deadline = new Date(item.deadline);
        const today = new Date();
        const diffInDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
        return diffInDays <= 1;
      }));
    };
    fetchTasks();
  }, [user]);


  if (!user) return redirect("/");

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <p className='text-gray-600'>Loading...</p>
      </div>
    );
  }
  return (
    <div className='max-w-5xl mx-auto w-full px-4 xl:px-0'>
      <h2 className='text-xl font-sans font-medium mb-4'>Upcoming Deadlines</h2>
      <div className='space-y-2'>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className='p-3 border rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-all duration-200'
            >
              <div className='flex justify-between items-center'>
                <h3 className='font-medium'>{task.title}</h3>
                <span className='text-sm text-red-600'>
                  Due: {new Date(task.deadline).toLocaleDateString()}
                </span>
              </div>
              <p className='text-sm text-gray-600 mt-1'>{task.description}</p>
            </div>
          ))
        ) : (
          <p className='text-gray-500 text-center py-4'>
            No upcoming deadlines
          </p>
        )}
      </div>
    </div>
  );
}
