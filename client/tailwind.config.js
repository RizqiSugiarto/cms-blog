/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                purpleCustom: '#7164AF',
                grayCustom: '#D8DADC',
                grayButton: '#E3E4E8',
                puprleBackground: '#D4D0E7',
                yellowDashboard: '#FFCA34',
                purpleDashboard: '#503E9D',
                blueDashboard: '#00A4DF',
                blueButton: '#40A2E3',
                redButton: '#FF0000',
                graySecond: '#D9D9D9',
                greenButton: '#0D9276',
                gold: '#FFD700',
                silver: '#C0C0C0',
                bronze: '#CD7F32'
            },
            boxShadow: {
                sideBar: '0 8px 9px rgba(0, 0, 0, 0.25)'
            },
            fontFamily: {
                Poppins: ['Poppins', 'sans-serif'],
                Jost: ['Jost', 'sans-serif']
            }
        }
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                light: {
                    primary: '#7164AF',
                    '.btn-xs': {
                        height: '2rem',
                        'min-height': '2rem'
                    }
                }
            }
        ]
    }
};
