import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Your Username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Your Password"
                }
            },
            async authorize(credentials) {
                const user = { id: "6", name: "Arjun", password: "impart"};

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {return null}
            }
        })
      ],
}