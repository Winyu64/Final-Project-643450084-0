import React from "react"; // นำเข้า React เพื่อใช้ในการสร้างอินเตอร์เฟซของหน้าเว็บ
import { getServerSession } from "next-auth"; // นำเข้า getServerSession จาก "next-auth" ซึ่งเป็นฟังก์ชันที่ใช้ในการดึงข้อมูลเซสชันของผู้ใช้จากเซิร์ฟเวอร์
import { redirect } from "next/navigation";// นำเข้าฟังก์ชัน redirect จาก "next/navigation" ซึ่งใช้ในการเปลี่ยนเส้นทาง (route) หรือเรียกให้แอพพลิเคชันไปยังหน้าอื่น
import { getAllTodos } from "@/api";
import AddTask from "../components/AddTask";
import TodoList from "../components/TodoList";



const Dashboard = async () => { // ประกาศฟังก์ชัน Dashboard ที่มีการใช้ async เพื่อให้ฟังก์ชันนี้รอให้เสร็จก่อนที่จะทำอย่างอื่น.
  const session = await getServerSession();// เรียกใช้ getServerSession เพื่อดึงข้อมูลเซสชันของผู้ใช้จากเซิร์ฟเวอร์ และเก็บในตัวแปร session
  const tasks = await getAllTodos();
  if (!session) {
    redirect("/");
  }
  return ( // นี่คือ div ที่ใช้ในการจัดรูปแบบหน้า Dashboard ด้วยการกำหนดคลาส CSS ที่ใช้ในการจัดการลัยตัวและการจัดพื้นที่ในระหว่างข้อมูล
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      แอพบันทึกข้อความ
      <AddTask />
      <TodoList tasks={tasks} />
    </div>
        

  );
};

export default Dashboard;
// เรียกใช้ getServerSession เพื่อดึงข้อมูลเซสชันของผู้ใช้จากเซิร์ฟเวอร์ และเก็บในตัวแปร session
