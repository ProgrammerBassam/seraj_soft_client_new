"use client"; // إضافة هذا السطر في بداية الملف

import React, { useEffect } from 'react';
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';


const App = () => {
 
  useEffect(() => {
    async function checkForUpdates() {
      const update = await check();
      if (update) {
        console.log(`تم العثور على تحديث: ${update.version}`);
        await update.downloadAndInstall();
        await relaunch();  // إعادة تشغيل التطبيق بعد التثبيت
      }
    }
    
    // استدعاء الدالة لفحص التحديثات
    checkForUpdates();
  }, []);

  return <div>مرحبًا بك في التطبيق!</div>;
};

export default App;
