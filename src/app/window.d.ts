// window.d.ts
interface Window {
    __TAURI__: {
      app: {
        getVersion: () => Promise<string>;
      };
    };
  }
  