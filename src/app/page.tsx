"use client";

import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import DivOrigami from "./component/DivOrigami";
// import { DivOrigami } from "@/components/DivOrigami"; // تأكد أن المسار صحيح

export default function Home() {
  const [qrCode, setQrCode] = useState<string | null>(null);

  // وظيفة لإنشاء كود عشوائي جديد
  const generateQrCode = () => {
    const code = Math.random().toString(36).substring(2, 10);
    setQrCode(code);
  };

  // إنشاء كود افتراضي عند تحميل الصفحة
  useEffect(() => {
    generateQrCode();
  }, []);

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
      {/* رسالة ترحيب متحركة مع تأثير نبض خفيف */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6"
      >
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-5xl font-extrabold text-red-500 drop-shadow-lg"
        >
             
             <p className="mb-5">
  <span className="text-black">مرحبًا بكم في </span>
  <span className="text-red-500">سراج سوفت</span>
</p>
          
           <DivOrigami className="mb-5" />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-lg text-gray-400 mt-3"
        >
          يرجى مسح كود الـ QR للدخول إلى نظام الشركة.
        </motion.p>
      </motion.div>

      {/* كود QR بدون بوردر */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="p-5 bg-white rounded-2xl shadow-2xl"
      >
        <QRCodeCanvas value={qrCode!} size={200} />
        <p className="text-black mt-2 font-semibold">كودك: {qrCode}</p>
      </motion.div>

      {/* زر طلب كود جديد */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-700 hover:to-red-900 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg transition-all"
        onClick={generateQrCode}
      >
        🔄 إعادة إنشاء كود جديد
      </motion.button>



   
   
    </div>
  );
}



// =======


// import { useState, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import { motion } from "framer-motion";
// import DivOrigami from "./component/DivOrigami";

// export default function Home() {
//   const [qrCode, setQrCode] = useState<string | null>(null);

//   // وظيفة لإنشاء كود عشوائي جديد
//   const generateQrCode = () => {
//     const code = Math.random().toString(36).substring(2, 10);
//     setQrCode(code);
//   };

//   // إنشاء كود افتراضي عند تحميل الصفحة
//   useEffect(() => {
//     generateQrCode();
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen text-white p-6  rounded-lg shadow-inner bg-neutral-900">
//       {/* رسالة ترحيب متحركة مع تأثير نبض خفيف */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-center mb-6"
//       >
//         <motion.h1
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.8, ease: "easeInOut" }}
//           className="text-5xl font-extrabold text-red-500 drop-shadow-lg"
//         >
//           <p className="mb-3">
//             <span className="text-white">مرحبًا بكم في </span>
//             <span className="text-red-500">سراج سوفت</span>
//           </p>

//           <DivOrigami className="mb-3" />
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1.2, delay: 0.3 }}
//           className="text-lg text-gray-400 mt-3"
//         >
//           يرجى مسح كود الـ QR للدخول إلى نظام الشركة.
//         </motion.p>
//       </motion.div>

//       {/* كود QR بدون بوردر */}
//       <motion.div
//         initial={{ scale: 0.5, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//         className="p-5 bg-white rounded-2xl shadow-2xl"
//       >
//         <QRCodeCanvas value={qrCode!} size={200} />
//         <p className="text-black mt-2 font-semibold">كودك: {qrCode}</p>
//       </motion.div>

//       {/* زر طلب كود جديد */}
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="mt-6 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-700 hover:to-red-900 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg transition-all"
//         onClick={generateQrCode}
//       >
//         🔄 إعادة إنشاء كود جديد
//       </motion.button>
//     </div>
//   );
// }
