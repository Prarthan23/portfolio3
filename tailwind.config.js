/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        rocky:['Rockybilly Regular'],
        firlest:['Firlest Regular'],
        poppins:['Poppins'],
        kanit:['Kanit']
      },
      colors:{
        primary:'#F66435',
        secondary:'#F4EFCA',
      }
    },
  },
  plugins: [],
}

