import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        hc: {
          red: '#EC3750',
          orange: '#FF8C37',
          yellow: '#F1C40F',
          green: '#33D6A6',
          blue: '#338EDA',
          purple: '#8B5CF6',
          slate: '#8492A6',
          dark: '#1F2D3D',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui'],
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
}

export default config
