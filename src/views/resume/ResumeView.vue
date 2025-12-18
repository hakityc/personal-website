<template>
  <div class="resume-view min-h-screen bg-cyber-bg text-cyber-text overflow-x-hidden">
    <!-- 全局扫描线效果 - 仅一层静态效果 -->
    <div class="fixed inset-0 pointer-events-none z-50 scan-lines opacity-10"></div>

    <!-- 侧边导航 - CP2077风格 -->
    <nav class="fixed right-24 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div class="glass-cyber clip-cyber-left p-12 border border-cyber-yellow/30">
        <div class="flex flex-col gap-20">
          <button
            v-for="(section, index) in sections"
            :key="section.id"
            @click="scrollToSection(section.id)"
            class="group relative flex items-center gap-12 transition-all duration-300"
          >
            <!-- 指示器 -->
            <div
              class="w-12 h-12 clip-cyber-sm transition-all duration-300"
              :class="activeSection === section.id 
                ? 'bg-cyber-yellow animate-cyber-pulse' 
                : 'bg-cyber-yellow/30 group-hover:bg-cyber-yellow/60'"
            ></div>
            <!-- 标签 -->
            <span
              class="terminal-text text-10 uppercase tracking-wider transition-all duration-300 whitespace-nowrap"
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
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-border-flow" style="background-size: 200% 100%;"></div>
    </div>

    <!-- 左侧装饰线 -->
    <div class="fixed left-0 top-1/4 bottom-1/4 w-[2px] z-30 hidden lg:block">
      <div class="h-full bg-gradient-to-b from-transparent via-cyber-yellow/40 to-transparent"></div>
    </div>

    <!-- 主要内容区域 -->
    <main>
      <!-- Hero Section - 终端 -->
      <section id="hero">
        <TerminalHero />
      </section>

      <!-- Skills HUD -->
      <section id="skills">
        <SkillsHUD />
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
                ESTABLISH_CONNECTION
              </span>
              <div class="w-40 h-[2px] bg-gradient-to-l from-transparent to-cyber-yellow"></div>
            </div>
            <h3 class="terminal-text text-24 text-cyber-yellow text-glow-yellow uppercase tracking-wider mb-24">
              建立连接
            </h3>
            <div class="flex justify-center gap-40 flex-wrap">
              <a
                :href="`mailto:${resumeData.profile.contact.email}`"
                class="group glass-cyber clip-cyber-sm px-20 py-12 border border-cyber-yellow/30 hover:border-cyber-yellow transition-all duration-300"
              >
                <div class="flex items-center gap-12 terminal-text text-14">
                  <div class="w-8 h-8 bg-cyber-yellow clip-cyber-sm group-hover:animate-cyber-pulse"></div>
                  <span class="text-cyber-text group-hover:text-cyber-yellow transition-colors uppercase tracking-wider">
                    {{ resumeData.profile.contact.email }}
                  </span>
                </div>
              </a>
              <a
                v-if="resumeData.profile.contact.github"
                :href="resumeData.profile.contact.github"
                target="_blank"
                class="group glass-cyber clip-cyber-sm px-20 py-12 border border-cyber-red/30 hover:border-cyber-red transition-all duration-300"
              >
                <div class="flex items-center gap-12 terminal-text text-14">
                  <div class="w-8 h-8 bg-cyber-red clip-cyber-sm group-hover:animate-cyber-pulse"></div>
                  <span class="text-cyber-text group-hover:text-cyber-red transition-colors uppercase tracking-wider">
                    GITHUB
                  </span>
                </div>
              </a>
            </div>
          </div>

          <!-- 版权信息 -->
          <div class="text-center terminal-text text-12 text-cyber-text-dim uppercase tracking-wider">
            <div class="flex items-center justify-center gap-16 mb-8">
              <div class="w-20 h-[1px] bg-cyber-yellow/30"></div>
              <span>SYSTEM v2.077</span>
              <div class="w-20 h-[1px] bg-cyber-yellow/30"></div>
            </div>
            <p>© {{ new Date().getFullYear() }} {{ resumeData.profile.name }} // ALL RIGHTS RESERVED</p>
            <p class="mt-8 text-cyber-yellow/50">
              DESIGNED WITH CYBERPUNK 2077 AESTHETICS // NIGHT CITY
            </p>
          </div>
        </div>
      </footer>
    </main>

    <!-- 回到顶部按钮 - CP2077风格 -->
    <Transition name="fade">
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-24 right-24 z-40 w-48 h-48 glass-cyber clip-cyber border border-cyber-yellow/50 flex items-center justify-center text-cyber-yellow hover:border-cyber-yellow hover:bg-cyber-yellow/10 transition-all duration-300 group"
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
import { ref, onMounted, onUnmounted } from 'vue'
import TerminalHero from './components/TerminalHero.vue'
import SkillsHUD from './components/SkillsHUD.vue'
import ExperienceTimeline from './components/ExperienceTimeline.vue'
import ProjectArsenal from './components/ProjectArsenal.vue'
import { resumeData } from './data/resumeData'

const sections = [
  { id: 'hero', label: 'PROFILE' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'experience', label: 'CAREER' },
  { id: 'projects', label: 'PROJECTS' }
]

const activeSection = ref('hero')
const showBackToTop = ref(false)

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 500

  // 更新当前活动的section
  for (const section of sections) {
    const element = document.getElementById(section.id)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        activeSection.value = section.id
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-border-flow {
  animation: border-flow 3s linear infinite;
}
</style>
