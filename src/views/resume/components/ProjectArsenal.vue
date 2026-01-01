<template>
  <section class="py-80 px-20 relative overflow-hidden">
    <!-- 背景 -->
    <div class="absolute inset-0 bg-gradient-to-b from-cyber-bg via-cyber-bg-alt to-cyber-bg"></div>
    <div class="absolute inset-0 noise-overlay"></div>

    <!-- 动态粒子背景 - CP2077风格 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="absolute w-1 h-1 bg-cyber-yellow/40"
        :style="{
          left: `${particle.left}%`,
          top: `${particle.top}%`,
          animationDelay: `${particle.delay}s`,
          animationDuration: `${particle.duration}s`
        }"
        :class="particle.animation"
      ></div>
    </div>

    <!-- 侧边装饰条 -->
    <div class="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-gradient-to-b from-transparent via-cyber-yellow/30 to-transparent"></div>
    <div class="absolute right-0 top-1/4 bottom-1/4 w-[3px] bg-gradient-to-b from-transparent via-cyber-red/30 to-transparent"></div>

    <div class="relative z-10 max-w-[1200px] mx-auto">
      <!-- 标题 -->
      <div class="text-center mb-60">
        <div class="inline-flex items-center gap-16 mb-16">
          <div class="flex items-center gap-4">
            <div class="w-4 h-4 bg-cyber-yellow clip-cyber-sm"></div>
            <div class="w-20 h-[2px] bg-cyber-yellow"></div>
          </div>
          <span class="terminal-text text-12 text-cyber-yellow tracking-[0.4em] uppercase">
            项目档案.db
          </span>
          <div class="flex items-center gap-4">
            <div class="w-20 h-[2px] bg-cyber-yellow"></div>
            <div class="w-4 h-4 bg-cyber-yellow clip-cyber-sm"></div>
          </div>
        </div>
        <h2 class="text-36 font-bold text-cyber-yellow terminal-text uppercase tracking-wider text-glow-yellow">
          项目档案库
        </h2>
        <p class="text-14 text-cyber-text-dim mt-12 terminal-text tracking-wider">
          // 精选项目数据库
        </p>
      </div>

      <!-- Tab 导航栏 - CP2077风格 -->
      <div class="mb-24">
        <div class="glass-cyber clip-cyber border border-cyber-yellow/30 overflow-hidden">
          <div class="overflow-x-auto project-tab-scrollbar">
            <div class="flex items-center gap-0 min-w-max">
              <button
                v-for="(project, index) in projects"
                :key="project.id"
                @click="activeProject = project.id"
                class="relative px-32 py-16 terminal-text text-14 uppercase tracking-wider transition-all duration-300 flex items-center gap-12 group"
                :class="activeProject === project.id 
                  ? 'text-cyber-yellow bg-cyber-yellow/10 border-b-2 border-cyber-yellow' 
                  : 'text-cyber-text-dim hover:text-cyber-yellow hover:bg-cyber-yellow/5'"
              >
                <!-- Tab 指示器 -->
                <div
                  class="w-6 h-6 clip-cyber-sm transition-all duration-300 flex-shrink-0"
                  :class="activeProject === project.id 
                    ? 'bg-cyber-yellow animate-cyber-pulse' 
                    : 'bg-cyber-yellow/30 group-hover:bg-cyber-yellow/60'"
                ></div>
                <!-- Tab 标签 -->
                <span class="whitespace-nowrap">{{ project.name }}</span>
                <!-- 激活状态装饰线 -->
                <div
                  v-if="activeProject === project.id"
                  class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-yellow to-transparent"
                ></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 项目内容展示区域 -->
      <Transition name="project-fade" mode="out-in">
        <div
          v-if="activeProject"
          :key="activeProject"
          class="glass-cyber clip-cyber border border-cyber-yellow/30 relative overflow-hidden"
          :class="{ 'animate-glitch-skew': glitchActive }"
          @mouseenter="glitchActive = true"
          @mouseleave="glitchActive = false"
        >
          <!-- 顶部芯片装饰 - CP2077风格 -->
          <div class="h-50 bg-cyber-bg relative border-b border-cyber-yellow/20 overflow-hidden">
            <!-- 电路线装饰 -->
            <svg class="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="25" x2="30%" y2="25" stroke="#fcee0a" stroke-width="1" />
              <line x1="30%" y1="25" x2="35%" y2="15" stroke="#fcee0a" stroke-width="1" />
              <line x1="35%" y1="15" x2="65%" y2="15" stroke="#fcee0a" stroke-width="1" />
              <line x1="65%" y1="15" x2="70%" y2="25" stroke="#ff003c" stroke-width="1" />
              <line x1="70%" y1="25" x2="100%" y2="25" stroke="#ff003c" stroke-width="1" />
              <rect x="29%" y="22" width="6" height="6" fill="#fcee0a" />
              <rect x="65%" y="22" width="6" height="6" fill="#ff003c" />
            </svg>
            <!-- 项目序号和标题 -->
            <div class="absolute left-20 top-1/2 -translate-y-1/2 flex items-center gap-12">
              <div class="w-10 h-10 bg-cyber-yellow clip-cyber-sm"></div>
              <div>
                <span class="terminal-text text-12 text-cyber-yellow uppercase tracking-wider">
                  项目_0{{ getProjectIndex() + 1 }}
                </span>
                <h3 class="terminal-text text-18 font-bold text-cyber-yellow uppercase tracking-wider mt-2">
                  {{ getActiveProject()?.name }}
                </h3>
              </div>
            </div>
            <!-- 状态指示器 -->
            <div class="absolute right-20 top-1/2 -translate-y-1/2 flex items-center gap-8">
              <div class="w-8 h-8 bg-cyber-green clip-cyber-sm animate-cyber-pulse"></div>
              <span class="terminal-text text-12 text-cyber-green uppercase tracking-wider">已加载</span>
            </div>
          </div>

          <!-- 主要内容区域 -->
          <div class="p-32">
            <!-- 项目基本信息 -->
            <div class="mb-24">
              <p class="terminal-text text-12 text-cyber-text-dim mb-16 tracking-wider">
                // {{ getActiveProject()?.nameEn }}
              </p>
              <!-- 公司和角色 -->
              <div class="flex items-center gap-16 mb-16 text-14 terminal-text">
                <span class="text-cyber-red uppercase">{{ getActiveProject()?.company }}</span>
                <div class="w-[2px] h-16 bg-cyber-yellow/30"></div>
                <span class="text-cyber-text-dim">{{ getActiveProject()?.role }}</span>
                <div class="w-[2px] h-16 bg-cyber-yellow/30 ml-auto"></div>
                <span class="text-cyber-text-dim">{{ getActiveProject()?.period }}</span>
              </div>
              <!-- 亮点标签 -->
              <div class="flex flex-wrap gap-8 mb-20">
                <span
                  v-for="highlight in getActiveProject()?.highlights"
                  :key="highlight.text"
                  class="px-12 py-6 clip-cyber-sm text-11 terminal-text font-bold uppercase tracking-wider transition-colors duration-300 whitespace-nowrap"
                  :class="getHighlightClass(highlight.type)"
                >
                  {{ highlight.text }}
                </span>
              </div>
              <!-- 项目描述 -->
              <p class="text-15 text-cyber-text/80 leading-relaxed break-words mb-24">
                {{ getActiveProject()?.description }}
              </p>
            </div>

            <!-- 分隔线 -->
            <div class="h-[1px] bg-gradient-to-r from-transparent via-cyber-yellow/30 to-transparent mb-24"></div>

            <!-- 详细内容 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <!-- 职责 -->
              <div>
                <div class="terminal-text text-12 text-cyber-yellow mb-12 tracking-[0.2em] uppercase flex items-center gap-8 mb-16">
                  <div class="w-8 h-8 bg-cyber-yellow clip-cyber-sm"></div>
                  <span>职责</span>
                </div>
                <ul class="space-y-10">
                  <li
                    v-for="(resp, i) in getActiveProject()?.responsibilities"
                    :key="i"
                    class="flex items-start gap-10 text-13 text-cyber-text/80 leading-relaxed"
                  >
                    <span class="text-cyber-red mt-2 text-10 flex-shrink-0">▸</span>
                    <span class="break-words flex-1">{{ resp }}</span>
                  </li>
                </ul>
              </div>

              <!-- 技术栈 -->
              <div>
                <div class="terminal-text text-12 text-cyber-yellow mb-12 tracking-[0.2em] uppercase flex items-center gap-8 mb-16">
                  <div class="w-8 h-8 bg-cyber-red clip-cyber-sm"></div>
                  <span>技术栈</span>
                </div>
                <div class="flex flex-wrap gap-8">
                  <span
                    v-for="tech in getActiveProject()?.technologies"
                    :key="tech"
                    class="px-10 py-6 bg-cyber-bg clip-cyber-sm text-11 terminal-text text-cyber-text-dim border border-cyber-yellow/20 uppercase whitespace-nowrap"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 底部状态栏 -->
          <div class="px-32 py-16 bg-cyber-bg/80 border-t border-cyber-yellow/20 flex items-center justify-between">
            <div class="flex items-center gap-10">
              <div class="w-6 h-6 bg-cyber-green clip-cyber-sm animate-cyber-pulse"></div>
              <span class="terminal-text text-11 text-cyber-text-dim uppercase">项目详情已加载</span>
            </div>
            <div class="terminal-text text-11 text-cyber-yellow/50 uppercase tracking-wider">
              PROJECT_{{ String(getProjectIndex() + 1).padStart(2, '0') }}_ACTIVE
            </div>
          </div>

          <!-- 故障效果层 -->
          <div
            v-if="glitchActive"
            class="absolute inset-0 pointer-events-none overflow-hidden"
          >
            <div class="glitch-slice glitch-slice-1"></div>
            <div class="glitch-slice glitch-slice-2"></div>
          </div>
        </div>
      </Transition>

      <!-- 底部装饰 - CP2077风格 -->
      <div class="mt-60">
        <div class="glass-cyber clip-cyber p-20 border border-cyber-yellow/20">
          <div class="flex items-center justify-center gap-32 terminal-text text-12 text-cyber-text-dim uppercase tracking-wider">
            <div class="flex items-center gap-8">
              <div class="w-8 h-8 bg-cyber-yellow clip-cyber-sm"></div>
              <span>已加载项目: <span class="text-cyber-yellow">{{ projects.length }}</span></span>
            </div>
            <div class="w-[2px] h-16 bg-cyber-yellow/30"></div>
            <div class="flex items-center gap-8">
              <div class="w-8 h-8 bg-cyber-green clip-cyber-sm animate-cyber-pulse"></div>
              <span>状态: <span class="text-cyber-green">活跃</span></span>
            </div>
            <div class="w-[2px] h-16 bg-cyber-yellow/30"></div>
            <div class="flex items-center gap-8">
              <div class="w-8 h-8 bg-cyber-cyan clip-cyber-sm"></div>
              <span>内存: <span class="text-cyber-cyan">已优化</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { resumeData } from '../data/resumeData'
