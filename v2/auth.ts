import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ profile }) {
      if (!profile) return false;

      const { sub, name, email, picture } = profile as {
        sub: string;
        name: string;
        email: string;
        picture: string;
      };

      const existingUser = await client.fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
        id: sub,
      });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          _id: sub,
          name,
          username: name,
          email,
          image: picture,
          bio: "",
        });
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const { sub } = profile as { sub: string };

        const user = await client.fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
          id: sub,
        });

        token.id = user?._id;
      }
      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
