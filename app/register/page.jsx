"use client";
import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { redirect, useRouter } from "next/navigation";
import { auth } from "@/firebase";
import Link from "next/link";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, } = useAuth();
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { email: userEmail, uid } = userCredential.user;

      await axios.post("/api/user", {
        firebaseId: uid,
        email: userEmail,
        name: email.split("@")[0],
      });

      window.location.reload();
      router.push("/");
    } catch (error) {
      console.error("Registration failed:", error);
      const errorMessage =
        error.code === "auth/email-already-in-use"
          ? "Email already exists"
          : "Registration failed. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    redirect("/");
  }

  return (
    <div className='h-full flex flex-col  items-center justify-center'>
      <form
        onSubmit={handleSignup}
        className='bg-white p-6 rounded-xl shadow border'
      >
        <h2 className='text-3xl font-extrabold mb-4'>Create Account</h2>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          required
          className='w-full p-2 pl-4 mb-4 border rounded-xl bg-neutral-100'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
          className='w-full p-2 pl-4 mb-4 border rounded-xl bg-neutral-100'
        />
        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 disabled:bg-gray-400'
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
      </form>
      <div className='mt-2 flex items-center space-x-2'>
        <p className='text-neutral-500'>Already have an account ?</p>
        <Link href='/login' className='underline'>
          Login
        </Link>
      </div>
    </div>
  );
}
