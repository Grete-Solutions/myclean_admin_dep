import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'


const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, 
  debug: process.env.NODE_ENV === "production",
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        try {
          const res = await fetch(`https://mycleanapp.netlify.app/lib/GET/Admin/getallAdmins`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
          });
///check status and isdelete from priviledges if 1 or 0  stat=1 allowed is del=1 not allowed
          if (res.ok) {
            const data = await res.json();
            const user = data.product.find((user:any) => user.email === credentials.email);
            if (user && !user.isDeactivated && !user.isSuspended) {
              const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
              if (isPasswordValid) {
                return user;
              }
            }
          } else {
            console.error('Failed to fetch user data:', res.status);
          }
        } catch (error) {
          console.error('Error during authorization:', error);
        }
        return null;
      }
    })
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
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        role: token.role as string,
        displayName: token.displayName as string,
      };
      return session;
    }
  },
};

export default authOptions;
