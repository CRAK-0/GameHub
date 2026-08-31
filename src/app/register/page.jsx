"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      router.push("/login");
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
        <h1 className="text-2xl font-bold">Create Account</h1>

        <p className="mt-2 text-sm text-zinc-400">
          Create your GameHub account
        </p>

        <div className="mt-6">
          <label className="text-sm text-zinc-300">Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={3}
            maxLength={8}
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-purple-500"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm text-zinc-300">Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-purple-500"
          />
        </div>

        <div className="relative mt-2">
          <label className="text-sm text-zinc-300">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 pr-12 text-sm outline-none focus:border-purple-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-zinc-400 hover:text-white mt-2"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative mt-2">
          <label className="text-sm text-zinc-300">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 pr-12 text-sm outline-none focus:border-purple-500"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-zinc-400 hover:text-white mt-2"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold transition hover:bg-purple-500 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="mt-5 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="font-medium text-purple-400 hover:text-purple-300"
          >
            Login
          </button>
        </p>
      </form>
    </main>
  );
}
