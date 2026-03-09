"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import LoginModal from "@/app/(auth)/signin/page";
import SignupModal from "@/app/(auth)/signup/page";

export const Appbar = () => {
  const { data: session, status } = useSession();

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // if (status === "loading") return null;

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-semibold tracking-wide text-white">
            EventFlow
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            {!session ? (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm font-medium"
                >
                  Sign In
                </button>

                <button
                  onClick={() => setShowSignup(true)}
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-sm font-medium"
                >
                  Get Started
                </button>
              </>
            ) : (
              <button
                onClick={() => signOut()}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition text-sm font-medium"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </>
  );
};
