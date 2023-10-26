import NextAuth from "next-auth/next";
import {PrismaClient} from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
 


const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers :[
      CredentialsProvider({
        name:"credentials",
        credentials: {
          username: {label: "Username", type: "text", placeholder: "Username"},
          password: {label: "Password", type: "password"},
        },
        async authorize(credentials) {
          if(!credentials.username || !credentials.password){
            return null
          }
          console.log("doing stuff")

          const user = await prisma.capozzi.findUnique({
            where: {username: credentials.username}
          })

          if(!user){
            console.log("no user found")
            return null
          }

          const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

          if(!passwordMatch){
            return null
          }

          return user;
        }
      })
    ],
    callbacks:{
      async jwt({token, user}){
        if(user?.id){
          token.id = user.id
        }
        if(user?.username){
          token.username = user.username
        }

        return token
      },
      async session({session, token}){
        session.id= token.id;
        session.username = token.username;

        return session;
      }
    },
    secret:process.env.SECRET,
    session:{
      strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development", 
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
