"use client";// นี่เป็นคอมเมนต์ที่บอกให้ Next.js ใช้เรียกคลิเอนต์ (client-side rendering) สำหรับหน้าเว็บนี้
import React, { useEffect, useState } from "react"; // นำเข้า React และฟังก์ชัน useEffect และ useState จาก React ซึ่งใช้ในการจัดการสถานะและการดำเนินการหลังจากการเรนเดอร์ของหน้า
import Link from "next/link"; // นำเข้าคอมโพเนนต์ Link จาก "next/link" เพื่อใช้ในการลิงก์ไปยังหน้าอื่นในแอพพลิเคชัน
import { signIn, useSession } from "next-auth/react"; // นำเข้าฟังก์ชัน signIn และ useSession จาก "next-auth/react" เพื่อใช้ในการดำเนินการการล็อกอินและตรวจสอบเซสชันของผู้ใช้
import { useRouter } from "next/navigation"; // นำเข้าฟังก์ชัน useRouter จาก "next/navigation" เพื่อใช้ในการจัดการเส้นทางการนำทาง

const Login = () => { // ประกาศคอมโพเนนต์ Login ซึ่งเป็นหน้าเว็บที่ใช้ในการล็อกอินผู้ใช้
  const router = useRouter(); // สร้างตัวแปร router โดยใช้ useRouter สำหรับใช้ในการจัดการเส้นทางการนำทาง
  const [error, setError] = useState(""); // สร้างตัวแปร state ชื่อ error โดยใช้ useState เพื่อเก็บข้อความข้อผิดพลาดที่จะแสดงในกรณีที่การล็อกอินไม่สำเร็จ

  const { data: session, status: sessionStatus } = useSession(); // ใช้ useSession เพื่อดึงข้อมูลเซสชันของผู้ใช้ และสถานะของเซสชัน (sessionStatus) และเก็บไว้ในตัวแปร session

  useEffect(() => { // ใช้ฟังก์ชัน useEffect เพื่อดำเนินการเมื่อคอมโพเนนต์ถูกเรนเดอร์
    if (sessionStatus === "authenticated") {// ในกรณีนี้ถูกใช้ในการตรวจสอบสถานะเซสชัน หาก sessionStatus เป็น "authenticated"
      router.replace("/dashboard");
    }// จะเปลี่ยนเส้นทางไปยัง "/dashboard" โดยใช้ router.replace("/dashboard")
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };// สร้างฟังก์ชัน isValidEmail เพื่อตรวจสอบความถูกต้องของอีเมลที่ป้อน

  const handleSubmit = async (e: any) => { // สร้างฟังก์ชัน handleSubmit ที่จะถูกเรียกเมื่อผู้ใช้กดปุ่ม "Sign In"
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }// ฟังก์ชันนี้จะทำการตรวจสอบความถูกต้องของอีเมลและรหัสผ่าน และถ้าถูกต้องจะทำการล็อกอินผู้ใช้
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }// ในกรณีที่ sessionStatus เป็น "loading" คอมโพเนนต์จะแสดงข้อความ "Loading..." เพื่อแสดงการโหลดข้อมูล

  return (
    sessionStatus !== "authenticated" && ( // ใช้การตรวจสอบเงื่อนไขเพื่อกำหนดว่าหน้า Login ควรแสดงเมื่อ sessionStatus ไม่ใช่ "authenticated"
      <div /* จัดรูปแบบหน้า Login โดยกำหนดคลาส CSS */ className="flex min-h-screen flex-col items-center justify-between p-24">
        <div /*กำหนดสีพื้นหลัง, ขอบมนมเงา, และขนาด*/ className="bg-[#212121] p-8 rounded shadow-md w-96">
          <h1 /* แสดงชื่อหัวข้อ "Login"*/ className="text-4xl text-center font-semibold mb-8">เข้าสู่ระบบ</h1> 
          <form /*เริ่มแบบฟอร์ม Login และกำหนดฟังก์ชัน onSubmit ที่จะถูกเรียกเมื่อผู้ใช้กดปุ่มส่ง*/onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Password"
              required
            /**//>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {" "}
              เข้าสู่ระบบ
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          <button
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            onClick={() => {
              signIn("github");
            }}
          >
            ลงชื่อเข้าใช้ด้วย Github
          </button>
          <div className="text-center text-gray-500 mt-4">- หรือ -</div>
          <Link
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/register"
          >
            การลงทะเบียน
          </Link>
        </div>
      </div>
    )
  );
};

export default Login;
