import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const fallback = ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'];

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '16px', md: '24px' },
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1200px', '2xl': '1200px' },
    },
    extend: {
      fontFamily: {
        heading: ['DM Sans', ...fallback],
        body: ['Inter', ...fallback],
        sans: ['Inter', ...fallback],
      },
      fontSize: {
        display: ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.02em' }],
        h1: ['2.5rem', { lineHeight: '3rem', letterSpacing: '-0.02em' }],
        h2: ['2rem', { lineHeight: '2.5rem', letterSpacing: '-0.015em' }],
        h3: ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],
        h4: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'body-sm': ['0.875rem', { lineHeight: '1.375rem' }],
        caption: ['0.8125rem', { lineHeight: '1.125rem' }],
        overline: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.08em' }],
      },
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        ink: '#10222e',
        // Rampe Bleu 2C — primaire (identité + slots shadcn primary/primary-foreground)
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
          50: '#eef6fb',
          100: '#d3e7f3',
          200: '#a7cfe7',
          300: '#6fb0d6',
          400: '#3a8ec1',
          500: '#167aad',
          600: '#08699b',
          700: '#075884',
          800: '#0a4869',
          900: '#0c3a54',
          950: '#072536',
        },
        // Rampe Or 2C — accent de marque (aplats/déco). Distincte du slot shadcn `accent` (survol neutre).
        gold: {
          50: '#fff8e6',
          100: '#fdecbf',
          200: '#fadd8a',
          300: '#f6c94d',
          400: '#f2b31f',
          500: '#ed9f00',
          600: '#cf8500',
          700: '#a76700',
          800: '#855100',
          900: '#6e4300',
          950: '#3f2500',
        },
        neutral: {
          50: '#f6f8fa',
          100: '#eceff3',
          200: '#dbe1e8',
          300: '#c0cad4',
          400: '#94a3b3',
          500: '#6b7c8d',
          600: '#526170',
          700: '#3d4a57',
          800: '#29333d',
          900: '#182028',
          950: '#0e141a',
        },
        success: { DEFAULT: '#1a8f5c', bg: '#e6f5ee' },
        warning: { DEFAULT: '#cf8500', bg: '#fff4d6' },
        error: { DEFAULT: '#d1362f', bg: '#fbeceb' },
        info: { DEFAULT: '#08699b', bg: '#eef6fb' },
      },
      borderRadius: {
        none: '0',
        sm: '6px',
        DEFAULT: '10px',
        md: '10px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        full: '9999px',
        pill: '9999px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(16,34,46,.06)',
        sm: '0 2px 6px rgba(16,34,46,.08)',
        md: '0 6px 16px rgba(16,34,46,.10)',
        lg: '0 12px 28px rgba(16,34,46,.12)',
        xl: '0 24px 48px rgba(16,34,46,.16)',
      },
      transitionDuration: {
        fast: '120ms',
        base: '200ms',
        slow: '320ms',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(.2,.8,.2,1)',
      },
      maxWidth: {
        container: '1200px',
        prose: '680px',
        'prose-wide': '760px',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
