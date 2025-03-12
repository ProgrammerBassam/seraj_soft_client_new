"use client";

import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { useState, useEffect } from "react";

// 🔹 جلب الإصدار الحالي من tauri.conf.json تلقائيًا
async function getCurrentVersion() {
  const response = await fetch("/tauri.conf.json");
  const config = await response.json();
  return config.version; 
}

export default function Page() {
  const [updateStatus, setUpdateStatus] = useState<string>("Idle...");
  const [progress, setProgress] = useState<number | null>(null);
  const [currentVersion, setCurrentVersion] = useState<string | null>(null);
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [releaseNotes, setReleaseNotes] = useState<string | null>(null);

  // 🔹 جلب الإصدار الحالي عند تشغيل التطبيق
  useEffect(() => {
    getCurrentVersion().then(setCurrentVersion);
  }, []);

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
                setProgress((downloaded / contentLength) * 100);
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
    } catch (error) {
      console.error("❌ Error during update check:", error);
      setUpdateStatus("Error checking for updates.");
    }
  };

  return (
    <div>
      <h1>Update Checker</h1>
      <p>Current Version: {currentVersion || "Loading..."}</p>
      {latestVersion && <p>Latest Version: {latestVersion}</p>}
      {releaseNotes && <p><b>Release Notes:</b> {releaseNotes}</p>}
      
      <button onClick={handleUpdateCheck}>Check for Updates</button>
      
      <p>{updateStatus}</p>
      {progress !== null && <progress value={progress} max="100"></progress>}
    </div>
  );
}
