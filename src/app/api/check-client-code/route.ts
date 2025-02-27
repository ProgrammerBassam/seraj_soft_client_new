import { NextResponse } from "next/server";
import { db } from "../../../../lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { client_code } = await req.json();
    if (!client_code) {
      return NextResponse.json({ error: "client_code مطلوب" }, { status: 400 });
    }

    const querySnapshot = await db
      .collection("clients_final")
      .where("client_code", "==", client_code)
      .get();

    if (querySnapshot.empty) {
      return NextResponse.json({ valid: false, message: "الكود غير صحيح" }, { status: 404 });
    }

    return NextResponse.json({ valid: true, message: "الكود صحيح" }, { status: 200 });
  } catch (error: unknown) {
    console.error("🔥 Firebase Error:", error);
    
    const err = error as Error; // تحويل error إلى كائن Error لضمان وجود .message
    
    return NextResponse.json({ error: "حدث خطأ ما", details: err.message || "خطأ غير معروف" }, { status: 500 });
  }
}
