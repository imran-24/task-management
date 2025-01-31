"use client";
import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredential.user) {
        throw new Error("No user data available");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      const errorMessage =
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
          ? "Invalid email or password"
          : "Login failed. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    router.push("/");
    return null;
  }

  return (
    <div className='h-full flex flex-col items-center  justify-center'>
      <form
        onSubmit={handleLogin}
        className='bg-white p-6 rounded-xl shadow border'
      >
        <h2 className='text-3xl font-extrabold mb-4'>Login</h2>
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
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <div className="mt-2 flex items-center space-x-2">
        <p className="text-neutral-500">Do not have an account ?</p>
        <Link href="/register" className="underline">Create Account</Link>
      </div>
    </div>
  );
}
