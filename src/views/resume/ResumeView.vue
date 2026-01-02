<template>
  <div class="resume-view min-h-screen bg-cyber-bg text-cyber-text overflow-x-hidden">
    <!-- 全局扫描线效果 - 使用will-change优化 -->
    <div
      class="fixed inset-0 pointer-events-none z-50 scan-lines opacity-20"
      style="will-change: auto;"
    ></div>

    <!-- 全局噪点 - 降低动画频率 -->
    <div
      class="fixed inset-0 pointer-events-none z-40 noise-overlay opacity-30"
      style="will-change: background-position;"
    ></div>

    <!-- 侧边导航 - CP2077风格 -->
    <nav class="fixed right-12 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div class="glass-cyber clip-cyber-left p-12 border border-cyber-yellow/30">
        <div class="flex flex-col gap-20">
          <button
            v-for="(section, index) in sections"
            :key="section.id"
            @click="scrollToSection(section.id)"
            class="group relative flex items-center gap-12 transition-colors duration-300"
          >
            <!-- 指示器 -->
            <div
              class="w-12 h-12 clip-cyber-sm transition-colors duration-300"
              :class="activeSection === section.id
                ? 'bg-cyber-yellow animate-cyber-pulse'
                : 'bg-cyber-yellow/30 group-hover:bg-cyber-yellow/60'"
            ></div>
            <!-- 标签 -->
            <span
              class="terminal-text text-10 uppercase tracking-wider transition-colors duration-300 whitespace-nowrap"
              :class="activeSection === section.id
                ? 'text-cyber-yellow text-glow-yellow'
                : 'text-cyber-text-dim group-hover:text-cyber-yellow'"
            >
              {{ section.label }}
            </span>
          </button>
        </div>
      </div>
    </nav>

    <!-- 顶部装饰条 - CP2077风格 -->
    <div class="fixed top-0 left-0 right-0 h-[3px] z-40 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-cyber-yellow via-cyber-red to-cyber-yellow"></div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-border-flow"
        style="background-size: 200% 100%;"
      ></div>
    </div>

    <!-- 左侧装饰线 -->
    <div class="fixed left-0 top-1/4 bottom-1/4 w-[2px] z-30 hidden lg:block">
      <div class="h-full bg-gradient-to-b from-transparent via-cyber-yellow/40 to-transparent"></div>
    </div>

    <!-- 返回首页按钮 - CP2077风格 -->
    <button
      @click="goToHome"
      class="fixed top-24 left-24 z-50 glass-cyber clip-cyber-sm px-20 py-12 border border-cyber-yellow/50 flex items-center gap-10 text-cyber-yellow hover:border-cyber-yellow hover:bg-cyber-yellow/10 transition-all duration-300 group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="group-hover:translate-x-[-2px] transition-transform duration-300"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
      <span class="terminal-text text-12 uppercase tracking-wider">返回首页</span>
      <div
        class="w-6 h-6 bg-cyber-yellow/30 clip-cyber-sm group-hover:bg-cyber-yellow group-hover:animate-cyber-pulse transition-colors"
      ></div>
    </button>

    <!-- 主要内容区域 -->
    <main>
      <!-- Hero Section - 终端 -->
      <section id="hero">
        <TerminalHero />
      </section>

      <!-- Skills HUD -->
      <section id="skills">
        <SkillsHub />
      </section>

      <!-- Experience Timeline -->
      <section id="experience">
        <ExperienceTimeline />
      </section>

      <!-- Project Arsenal -->
      <section id="projects">
        <ProjectArsenal />
      </section>

      <!-- Footer - CP2077风格 -->
      <footer class="py-60 px-20 bg-cyber-bg border-t border-cyber-yellow/20 relative">
        <div class="absolute inset-0 noise-overlay opacity-20"></div>
        <div class="relative z-10 max-w-[1200px] mx-auto">
          <!-- 联系信息 -->
          <div class="text-center mb-40">
            <div class="inline-flex items-center gap-12 mb-20">
              <div class="w-40 h-[2px] bg-gradient-to-r from-transparent to-cyber-yellow"></div>
              <span class="terminal-text text-12 text-cyber-yellow tracking-[0.3em] uppercase">
                {{ uiConfig.footer.connectionTitle }}
              </span>
              <div class="w-40 h-[2px] bg-gradient-to-l from-transparent to-cyber-yellow"></div>
            </div>
            <h3 class="terminal-text text-24 text-cyber-yellow text-glow-yellow uppercase tracking-wider mb-24">
              {{ uiConfig.footer.connectionTitle }}
            </h3>
            <div class="flex justify-center gap-40 flex-wrap">
              <a
                :href="`mailto:${resumeData.profile.contact.email}`"
                class="group glass-cyber clip-cyber-sm px-20 py-12 border border-cyber-yellow/30 hover:border-cyber-yellow transition-colors duration-300"
              >
                <div class="flex items-center gap-12 terminal-text text-14">
                  <div class="w-8 h-8 bg-cyber-yellow clip-cyber-sm group-hover:animate-cyber-pulse"></div>
                  <span
                    class="text-cyber-text group-hover:text-cyber-yellow transition-colors uppercase tracking-wider">
                    {{ resumeData.profile.contact.email }}
                  </span>
                </div>
              </a>
              <a
                v-if="resumeData.profile.contact.github"
                :href="resumeData.profile.contact.github"
                target="_blank"
                class="group glass-cyber clip-cyber-sm px-20 py-12 border border-cyber-red/30 hover:border-cyber-red transition-colors duration-300"
              >
                <div class="flex items-center gap-12 terminal-text text-14">
                  <div class="w-8 h-8 bg-cyber-red clip-cyber-sm group-hover:animate-cyber-pulse"></div>
                  <span class="text-cyber-text group-hover:text-cyber-red transition-colors uppercase tracking-wider">
                    GitHub
                  </span>
                </div>
              </a>
            </div>
          </div>

          <!-- 版权信息 -->
          <div class="text-center terminal-text text-12 text-cyber-text-dim uppercase tracking-wider">
            <div class="flex items-center justify-center gap-16 mb-8">
              <div class="w-20 h-[1px] bg-cyber-yellow/30"></div>
              <span>{{ uiConfig.footer.systemVersion }}</span>
              <div class="w-20 h-[1px] bg-cyber-yellow/30"></div>
            </div>
            <p>© {{ new Date().getFullYear() }} {{ resumeData.profile.name }} // {{ uiConfig.footer.copyrightText }}</p>
          </div>
        </div>
      </footer>
    </main>

    <!-- 回到顶部按钮 - CP2077风格 -->
    <Transition name="fade">
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-24 right-24 z-40 w-48 h-48 glass-cyber clip-cyber border border-cyber-yellow/50 flex items-center justify-center text-cyber-yellow hover:border-cyber-yellow hover:bg-cyber-yellow/10 transition-colors duration-300 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="group-hover:animate-float"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useThrottleFn, useWindowScroll } from '@vueuse/core'
import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { resumeData, uiConfig } from './data/resumeData'

