<template>
  <section class="relative min-h-[600px] flex items-center justify-center py-20 overflow-hidden">
    <!-- 背景效果 -->
    <div class="absolute inset-0 bg-gradient-to-b from-cyber-bg via-cyber-bg-alt to-cyber-bg"></div>

    <!-- 噪点效果 -->
    <div class="absolute inset-0 noise-overlay"></div>

    <!-- 扫描线效果 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute w-full h-[2px] bg-cyber-yellow/30 animate-scan-line"></div>
    </div>

    <!-- 六边形网格背景 -->
    <div class="absolute inset-0 opacity-5">
      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
          <polygon 
            points="25,0 50,12.5 50,37.5 25,50 0,37.5 0,12.5" 
            fill="none" 
            stroke="#fcee0a" 
            stroke-width="0.5"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>

    <!-- 左侧装饰 -->
    <div class="absolute left-20 top-1/2 -translate-y-1/2 hidden lg:block">
      <div class="flex flex-col gap-4 items-end">
        <div class="w-[100px] h-[2px] bg-gradient-to-l from-cyber-yellow to-transparent"></div>
        <div class="w-[60px] h-[2px] bg-gradient-to-l from-cyber-red to-transparent"></div>
        <div class="w-[80px] h-[2px] bg-gradient-to-l from-cyber-yellow/50 to-transparent"></div>
      </div>
      <div class="mt-20 terminal-text text-10 text-cyber-yellow/40 text-right">
        <div>SYS.INIT</div>
        <div>VER 2.077</div>
      </div>
    </div>

    <!-- 右侧装饰 -->
    <div class="absolute right-20 top-1/2 -translate-y-1/2 hidden lg:block">
      <div class="flex flex-col gap-4">
        <div class="w-[100px] h-[2px] bg-gradient-to-r from-cyber-yellow to-transparent"></div>
        <div class="w-[60px] h-[2px] bg-gradient-to-r from-cyber-red to-transparent"></div>
        <div class="w-[80px] h-[2px] bg-gradient-to-r from-cyber-yellow/50 to-transparent"></div>
      </div>
      <div class="mt-20 terminal-text text-10 text-cyber-yellow/40">
        <div>NIGHT.CITY</div>
        <div>2077.12</div>
      </div>
    </div>

    <!-- 终端窗口 -->
    <div class="relative z-10 w-full max-w-[850px] mx-4">
      <!-- 顶部警告条 -->
      <div class="flex items-center gap-12 mb-4 px-16">
        <div class="flex-1 h-[1px] bg-gradient-to-r from-transparent via-cyber-red to-transparent"></div>
        <span class="terminal-text text-10 text-cyber-red tracking-[0.3em] animate-cyber-pulse">
          ⚠ SECURE CONNECTION
        </span>
        <div class="flex-1 h-[1px] bg-gradient-to-r from-transparent via-cyber-red to-transparent"></div>
      </div>

      <!-- 主终端面板 -->
      <div class="glass-cyber clip-cyber overflow-hidden relative">
        <!-- 顶部边框发光 -->
        <div class="absolute top-0 left-16 right-16 h-[2px] bg-gradient-to-r from-transparent via-cyber-yellow to-transparent"></div>

        <!-- 终端顶栏 -->
        <div class="flex items-center justify-between px-20 py-14 bg-cyber-bg/80 border-b border-cyber-yellow/20">
          <div class="flex items-center gap-12">
            <!-- CP2077风格的状态指示器 -->
            <div class="flex gap-6">
              <div class="w-10 h-10 bg-cyber-red clip-cyber-sm"></div>
              <div class="w-10 h-10 bg-cyber-yellow clip-cyber-sm animate-cyber-pulse"></div>
              <div class="w-10 h-10 bg-cyber-green clip-cyber-sm"></div>
            </div>
            <div class="w-[1px] h-16 bg-cyber-yellow/30"></div>
            <span class="terminal-text text-12 text-cyber-yellow tracking-wider">
              NETRUNNER://profile.sys
            </span>
          </div>
          <div class="flex items-center gap-12">
            <span class="terminal-text text-10 text-cyber-text-dim">{{ currentTime }}</span>
            <div class="px-10 py-4 bg-cyber-green/20 border border-cyber-green/50 clip-cyber-sm">
              <span class="terminal-text text-10 text-cyber-green flex items-center gap-6">
                <span class="w-6 h-6 rounded-full bg-cyber-green animate-cyber-pulse"></span>
                ONLINE
              </span>
            </div>
          </div>
        </div>

        <!-- 终端内容 -->
        <div class="p-24 min-h-[320px] terminal-text text-14 leading-relaxed relative">
          <!-- 左侧行号装饰 -->
          <div class="absolute left-8 top-24 bottom-24 w-[1px] bg-cyber-yellow/10"></div>

          <TransitionGroup name="terminal-line">
            <div
              v-for="(line, index) in displayedLines"
              :key="index"
              class="mb-10 flex items-start gap-12"
            >
              <span class="text-cyber-text-dim text-10 w-20 text-right shrink-0">{{ String(index + 1).padStart(2, '0') }}</span>
              <span :class="getLineClass(line.type)">{{ line.content }}</span>
            </div>
          </TransitionGroup>

          <!-- 当前正在输入的行 -->
          <div v-if="isTyping" class="flex items-start gap-12">
            <span class="text-cyber-text-dim text-10 w-20 text-right shrink-0">{{ String(displayedLines.length + 1).padStart(2, '0') }}</span>
            <span :class="getLineClass(currentLineType)">{{ currentText }}</span>
            <span class="w-10 h-18 bg-cyber-yellow animate-blink-cursor ml-1"></span>
          </div>

          <!-- 最终的光标 -->
          <div v-if="!isTyping && typingComplete" class="flex items-start gap-12 mt-16">
            <span class="text-cyber-text-dim text-10 w-20 text-right shrink-0">{{ String(displayedLines.length + 1).padStart(2, '0') }}</span>
            <span class="text-cyber-yellow">root@netrunner:~$</span>
            <span class="w-10 h-18 bg-cyber-yellow animate-blink-cursor"></span>
          </div>
        </div>

        <!-- 底部状态栏 -->
        <div class="px-20 py-12 bg-cyber-bg/60 border-t border-cyber-yellow/20">
          <div class="flex items-center justify-between text-10 terminal-text">
            <div class="flex items-center gap-20 text-cyber-text-dim">
              <span class="flex items-center gap-6">
                <span class="w-6 h-6 bg-cyber-yellow"></span>
                STATUS: <span class="text-cyber-green">READY</span>
              </span>
              <span>MEM: 64.7GB</span>
              <span>CPU: 12.3%</span>
            </div>
            <div class="flex items-center gap-12">
              <span class="text-cyber-yellow">CYBERSPACE v2.077</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部装饰 -->
      <div class="flex items-center gap-12 mt-4 px-16">
        <div class="flex-1 h-[1px] bg-gradient-to-r from-transparent to-cyber-yellow/30"></div>
        <div class="flex gap-4">
          <div class="w-16 h-4 bg-cyber-yellow/40 clip-cyber-sm"></div>
          <div class="w-8 h-4 bg-cyber-red/40 clip-cyber-sm"></div>
          <div class="w-12 h-4 bg-cyber-yellow/40 clip-cyber-sm"></div>
        </div>
        <div class="flex-1 h-[1px] bg-gradient-to-l from-transparent to-cyber-yellow/30"></div>
      </div>
    </div>

    <!-- 角落装饰元素 -->
    <div class="absolute top-20 left-20 text-cyber-yellow/20 text-10 terminal-text hidden lg:block">
      <div>// ARASAKA.CORP</div>
      <div>// SECURE_TERMINAL</div>
      <div class="mt-8 text-cyber-red/30">⬡ ⬡ ⬡ ⬡ ⬡</div>
    </div>
    <div class="absolute bottom-20 right-20 text-cyber-yellow/20 text-10 terminal-text text-right hidden lg:block">
      <div>BUILD: 2077.12.18</div>
      <div>PROTOCOL: SECURE</div>
      <div class="mt-8 text-cyber-red/30">⬡ ⬡ ⬡ ⬡ ⬡</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { terminalLines } from '../data/resumeData'
