import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-mono)", "monospace"],
      },
      colors: {
        // The Void (Background)
        'void': '#1B1C20',

        // The Matter (Structure/Cards)
        'matter': {
          DEFAULT: '#2D2421', // Baked Laterite Base
          highlight: '#484A3B', // Material Highlight
          dark: '#1E1917',
        },

        // The Light (Energy/Actions)
        'sun': {
          DEFAULT: '#FFC107', // Tungsten Sun
          glow: 'rgba(255, 193, 7, 0.4)',
        },

        // The Shadow (Depth)
        'indigo-shadow': 'rgba(26, 35, 126, 0.4)',

        // The Life (States)
        'life': '#004D40', // Circuit Teal

        // Map to standard tokens for existing components
        'background': '#1B1C20',
        'foreground': '#FAF8F6', // Brownish White
        'card': '#2D2421',
        'border': '#3D3D3D',
        'muted': '#A69080',

        'accent': '#FFC107',
        'accent-foreground': '#1B1C20',
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '10px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        // Tangible Realism Shadows (Indigo Tint)
        'tangible': '8px 12px 20px rgba(26, 35, 126, 0.4)',
        'tangible-hover': '12px 18px 30px rgba(26, 35, 126, 0.5)',
        'tangible-sm': '4px 6px 12px rgba(26, 35, 126, 0.3)',
        'lifted': '0 20px 40px -12px rgba(0, 0, 0, 0.5)',
        'inner-physical': 'inset 0 2px 6px 0 rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-delayed': 'fadeIn 0.5s ease-out',
        'progress': 'progress 2s ease-in-out infinite',
        'float-1': 'float1 3s ease-in-out infinite',
        'float-2': 'float2 3.5s ease-in-out infinite 0.5s',
        'float-3': 'float3 4s ease-in-out infinite 1s',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-slow-reverse': 'floatSlowReverse 7s ease-in-out infinite 2s',
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          'from': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          'to': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        progress: {
          '0%': { width: '0%' },
          '50%': { width: '100%' },
          '100%': { width: '0%' },
        },
        float1: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(5deg)' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(-3deg)' },
        },
        float3: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(8deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-5px) translateX(5px) rotate(2deg)' },
          '50%': { transform: 'translateY(-10px) translateX(0px) rotate(0deg)' },
          '75%': { transform: 'translateY(-5px) translateX(-5px) rotate(-2deg)' },
        },
        floatSlowReverse: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-8px) translateX(-8px) rotate(-3deg)' },
          '50%': { transform: 'translateY(-15px) translateX(0px) rotate(0deg)' },
          '75%': { transform: 'translateY(-8px) translateX(8px) rotate(3deg)' },
        },
        slideInRight: {
          'from': {
            opacity: '0',
            transform: 'translateX(100%)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      }
    },
  },
  plugins: [],
};

export default config;
