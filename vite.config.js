/** @type {import('vite').UserConfig} */
export default {
    base: process.env.NODE_ENV === 'development' ? '/' : '/employee-list',
    define: {
        _APP_BASE_URL_: process.env.NODE_ENV === 'development' ? '""' : '"/employee-list"',
    },
    server: {
        port: process.env.PORT || 3000,
    },
    test: {
        include: ['src/**/*.test.ts'],
        dom: 'jsdom',
        coverage: {
            provider: 'v8',
            include: ['src/**'],
            exclude: [
                'src/i18n-generated',
                "src/styles",
                "src/localization.ts",
                "src/constants",
                "src/**/*.d.ts"
            ],
        },
        // browser: {
        //     enabled: true,
        //     name: 'Chromium'
        // }
    }
}