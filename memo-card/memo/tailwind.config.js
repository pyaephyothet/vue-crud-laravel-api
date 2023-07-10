/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{vue,js,ts,tsx,jsx}"],
    theme: {
        container: {
            center: true,
        },
        screen: {
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1440px",
        },
        extend: {
            colors: {
                primary: {
                    100: "#eb6153",
                    200: "#f78da7",
                    300: "#fcf4f2",
                },
                secondary: {
                    100: "#ffc63c",
                    200: "#ff6900",
                },
                default: {
                    100: "#1d1c39",
                },
            },
        },
    },
    plugins: [],
};
