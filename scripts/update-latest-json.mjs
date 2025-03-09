import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// استخدام fileURLToPath للحصول على __dirname في بيئة ES Modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// إضافة سمة assert لـ package.json
import packageJson from "../package.json" assert { type: "json" };

const version = packageJson.version;

// المسار إلى المجلد target
const targetDir = join(__dirname, "../src-tauri/target");

// تحقق من وجود المجلد، وإذا لم يكن موجودًا، أنشئه
if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
}

const latestJson = {
  version,
  notes: `🚀 إصدار جديد متاح: ${version}`,
  pub_date: new Date().toISOString(),
  platforms: {
    "windows-x86_64": {
      signature: "",
      url: `https://github.com/ProgrammerBassam/seraj_soft_client_new/releases/download/v${version}/app-installer.msi`
    }
  }
};

// كتابة البيانات إلى ملف latest.json
writeFileSync(join(targetDir, "latest.json"), JSON.stringify(latestJson, null, 2));
console.log("✅ تم إنشاء latest.json بنجاح!");
