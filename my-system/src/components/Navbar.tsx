"use client"; // นี่คือคำสั่งสำหรับการใช้ NextAuth.js ในโหมดของลูกค้า
import React from "react"; // นำเข้า React เพื่อใช้ในการสร้างคอมโพเนนต์ React
import Link from "next/link"; // นำเข้าคอมโพเนนต์ Link จาก Next.js เพื่อสร้างลิงก์ภายในแอพพลิเคชัน
import { signOut, useSession } from "next-auth/react"; // นำเข้าฟังก์ชัน signOut และ useSession จาก NextAuth.js เพื่อจัดการเซสชันผู้ใช้และออกจากระบบ

const Navbar = () => {
  const { data: session }: any = useSession(); // ใช้ useSession เพื่อดึงข้อมูลเซสชันของผู้ใช้และเก็บไว้ในตัวแปร session
  return (
    <div>
      <ul className="flex justify-between m-10 item-center">
        <div>
          <Link href="/">
            <li>Home</li>
          </Link>
        </div>
        <div className="flex gap-10">
          <Link href="/dashboard">
            <li>Dashboard</li>
          </Link>
          {!session ? (
            <>
              <Link href="/login">
                <li>เข้าสู่ระบบ</li>
              </Link>
              <Link href="/register">
                <li>ลงทะเบียน</li>
              </Link>
            </>
          ) : (
            <>
              {session.user?.email}
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="p-2 px-5 -mt-1 bg-blue-800 rounded-full"
                >
                  ออกจากระบบ
                </button>
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
