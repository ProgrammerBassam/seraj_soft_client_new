

// use tauri_plugin_updater::Builder as UpdaterBuilder;

// fn main() {
//     tauri::Builder::default()
//         .setup(|app| {
//             #[cfg(desktop)] // تأكد من أن هذه الإضافة تم تفعيلها في بيئات سطح المكتب فقط
//             app.handle().plugin(UpdaterBuilder::new().build())?; // تهيئة Updater بشكل صحيح
//             Ok(())
//         })
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

// use tauri::Manager;
// src-tauri\src\main.rs
use tauri_plugin_updater::Builder as UpdaterBuilder;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // تهيئة الـ Updater
            app.handle().plugin(UpdaterBuilder::new().build())?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

