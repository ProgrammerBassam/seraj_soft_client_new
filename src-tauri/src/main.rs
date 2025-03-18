

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
// use tauri_plugin_updater;
// use tauri_plugin_dialog;
// use tauri_plugin_process;

// fn main() {
//     tauri::Builder::default()
//         .setup(|app| {
//             #[cfg(desktop)]
//             app.handle().plugin(tauri_plugin_updater::Builder::new().build())?;
//             Ok(())
//         })
//         .plugin(tauri_plugin_dialog::init())
//         .plugin(tauri_plugin_process::init())
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }


use tauri_plugin_updater::UpdaterExt;  // تأكد من إضافة هذا السطر

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      let handle = app.handle().clone();
      tauri::async_runtime::spawn(async move {
        if let Err(e) = update(handle).await {
          eprintln!("حدث خطأ أثناء التحقق من التحديثات: {}", e);
        }
      });
      Ok(())
    })
    .plugin(tauri_plugin_updater::Builder::new().build())
    .run(tauri::generate_context!())
    .unwrap();
}

async fn update(app: tauri::AppHandle) -> tauri_plugin_updater::Result<()> {
  match app.updater()?.check().await {
    Ok(Some(update)) => {
      let version = update.version.clone();  // الحصول على الإصدار
      if !version.chars().all(|c| c.is_digit(10) || c == '.') {
        eprintln!("تنسيق الإصدار غير صالح: {}", version);
        return Ok(());  // أو إرجاع نتيجة فارغة بدلاً من الخطأ
      }

      // تنزيل التحديث وتثبيته
      update.download_and_install(
        |chunk_length, content_length| {
          println!("تم تنزيل {chunk_length} من {:?}", content_length);
        },
        || {
          println!("اكتمل التحديث بنجاح!");
        }
      ).await?;

      app.restart();
    },
    Ok(None) => {
      println!("لا توجد تحديثات متاحة.");
    },
    Err(e) => {
      eprintln!("حدث خطأ أثناء التحقق من التحديثات: {}", e);
      return Err(e);
    },
  }
  Ok(())
}

