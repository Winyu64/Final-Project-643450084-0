import mongoose from "mongoose";  // นำเข้าโมดูล mongoose เพื่อใช้ในการกำหนดโมเดลและเชื่อมต่อกับ MongoDB

const { Schema } = mongoose; // นำเข้าคลาส Schema จาก mongoose โดยใช้ object destructuring

const userSchema = new Schema(// สร้างโมเดลของผู้ใช้ (user) โดยใช้คลาส Schema
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);// มีฟิลด์ email และ password. ตัวแปร timestamps ถูกตั้งค่าเป็น true
// พื่อให้ Mongoose สร้างฟิลด์ createdAt และ updatedAt เพื่อเก็บเวลาที่ถูกสร้างและอัปเดตเอกสาร
export default mongoose.models.User || mongoose.model("User", userSchema);
// โมเดลนี้ถูกสร้างและส่งออกเพื่อให้ถูกนำไปใช้ในโปรเจกต์ของคุณ. โมเดลนี้ถูกสร้างเป็น mongoose model โดยใช้ชื่อ "User" และสร้างขึ้นจาก userSchema