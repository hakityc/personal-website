<template>
  <div class="w-full md:w-110 flex flex-col gap-4 animate-fade-in-left z-20 h-full">
    <button
      @click="$emit('back')"
      class="shrink-0 group flex items-center gap-2 text-sm font-bold tracking-wider hover:text-white transition-colors uppercase w-fit px-4 py-2 border border-transparent hover:border-cp-red hover:bg-cp-red/10 cyber-card"
    >
      <i
        data-lucide="chevron-left"
        class="w-4 h-4 text-cp-red group-hover:text-white"
      ></i>
      <span class="text-cp-red group-hover:text-white">返回中枢</span>
    </button>

    <div
      class="shrink-0 p-6 bg-cp-bg-panel border-l-4 cyber-card relative overflow-hidden transition-all duration-300"
      :style="{ borderColor: category.color }"
    >
      <div
        class="absolute -right-4 -top-4 text-9xl font-black opacity-5 pointer-events-none select-none"
        :style="{ color: category.color }"
      >
        {{ stats.percent }}%
      </div>
      <h2 class="text-2xl font-cyber font-bold uppercase mb-2 text-white italic tracking-tighter">
        {{ category.name }}
      </h2>
      <p class="text-xs text-gray-400 leading-relaxed font-mono pt-1">{{ category.desc }}</p>
    </div>

    <!-- 动态列表 -->
    <div class="flex-1 flex flex-col min-h-0 bg-black/40 border border-cp-dim cyber-card overflow-hidden">
      <div class="px-4 py-2 bg-cp-dim/30 border-b border-cp-dim flex justify-between items-center">
        <span class="text-[10px] font-bold tracking-[0.2em] text-gray-400">// 系统协议清单</span>
        <div class="flex gap-1">
          <div class="w-2 h-2 rounded-full bg-cp-dim"></div>
          <div class="w-2 h-2 rounded-full bg-cp-dim"></div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <div
          v-for="sub in subcategories"
          :key="sub.name"
          class="space-y-2"
        >
          <div
            class="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-1 mb-2"
          >
            <i
              data-lucide="folder-open"
              class="w-3 h-3"
            ></i>
            {{ sub.name }}
          </div>
          <div class="grid grid-cols-1 gap-1">
            <div
              v-for="skill in sub.items"
              :key="skill.id"
              class="flex items-center justify-between group/item p-1 hover:bg-white/5 rounded cursor-default transition-colors"
              :class="{ 'bg-white/10': selectedSkill?.id === skill.id }"
              @mouseenter="$emit('hover-skill', skill)"
              @mouseleave="$emit('hover-leave')"
              @click="$emit('select-skill', skill)"
            >
              <div class="flex items-center gap-2 overflow-hidden">
                <div
                  class="w-1.5 h-1.5 rounded-sm shrink-0"
                  :class="{
                    'bg-cp-yellow shadow-[0_0_5px_#fcee0a]': skill.mastered,
                    'bg-current animate-pulse': skill.level === 'available',
                    'bg-gray-700': skill.level === 'locked'
                  }"
                  :style="{ color: skill.level === 'available' ? category.color : '' }"
                ></div>
                <span
                  class="text-xs font-mono truncate transition-colors"
                  :class="{ 'text-cp-yellow font-bold': skill.mastered, 'text-white': skill.level === 'available', 'text-gray-600': skill.level === 'locked' }"
                >
                  {{ skill.name }}
                </span>
              </div>
              <span
                class="text-[9px] font-mono tracking-tighter uppercase shrink-0"
                :class="{ 'text-cp-yellow': skill.mastered, 'text-gray-500': !skill.mastered }"
              >
                {{ skill.mastered ? '[运行]' : (skill.level === 'available' ? '[待机]' : '[加密]') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, Subcategory, Skill, CategoryStats } from './types'

defineProps<{
  category: Category
  subcategories: Subcategory[]
  selectedSkill: Skill | null
  stats: CategoryStats
}>()

defineEmits<{
  back: []
  'select-skill': [skill: Skill]
  'hover-skill': [skill: Skill]
  'hover-leave': []
}>()
</script>

<style scoped>
.cyber-card {
  clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
}
</style>
