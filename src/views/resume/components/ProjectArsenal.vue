<template>
  <section class="py-80 px-20 relative overflow-hidden">
    <!-- 背景 -->
    <div class="absolute inset-0 bg-gradient-to-b from-cyber-bg via-cyber-bg-alt to-cyber-bg"></div>
    <div class="absolute inset-0 noise-overlay"></div>

    <!-- 动态粒子背景 - CP2077风格 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        v-for="i in 15"
        :key="i"
        class="absolute w-1 h-1 bg-cyber-yellow/40"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 2}s`
        }"
        :class="i % 3 === 0 ? 'animate-float' : 'animate-cyber-pulse'"
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
            PROJECT_ARCHIVE.db
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
          // FEATURED PROJECTS DATABASE
        </p>
      </div>

      <!-- 项目卡片网格 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-24">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="project-card group"
          @mouseenter="activeProject = project.id"
          @mouseleave="activeProject = null"
        >
          <!-- CP2077 数据芯片卡片 -->
          <div
            class="relative h-full glass-cyber clip-cyber overflow-hidden transition-all duration-300 group-hover:border-glow-yellow"
            :class="{ 'animate-glitch-skew': activeProject === project.id }"
          >
            <!-- 顶部芯片装饰 - CP2077风格 -->
            <div class="h-40 bg-cyber-bg relative border-b border-cyber-yellow/20 overflow-hidden">
              <!-- 电路线装饰 -->
              <svg class="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="20" x2="30%" y2="20" stroke="#fcee0a" stroke-width="1" />
                <line x1="30%" y1="20" x2="35%" y2="10" stroke="#fcee0a" stroke-width="1" />
                <line x1="35%" y1="10" x2="65%" y2="10" stroke="#fcee0a" stroke-width="1" />
                <line x1="65%" y1="10" x2="70%" y2="20" stroke="#ff003c" stroke-width="1" />
                <line x1="70%" y1="20" x2="100%" y2="20" stroke="#ff003c" stroke-width="1" />
                <rect x="29%" y="17" width="6" height="6" fill="#fcee0a" />
                <rect x="65%" y="17" width="6" height="6" fill="#ff003c" />
              </svg>
              <!-- 项目序号 -->
              <div class="absolute left-16 top-1/2 -translate-y-1/2 flex items-center gap-8">
                <div class="w-8 h-8 bg-cyber-yellow clip-cyber-sm"></div>
                <span class="terminal-text text-12 text-cyber-yellow uppercase tracking-wider">
                  PROJ_0{{ index + 1 }}
                </span>
              </div>
              <!-- 状态指示器 -->
              <div class="absolute right-16 top-1/2 -translate-y-1/2 flex items-center gap-6">
                <div class="w-6 h-6 bg-cyber-green clip-cyber-sm animate-cyber-pulse"></div>
                <span class="terminal-text text-10 text-cyber-text-dim">LOADED</span>
              </div>
            </div>

            <!-- 卡片内容 -->
            <div class="p-24">
              <!-- 项目标题 -->
              <div class="mb-20">
                <h3
                  class="terminal-text text-20 font-bold text-cyber-yellow uppercase tracking-wider group-hover:text-glow-yellow transition-all"
                  :class="{ 'glitch-effect': activeProject === project.id }"
                  :data-text="project.name"
                >
                  {{ project.name }}
                </h3>
                <p class="terminal-text text-10 text-cyber-text-dim mt-6 tracking-wider">
                  // {{ project.nameEn }}
                </p>
              </div>

              <!-- 公司和角色 -->
              <div class="flex items-center gap-12 mb-16 text-12 terminal-text">
                <span class="text-cyber-red uppercase">{{ project.company }}</span>
                <div class="w-[2px] h-12 bg-cyber-yellow/30"></div>
                <span class="text-cyber-text-dim">{{ project.role }}</span>
              </div>

              <!-- 亮点标签 - CP2077风格 -->
              <div class="flex flex-wrap gap-8 mb-20">
                <span
                  v-for="highlight in project.highlights"
                  :key="highlight.text"
                  class="px-10 py-5 clip-cyber-sm text-10 terminal-text font-bold uppercase tracking-wider transition-all duration-300"
                  :class="getHighlightClass(highlight.type)"
                >
                  {{ highlight.text }}
                </span>
              </div>

              <!-- 项目描述 -->
              <p class="text-14 text-cyber-text/80 mb-20 leading-relaxed">
                {{ project.description }}
              </p>

              <!-- 展开详情 -->
              <Transition name="expand">
                <div v-if="activeProject === project.id" class="space-y-16 mt-20 pt-20 border-t border-cyber-yellow/20">
                  <!-- 职责 -->
                  <div>
                    <div class="terminal-text text-10 text-cyber-yellow mb-10 tracking-[0.2em] uppercase flex items-center gap-8">
                      <div class="w-6 h-6 bg-cyber-yellow clip-cyber-sm"></div>
                      RESPONSIBILITIES
                    </div>
                    <ul class="space-y-8">
                      <li
                        v-for="(resp, i) in project.responsibilities.slice(0, 3)"
                        :key="i"
                        class="flex items-start gap-10 text-12 text-cyber-text/70"
                      >
                        <span class="text-cyber-red mt-3 text-8">▸</span>
                        <span>{{ resp }}</span>
                      </li>
                    </ul>
                  </div>

                  <!-- 技术栈 -->
                  <div>
                    <div class="terminal-text text-10 text-cyber-yellow mb-10 tracking-[0.2em] uppercase flex items-center gap-8">
                      <div class="w-6 h-6 bg-cyber-red clip-cyber-sm"></div>
                      TECH_STACK
                    </div>
                    <div class="flex flex-wrap gap-6">
                      <span
                        v-for="tech in project.technologies"
                        :key="tech"
                        class="px-8 py-4 bg-cyber-bg clip-cyber-sm text-10 terminal-text text-cyber-text-dim border border-cyber-yellow/20 uppercase"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- 底部状态栏 -->
            <div class="px-24 py-14 bg-cyber-bg/80 border-t border-cyber-yellow/20 flex items-center justify-between">
              <div class="flex items-center gap-10">
                <div class="w-6 h-6 bg-cyber-green clip-cyber-sm animate-cyber-pulse"></div>
                <span class="terminal-text text-10 text-cyber-text-dim uppercase">{{ project.period }}</span>
              </div>
              <div class="terminal-text text-10 text-cyber-yellow/50 group-hover:text-cyber-yellow transition-colors uppercase tracking-wider">
                [ HOVER FOR DETAILS ]
              </div>
            </div>

            <!-- 故障效果层 -->
            <div
              v-if="activeProject === project.id"
              class="absolute inset-0 pointer-events-none overflow-hidden"
            >
              <div class="glitch-slice glitch-slice-1"></div>
              <div class="glitch-slice glitch-slice-2"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部装饰 - CP2077风格 -->
      <div class="mt-60">
        <div class="glass-cyber clip-cyber p-20 border border-cyber-yellow/20">
          <div class="flex items-center justify-center gap-32 terminal-text text-12 text-cyber-text-dim uppercase tracking-wider">
            <div class="flex items-center gap-8">
              <div class="w-8 h-8 bg-cyber-yellow clip-cyber-sm"></div>
              <span>PROJECTS_LOADED: <span class="text-cyber-yellow">{{ projects.length }}</span></span>
            </div>
            <div class="w-[2px] h-16 bg-cyber-yellow/30"></div>
            <div class="flex items-center gap-8">
              <div class="w-8 h-8 bg-cyber-green clip-cyber-sm animate-cyber-pulse"></div>
              <span>STATUS: <span class="text-cyber-green">ACTIVE</span></span>
            </div>
            <div class="w-[2px] h-16 bg-cyber-yellow/30"></div>
            <div class="flex items-center gap-8">
              <div class="w-8 h-8 bg-cyber-cyan clip-cyber-sm"></div>
              <span>MEMORY: <span class="text-cyber-cyan">OPTIMIZED</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { resumeData } from '../data/resumeData'

const projects = resumeData.projects
const activeProject = ref<string | null>(null)

const getHighlightClass = (type: 'primary' | 'secondary' | 'accent') => {
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

.expand-enter-active,
.expand-leave-active {
  transition: all 0.25s ease-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 350px;
}
</style>
