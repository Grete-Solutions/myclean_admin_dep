import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    role: string; // Add the role property
  }

  interface Session {
    user: User & {
      email: string;
      role: string; // Include role in the session
    };
    token: {
      email: string;
    };
  }
}
