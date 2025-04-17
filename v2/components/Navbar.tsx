import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, auth } from "@/auth";
// Importing the signIn and signOut functions

// Define server actions outside the component
async function handleSignIn() {
  "use server";
  await signIn("google");
}

async function handleSignOut() {
  "use server";
  await signOut();
}

const Navbar = async () => {
  // Get session on the server
  const session = await auth();

  return (
    <header className=" px-5 py-3 shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={144} height={30} />
        </Link>

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
            <form action={handleSignIn}>
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
