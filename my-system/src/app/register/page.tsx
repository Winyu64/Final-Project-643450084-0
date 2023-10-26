"use client"; // คอมเมนต์ที่บอกให้ Next.js ใช้เรียกคลิเอนต์ (client-side rendering)
import React, { useEffect, useState } from "react"; // นำเข้า React และฟังก์ชัน useEffect และ useState จาก React เพื่อใช้ในการจัดการสถานะและการดำเนินการหลังจากการเรนเดอร์ของหน้า
import Link from "next/link"; //  นำเข้าคอมโพเนนต์ Link จาก "next/link" เพื่อใช้ในการลิงก์ไปยังหน้าอื่นในแอพพลิเคชัน
import { useRouter } from "next/navigation"; // นำเข้าฟังก์ชัน useRouter จาก "next/navigation" เพื่อใช้ในการจัดการเส้นทางการนำทาง
import { useSession } from "next-auth/react"; // นำเข้าฟังก์ชัน useSession จาก "next-auth/react" เพื่อใช้ในการตรวจสอบเซสชันของผู้ใช้

const Register = () => { // ประกาศคอมโพเนนต์ Register ซึ่งเป็นหน้าเว็บที่ใช้ในการลงทะเบียนผู้ใช้
  const [error, setError] = useState(""); // สร้างตัวแปร state ชื่อ error โดยใช้ useState เพื่อเก็บข้อความข้อผิดพลาดที่จะแสดงในกรณีที่การลงทะเบียนไม่สำเร็จ
  const router = useRouter(); // สร้างตัวแปร router โดยใช้ useRouter สำหรับใช้ในการจัดการเส้นทางการนำทาง
  const { data: session, status: sessionStatus } = useSession(); // ใช้ useSession เพื่อดึงข้อมูลเซสชันของผู้ใช้ และสถานะของเซสชัน (sessionStatus) และเก็บไว้ในตัวแปร session

  useEffect(() => {// ใช้ฟังก์ชัน useEffect เพื่อดำเนินการเมื่อคอมโพเนนต์ถูกเรนเดอร์ 
    if (sessionStatus === "authenticated") { // กรณีนี้ถูกใช้ในการตรวจสอบสถานะเซสชัน หาก sessionStatus เป็น "authenticated"
      router.replace("/dashboard"); // จะเปลี่ยนเส้นทางไปยัง "/dashboard" โดยใช้ router.replace("/dashboard")
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => { // สร้างฟังก์ชัน isValidEmail เพื่อตรวจสอบความถูกต้องของอีเมลที่ป้อน
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e: any) => { // สร้างฟังก์ชัน handleSubmit ที่จะถูกเรียกเมื่อผู้ใช้กดปุ่ม "Register"
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
//ฟังก์ชันนี้จะทำการตรวจสอบความถูกต้องของอีเมลและรหัสผ่าน
    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    try {// จะทำการส่งข้อมูลการลงทะเบียนไปยังเซิร์ฟเวอร์ผ่านการใช้งาน fetch
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }// ในกรณีที่ sessionStatus เป็น "loading" คอมโพเนนต์จะแสดงข้อความ "Loading..." เพื่อแสดงการโหลดข้อมูล

  return (
    sessionStatus !== "authenticated" && ( // ใช้การตรวจสอบเงื่อนไขเพื่อกำหนดว่าหน้า Register ควรแสดงเมื่อ sessionStatus ไม่ใช่ "authenticated"
    //หากเงื่อนไขเป็นจริง, คอมโพเนนต์ในวงเล็บจะถูกแสดง
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-[#212121] p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold mb-8">การลงทะเบียน</h1>
          <form onSubmit={handleSubmit}>
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
            />
            <button // สร้างปุ่ม "การลงทะเบียน" สำหรับส่งข้อมูลการลงทะเบียน
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {" "}
              ลงทะเบียน
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          <div className="text-center text-gray-500 mt-4">- หรือ -</div>
          <Link /*สร้างลิงก์ "เข้าสู่ระบบด้วยบัญชีที่มีอยู่" ที่นำไปยังหน้า Login  */
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/login"
          >
            เข้าสู่ระบบด้วยบัญชีที่มีอยู่
          </Link>
        </div>
      </div>
    )
  );
};

export default Register;