import type { ProjectExperience } from '@/models/resume'

const projects = resumeData.projects
const activeProject = ref<string | null>(projects[0]?.id || null)
const glitchActive = ref(false)

// 获取当前激活的项目
const getActiveProject = (): ProjectExperience | undefined => {
  return projects.find(p => p.id === activeProject.value)
}

// 获取项目索引
const getProjectIndex = (): number => {
  return projects.findIndex(p => p.id === activeProject.value)
}

// 使用 computed 缓存粒子数据，避免每次渲染重新计算
const particles = computed(() => {
  const count = 15
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
    animation: i % 3 === 0 ? 'animate-float' : 'animate-cyber-pulse'
  }))
})

// 使用 computed 缓存样式类计算
const getHighlightClass = computed(() => {
  return (type: 'primary' | 'secondary' | 'accent') => {
    switch (type) {
      case 'primary':
        return 'cyber-tag'
      case 'secondary':
        return 'cyber-tag-red'
      case 'accent':
        return 'cyber-tag-cyan'
      default:
        return 'cyber-tag'
    }
  }
})
</script>

<style scoped>
.glitch-slice {
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #fcee0a, #ff003c, transparent);
  opacity: 0.6;
}

.glitch-slice-1 {
  top: 25%;
  animation: slice-move-1 0.25s ease-in-out;
}

