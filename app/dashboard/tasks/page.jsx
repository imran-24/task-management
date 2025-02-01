"use client";
import { useAuth } from "@/providers/auth-provider";
import axios from "axios";
import { redirect } from "next/navigation";
// import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TaskList() {
  //   const { data: session } = useSession();
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchTasks = async () => {
      const { data } = await axios.get(`/api/tasks/${user?.id}`);
      setTasks(data);
    };
    fetchTasks();
  }, [user]);

  const handleComplete = async (taskId) => {
    try {
      const { data } = await axios.put(`/api/tasks/${taskId}`,{
        isCompleted: true
      });
      if (data) {
        setTasks(
          tasks.map((task) =>
            task.id === taskId ? { ...task, isCompleted: true } : task
          )
        );
      }
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

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
      <h2 className='text-xl font-sans font-medium mb-4'>Your Tasks</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className='block p-4 border rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200'
            >
              <h3 className='text-xl mb-2'>{task.title}</h3>
              <div className='text-sm text-gray-600 space-y-1'>
                <p>{task.description}</p>
                <p>Priority: {task.priority}</p>
                <p>Deadline: {new Date(task.deadline).toLocaleString()}</p>
              </div>
              {task.isCompleted ? 
                <p>Done</p>
              :<button
                onClick={() => handleComplete(task.id)}
                className='mt-4 w-fit bg-green-500 text-white p-2 rounded-xl hover:bg-green-600 transition-colors duration-200'
              >
                Mark as Complete
              </button>}
            </div>
          ))
        ) : (
          <p className='text-gray-500 text-center col-span-full py-8'>
            No tasks found
          </p>
        )}
      </div>
    </div>
  );
}
