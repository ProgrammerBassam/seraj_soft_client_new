// 'use client';

// import { check } from "@tauri-apps/plugin-updater";
// import { relaunch } from "@tauri-apps/plugin-process";
// import { useState, useEffect } from "react";
// import { app } from '@tauri-apps/api';

// export default function Page() {
//   const [updateStatus, setUpdateStatus] = useState<string>("Idle...");
//   const [progress, setProgress] = useState<number | null>(null);
//   const [currentVersion, setCurrentVersion] = useState<string | null>(null);
//   const [latestVersion, setLatestVersion] = useState<string | null>(null);
//   const [releaseNotes, setReleaseNotes] = useState<string | null>(null);

//   // الحصول على الإصدار الحالي عند تحميل الصفحة
//   useEffect(() => {
//     const getCurrentVersion = async () => {
//       const version = await app.getVersion();
//       setCurrentVersion(version);
//     };
//     getCurrentVersion();
//   }, []);

//   // التحقق من التحديثات
//   const handleUpdateCheck = async () => {
//     console.log("🔍 جارٍ التحقق من التحديثات...");

//     if (typeof window === "undefined" || !window.__TAURI__) {
//       console.log("⚠️ Tauri غير متاح في هذه البيئة.");
//       setUpdateStatus("Tauri غير متاح.");
//       return;
//     }

//     setUpdateStatus("جارٍ التحقق من التحديثات...");

//     try {
//       const update = await check();
//       console.log("تم التحقق من التحديثات:", update);

//       if (update && update.version) {
//         console.log(`✅ تم العثور على تحديث: v${update.version}`);
//         setLatestVersion(update.version);
//         setReleaseNotes(update.body ?? "لا توجد ملاحظات إصدار.");
//         setUpdateStatus(`تم العثور على تحديث جديد v${update.version}! جارٍ التنزيل...`);

//         let downloaded = 0;
//         let contentLength = 0;

//         await update.downloadAndInstall((event) => {
//           switch (event.event) {
//             case "Started":
//               contentLength = event.data.contentLength ?? 0;
//               console.log(`⬇️ بدأ التنزيل: ${contentLength} بايت`);
//               setProgress(0);
//               setUpdateStatus("جارٍ تنزيل التحديث...");
//               break;
//             case "Progress":
//               downloaded += event.data.chunkLength;
//               if (contentLength > 0) {
//                 const percentage = (downloaded / contentLength) * 100;
//                 setProgress(percentage);
//                 console.log(`⬇️ جارٍ التنزيل: ${percentage.toFixed(2)}%`);
//               }
//               break;
//             case "Finished":
//               console.log("✅ اكتمل التنزيل، جارٍ تركيب التحديث...");
//               setUpdateStatus("جارٍ تركيب التحديث...");
//               setProgress(null);
//               break;
//           }
//         });

//         console.log("🚀 تم تركيب التحديث، جارٍ إعادة التشغيل...");
//         setUpdateStatus("تم تركيب التحديث! جارٍ إعادة التشغيل...");
//         await relaunch();

//       } else {
//         console.log("⚠️ لا توجد تحديثات متاحة.");
//         setUpdateStatus("التطبيق محدث إلى آخر نسخة.");
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         console.error("❌ حدث خطأ أثناء التحقق من التحديثات:", error.message);
//         setUpdateStatus(`خطأ: ${error.message}`);
//       } else {
//         console.error("❌ حدث خطأ أثناء التحقق من التحديثات:", error);
//         setUpdateStatus("حدث خطأ غير معروف أثناء التحقق من التحديثات.");
//       }
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>مدقق التحديثات</h1>
//       <p><strong>الإصدار الحالي:</strong> {currentVersion || "جارٍ التحميل..."}</p>
//       {latestVersion && <p><strong>الإصدار الأحدث:</strong> {latestVersion}</p>}
//       {releaseNotes && <p><strong>ملاحظات الإصدار:</strong> {releaseNotes}</p>}

//       <button onClick={handleUpdateCheck} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
//         التحقق من التحديثات
//       </button>

//       <p><strong>الحالة:</strong> {updateStatus}</p>

//       {progress !== null && (
//         <div style={{ marginTop: "10px" }}>
//           <progress value={progress} max="100" style={{ width: "100%" }}></progress>
//           <p>{progress.toFixed(2)}%</p>
//         </div>
//       )}

//       {updateStatus.includes("خطأ") && (
//         <p style={{ color: "red", marginTop: "10px" }}>
//           حدث خطأ أثناء التحقق من التحديثات. يرجى المحاولة مرة أخرى لاحقًا.
//         </p>
//       )}
//     </div>
//   );
// }
import { check } from "@tauri-apps/plugin-updater";
import { ask, message } from "@tauri-apps/plugin-dialog";
import { relaunch } from "@tauri-apps/plugin-process";

export async function checkForAppUpdates(onUserClick: boolean) {
  const update = await check();

  if (update?.available) {
    const yes = await ask(
      `تحديث جديد متوفر ${update.version}!\n\nالتغييرات:\n${update.body}`,
      {
        title: "تحديث متوفر!",
        kind: "info",
        okLabel: "تحديث",
        cancelLabel: "إلغاء"
      }
    );

    if (yes) {
      await update.downloadAndInstall();
      await relaunch();
    }
  } else if (onUserClick) {
    await message("أنت بالفعل على أحدث إصدار 🎉", {
      title: "لا توجد تحديثات",
      kind: "info",
      okLabel: "حسناً"
    });
  }
}
