import Image from "next/image";// บรรทัดแรกเป็นการนำเข้าคอมโพเนนต์ Image จากไลบรารี "next/image" เพื่อใช้ในการแสดงรูปภาพ

export default function Home() {//บรรทัดนี้เริ่มต้นการสร้างฟังก์ชัน React ที่ชื่อ "Home"
  return (
    // บรรทัดนี้เป็นเริ่มต้นของหน้าแรกของคุณและมีการกำหนด CSS class
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home Page</h1> 
    </main>
  );
}
