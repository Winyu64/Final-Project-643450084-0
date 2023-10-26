interface ModalProps { // นี่คือการกำหนดแบบชนิด (interface) สำหรับคุณสมบัติของคอมโพเนนต์ "Modal"
  modalOpen: boolean; // ค่าบูลีน (boolean) ที่บอกว่าโมดอัลเปิดหรือปิด
  setModalOpen: (open: boolean) => boolean | void; // ฟังก์ชันที่ใช้ในการเปิดหรือปิดโมดอัล โดยรับค่าบูลีนและอาจส่งค่าบูลีนหรือ void กลับไป
  children: React.ReactNode; // คอมโพเนนต์ React ที่คุณต้องการแสดงในโมดอัล
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  // นี่คือการสร้างคอมโพเนนต์ "Modal" โดยใช้ฟังก์ชัน React ซึ่งรับคุณสมบัติ modalOpen, setModalOpen, และ children จากพารามิเตอร์
  return (
    //การสร้างส่วนหลักของโมดอัล โดยกำหนดคลาส CSS "modal" และ "modal-open" ในกรณีที่ modalOpen เป็น true เพื่อแสดงโมดอัล เมื่อ modalOpen เป็น false จะไม่มีคลาส "modal-open" จึงไม่แสดงโมดอัล
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}> 
      <div className='modal-box relative'>
        <label
          onClick={() => setModalOpen(false)}
          className='btn btn-sm btn-circle absolute right-2 top-2'
        >
          ✕ 
        </label>
        {children} 
      </div>
    </div>
  );// ส่วนนี้คือที่คอมโพเนนต์ที่คุณจะนำมาแสดงในโมดอัล มันเป็นการส่งคอมโพเนนต์ที่อยู่ภายใน "Modal" เพื่อแสดงในโมดอัล
};

export default Modal;
// ใช้เพื่อส่งออกคอมโพเนนต์ "Modal" โดยที่คอมโพเนนต์นี้สามารถนำไปใช้ในส่วนอื่นของแอพพลิเคชัน