// Navbar.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";

// Define server actions outside the component
async function handleGithubSignIn() {
  "use server";
  await signIn("github");
}

async function handleSignOut() {
  "use server";
  await signOut();
}

const Navbar = async () => {
  // Get session on the server
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-md font-work-sans text-black">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </Link>

        {/* This div shows different things based on whether you're logged in */}
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="text-black">Create</span>
              </Link>

              <form action={handleSignOut}>
                <button type="submit" className="text-black">
                  LogOut
                </button>
              </form>

              <Link href={`/user/${session?.user?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form action={handleGithubSignIn}>
              <button
                type="submit"
                className="bg-gray-400 px-4 py-2 rounded-xl"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
