import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // === DAFTAR ANIMASI (ACTION) ===
      animation: {
        'spin-slow': 'spin 4s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        // Animasi Bar Musik (Naik Turun)
        'music-bar-1': 'music 0.5s ease-in-out infinite alternate',
        'music-bar-2': 'music 0.7s ease-in-out infinite alternate',
        'music-bar-3': 'music 0.9s ease-in-out infinite alternate',
        // Animasi Nada Melayang
        'float-note-1': 'floatUp 2s ease-out infinite',
        'float-note-2': 'floatUp 2.5s ease-out infinite 0.5s',
        'float-note-3': 'floatUp 3s ease-out infinite 1s',
        // Animasi Teks/Kartu Berjalan (Marquee)
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marqueeReverse 40s linear infinite',
      },
      // === DEFINISI GERAKAN (KEYFRAMES) ===
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        music: {
          '0%': { height: '20%' },
          '100%': { height: '100%' },
        },
        floatUp: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(-40px) rotate(20deg)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;