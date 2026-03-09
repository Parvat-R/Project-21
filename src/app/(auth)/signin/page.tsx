"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      onClose();
      router.refresh();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white text-black rounded-lg p-8 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-green-500 text-white py-2 rounded mb-4"
          onClick={handleLogin}
        >
          Login
        </button>

        <button
          className="w-full bg-blue-500 text-white py-2 rounded mb-2"
          onClick={() => signIn("google")}
        >
          Google
        </button>

        <button
          className="w-full bg-gray-800 text-white py-2 rounded"
          onClick={() => signIn("github")}
        >
          Github
        </button>
      </div>
    </div>
  );
}
