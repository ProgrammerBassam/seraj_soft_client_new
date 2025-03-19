import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// استخدام fileURLToPath للحصول على __dirname في بيئة ES Modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// إضافة سمة assert لـ package.json
import packageJson from "../package.json" assert { type: "json" };

const version = packageJson.version;

// المسار إلى المجلد target
const targetDir = join(__dirname, "../src-tauri/target/x86_64-pc-windows-msvc/release/bundle/msi");

// تحقق من وجود المجلد، وإذا لم يكن موجودًا، أنشئه
if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
}

const latestJson = {
  version: `${version}`, // هنا تأكدنا أن القيمة نصية
  notes: `🚀 إصدار جديد متاح: ${version}`,
  pub_date: new Date().toISOString(),
  platforms: {
    "windows-x86_64": {
      signature: "",
      url: `http://212.38.94.227:3010/updates/seraj-clients_${version}_x64_en-US.msi`
    }
  }
};


// كتابة البيانات إلى ملف latest.json
writeFileSync(join(targetDir, "latest.json"), JSON.stringify(latestJson, null, 2));
console.log("✅ تم إنشاء latest.json بنجاح!");


// import { writeFileSync, existsSync, mkdirSync } from "fs";
// import { execSync } from "child_process";  // ✅ استيراد execSync من child_process
// import { join, dirname } from "path";
// import { fileURLToPath } from "url";
// import packageJson from "../package.json" assert { type: "json" };

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const version = "0.7.0";  // ✅ تأكد من تحديد الإصدار الصحيح

// const targetDir = join(__dirname, "../src-tauri/target");
// if (!existsSync(targetDir)) {
//   mkdirSync(targetDir, { recursive: true });
// }

// const latestJson = {
//   version,
//   notes: `🚀 إصدار جديد متاح: ${version}`,
//   pub_date: new Date().toISOString(),
//   platforms: {
//     "windows-x86_64": {
//       signature: "",
//       url: `https://github.com/ProgrammerBassam/seraj_soft_client_new/releases/download/v${version}/app-installer.msi`
//     }
//   }
// };

// writeFileSync(join(targetDir, "latest.json"), JSON.stringify(latestJson, null, 2));
// console.log("✅ تم إنشاء latest.json بنجاح!");
