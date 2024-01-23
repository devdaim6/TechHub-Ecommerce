import { connectMongoDB } from "@/lib/db";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { username, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ username });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          // Return only necessary properties of the user
          return { name: user?.name, email: user?.email };
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  session: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async session(session) {
      const sessionUser = await User.findOne({
        email: session?.session?.user?.email,
      });
      if (sessionUser) {
        session.token.role = sessionUser?.role;
        session.token.isVerified = sessionUser?.isVerified;
        session.session.user.createdAt = sessionUser?.createdAt;
        session.session.user.image = sessionUser?.image;
        session.session.user.id = sessionUser?._id;
        session.session.user.isVerified = sessionUser?.isVerified;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