import type { TerminalLine } from '@/models/resume'

const displayedLines = ref<TerminalLine[]>([])
const currentText = ref('')
const currentLineType = ref<'command' | 'output' | 'system'>('system')
const isTyping = ref(false)
const typingComplete = ref(false)
const currentTime = ref('')

// 更新时间
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { hour12: false })
}

// 获取行样式
const getLineClass = (type: string) => {
  switch (type) {
    case 'system':
      return 'text-cyber-red'
    case 'command':
      return 'text-cyber-yellow text-glow-yellow'
    default:
      return 'text-cyber-text'
  }
}

// 打字效果
const typeText = async (text: string, speed = 35) => {
  currentText.value = ''
  for (let i = 0; i < text.length; i++) {
    currentText.value += text[i]
    await new Promise((resolve) => setTimeout(resolve, speed))
  }
}

// 逐行显示
const displayTerminal = async () => {
  for (const line of terminalLines) {
    isTyping.value = true
    currentLineType.value = line.type

    // 打字效果
    const speed = line.type === 'system' ? 15 : 30
    await typeText(line.content, speed)

    // 完成当前行
    isTyping.value = false
    displayedLines.value.push(line)
    currentText.value = ''

    // 延迟到下一行
    await new Promise((resolve) => setTimeout(resolve, line.delay || 200))
  }

  typingComplete.value = true
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)

  // 开始打字效果
  setTimeout(displayTerminal, 800)
})
</script>

<style scoped>
.terminal-line-enter-active {
  transition: all 0.2s ease-out;
}

.terminal-line-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.terminal-line-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
