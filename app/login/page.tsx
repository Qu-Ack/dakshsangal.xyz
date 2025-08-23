"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Login() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/login`,
        {
          method: "POST",
          body: JSON.stringify({ password }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Login failed. Please try again.");
        return;
      }

      const data = await response.json();
      localStorage.setItem("sesId", data.sessionId);
      router.push("/");
    } catch (err) {
      console.log(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-[100%] min-h-[70vh] p-3 mt-10">
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        className="border-l border-t border-l-yellow-300 border-t-yellow-300 p-3"
        id="password"
        placeholder="********"
        disabled={isLoading}
      />
      <button
        type="submit"
        onClick={handleLogin}
        className="ml-8 hover:bg-amber-200 hover:text-black hover:cursor-pointer p-3"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
