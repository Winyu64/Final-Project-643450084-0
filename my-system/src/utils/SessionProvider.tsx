"use client"; // นี่คือคำสั่งสำหรับการใช้ NextAuth.js ในโหมดของลูกค้า
import React from "react"; //นำเข้า React เพื่อใช้ในการสร้างคอมโพเนนต์ React
import { SessionProvider } from "next-auth/react"; // นำเข้าคอมโพเนนต์ SessionProvider จาก NextAuth.js ซึ่งใช้ในการจัดการเซสชันผู้ใช้ของแอพพลิเคชัน

const AuthProvider = ({ children }: any) => {// สร้างคอมโพเนนต์ AuthProvider ที่รับ children เป็นพารามิเตอร์
  // ซึ่งจะเป็นคอมโพเนนต์ที่ถูกคลุมรอบโดย SessionProvider
  return <SessionProvider>{children}</SessionProvider>;
};// คอมโพเนนต์ AuthProvider จะแสดงคอมโพเนนต์ SessionProvider และใส่ children ซึ่งเป็นคอมโพเนนต์ที่ถูกคลุมรอบเพื่อให้ NextAuth.js จัดการเซสชันผู้ใช้

export default AuthProvider;
//สิ่งส่งออกคอมโพเนนต์ AuthProvider เพื่อให้สามารถนำไปใช้ในส่วนอื่นของแอพพลิเคชันเพื่อจัดการเซสชันผู้ใช้ด้วย NextAuth.js