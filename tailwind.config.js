/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    // ...
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        my_bg_image: "url('./src/assets/bootcampHeroImg.jpg')",
      },
      fontFamily: {
        nunito: "Nunito",
      },
      container: {
        center: true,
      },
      backgroundColor: {
        "gray-bg": "#F9F9F9",
        "arrow-btn-bg": "#1257f852",
      },
      colors: {
        "small-text-color": "#8a92a6",
        "arrow-btn": "#3A57E8",
        "title-clr": "#232D42",
        "primary":"#3A57E8"
      },
    },
    screens: {
      'xsm': '320px',
      
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [require("flowbite/plugin"), require("tailwind-scrollbar")],
};
