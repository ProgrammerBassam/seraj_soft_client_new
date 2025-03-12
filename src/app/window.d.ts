interface Window {
    __TAURI__: {
        app: {
            getVersion: () => Promise<string>;
            // يمكنك إضافة خصائص أخرى هنا حسب حاجتك
        };
    };
}
