"use client";

import { useState, useEffect, useCallback } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import DivOrigami from "./component/DivOrigami";
import { useRouter } from "next/navigation";

const BASE_URL = "/api/check-client-code"; // ✅ تأكد من صحة الرابط

export default function Home() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // ✅ وظيفة إنشاء كود جديد
  const generateQrCode = useCallback(() => {
    const code = Math.random().toString(36).substring(2, 10);
    setQrCode(code);
  }, []);

  // ✅ التحقق من الجلسة عند تحميل الصفحة
  useEffect(() => {
    const savedQrCode = localStorage.getItem("qr_code");

    if (savedQrCode) {
      setQrCode(savedQrCode);
      setTimeout(() => {
        router.replace("/clients"); // ✅ الانتقال بعد 2 ثانية
      }, 8000);
    } else {
      generateQrCode();
    }

    // ✅ تحسين الأداء عبر تحميل الصفحة مسبقًا
    router.prefetch("/clients");
  }, [router, generateQrCode]);

  const handleNext = async () => {
    if (!qrCode) {
      setError("يجب إنشاء كود أولًا!");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ client_code: qrCode }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setIsVerified(true);
        setError("");
  
        // ✅ حفظ الكود في localStorage
        localStorage.setItem("qr_code", qrCode);
  
        // ✅ الانتقال بعد النجاح
        setTimeout(() => {
          router.push("/clients");
        }, 2000);
      } else {
        setError(data.message || "الكود غير صحيح");
        setIsVerified(false);
      }
    } catch (error) {
      console.error("❌ Error checking code:", error);
      setError("حدث خطأ في الاتصال بالخادم");
      setIsVerified(false);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6 rounded-lg shadow-inner">
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
          <p className="mb-3">
            <span className="text-black">مرحبًا بكم في </span>
            <span className="text-red-500">سراج سوفت</span>
          </p>
          <DivOrigami />
        </motion.h1>
      </motion.div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="p-5 bg-white rounded-2xl shadow-2xl mb-4"
      >
        <QRCodeCanvas value={qrCode!} size={210} />
        <p className="text-black mt-2 font-semibold"> {qrCode}</p>
      </motion.div>

      {isVerified ? (
        <p className="text-green-500 mt-4">تم التحقق من الكود بنجاح! سيتم نقلك الآن...</p>
      ) : (
        <div>
          {!isLoading ? (
            <>
               <div className="flex flex-row items-center space-x-4">

               <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-700 hover:to-red-900 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg transition-all ml-auto"
              onClick={handleNext} 
            >
التالي            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-700 hover:to-red-900 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg transition-all"
              onClick={generateQrCode}
            >
              🔄 إعادة إنشاء كود جديد
            </motion.button>

    
          </div>


            </>
          ) : (
            <p className="text-yellow-500 mt-4">جاري التحقق من الكود...</p>
          )}
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}