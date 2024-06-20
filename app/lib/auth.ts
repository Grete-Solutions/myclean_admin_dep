import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, 
  debug: process.env.NODE_ENV === "production",
  session: {
    strategy: "jwt",
    maxAge: 600,
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
          // Fetch active privileges
          const resPrivileges = await fetch(`https://mycleanapp.netlify.app/lib/GET/Priveledges/getActivePriveledges`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
          });

          if (!resPrivileges.ok) {
            console.error('Failed to fetch privileges:', resPrivileges.status);
            return null;
          }

          const privilegesData = await resPrivileges.json();
          const activePrivileges = privilegesData.product;

          // Fetch user data
          const resUser = await fetch(`https://mycleanapp.netlify.app/lib/GET/Admin/getallAdmins`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
          });

          if (!resUser.ok) {
            console.error('Failed to fetch user data:', resUser.status);
            return null;
          }

          const userData = await resUser.json();
          const user = userData.product.find((user: any) => user.email === credentials.email);

          // Check user and privileges
          if (user && !user.isDeactivated && !user.isSuspended) {
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
            if (isPasswordValid) {
              // Check if user has active privileges
              const hasActivePrivileges = activePrivileges.some((privilege: any) => {
                return privilege.id === user.id && privilege.status === 1 && privilege.isDelete === 0;
              });

              if (hasActivePrivileges) {
                return user;
              } else {
                console.error('User does not have active privileges.');
              }
            }
          } else {
            console.error('User is deactivated or suspended.');
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
