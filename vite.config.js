/** @type {import('vite').UserConfig} */
export default {
    base: process.env.NODE_ENV === 'development' ? '/' : '/employee-list',
    define: {
        _APP_BASE_URL_: process.env.NODE_ENV === 'development' ? '""' : '"/employee-list"',
    }
}