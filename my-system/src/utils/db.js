import mongoose from "mongoose";// นำเข้าโมดูล mongoose เพื่อใช้ในการเชื่อมต่อกับ MongoDB

const connect = async () => { // สร้างฟังก์ชัน connect ซึ่งจะถูกใช้ในการเชื่อมต่อกับฐานข้อมูล MongoDB
  if (mongoose.connections[0].readyState) return;
// ฟังก์ชันนี้เริ่มต้นด้วยการตรวจสอบสถานะการเชื่อมต่อของ Mongoose
// ถ้าการเชื่อมต่อถูกเปิดแล้ว (มีค่า readyState และไม่ใช่ 0) แล้วฟังก์ชันจะกลับแบบเร็วเพื่อป้องกันการเชื่อมต่อซ้ำ
  try {
    await mongoose.connect(process.env.MONGO_URL, {// นี่คือคำสั่งที่ใช้ในการเชื่อมต่อกับ MongoDB โดยใช้ URL ฐานข้อมูล MongoDB
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });// สดงข้อความในเครื่องหมายคอนโซลเมื่อการเชื่อมต่อกับ MongoDB เรียบร้อยแล้ว
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }// ถ้ามีข้อผิดพลาดในการเชื่อมต่อกับ MongoDB ฟังก์ชันจะโยนข้อผิดพลาดและแสดงข้อความ "Error connecting to Mongoose"
};

export default connect;
// ส่งออกฟังก์ชัน connect เพื่อให้สามารถนำไปใช้ในส่วนอื่นของแอพพลิเคชันเพื่อเชื่อมต่อกับ MongoDB