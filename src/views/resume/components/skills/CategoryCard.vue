<template>
  <div
    class="absolute z-20 group cursor-pointer"
    :style="{ left: position.x + '%', top: position.y + '%', transform: 'translate(-50%, -50%)' }"
    @click="$emit('click', category)"
  >
    <div
      class="relative w-32 h-32 md:w-36 md:h-36 bg-cp-bg-panel transition-all duration-300 hover:scale-105 cyber-card"
    >
      <div
        class="absolute inset-0 flex items-center justify-center overflow-hidden cyber-card opacity-20 group-hover:opacity-40 transition-opacity"
      >
        <i
          :data-lucide="category.icon"
          class="w-20 h-20 stroke-1"
          :style="{ color: category.color }"
        ></i>
      </div>
      <div
        class="absolute inset-0 cyber-card border-2 transition-all duration-300"
        :style="{ borderColor: category.color, boxShadow: `0 0 10px ${category.color}20` }"
      ></div>
      <div
        class="absolute top-1 left-1 right-1 bottom-1 cyber-card-inner border border-white/10 flex flex-col justify-between p-2"
      >
        <div class="flex justify-between items-start">
          <div
            class="h-1 w-6 bg-current"
            :style="{ color: category.color }"
          ></div>
          <div class="text-[8px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
            <span>MOD_0{{ index + 1 }}</span>
          </div>
        </div>
        <div class="flex-1 flex flex-col items-center justify-center relative">
          <div class="flex items-baseline">
            <div
              class="text-4xl md:text-5xl font-cyber font-black tracking-tighter leading-none z-10 text-white group-hover:text-neon transition-all"
              :style="{ textShadow: `0 0 20px ${category.color}` }"
            >
              {{ stats.percent }}
            </div>
            <div class="text-sm font-bold ml-1 text-gray-400 group-hover:text-white transition-colors">%</div>
          </div>
          <div class="mt-1 flex items-center gap-1">
            <div
              class="text-[10px] md:text-xs font-bold tracking-[0.1em] uppercase text-white bg-black/50 px-1 py-0.5 backdrop-blur-sm z-10 border-l-2"
              :style="{ borderColor: category.color }"
            >
              {{ category.name }}
            </div>
          </div>
        </div>
        <div class="flex items-end gap-1 h-1">
          <div class="flex-1 bg-gray-800 h-full overflow-hidden">
            <div
              class="h-full transition-all duration-500"
              :style="{ backgroundColor: category.color, width: stats.percent + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, CategoryStats, Position } from './types'

defineProps<{
  category: Category
  index: number
  position: Position
  stats: CategoryStats
}>()

defineEmits<{
  click: [category: Category]
}>()
</script>

<style scoped>
.cyber-card {
  clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
}

.cyber-card-inner {
  clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
}

.text-neon {
  text-shadow: 0 0 8px currentColor;
}
</style>
