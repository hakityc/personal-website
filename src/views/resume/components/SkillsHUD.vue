<template>
  <section class="py-80 px-20 relative overflow-hidden">
    <!-- 背景 -->
    <div class="absolute inset-0 bg-gradient-to-b from-cyber-bg-alt via-cyber-bg to-cyber-bg-alt"></div>

    <!-- 简化的水平装饰线 -->
    <div class="absolute top-40 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-yellow/15 to-transparent"></div>
    <div class="absolute bottom-40 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-yellow/15 to-transparent"></div>

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
            SKILLS_MATRIX.db
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
          // TECHNICAL PROFICIENCY ANALYSIS
        </p>
      </div>

      <!-- 技能分类 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-24">
        <div v-for="category in skills" :key="category.id" class="skill-category">
          <CyberCard :title="category.name" :subtitle="category.nameEn">
            <div class="space-y-20">
              <div
                v-for="skill in category.skills"
                :key="skill.name"
                class="skill-item group relative"
                @mouseenter="activeTooltip = skill.name"
                @mouseleave="activeTooltip = null"
              >
                <!-- 技能名称和等级 -->
                <div class="flex items-center justify-between mb-8">
                  <div class="flex items-center gap-8">
                    <div class="w-6 h-6 bg-cyber-yellow clip-cyber-sm group-hover:animate-cyber-pulse"></div>
                    <span class="terminal-text text-14 text-cyber-text group-hover:text-cyber-yellow transition-colors uppercase tracking-wider">
                      {{ skill.name }}
                    </span>
                  </div>
                  <span class="terminal-text text-12 text-cyber-yellow font-bold">{{ skill.level }}%</span>
                </div>

                <!-- 进度条 - CP2077风格（简化版） -->
                <div class="relative h-6 bg-cyber-bg overflow-hidden border border-cyber-yellow/20">
                  <!-- 进度填充 -->
                  <div
                    class="absolute inset-y-0 left-0 bg-gradient-to-r from-cyber-yellow to-cyber-red transition-[width] duration-300"
                    :style="{ width: `${skill.level}%` }"
                  ></div>
                </div>

                <!-- 悬浮提示 - CP2077 HUD风格 -->
                <Transition name="tooltip">
                  <div
                    v-if="activeTooltip === skill.name && skill.description"
                    class="absolute left-0 right-0 -top-70 z-50"
                  >
                    <div class="glass-cyber clip-cyber-sm p-12 border border-cyber-yellow/50">
                      <div class="flex items-center gap-8 mb-6">
                        <div class="w-8 h-8 bg-cyber-yellow clip-cyber-sm animate-cyber-pulse"></div>
                        <span class="terminal-text text-10 text-cyber-yellow uppercase tracking-wider">
                          SYSTEM.NOTIFY
                        </span>
                      </div>
                      <p class="terminal-text text-12 text-cyber-text">{{ skill.description }}</p>
                      <!-- 底部箭头 -->
                      <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-6 overflow-hidden">
                        <div class="w-8 h-8 bg-cyber-yellow/50 rotate-45 transform origin-top-left"></div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </CyberCard>
        </div>
      </div>

      <!-- 底部数据指示器 - CP2077 HUD风格 -->
      <div class="mt-60 flex justify-center">
        <div class="glass-cyber clip-cyber px-40 py-20 border border-cyber-yellow/30">
          <div class="flex items-center gap-40">
            <div class="text-center">
              <div class="text-32 font-bold text-cyber-yellow terminal-text text-glow-yellow">
                {{ totalSkills }}
              </div>
              <div class="text-10 text-cyber-text-dim terminal-text mt-4 uppercase tracking-wider">
                TOTAL_SKILLS
              </div>
            </div>
            <div class="w-[2px] h-40 bg-gradient-to-b from-transparent via-cyber-yellow to-transparent"></div>
            <div class="text-center">
              <div class="text-32 font-bold text-cyber-red terminal-text text-glow-red">
                {{ averageLevel.toFixed(0) }}%
              </div>
              <div class="text-10 text-cyber-text-dim terminal-text mt-4 uppercase tracking-wider">
                AVG_LEVEL
              </div>
            </div>
            <div class="w-[2px] h-40 bg-gradient-to-b from-transparent via-cyber-yellow to-transparent"></div>
            <div class="text-center">
              <div class="flex items-center gap-8">
                <div class="w-10 h-10 bg-cyber-green clip-cyber-sm animate-cyber-pulse"></div>
                <span class="text-32 font-bold text-cyber-green terminal-text text-glow-green">OK</span>
              </div>
              <div class="text-10 text-cyber-text-dim terminal-text mt-4 uppercase tracking-wider">
                SYS_STATUS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { resumeData } from '../data/resumeData'
import CyberCard from './CyberCard.vue'

const skills = resumeData.skills
const activeTooltip = ref<string | null>(null)

const totalSkills = computed(() => {
  return skills.reduce((acc, cat) => acc + cat.skills.length, 0)
})

const averageLevel = computed(() => {
  const allSkills = skills.flatMap((cat) => cat.skills)
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
