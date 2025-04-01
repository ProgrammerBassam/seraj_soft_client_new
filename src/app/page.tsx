"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login"); // ✅ توجيه المستخدم إلى صفحة تسجيل الدخول
  }, [router]);

  return null;
}
