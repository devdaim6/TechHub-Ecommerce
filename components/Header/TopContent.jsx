import React from "react";
import Link from "next/link";
const TopContent = () => {
  return (
    <div className="flex gap-x-4 justify-center lg:justify-end bg-neutral/70">
      <p className="text-base-content cursor-pointer link link-hover    px-2">
        <Link href="/auth/login">Sign in</Link>
      </p>
      <p className="text-base-content cursor-pointer link link-hover     px-2">
        <Link href="/auth/register">Create Account ?</Link>
      </p>
    </div>
  );
};

export default TopContent;
