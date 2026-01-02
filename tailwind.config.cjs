/** @type {import('tailwindcss').Config} */
function pxScale(max = 512) {
  const out = {}
  for (let i = 0; i <= max; i++) out[String(i)] = `${i}px`
  return out
}

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      // 兼容原来 UnoCSS 的 `p-18`/`w-64`/`gap-48` 等“像素数值类名”
      spacing: pxScale(512),
      fontSize: pxScale(128),
      lineHeight: pxScale(128),
      borderRadius: pxScale(128),
      colors: {
        primary: 'var(--primary-color)',
        default: 'var(--default-color)',
        dark_bg: 'var(--dark-bg)',
        'brutal-black': 'var(--color-brutal-black)',
        'brutal-white': 'var(--color-brutal-white)',
        'brutal-yellow': 'var(--color-brutal-yellow)',
        'brutal-red': 'var(--color-brutal-red)',
        'brutal-blue': 'var(--color-brutal-blue)',
        'brutal-green': 'var(--color-brutal-green)',
        'brutal-pink': 'var(--color-brutal-pink)',
        'brutal-orange': 'var(--color-brutal-orange)',
        'brutal-gray': 'var(--color-brutal-gray)',
        'brutal-light-gray': 'var(--color-brutal-light-gray)',
        // New Skills Module Colors
        'cp-bg-dark': '#050508',
        'cp-bg-panel': '#0e0e14',
        'cp-red': '#ff003c',
        'cp-blue': '#0ab9eb',
        'cp-green': '#3bf279',
        'cp-purple': '#a824ff',
        'cp-orange': '#ff9f0a',
        'cp-yellow': '#fcee0a',
        'cp-dim': '#2a2a2a',
        'cp-text-dim': '#6b7280', 
      },
      fontFamily: {
        'cyber': ['"Orbitron"', '"Noto Sans SC"', 'sans-serif'],
        'mono': ['"Share Tech Mono"', '"Noto Sans SC"', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1f1f1f 1px, transparent 1px), linear-gradient(to bottom, #1f1f1f 1px, transparent 1px)",
        'scanline': "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
      },
      boxShadow: {
        'neon': '0 0 10px rgba(252, 238, 10, 0.5), 0 0 20px rgba(252, 238, 10, 0.3)',
      },
      animation: {
        'glitch': 'glitch 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'flow': 'flow 1s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)', opacity: '0' },
          '20%': { transform: 'translate(-4px, 4px)', opacity: '1', clipPath: 'inset(20% 0 80% 0)' },
          '40%': { transform: 'translate(4px, -4px)', clipPath: 'inset(80% 0 20% 0)' },
          '60%': { transform: 'translate(-4px, 0)', clipPath: 'inset(40% 0 40% 0)' },
          '80%': { transform: 'translate(4px, 4px)', clipPath: 'inset(0 0 0 0)' },
          '100%': { transform: 'translate(0)', opacity: '1' },
        },
        flow: {
          'to': { strokeDashoffset: '-40' }
        }
      },
      zIndex: (() => {
        const out = {}
        for (let i = 0; i <= 100; i++) out[String(i)] = String(i)
        return out
      })(),
    },
  },
  plugins: [],
}



