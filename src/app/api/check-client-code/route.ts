import { NextResponse } from "next/server";
import { db } from "../../../../lib/firebaseAdmin"; // تأكد أن المسار صحيح

export async function POST(req: Request) {
  try {
    const { client_code } = await req.json();

    if (!client_code) {
      return NextResponse.json(
        { error: "client_code مطلوب" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    const querySnapshot = await db
      .collection("clients_final")
      .where("client_code", "==", client_code)
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return NextResponse.json(
        { valid: false, message: "الكود غير صحيح" },
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    return NextResponse.json(
      { valid: true, message: "الكود صحيح" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error: unknown) {
    console.error("🔥 Firebase Error:", error);

    let errorMessage = "حدث خطأ غير متوقع";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: "حدث خطأ ما", details: errorMessage },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}
