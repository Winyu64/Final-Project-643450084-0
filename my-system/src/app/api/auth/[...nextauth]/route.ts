import NextAuth from "next-auth"; // แสดงการนำเข้าโมดูล NextAuth จากไลบรารี "next-auth
import { Account, User as AuthUser } from "next-auth"; // นำเข้าชนิดข้อมูล Account และ User จาก "next-auth" โดยกำหนดชื่อของ User เป็น AuthUser เพื่อหลีกเลี่ยงความขัดแย้งกับชื่ออื่นที่อาจมีอยู่ในโค้ด
import GithubProvider from "next-auth/providers/github"; // นำเข้าโมดูล GithubProvider จาก "next-auth/providers/github" เพื่อใช้ในการให้บริการการเข้าสู่ระบบผ่าน GitHub
import CredentialsProvider from "next-auth/providers/credentials";// นำเข้าโมดูล CredentialsProvider จาก "next-auth/providers/credentials" เพื่อให้บริการการเข้าสู่ระบบโดยใช้ข้อมูลใบรับรอง (credentials) ที่ระบุชื่อผู้ใช้และรหัสผ่าน
import bcrypt from "bcryptjs";//  นำเข้าโมดูล bcrypt และใช้ในการเข้ารหัสและตรวจสอบรหัสผ่าน.
import User from "@/models/User";// นำเข้าโมดูล User จาก "@/models/User" ซึ่งเป็นโมดูลที่เกี่ยวข้องกับข้อมูลผู้ใช้.
import connect from "@/utils/db";//นำเข้าโมดูล connect จาก "@/utils/db" ซึ่งเป็นโมดูลที่ใช้ในการเชื่อมต่อกับฐานข้อมูล
// นี่คือการกำหนดค่าและการกำหนดตัวเลือกสำหรับการยืนยันตัวตน (authentication) โดยใช้ NextAuth.js และนำข้อมูลผู้ใช้เข้าในระบบ 
export const authOptions: any = {
  // กำหนดค่าผู้ให้บริการตรวจสอบสิทธิ์ตั้งแต่หนึ่งรายขึ้นไป
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // เพิ่มผู้ให้บริการเพิ่มเติมที่นี่
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "github") {
        await connect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
    },
  },
};

export const handler = NextAuth(authOptions);
// สร้างตัวแปร handler โดยใช้ NextAuth และใช้ authOptions ที่กำหนดไว้ในการตั้งค่าระบบการยืนยันตัวตน
export { handler as GET, handler as POST };
// สร้างการส่งออก handler และสามารถเรียกใช้ผ่าน HTTP GET หรือ POST โดยใช้ชื่อ GET และ POST
