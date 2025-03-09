import { writeFileSync } from "fs";
import { join } from "path";
import packageJson from "../package.json";

const version: string = packageJson.version;
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

writeFileSync(join(__dirname, "../src-tauri/target/latest.json"), JSON.stringify(latestJson, null, 2));
console.log("✅ تم إنشاء latest.json بنجاح!");