// 组件懒加载
const TerminalHero = defineAsyncComponent(() => import('./components/TerminalHero.vue'))
const SkillsHub = defineAsyncComponent(() => import('./components/SkillsHub.vue'))
const ExperienceTimeline = defineAsyncComponent(() => import('./components/ExperienceTimeline.vue'))
const ProjectArsenal = defineAsyncComponent(() => import('./components/ProjectArsenal.vue'))

// 从配置文件读取sections
const sections = uiConfig.sections

const activeSection = ref('hero')
const { y } = useWindowScroll()
const router = useRouter()

// 使用 computed 优化 showBackToTop
const showBackToTop = computed(() => y.value > 500)

// 返回首页
const goToHome = () => {
  router.push('/')
}

// 缓存元素引用，避免重复查询 DOM
const sectionElements = new Map<string, HTMLElement>()

const scrollToSection = (id: string) => {
  const element = sectionElements.get(id) || document.getElementById(id)
  if (element) {
    sectionElements.set(id, element)
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 使用 IntersectionObserver 替代 getBoundingClientRect，性能更好
let rafId: number | null = null

const setupIntersectionObserver = () => {
  // 使用 requestAnimationFrame 节流回调，避免频繁更新
  let pendingUpdate: string | null = null

  const observer = new IntersectionObserver(
    (entries) => {
      // 找到最接近视口中心的 section
      let closestEntry: IntersectionObserverEntry | null = null
      let closestDistance = Infinity

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect
          const viewportCenter = window.innerHeight / 2
          const elementCenter = rect.top + rect.height / 2
          const distance = Math.abs(elementCenter - viewportCenter)

          if (distance < closestDistance) {
            closestDistance = distance
            closestEntry = entry
          }
        }
      })

      if (closestEntry) {
        const sectionId = closestEntry.target.id
        if (sections.some((s) => s.id === sectionId)) {
          pendingUpdate = sectionId

          // 取消之前的raf
          if (rafId !== null) {
            cancelAnimationFrame(rafId)
          }

          // 使用raf批量更新，避免频繁触发响应式更新
          rafId = requestAnimationFrame(() => {
            if (pendingUpdate && activeSection.value !== pendingUpdate) {
              activeSection.value = pendingUpdate
            }
            rafId = null
            pendingUpdate = null
          })
        }
      }
    },
    {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // 只检测视口中心 20% 区域
      threshold: 0
    }
  )

  // 观察所有 section
  sections.forEach((section) => {
    const element = document.getElementById(section.id)
    if (element) {
      sectionElements.set(section.id, element)
      observer.observe(element)
    }
  })

  return observer
}

// 节流处理滚动事件（作为后备方案）
const handleScroll = useThrottleFn(() => {
  // 如果 IntersectionObserver 不可用，使用传统方法
  if (!window.IntersectionObserver) {
    for (const section of sections) {
      const element = sectionElements.get(section.id) || document.getElementById(section.id)
      if (element) {
        sectionElements.set(section.id, element)
        const rect = element.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          activeSection.value = section.id
          break
        }
      }
    }
  }
}, 100)

let observer: IntersectionObserver | null = null

onMounted(() => {
  // 优先使用 IntersectionObserver
  if (window.IntersectionObserver) {
    observer = setupIntersectionObserver()
  } else {
    // 降级到节流滚动事件
    window.addEventListener('scroll', handleScroll, { passive: true })
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  } else {
    window.removeEventListener('scroll', handleScroll)
  }
  // 清理可能的raf
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
  }
})
</script>

<style scoped>
.resume-view {
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes border-flow {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.animate-border-flow {
  animation: border-flow 3s linear infinite;
  will-change: transform;
  transform: translateZ(0);
  /* GPU加速 */
  contain: layout style paint;
}
</style>
