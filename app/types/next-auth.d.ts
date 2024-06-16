// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: string;
    displayName: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      displayName: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    role: string;
    displayName: string;
  }
}
