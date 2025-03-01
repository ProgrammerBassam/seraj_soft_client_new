"use client"; // اجعل الملف Client Component

import { useEffect } from "react";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";

const App = () => {
  useEffect(() => {
    const updateApp = async () => {
      try {
        const update = await check();
        if (update?.available) {
          await update.downloadAndInstall();
          await relaunch();
        }
      } catch (error) {
        console.error("Error checking for updates:", error);
      }
    };

    if (typeof window !== "undefined") {
      updateApp();
    }
  }, []);

  return <div>My Tauri App</div>;
};

export default App;
