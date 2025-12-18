<template>
  <section class="py-80 px-20 relative overflow-hidden" ref="sectionRef">
    <!-- 背景 -->
    <div class="absolute inset-0 bg-cyber-bg"></div>

    <div class="relative z-10 max-w-[900px] mx-auto">
      <!-- 标题 -->
      <div class="text-center mb-60">
        <div class="inline-flex items-center gap-16 mb-16">
          <div class="flex items-center gap-4">
            <div class="w-20 h-[2px] bg-cyber-red"></div>
            <div class="w-8 h-[2px] bg-cyber-yellow"></div>
          </div>
          <span class="terminal-text text-12 text-cyber-red tracking-[0.4em] uppercase">
            CAREER_LOG.exe
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
          // EMPLOYMENT HISTORY NODES
        </p>
      </div>

      <!-- 时间线 -->
      <div class="relative">
        <!-- 中央连接线 - 简化版 -->
        <div class="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2">
          <!-- 背景线 -->
          <div class="absolute inset-0 bg-cyber-bg-alt border-x border-cyber-yellow/20"></div>
          <!-- 发光进度线 -->
          <div
            class="absolute top-0 left-0 right-0 bg-gradient-to-b from-cyber-yellow to-cyber-red transition-[height] duration-300"
            :style="{ height: `${scrollProgress}%` }"
          ></div>
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
                        ACTIVE
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

            <!-- 中间节点 - 简化版 -->
            <div class="absolute left-1/2 top-24 -translate-x-1/2 z-20">
              <div class="relative">
                <!-- 节点 -->
                <div class="w-20 h-20 bg-cyber-bg border-2 border-cyber-yellow flex items-center justify-center">
                  <div class="w-8 h-8 bg-cyber-yellow"></div>
                </div>
                <!-- 连接线 -->
                <div class="absolute top-1/2 -translate-y-1/2 w-10 h-[2px] bg-cyber-yellow/60" :class="index % 2 === 0 ? '-left-14' : '-right-14'"></div>
              </div>
              <!-- 日期标签 -->
              <div
                class="absolute top-1/2 -translate-y-1/2 whitespace-nowrap terminal-text text-10 text-cyber-yellow/70 uppercase"
                :class="index % 2 === 0 ? 'right-40' : 'left-40'"
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
import { resumeData } from '../data/resumeData'
import CyberCard from './CyberCard.vue'

const experiences = resumeData.experiences
const sectionRef = ref<HTMLElement | null>(null)
const scrollProgress = ref(0)

const handleScroll = () => {
  if (!sectionRef.value) return

  const rect = sectionRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const sectionHeight = rect.height

  // 计算滚动进度
  const startOffset = windowHeight * 0.8
  const scrolled = startOffset - rect.top
  const total = sectionHeight + startOffset - windowHeight * 0.2

  scrollProgress.value = Math.min(100, Math.max(0, (scrolled / total) * 100))
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped></style>
