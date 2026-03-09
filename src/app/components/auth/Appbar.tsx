"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import LoginModal from "@/app/(auth)/signin/page";
import SignupModal from "@/app/(auth)/signup/page";

export const Appbar = () => {
  const { data: session, status } = useSession();

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  if (status === "loading") {
    return null;
  }

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="text-xl font-bold">My App</div>

        <div>
          {!session ? (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded mr-3"
                onClick={() => setShowLogin(true)}
              >
                Sign In
              </button>

              <button
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                onClick={() => setShowSignup(true)}
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          )}
        </div>
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </>
  );
};
