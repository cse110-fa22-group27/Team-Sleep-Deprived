
module.exports = {
    parser: 'babel-eslint',
    env: {
        jest: true,
    },
    globals: {
        page: true,
        browser: true,
        context: true,
        jestPuppeteer: true,
    },
}