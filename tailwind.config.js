const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: ['src/pages/**/*.{js,ts,jsx,tsx}', 'src/components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                'twitch-purple': {
                    DEFAULT: '#9146ff',
                    dark: '#772ce8'
                }
            },
            minHeight: {
                'full-nav': 'calc(100vh - 3.5rem)'
            }
        },
        fontFamily: {
            sans: ['Bai Jamjuree', ...defaultTheme.fontFamily.sans]
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
}
