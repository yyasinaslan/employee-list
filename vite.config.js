/** @type {import('vite').UserConfig} */
export default {
    base: process.env.NODE_ENV === 'development' ? '/' : '/employee-list',
    define: {
        BASE_URL: process.env.NODE_ENV === 'development' ? '"/"' : '"/employee-list"',
    }
}