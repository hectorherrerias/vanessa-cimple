/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        champagne: {
          50: '#FDFBF7',
          100: '#F9F4EB',
          200: '#F3E8D5',
          300: '#EBD8B8',
          400: '#DFC094',
          500: '#D4AF37', // Gold core
          600: '#B89328',
          700: '#94731C',
          800: '#755919',
          900: '#5F4717',
        },
        rosegold: {
          50: '#FAF4F4',
          100: '#F4E7E7',
          200: '#E9CFD1',
          300: '#DBB0B4',
          400: '#C88D93',
          500: '#B76E79',
          600: '#9F5560',
          700: '#83424B',
          800: '#6E3840',
          900: '#5D3237',
        },
        velvet: {
          950: '#0c0a10',
          900: '#14101a',
          850: '#1a1424',
          800: '#231b30',
          700: '#322645',
          600: '#463760',
        },
        ivory: {
          light: '#FFFDF9',
          DEFAULT: '#FAF7F0',
          dark: '#EFE9DF',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-up': 'scaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.2) rotate(180deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
        'rose-glow': '0 0 25px -5px rgba(183, 110, 121, 0.35)',
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(212, 175, 55, 0.2)',
      }
    },
  },
  plugins: [],
}
