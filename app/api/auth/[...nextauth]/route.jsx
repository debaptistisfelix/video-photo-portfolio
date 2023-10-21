/* import NextAuth from 'next-auth';
import { CredentialsProvider } from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export default NextAuth({
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials:  {
                  async authorize(credentials) {
                    const user = await prisma.portfolioAdmin.findUnique({
                        where: {
                            username: credentials.username
                        }
                    });
                    if(user && bcrypt.compareSync(credentials.password, user.hashedPassword)) {
                        return user;
                    } else {
                        return null;
                    }
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
}); */