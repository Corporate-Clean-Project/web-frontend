/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "Nocturne Opulence" design tokens
        surface: '#101419',
        'surface-dim': '#101419',
        'surface-bright': '#36393f',
        'surface-container-lowest': '#0a0e13',
        'surface-container-low': '#181c21',
        'surface-container': '#1c2025',
        'surface-container-high': '#262a30',
        'surface-container-highest': '#31353b',
        'on-surface': '#e0e2ea',
        'on-surface-variant': '#d3c4b3',
        outline: '#9c8f7f',
        'outline-variant': '#4f4538',
        primary: '#f2be71',
        'on-primary': '#442b00',
        'primary-container': '#d4a359',
        secondary: '#edbf70',
        'on-secondary': '#422c00',
        tertiary: '#bfc7d6',
        error: '#ffb4ab',
        background: '#101419',
        'on-background': '#e0e2ea',
        gold: '#d4a359',
        'gold-light': '#e5b869',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
