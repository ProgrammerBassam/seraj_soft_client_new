// use tauri::Builder;
// use tauri_plugin_updater::Builder as UpdaterBuilder;

// fn main() {
//     tauri::Builder::default()
//         .setup(|app| {
//             #[cfg(desktop)]
//             app.handle().plugin(UpdaterBuilder::new().build())?; // تهيئة Updater بشكل صحيح
//             Ok(())
//         })
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

use tauri_plugin_updater::Builder as UpdaterBuilder;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(desktop)] // تأكد من أن هذه الإضافة تم تفعيلها في بيئات سطح المكتب فقط
            app.handle().plugin(UpdaterBuilder::new().build())?; // تهيئة Updater بشكل صحيح
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
