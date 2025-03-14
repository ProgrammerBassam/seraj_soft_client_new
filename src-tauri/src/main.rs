

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
use tauri_plugin_updater;
use tauri_plugin_dialog;
use tauri_plugin_process;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(desktop)]
            app.handle().plugin(tauri_plugin_updater::Builder::new().build())?;
            Ok(())
        })
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_process::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


