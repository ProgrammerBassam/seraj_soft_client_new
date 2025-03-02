// "use client"; // اجعل الملف Client Component

// import { useEffect } from "react";
// import { check } from "@tauri-apps/plugin-updater";
// import { relaunch } from "@tauri-apps/plugin-process";

// const App = () => {
//   useEffect(() => {
//     const updateApp = async () => {
//       try {
//         const update = await check();
//         if (update?.available) {
//           await update.downloadAndInstall();
//           await relaunch();
//         }
//       } catch (error) {
//         console.error("Error checking for updates:", error);
//       }
//     };

//     if (typeof window !== "undefined") {
//       updateApp();
//     }
//   }, []);

//   return <div>My Tauri App</div>;
// };

// export default App;


"use client"; // اجعل الملف Client Component

import { useEffect } from "react";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";

const App = () => {
  useEffect(() => {
    const updateApp = async () => {
      try {
        console.log("🔍 Checking for updates...");

        const update = await check();

        if (update?.available) {
          console.log(`🚀 Update available! Version: ${update.version}`);
          console.log("⬇️ Downloading update...");
          await update.downloadAndInstall();
          console.log("✅ Update installed successfully. Relaunching app...");
          await relaunch();
        } else {
          console.log("✅ No updates available. You are on the latest version.");
        }
      } catch (error) {
        console.error("❌ Error checking for updates:", error);
      }
    };

    if (typeof window !== "undefined") {
      updateApp();
    }
  }, []);

  return <div>My Tauri App</div>;
};

export default App;

