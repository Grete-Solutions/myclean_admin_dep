import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        try {
          const res = await fetch(`https://mycleanapp.netlify.app/lib/GET/Admin/getallAdmins`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
          });

          if (res.ok) {
            const data = await res.json();
            const user = data.product.find((user: any) => user.email === credentials.email);

            if (user && !user.isDeactivated && !user.isSuspended) {
              return user;
            } else {
              throw new Error('User not found or inactive');
            }
          } else {
            throw new Error(`Failed to fetch user data: ${res.status}`);
          }
        } catch (error) {
          console.error('Error during authorization:', error);
          throw new Error('Authorization failed');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.displayName = user.displayName;
      }
      console.log('this is the token', token);
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
        displayName: token.displayName,
      };
      console.log('this is the session', session);

      return session;
    },
  },
};

export default authOptions;
