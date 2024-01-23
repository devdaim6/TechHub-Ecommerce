"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
const TopContent = () => {
  const { status } = useSession();
  return (
    <div className="flex gap-x-4 justify-center lg:justify-end bg-neutral/70">
      {status === "unauthenticated" && (
        <>
          <p className="text-base-content cursor-pointer link link-hover    px-2">
            <Link href="/login">Sign in</Link>
          </p>
          <p className="text-base-content cursor-pointer link link-hover     px-2">
            <Link href="/register">Create Account ?</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default TopContent;
