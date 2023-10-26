import { ITask } from "./types/tasks";// การนำเข้าชนิดข้อมูล ITask จากไฟล์ "./types/tasks" เป็นการนิยามข้อมูลของรายการงาน

const baseUrl = 'http://localhost:3001'; // การกำหนด URL ฐาน (base URL) ที่ใช้ในการส่งคำขอ HTTP ไปยังเซิร์ฟเวอร์ API

export const getAllTodos = async (): Promise<ITask[]> => {// ฟังก์ชัน async ที่ใช้ในการดึงข้อมูลรายการงานทั้งหมดจากเซิร์ฟเวอร์
  const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' });// ดยใช้ fetch สำหรับส่งคำขอ GET ไปยัง URL ${baseUrl}/tasks
  const todos = await res.json();// จากนั้นใช้ .json() เพื่อแปลงข้อมูล JSON ที่ได้รับเป็นอาร์เรย์ของ ITask
  return todos;
}

export const addTodo = async (todo: ITask): Promise<ITask> => {// ฟังก์ชัน async ที่ใช้ในการเพิ่มรายการงานใหม่โดยส่งคำขอ POST
  const res = await fetch(`${baseUrl}/tasks`, { // ไปยัง URL ${baseUrl}/tasks
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },// ฟังก์ชันจะส่งข้อมูลรายการงานใหม่
    body: JSON.stringify(todo)
  })//และหลังจากส่งคำขอสำเร็จจะได้รับรายการงานที่ถูกสร้างและส่งกลับมาจากเซิร์ฟเวอร์
  const newTodo = await res.json();
  return newTodo;
}

export const editTodo = async (todo: ITask): Promise<ITask> => { // ฟังก์ชัน async ที่ใช้ในการแก้ไขรายการงานที่มีอยู่ โดยส่งคำขอ PUT
  const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: 'PUT',// ไปยัง URL ${baseUrl}/tasks/{todo.id} เพื่อแก้ไขข้อมูลรายการงาน
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  }) // หลังจากส่งคำขอและเซิร์ฟเวอร์ยอมรับคำขอและส่งข้อมูลรายการงานที่ถูกแก้ไขกลับมา
  const updatedTodo = await res.json();
  return updatedTodo;
}

export const deleteTodo = async (id: string): Promise<void> => {// ฟังก์ชัน async ที่ใช้ในการลบรายการงานโดยส่งคำขอ DELETE
  await fetch(`${baseUrl}/tasks/${id}`, {
    method: 'DELETE', // ไปยัง URL ${baseUrl}/tasks/{id} โดยระบุ ID ของรายการงานที่ต้องการลบ
  })
}