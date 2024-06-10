import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
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
        email: { label: "email", type: "text", placeholder: "Enter email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`/lib/POST/postlogin`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });

          if (res.ok) {
            const data = await res.json();
            if (data.user) {
              return { ...data.user, email: data.user.email }; // Ensure email is set for the session
            }
            console.log('userdata',data.user)
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
        token.email = user.email; // Ensure email is set in the token
      }
      return token;
    },
    async session({ session, token }) {
return{ 
    ...session,
user:{
    ...session.user,
username: token.email
}}
    }
  }
};

export default authOptions;