.glitch-slice-2 {
  top: 65%;
  animation: slice-move-2 0.25s ease-in-out;
}

@keyframes slice-move-1 {
  0%, 100% { transform: translateX(0); opacity: 0; }
  50% { transform: translateX(10px); opacity: 0.8; }
}

@keyframes slice-move-2 {
  0%, 100% { transform: translateX(0); opacity: 0; }
  50% { transform: translateX(-10px); opacity: 0.8; }
}

/* Tab 切换动画 */
.project-fade-enter-active,
.project-fade-leave-active {
  transition: all 0.3s ease-out;
}

.project-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.project-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Tab 滚动条样式 - CP2077风格 */
.project-tab-scrollbar::-webkit-scrollbar {
  height: 6px;
}

.project-tab-scrollbar::-webkit-scrollbar-track {
  background: rgba(10, 10, 15, 0.5);
  border-top: 1px solid rgba(252, 238, 10, 0.2);
}

.project-tab-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #fcee0a 0%, #ff003c 100%);
  border: 1px solid rgba(252, 238, 10, 0.3);
  clip-path: polygon(
    0 0,
    calc(100% - 4px) 0,
    100% 4px,
    100% 100%,
    4px 100%,
    0 calc(100% - 4px)
  );
}

.project-tab-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(90deg, #ff003c 0%, #fcee0a 100%);
  box-shadow: 0 0 8px rgba(252, 238, 10, 0.6);
}

.project-tab-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #fcee0a rgba(10, 10, 15, 0.5);
}
</style>
