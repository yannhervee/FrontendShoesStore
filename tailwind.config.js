/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        
      },
      width: {
        '512': '512px',  
        '150': '150px',
        '250': '250px',
        
      },
      height: {
        '512': '512px',  
        '150': '150px',
        '250': '250px',
      },
      backgroundImage: {
        'my-image': "url('/logo.png')",
        'home-left': "url('/img1.png')",
        'home-right': "url('/img2.png')",
        'eco': "url('/ecoTrans.png')",
      },
      colors: {
        'pastel-pink': '#ffdfd5',
        'pastel-pink-dark': '#fcbdb0',
        'pastel-blue': '#a7c7e7',  
        'pastel-green': '#bdecb6',
        'pastel-green-dark': '#8cbf88'
      }
    },
  },
  plugins: [],
};
