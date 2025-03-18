"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ClientsPage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">صفحة العملاء</h1>
      <p>مرحبًا بك في صفحة العملاء!</p>

      {/* زر الرجوع للصفحة الرئيسية */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg transition-all"
        onClick={() => router.push("/")}
      >
        الرجوع إلى الصفحة الرئيسية
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg transition-all"
        onClick={() => router.push("/updater")}
      >
        updater
      </motion.button>
    </div>
  );
}
