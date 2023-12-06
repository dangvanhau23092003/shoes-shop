/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    
    container: {
      padding: {
        default: '30px',
        lg: '0',
      },
    },

    colors: {
      'primary':'#0a1d37',
      'black':'#000',
      'bg-hsl': 'rgb(250, 250, 250)',
    },
  
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },

  },
  plugins: [],
}

