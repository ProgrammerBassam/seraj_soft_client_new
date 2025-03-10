

// "use client";
// import { useEffect } from "react";
// import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
// import { relaunch } from "@tauri-apps/api/process";


// async function updateApp() {
//   try {
//     const { shouldUpdate, manifest } = await checkUpdate();

//     if (shouldUpdate) {
//       console.log(`يوجد تحديث جديد: ${manifest.version}`);
//       await installUpdate();
//       await relaunch();
//     }
//   } catch (error) {
    
//     console.error("فشل التحقق من التحديث:", error);
//   }
// }

// function App() {
//   useEffect(() => {
//     updateApp();
//   }, []);

//   return (
//     <div>
//       <h1>مرحبًا بك في تطبيقي</h1>
//       <p>سيتم التحقق من التحديثات تلقائيًا عند بدء التشغيل.</p>
//     </div>
//   );
// }

// export default App;




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

  return <div>My Tauri App v 7</div>;
};

export default App;

// ------------------------







// [package]
// name = "app"
// version = "0.6.0"
// description = "A Tauri App"
// authors = ["you"]
// license = ""
// repository = ""
// edition = "2021"
// rust-version = "1.77.2"


// [lib]
// name = "app_lib"
// crate-type = ["staticlib", "cdylib", "rlib"]

// [build-dependencies]
// tauri-build = { version = "2.0.4", features = [] }

// [dependencies]
// serde_json = "1.0"
// serde = { version = "1.0", features = ["derive"] }
// log = "0.4"
// tauri = { version = "2.2.4", features = [] }
// tauri-plugin-log = "2.0.0-rc"
 
// tauri-plugin-updater = { version = "2.0.0-beta", features = ["rustls-tls"] }
// tauri-plugin-dialog = "2.0.0-beta"