

// "use client";
// import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';

// async function updateApp() {
//   const { shouldUpdate } = await checkUpdate();
//   if (shouldUpdate) {
//     await installUpdate();
//   } else {
//     alert("التطبيق محدث بالفعل!");
//   }
// }

// <button onClick={updateApp}>🔄 تحقق من التحديثات</button>;



"use client";
import { useEffect } from "react";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import logger from "../../src-tauri/logger";

const App = () => {
  useEffect(() => {
    const updateApp = async () => {
      try {
        let logger;
        
        // استخدام dynamic import فقط في بيئة Tauri
        if (typeof window === "undefined") {
          // استخدام dynamic import لاستيراد logger فقط في بيئة Tauri (Node.js)
          const loggerModule = await import("../../src-tauri/logger");
          logger = loggerModule.default;
          logger?.info("🔍 Checking for updates...");
        } else {
          console.log("🔍 Checking for updates...");
        }

        const update = await check();

        if (update?.available) {
          if (typeof window === "undefined") {
            logger?.info(`🚀 Update available! Version: ${update.version}`);
          } else {
            console.log(`🚀 Update available! Version: ${update.version}`);
          }
          await update.downloadAndInstall();
          if (typeof window === "undefined") {
            logger?.info("✅ Update installed successfully.");
          } else {
            console.log("✅ Update installed successfully.");
          }

          await relaunch();
        } else {
          if (typeof window === "undefined") {
            logger?.info("✅ No updates available. You are on the latest version.");
          } else {
            console.log("✅ No updates available. You are on the latest version.");
          }
        }
      } catch (error) {
        if (typeof window === "undefined") {
          logger?.error(`❌ Error checking for updates: ${error}`);
        } else {
          console.error(`❌ Error checking for updates: ${error}`);
        }
      }
    };

    if (typeof window !== "undefined") {
      updateApp();
    }
  }, []);

  return <div>My Tauri App v5 test555</div>;
};

export default App;



