/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: 'hsl(210, 90%, 50%)',
          hover: 'hsl(210, 90%, 45%)',
          light: 'hsl(210, 90%, 95%)',
        },
        accent: {
          DEFAULT: 'hsl(160, 80%, 45%)',
          hover: 'hsl(160, 80%, 40%)',
          light: 'hsl(160, 80%, 95%)',
        },
        // Semantic colors
        success: {
          DEFAULT: 'hsl(142, 76%, 36%)',
          hover: 'hsl(142, 76%, 31%)',
          light: 'hsl(142, 76%, 95%)',
        },
        warning: {
          DEFAULT: 'hsl(38, 92%, 50%)',
          hover: 'hsl(38, 92%, 45%)',
          light: 'hsl(38, 92%, 95%)',
        },
        error: {
          DEFAULT: 'hsl(0, 84%, 60%)',
          hover: 'hsl(0, 84%, 55%)',
          light: 'hsl(0, 84%, 95%)',
        },
        info: {
          DEFAULT: 'hsl(217, 91%, 60%)',
          hover: 'hsl(217, 91%, 55%)',
          light: 'hsl(217, 91%, 95%)',
        },
        // Neutral colors
        bg: 'hsl(210, 30%, 95%)',
        surface: {
          DEFAULT: 'hsl(210, 30%, 100%)',
          hover: 'hsl(210, 30%, 98%)',
        },
        border: {
          DEFAULT: 'hsl(210, 30%, 85%)',
          hover: 'hsl(210, 30%, 75%)',
        },
        'text-primary': 'hsl(210, 30%, 10%)',
        'text-secondary': 'hsl(210, 30%, 30%)',
        'text-tertiary': 'hsl(210, 30%, 50%)',
        'text-inverse': 'hsl(0, 0%, 100%)',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        card: '0 4px 8px hsla(0, 0%, 0%, 0.05)',
        modal: '0 16px 32px hsla(0, 0%, 0%, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      animationDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
