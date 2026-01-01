<template>
  <section class="py-80 px-20 relative overflow-hidden">
    <!-- 背景 -->
    <div class="absolute inset-0 bg-gradient-to-b from-cyber-bg-alt via-cyber-bg to-cyber-bg-alt"></div>
    <div class="absolute inset-0 noise-overlay"></div>

    <!-- HUD 装饰元素 - 六边形 -->
    <div class="absolute top-40 left-40 w-[200px] h-[200px] opacity-10">
      <svg
        viewBox="0 0 100 100"
        class="w-full h-full"
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          fill="none"
          stroke="#fcee0a"
          stroke-width="1"
        />
        <polygon
          points="50,15 85,32.5 85,67.5 50,85 15,67.5 15,32.5"
          fill="none"
          stroke="#fcee0a"
          stroke-width="0.5"
        />
      </svg>
    </div>
    <div class="absolute bottom-40 right-40 w-[150px] h-[150px] opacity-10">
      <svg
        viewBox="0 0 100 100"
        class="w-full h-full"
      >
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          fill="none"
          stroke="#ff003c"
          stroke-width="1"
        />
      </svg>
    </div>

    <!-- 水平装饰线 -->
    <div
      class="absolute top-40 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-yellow/20 to-transparent"
    ></div>
    <div
      class="absolute bottom-40 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-yellow/20 to-transparent"
    ></div>

    <div class="relative z-10 max-w-[1200px] mx-auto">
      <!-- 标题 -->
      <div class="text-center mb-60">
        <div class="inline-flex items-center gap-16 mb-16">
          <div class="flex items-center gap-4">
            <div class="w-20 h-[2px] bg-cyber-yellow"></div>
            <div class="w-8 h-[2px] bg-cyber-red"></div>
            <div class="w-4 h-[2px] bg-cyber-yellow/50"></div>
          </div>
          <span class="terminal-text text-12 text-cyber-yellow tracking-[0.4em] uppercase">
            技能矩阵.db
          </span>
          <div class="flex items-center gap-4">
            <div class="w-4 h-[2px] bg-cyber-yellow/50"></div>
            <div class="w-8 h-[2px] bg-cyber-red"></div>
            <div class="w-20 h-[2px] bg-cyber-yellow"></div>
          </div>
        </div>
        <h2 class="text-36 font-bold text-cyber-yellow terminal-text uppercase tracking-wider text-glow-yellow">
          技术能力矩阵
        </h2>
        <p class="text-14 text-cyber-text-dim mt-12 terminal-text tracking-wider">
          // 技术能力分析
        </p>
      </div>

      <!-- 技能分类 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-24">
        <div
          v-for="category in skills"
          :key="category.id"
          class="skill-category"
          style="overflow: visible;"
        >
          <CyberCard
            :title="category.name"
            :subtitle="category.nameEn"
          >
            <div class="space-y-20">
              <div
                v-for="skill in category.skills"
                :key="skill.name"
                class="skill-item group relative"
                @mouseenter="handleSkillHover(skill.name, $event)"
                @mouseleave="activeTooltip = null; tooltipPosition = null"
              >
                <!-- 技能名称和等级 -->
                <div class="flex items-center justify-between mb-8">
                  <div class="flex items-center gap-8">
                    <div class="w-6 h-6 bg-cyber-yellow clip-cyber-sm group-hover:animate-cyber-pulse"></div>
                    <span
                      class="terminal-text text-14 text-cyber-text group-hover:text-cyber-yellow transition-colors uppercase tracking-wider"
                    >
                      {{ skill.name }}
                    </span>
                  </div>
                  <span class="terminal-text text-12 text-cyber-yellow font-bold">{{ skill.level }}%</span>
                </div>

                <!-- 进度条 - CP2077风格 -->
                <div class="relative h-8 bg-cyber-bg clip-cyber-sm overflow-hidden border border-cyber-yellow/20">
                  <!-- 进度填充 -->
                  <div
                    class="absolute inset-y-0 left-0 transition-all duration-500"
                    :style="{ width: `${skill.level}%` }"
                  >
                    <!-- 渐变填充 -->
                    <div class="absolute inset-0 bg-gradient-to-r from-cyber-yellow via-cyber-yellow to-cyber-red">
                    </div>
                    <!-- 条纹效果 -->
                    <div
                      class="absolute inset-0 opacity-30"
                      style="background: repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 8px);"
                    ></div>
                  </div>
                  <!-- 刻度线 -->
                  <div class="absolute inset-0 flex justify-between px-1">
                    <div
                      v-for="i in 10"
                      :key="i"
                      class="w-[1px] h-full bg-cyber-bg/50"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CyberCard>
        </div>
      </div>

      <!-- 悬浮提示 - 使用Teleport脱离裁剪范围 -->
      <Teleport to="body">
        <Transition name="tooltip">
          <div
            v-if="activeTooltip && tooltipPosition"
            class="fixed z-[9999] pointer-events-none"
            :style="{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transform: 'translateX(-50%) translateY(-100%)',
              marginTop: '-12px'
            }"
          >
            <div class="glass-cyber clip-cyber-sm p-12 border border-cyber-yellow/50">
              <div class="flex items-center gap-8 mb-6">
                <div class="w-8 h-8 bg-cyber-yellow clip-cyber-sm animate-cyber-pulse"></div>
                <span class="terminal-text text-10 text-cyber-yellow uppercase tracking-wider">
                  分析结果
                </span>
              </div>
              <p class="terminal-text text-12 text-cyber-text">{{ getActiveSkillDescription() }}</p>
              <!-- 底部箭头 -->
              <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-6 overflow-hidden">
                <div class="w-8 h-8 bg-cyber-yellow/50 rotate-45 transform origin-top-left"></div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- 底部数据指示器 - CP2077 HUD风格 -->
      <div class="mt-60 flex justify-center">
        <div class="glass-cyber clip-cyber px-40 py-20 border border-cyber-yellow/30">
          <div class="flex items-center gap-40">
            <div class="text-center">
              <div class="text-32 font-bold text-cyber-yellow terminal-text text-glow-yellow">
                {{ totalSkills }}
              </div>
              <div class="text-10 text-cyber-text-dim terminal-text mt-4 uppercase tracking-wider">
                总技能数
              </div>
            </div>
            <div class="w-[2px] h-40 bg-gradient-to-b from-transparent via-cyber-yellow to-transparent"></div>
            <div class="text-center">
              <div class="text-32 font-bold text-cyber-red terminal-text text-glow-red">
                {{ averageLevel.toFixed(0) }}%
              </div>
              <div class="text-10 text-cyber-text-dim terminal-text mt-4 uppercase tracking-wider">
                平均等级
              </div>
            </div>
            <div class="w-[2px] h-40 bg-gradient-to-b from-transparent via-cyber-yellow to-transparent"></div>
            <div class="text-center">
              <div class="flex items-center gap-8">
                <div class="w-10 h-10 bg-cyber-green clip-cyber-sm animate-cyber-pulse"></div>
                <span class="text-32 font-bold text-cyber-green terminal-text text-glow-green">OK</span>
              </div>
              <div class="text-10 text-cyber-text-dim terminal-text mt-4 uppercase tracking-wider">
                系统状态
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
import { Teleport } from 'vue'
import { resumeData } from '../data/resumeData'
import CyberCard from './CyberCard.vue'

// 使用 shallowRef 优化大数据对象，减少深度响应式开销
const skills = shallowRef(resumeData.skills)
const activeTooltip = ref<string | null>(null)
const tooltipPosition = ref<{ x: number; y: number } | null>(null)

// 处理技能悬停
const handleSkillHover = (skillName: string, event: MouseEvent) => {
  activeTooltip.value = skillName
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  tooltipPosition.value = {
    x: rect.left + rect.width / 2,
    y: rect.top
  }
}

// 获取当前激活技能的描述
const getActiveSkillDescription = () => {
  if (!activeTooltip.value) return ''
  for (const category of skills.value) {
    const skill = category.skills.find(s => s.name === activeTooltip.value)
    if (skill) return skill.description || ''
  }
  return ''
}

// 使用 computed 缓存计算结果
const totalSkills = computed(() => {
  return skills.value.reduce((acc, cat) => acc + cat.skills.length, 0)
})

const averageLevel = computed(() => {
  const allSkills = skills.value.flatMap((cat) => cat.skills)
  if (allSkills.length === 0) return 0
  return allSkills.reduce((acc, skill) => acc + skill.level, 0) / allSkills.length
})
</script>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.15s ease-out;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>
