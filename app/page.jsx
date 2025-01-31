"use client";

import { auth } from "@/firebase";
import { useAuth } from "@/providers/auth-provider";
import { signOut } from "firebase/auth";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();


  const logout = async () => {
    try {
      await signOut(auth);
      alert("Successfully logged out!");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div className='h-full flex flex-col items-center justify-center '>
      <h1 className='text-4xl font-bold mb-4'>Welcome to TaskFlow Solutions</h1>
      <p className='text-lg mb-8'>Your task management solution</p>
      {user ? (
        <button onClick={logout}  className='bg-neutral-100 border px-6 py-2 rounded-lg hover:bg-neutral-200'>
          Logout
        </button>
      ) : (
        <Link
          href='/login'
          className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600'
        >
          Login
        </Link>
      )}
    </div>
  );
}
