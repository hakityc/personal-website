<template>
  <div class="relative w-full h-full flex items-center justify-center">
    <div
      class="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none transform scale-150 perspective-1000 rotate-x-12 opacity-30"
    ></div>
    <div class="relative w-[800px] h-[600px] max-w-full max-h-full flex items-center justify-center">
      <!-- 核心状态 -->
      <div
        class="absolute z-20 w-100 h-100 rounded-full bg-cp-bg-dark border-4 border-cp-dim shadow-[0_0_50px_rgba(0,0,0,1)] flex items-center justify-center group cursor-default"
      >
        <div
          class="absolute inset-0 border-2 border-dashed border-cp-dim rounded-full animate-[spin_10s_linear_infinite] opacity-50"
        ></div>
        <div
          class="absolute inset-2 border border-cp-red rounded-full opacity-20 group-hover:opacity-50 transition-opacity"
        ></div>
        <div class="text-center z-10">
          <div class="text-[9px] text-cp-dim font-bold tracking-widest mb-1">技能同步率</div>
          <div class="text-5xl font-cyber font-black text-cp-blue text-neon tracking-tighter">{{ totalMastery }}%</div>
          <div class="text-[9px] text-cp-red font-bold mt-2 animate-pulse">系统待命</div>
        </div>
      </div>

      <!-- 连线 -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
        <g
          v-for="(cat, index) in categories"
          :key="index"
        >
          <line
            x1="50%"
            y1="50%"
            :x2="getCoord(index).x + '%'"
            :y2="getCoord(index).y + '%'"
            stroke="black"
            stroke-width="12"
          />
          <line
            x1="50%"
            y1="50%"
            :x2="getCoord(index).x + '%'"
            :y2="getCoord(index).y + '%'"
            stroke="#2a2a2a"
            stroke-width="6"
          />
          <line
            x1="50%"
            y1="50%"
            :x2="getCoord(index).x + '%'"
            :y2="getCoord(index).y + '%'"
            :stroke="cat.color"
            stroke-width="1"
            opacity="0.5"
          />
        </g>
      </svg>

      <!-- 分类节点 -->
      <CategoryCard
        v-for="(cat, index) in categories"
        :key="cat.id"
        :category="cat"
        :index="index"
        :position="getCoord(index)"
        :stats="getCategoryStats(cat)"
        @click="$emit('select-category', cat)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, CategoryStats } from './types'
import CategoryCard from './CategoryCard.vue'

const props = defineProps<{
  categories: Category[]
  totalMastery: number
  getCategoryStats: (cat: Category) => CategoryStats
}>()

defineEmits<{
  'select-category': [category: Category]
}>()

const getCoord = (index: number) => {
  const count = props.categories.length
  const angle = (index * (360 / count) - 90) * (Math.PI / 180)
  return { x: 50 + 38 * Math.cos(angle), y: 50 + 38 * Math.sin(angle) }
}
</script>

<style scoped>
.text-neon {
  text-shadow: 0 0 8px currentColor;
}
</style>
