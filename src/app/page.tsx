"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/api/auth/authorize");
  };

  return (
    <div className="grid place-items-center min-h-screen">
      <button
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        onClick={handleClick}
      >
        Authorization
      </button>
    </div>
  );
}
