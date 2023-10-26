import User from "@/models/User";// นำเข้าโมดูล User จาก "@/models/User" เป็นโมดูลที่ระบบจะใช้ในการจัดเก็บข้อมูลผู้ใช้
import connect from "@/utils/db";// นำเข้าโมดูล connect จาก "@/utils/db" เพื่อใช้ในการเชื่อมต่อกับฐานข้อมูล
import bcrypt from "bcryptjs"; // นำเข้าโมดูล bcrypt สำหรับการเข้ารหัสและตรวจสอบรหัสผ่าน
import { NextResponse } from "next/server"; // นำเข้า NextResponse จาก "next/server" ซึ่งใช้ในการสร้างตอบสนอง HTTP ที่จะส่งกลับให้ผู้ใช้

export const POST = async (request: any) => { // คือฟังก์ชัน POST ที่จะถูกเรียกเมื่อมีคำขอ HTTP POST เข้ามาที่เราจะใช้ในการลงทะเบียนผู้ใช้ใหม่
  const { email, password } = await request.json();// รับข้อมูลที่ถูกส่งมาผ่าน HTTP POST และแปลงให้อยู่ในรูปแบบ JSON ซึ่งประกอบด้วย email และ password

  await connect();// เรียกใช้ฟังก์ชัน connect เพื่อเชื่อมต่อกับฐานข้อมูล

  const existingUser = await User.findOne({ email }); // ค้นหาผู้ใช้ที่มีอีเมลที่ถูกส่งมาในฐานข้อมูล หากมีผู้ใช้ที่ใช้อีเมลเดียวกันอยู่แล้ว

  if (existingUser) {
    return new NextResponse("Email มีเคยลงทะเบียนแล้ว", { status: 400 });// ตรวจสอบว่ามีผู้ใช้ที่ใช้อีเมลนี้อยู่แล้วหรือไม่ หากมีให้ออกและส่งคำตอบกลับว่า "Email มีเคยลงทะเบียนแล้ว" ด้วยสถานะ HTTP 400 (Bad Request)
  }

  const hashedPassword = await bcrypt.hash(password, 5);// เข้ารหัสรหัสผ่านที่ถูกส่งมาด้วยฟังก์ชัน bcrypt.hash โดยใช้การเข้ารหัสแบบ bcrypt และนำไปเก็บไว้ในตัวแปร hashedPassword
  const newUser = new User({
    email,
    password: hashedPassword,
  });// สร้างอ็อบเจกต์ User ใหม่โดยระบุอีเมลและรหัสผ่านที่ถูกเข้ารหัสแล้ว

  try {
    await newUser.save();
    return new NextResponse("ลงทะเบียนสำเร็จ", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }// นี่คือบล็อก try-catch ที่จะลองทำการบันทึกผู้ใช้ใหม่ลงในฐานข้อมูล หากสำเร็จจะส่งคำตอบกลับว่า "ลงทะเบียนสำเร็จ" ด้วยสถานะ HTTP 200 (OK).
};
