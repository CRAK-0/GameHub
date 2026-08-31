"use client";

import Logo from "./Logo";
import { useAuth } from "@/context/AuthContext.jsx";
import Link from "next/link";

export default function Navbar() {
  const { user, loading, logout } = useAuth();

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl items-center px-8 py-5">
        <Logo />
        {loading && (
          <div className="ml-auto text-sm text-zinc-500">Checking...</div>
        )}
        {!loading && user && (
          <div className="ml-auto flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
              {user.username.charAt(0).toUpperCase()}
            </div>

            <div className="leading-tight">
              <p className="text-xs text-zinc-500">Signed in as</p>
              <p className="text-sm font-semibold text-zinc-200">
                {user.username}
              </p>
            </div>
            <button
              onClick={logout}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-purple-500 hover:text-white"
            >
              Logout
            </button>
          </div>
        )}
        {!loading && !user && (
          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition hover:text-white"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-500"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
