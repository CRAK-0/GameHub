"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext.jsx";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  // states here

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // handleSubmit here

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      login(data);

      router.push("/");
    } catch (error) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        <p className="mt-2 text-sm text-zinc-400">
          Login to your GameHub account
        </p>

        <div className="mt-6">
          <label className="text-sm text-zinc-300">Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm text-zinc-300">Password</label>

          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 pr-12 text-sm outline-none focus:border-purple-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-zinc-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold transition hover:bg-purple-500 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
