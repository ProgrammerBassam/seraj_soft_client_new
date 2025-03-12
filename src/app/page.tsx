"use client";


import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { useState, useEffect } from "react";

export default function Page() {
  const [updateStatus, setUpdateStatus] = useState<string>("Idle...");
  const [progress, setProgress] = useState<number | null>(null);
  const [currentVersion, setCurrentVersion] = useState<string | null>(null);
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [releaseNotes, setReleaseNotes] = useState<string | null>(null);

  // استخدام Tauri API لجلب الإصدار الحالي عند تحميل الصفحة
// استخدام Tauri API لجلب الإصدار الحالي عند تحميل الصفحة
useEffect(() => {
  window.__TAURI__.app.getVersion()
    .then(setCurrentVersion)
    .catch((error: unknown) => { // تحديد نوع الخطأ كـ unknown
      if (error instanceof Error) {
        console.error("❌ Failed to get current version:", error.message);
        setUpdateStatus("Failed to get current version.");
      } else {
        console.error("❌ Failed to get current version:", error);
        setUpdateStatus("An unknown error occurred.");
      }
    });
}, []);


  // وظيفة لفحص التحديثات المتاحة
  const handleUpdateCheck = async () => {
    setUpdateStatus("Checking for updates...");
    console.log("🔍 Checking for updates...");

    try {
      const update = await check();

      if (update && update.version) {
        console.log(`✅ Update found: v${update.version}`);
        setLatestVersion(update.version);
        setReleaseNotes(update.body ?? "No release notes available.");
        setUpdateStatus(`New update v${update.version} found! Downloading...`);

        let downloaded = 0;
        let contentLength = 0;

        await update.downloadAndInstall((event) => {
          switch (event.event) {
            case "Started":
              contentLength = event.data.contentLength ?? 0;
              console.log(`⬇️ Download started: ${contentLength} bytes`);
              setProgress(0);
              setUpdateStatus("Downloading update...");
              break;
            case "Progress":
              downloaded += event.data.chunkLength;
              if (contentLength > 0) {
                const percentage = (downloaded / contentLength) * 100;
                setProgress(percentage);
                console.log(`⬇️ Downloading: ${percentage.toFixed(2)}%`);
              }
              break;
            case "Finished":
              console.log("✅ Download finished, installing update...");
              setUpdateStatus("Installing update...");
              setProgress(null);
              break;
          }
        });

        console.log("🚀 Update installed, relaunching...");
        setUpdateStatus("Update installed! Relaunching...");
        await relaunch();

      } else {
        console.log("⚠️ No update available.");
        setUpdateStatus("Your app is up to date.");
      }
    } catch (error: unknown) { // تحديد نوع الخطأ على أنه unknown
      if (error instanceof Error) {
        console.error("❌ Error during update check:", error.message);
        setUpdateStatus(`Error: ${error.message}`);
      } else {
        console.error("❌ Error during update check:", error);
        setUpdateStatus("An unknown error occurred while checking for updates.");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Update Checker</h1>
      <p><strong>Current Version:</strong> {currentVersion || "Loading..."}</p>
      {latestVersion && <p><strong>Latest Version:</strong> {latestVersion}</p>}
      {releaseNotes && <p><strong>Release Notes:</strong> {releaseNotes}</p>}

      {/* زر لفحص التحديثات */}
      <button onClick={handleUpdateCheck} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
        Check for Updates
      </button>

      {/* عرض حالة التحديث */}
      <p><strong>Status:</strong> {updateStatus}</p>

      {/* عرض تقدم تحميل التحديث */}
      {progress !== null && (
        <div style={{ marginTop: "10px" }}>
          <progress value={progress} max="100" style={{ width: "100%" }}></progress>
          <p>{progress.toFixed(2)}%</p>
        </div>
      )}

      {/* في حالة وجود مشكلة، يظهر رسائل الخطأ */}
      {updateStatus.includes("Error") && (
        <p style={{ color: "red", marginTop: "10px" }}>
          There was an error checking for updates. Please try again later.
        </p>
      )}
    </div>
  );
}
