<template>
  <section class="py-80 px-20 relative overflow-hidden" ref="sectionRef">
    <!-- 背景 -->
    <div class="absolute inset-0 bg-cyber-bg"></div>
    <div class="absolute inset-0 noise-overlay"></div>

    <!-- 电路板装饰背景 - CP2077风格 -->
    <div class="absolute inset-0 opacity-5">
      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <pattern id="circuit-2077" width="120" height="120" patternUnits="userSpaceOnUse">
          <path
            d="M10 10 L40 10 L40 40 M60 10 L60 60 L90 60 M110 10 L110 110 M10 60 L30 60 M10 110 L60 110 L60 80"
            stroke="#fcee0a"
            fill="none"
            stroke-width="1"
          />
          <rect x="8" y="8" width="4" height="4" fill="#fcee0a" />
          <rect x="58" y="58" width="4" height="4" fill="#ff003c" />
          <rect x="108" y="108" width="4" height="4" fill="#fcee0a" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuit-2077)" />
      </svg>
    </div>

    <div class="relative z-10 max-w-[900px] mx-auto">
      <!-- 标题 -->
      <div class="text-center mb-60">
        <div class="inline-flex items-center gap-16 mb-16">
          <div class="flex items-center gap-4">
            <div class="w-20 h-[2px] bg-cyber-red"></div>
            <div class="w-8 h-[2px] bg-cyber-yellow"></div>
          </div>
          <span class="terminal-text text-12 text-cyber-red tracking-[0.4em] uppercase">
            职业日志.exe
          </span>
          <div class="flex items-center gap-4">
            <div class="w-8 h-[2px] bg-cyber-yellow"></div>
            <div class="w-20 h-[2px] bg-cyber-red"></div>
          </div>
        </div>
        <h2 class="text-36 font-bold text-cyber-yellow terminal-text uppercase tracking-wider text-glow-yellow">
          工作经历
        </h2>
        <p class="text-14 text-cyber-text-dim mt-12 terminal-text tracking-wider">
          // 工作经历节点
        </p>
      </div>

      <!-- 时间线 -->
      <div class="relative">
        <!-- 中央连接线 - CP2077电路风格 -->
        <div class="absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2">
          <!-- 背景线 -->
          <div class="absolute inset-0 bg-cyber-bg-alt border-x border-cyber-yellow/20"></div>
          <!-- 发光进度线 -->
          <div
            class="absolute top-0 left-0 right-0 transition-all duration-500 overflow-hidden"
            :style="{ height: `${scrollProgress}%` }"
          >
            <div class="absolute inset-0 bg-gradient-to-b from-cyber-yellow via-cyber-red to-cyber-yellow"></div>
            <div class="absolute inset-0 animate-cyber-glow"></div>
            <!-- 流动效果 -->
            <div 
              class="absolute inset-0"
              style="background: repeating-linear-gradient(180deg, transparent 0px, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px); animation: data-stream 2s linear infinite;"
            ></div>
          </div>
        </div>

        <!-- 经历节点 -->
        <div class="space-y-80">
          <div
            v-for="(exp, index) in experiences"
            :key="exp.id"
            class="relative flex items-start gap-48"
            :class="index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'"
          >
            <!-- 内容卡片 -->
            <div class="w-[calc(50%-40px)]">
              <CyberCard :enable-glitch="true" :variant="exp.isCurrent ? 'default' : 'default'">
                <template #header>
                  <div class="flex items-start justify-between">
                    <div>
                      <h3 class="terminal-text text-18 font-bold text-cyber-yellow uppercase tracking-wider">
                        {{ exp.company }}
                      </h3>
                      <p class="terminal-text text-10 text-cyber-text-dim mt-4 tracking-wider">
                        // {{ exp.companyEn }}
                      </p>
                    </div>
                    <div
                      v-if="exp.isCurrent"
                      class="px-12 py-6 bg-cyber-green/20 border border-cyber-green/50 clip-cyber-sm"
                    >
                      <span class="terminal-text text-10 text-cyber-green flex items-center gap-6 uppercase tracking-wider">
                        <span class="w-6 h-6 bg-cyber-green clip-cyber-sm animate-cyber-pulse"></span>
                        进行中
                      </span>
                    </div>
                  </div>
                </template>

                <!-- 职位信息 -->
                <div class="mb-16">
                  <div class="terminal-text text-14 text-cyber-red font-bold uppercase tracking-wider">
                    {{ exp.position }}
                  </div>
                  <div class="terminal-text text-12 text-cyber-text-dim mt-4 flex items-center gap-8">
                    <span class="w-4 h-4 bg-cyber-yellow"></span>
                    {{ exp.startDate }} → {{ exp.endDate }}
                  </div>
                </div>

                <!-- 工作描述 -->
                <ul class="space-y-10">
                  <li
                    v-for="(desc, i) in exp.description"
                    :key="i"
                    class="flex items-start gap-10 text-14 text-cyber-text/80"
                  >
                    <span class="text-cyber-yellow mt-4 text-10">▸</span>
                    <span>{{ desc }}</span>
                  </li>
                </ul>

                <!-- 技术标签 -->
                <div class="flex flex-wrap gap-8 mt-20">
                  <span
                    v-for="tech in exp.technologies"
                    :key="tech"
                    class="cyber-tag px-10 py-4 clip-cyber-sm text-10 terminal-text uppercase"
                  >
                    {{ tech }}
                  </span>
                </div>
              </CyberCard>
            </div>

            <!-- 中间节点 - CP2077芯片风格 -->
            <div class="absolute left-1/2 top-24 -translate-x-1/2 z-20">
              <div class="relative">
                <!-- 外框 -->
                <div class="w-32 h-32 bg-cyber-bg border-2 border-cyber-yellow clip-cyber flex items-center justify-center">
                  <!-- 内核 -->
                  <div class="w-12 h-12 bg-cyber-yellow clip-cyber-sm animate-cyber-pulse"></div>
                </div>
                <!-- 光晕效果 -->
                <div class="absolute -inset-4 border border-cyber-yellow/30 clip-cyber animate-cyber-pulse"></div>
                <!-- 连接线 -->
                <div class="absolute top-1/2 -translate-y-1/2 w-12 h-[2px] bg-cyber-yellow" :class="index % 2 === 0 ? '-left-16' : '-right-16'"></div>
              </div>
              <!-- 日期标签 -->
              <div
                class="absolute top-1/2 -translate-y-1/2 whitespace-nowrap terminal-text text-10 text-cyber-yellow/80 uppercase tracking-wider"
                :class="index % 2 === 0 ? 'right-50' : 'left-50'"
              >
                {{ exp.startDate }}
              </div>
            </div>

            <!-- 空白占位 -->
            <div class="w-[calc(50%-40px)]"></div>
          </div>
        </div>

        <!-- 底部终点 -->
        <div class="absolute left-1/2 -bottom-20 -translate-x-1/2">
          <div class="w-16 h-16 bg-cyber-red clip-cyber-sm animate-cyber-glow-red"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import { resumeData } from '../data/resumeData'
import CyberCard from './CyberCard.vue'

const experiences = resumeData.experiences
const sectionRef = ref<HTMLElement | null>(null)
const scrollProgress = ref(0)

// 使用节流优化滚动事件，并使用 requestAnimationFrame 进一步优化
const handleScroll = useThrottleFn(() => {
  if (!sectionRef.value) return

  // 使用 requestAnimationFrame 确保在下一帧计算，避免阻塞
  requestAnimationFrame(() => {
    if (!sectionRef.value) return

    const rect = sectionRef.value.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const sectionHeight = rect.height

    // 计算滚动进度
    const startOffset = windowHeight * 0.8
    const scrolled = startOffset - rect.top
    const total = sectionHeight + startOffset - windowHeight * 0.2

    scrollProgress.value = Math.min(100, Math.max(0, (scrolled / total) * 100))
  })
}, 16) // 约 60fps

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped></style>
