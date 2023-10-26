"use client";// การเรียกใช้ "use client" ซึ่งเป็นคำสั่งสำหรับการใช้ Next.js

import { AiOutlinePlus } from "react-icons/ai";// การนำเข้าคอมโพเนนต์ AiOutlinePlus จากไลบรารี "react-icons/ai" ซึ่งเป็นไอคอนสัญลักษณ์ "บวก" ที่ใช้ในปุ่ม "เพิ่มข้อมูลใหม่
import Modal from "./Modal";// การนำเข้าคอมโพเนนต์ Modal จากไฟล์ "./Modal" ซึ่งน่าจะเป็นโมดูลสำหรับแสดงป๊อปอัพโมดอัล
import { FormEventHandler, useState } from "react"; // การนำเข้าคอมโพเนนต์ FormEventHandler และ useState จาก "react" ซึ่งใช้ในการจัดการสถานะและการจัดการฟอร์ม
import { addTodo } from "@/api"; // การนำเข้าฟังก์ชัน addTodo จากไฟล์ "@/api" ซึ่งใช้ในการเพิ่มรายการงานใหม่
import { useRouter } from "next/navigation"; // การนำเข้า useRouter จาก "next/navigation" เพื่อใช้ในการรีเริชหน้าหลังจากการเพิ่มรายการงาน
import { v4 as uuidv4 } from "uuid"; // การนำเข้าฟังก์ชัน v4 จาก "uuid" ซึ่งใช้ในการสร้าง UUID สำหรับรายการงานใหม่

const AddTask = () => { // เป็นคอมโพเนนต์ที่เริ่มต้นตั้งชื่อว่า "AddTask คอมโพเนนต์นี้จัดการกับการเพิ่มรายการงานใหม่ในแอพพลิเคชันของคุณ
  const router = useRouter(); // การใช้ useRouter เพื่อรับอ็อบเจ็กต์ router ซึ่งใช้ในการรีเริชหน้าหลังจากการเพิ่มรายการงาน
  const [modalOpen, setModalOpen] = useState<boolean>(false); // การใช้ useState เพื่อสร้างตัวแปร modalOpen และฟังก์ชัน setModalOpen สำหรับการจัดการสถานะของป๊อปอัพโมดอัล
  const [newTaskValue, setNewTaskValue] = useState<string>(""); // การใช้ useState เพื่อสร้างตัวแปร newTaskValue และฟังก์ชัน setNewTaskValue สำหรับการจัดการสถานะของข้อความรายการงานใหม่ที่จะถูกเพิ่ม

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => { // เมื่อผู้ใช้กด "บันทึก" ในฟอร์มเพิ่มรายการงานใหม่, ฟังก์ชันนี้จะถูกเรียก
    e.preventDefault(); // ใช้ในการป้องกันการรีโหลดหน้าหลังจากการส่งฟอร์ม (default behavior)
    await addTodo({ //ฟังก์ชัน addTodo ถูกเรียกโดยส่งข้อมูลรายการงานใหม่ที่รวมถึง id
      id: uuidv4(),
      text: newTaskValue,
    }); // ที่สร้างโดย uuidv4() และ text ที่ผู้ใช้กรอก
    setNewTaskValue(""); // ใช้เพื่อล้างค่าในตัวแปร newTaskValue เพื่อให้ผู้ใช้สามารถกรอกรายการงานใหม่
    setModalOpen(false); // setModalOpen(false); ใช้ในการปิดป๊อปอัพโมดอัลหลังจากการเพิ่มรายการงาน
    router.refresh(); // router.refresh(); ใช้ในการรีเริชหน้าเพื่ออัปเดตหน้าแสดงรายการงาน
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className='btn btn-primary w-full'
        /*แสดงปุ่ม "เพิ่มข้อมูลใหม่" ที่เมื่อคลิกที่ปุ่มนี้จะเปิดป๊อปอัพโมดอัล 
        ปุ่มนี้มีคลาส "btn btn-primary" เพื่อให้มีสีพื้นหลังและข้อความสีขาว, 
        และใช้ไอคอน "AiOutlinePlus" 
        ขนาด 18 พิกเซลพร้อมด้วยช่องว่างด้านซ้าย */
      >
        เพิ่มข้อมูลใหม่ <AiOutlinePlus className='ml-2' size={18} />
      </button>
      
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg'>เพิ่มข้อมูล</h3>
          <div className='modal-action'>
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full'
            />
            <button type='submit' className='btn' >
            Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
/*บรรทัดที่ 39-49: โค้ดนี้ใช้คอมโพเนนต์ "Modal" เพื่อแสดงป๊อปอัพโมดอัล. โมดอัลมีฟอร์มที่ผู้ใช้สามารถกรอกข้อมูลรายการงานใหม่.

บรรทัดที่ 41: แสดงหัวเรื่อง "เพิ่มข้อมูล" โดยใช้ CSS เพื่อกำหนดรูปแบบการแสดงผล.
บรรทัดที่ 43-49: แสดงช่องให้กรอกข้อมูลรายการงานใหม่ โดยใช้ input ซึ่งมีการเชื่อมโยงค่า value กับตัวแปร newTaskValue และมีฟังก์ชัน onChange เพื่ออัปเดตค่า newTaskValue เมื่อผู้ใช้กรอกข้อมูล. ข้อมูล placeholder ถูกใช้เพื่อแสดงข้อความในช่องให้กรอก.
บรรทัดที่ 50-52: แสดงปุ่ม "บันทึก" เพื่อส่งฟอร์มเมื่อผู้ใช้คลิก. ปุ่มนี้มีคลาส "btn" เพื่อให้มีสีพื้นหลังและข้อความสีขาว. */


export default AddTask;
// ใช้เพื่อส่งออกคอมโพเนนต์ "AddTask" เพื่อให้สามารถนำคอมโพเนนต์นี้ไปใช้ในส่วนอื่นของแอพพลิเคชัน