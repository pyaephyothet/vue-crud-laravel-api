/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{vue,js,ts,tsx,jsx}"],
    theme: {
        container: {
            center: true,
        },
        screen: {},
        extend: {
            colors: {
                primary: {
                    100: "#186491",
                    200: "#E1ECF4",
                },
            },
        },
    },
    plugins: [],
}

