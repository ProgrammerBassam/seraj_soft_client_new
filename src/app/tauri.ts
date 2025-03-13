// // mocks/tauri.ts
// export const tauriMock = {
//     app: {
//       getVersion: () => Promise.resolve("1.0.0"),
//     },
//   };
  
//   // Use the mock if Tauri is not available
//   if (typeof window !== "undefined" && !window.__TAURI__) {
//     window.__TAURI__ = tauriMock;
//   }