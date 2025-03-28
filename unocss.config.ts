import { defineConfig, presetAttributify, presetUno, presetIcons } from "unocss";
import { presetExtra } from "unocss-preset-extra";
import { presetWebFonts } from "unocss";
import presetRemToPx from "@unocss/preset-rem-to-px";
import rules from "@/plugins/unocss/rules.ts";

// import { presetScrollbarHide } from "unocss-preset-scrollbar-hide";

export default defineConfig({
  // content: {
  //   pipeline: {
  //     include: [
  //       // 默认配置
  //       /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
  //       // 包括 js/ts 文件
  //       "src/**/*.{js,ts}",
  //     ],
  //     // 排除文件
  //     // exclude: []
  //   },
  // },
  presets: [
    presetUno({}),
    presetAttributify(),
    presetIcons({ scale: 1, warn: true }),
    presetExtra(),
    presetWebFonts({
      // provider: 'google',
      // fonts: {
      //   sans: 'Roboto',
      //   mono: ['Fira Code', 'Fira Mono:400,700'],
      // },
    }),
    presetRemToPx({
      baseFontSize: 4,
    }),
  ],
  shortcuts: [
    ["wh-full", "w-full h-full"],
    ["f-c-c", "flex justify-center items-center"],
    ["flex-col", "flex flex-col"],
    ["text-ellipsis", "truncate"],
    ["icon-btn", "text-16 inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-primary !outline-none"],
  ],
  rules,
  theme: {
    colors: {
      primary: "var(--primary-color)",
      default: "var(--default-color)",
      dark_bg: "var(--dark-bg)",
    },
    breakpoints: {
      sm: "768px", // 如平板竖屏
      md: "1024px", // 大屏平板，笔记本电脑
      lg: "1280px", // 桌面显示器，低分辨率
      xl: "1536px", // 桌面显示器, 高分辨率
      "2xl": "1920px", // 1080p桌面显示器
      "3xl": "2560px", // 1440p桌面显示器
    },
  },
});
