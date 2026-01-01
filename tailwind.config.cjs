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



