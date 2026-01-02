<template>
  <div class="w-full h-full flex flex-col md:flex-row p-4 gap-6">
    <!-- 左侧：动态信息 -->
    <SkillsSidebar
      :category="category"
      :subcategories="subcategories"
      :selected-skill="selectedSkill"
      :stats="stats"
      @back="$emit('back')"
      @select-skill="$emit('select-skill', $event)"
      @hover-skill="$emit('hover-skill', $event)"
      @hover-leave="$emit('hover-leave')"
    />

    <!-- 技能图区域 -->
    <div class="relative flex-1 bg-cp-bg-panel/50 border border-white/5 cyber-card overflow-hidden select-none">
      <!-- 动态列背景 -->
      <div class="absolute inset-x-0 top-0 h-16 flex border-b border-white/10 z-0">
        <div
          v-for="(sub, idx) in subcategories"
          :key="sub.name"
          class="h-full flex flex-col justify-center items-center relative transition-all duration-500"
          :class="{ 'bg-white/[0.02]': sub.layout_col === 0, 'bg-black/20': sub.layout_col !== 0 }"
          :style="{ width: (100 / subcategories.length) + '%' }"
        >
          <div
            v-if="idx < subcategories.length - 1"
            class="absolute right-0 inset-y-0 border-r border-dashed border-white/5"
          ></div>
          <div
            class="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase opacity-70 px-2 text-center"
            :class="{ 'text-white text-neon opacity-90': sub.layout_col === 0, 'text-gray-500': sub.layout_col !== 0 }"
            :style="{ color: sub.layout_col === 0 ? category.color : '' }"
          >
            {{ sub.name }}
          </div>
        </div>
      </div>

      <!-- 垂直分隔线 -->
      <div class="absolute inset-0 flex pointer-events-none select-none z-0">
        <div
          v-for="(sub, idx) in subcategories"
          :key="'bg-line-' + sub.name"
          class="h-full relative border-white/5"
          :class="{ 'border-r border-dashed': idx < subcategories.length - 1 }"
          :style="{ width: (100 / subcategories.length) + '%' }"
        ></div>
      </div>

      <div class="absolute inset-0 opacity-10 bg-grid-pattern bg-[length:30px_30px]"></div>

      <div class="absolute inset-0 p-8 pt-20">
        <svg class="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <filter id="glow">
              <feGaussianBlur
                stdDeviation="2.5"
                result="coloredBlur"
              />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g
            v-for="edge in edges"
            :key="edge.id"
          >
            <path
              :d="getCircuitPath(edge.source, edge.target)"
              fill="none"
              stroke="#1a1a1a"
              stroke-width="10"
              stroke-linecap="square"
            />
            <path
              v-if="isEdgeActive(edge)"
              :d="getCircuitPath(edge.source, edge.target)"
              fill="none"
              :stroke="category.color"
              stroke-width="3"
              class="flow-line"
              filter="url(#glow)"
            />
            <path
              v-else
              :d="getCircuitPath(edge.source, edge.target)"
              fill="none"
              stroke="#333"
              stroke-width="2"
            />
          </g>
        </svg>

        <SkillNode
          v-for="node in nodes"
          :key="node.id"
          :node="node"
          :category-color="category.color"
          :is-hovered="hoverSkill?.id === node.id"
          @click="$emit('select-skill', $event)"
          @mouseenter="$emit('hover-skill', $event)"
          @mouseleave="$emit('hover-leave')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, Subcategory, Skill, Edge, CategoryStats } from './types'
import SkillsSidebar from './SkillsSidebar.vue'
import SkillNode from './SkillNode.vue'

const props = defineProps<{
  category: Category
  subcategories: Subcategory[]
  nodes: (Skill & { x: number; y: number })[]
  edges: Edge[]
  selectedSkill: Skill | null
  hoverSkill: Skill | null
  stats: CategoryStats
}>()

defineEmits<{
  back: []
  'select-skill': [skill: Skill]
  'hover-skill': [skill: Skill]
  'hover-leave': []
}>()

const getCircuitPath = (sourceId: string, targetId: string) => {
  const s = props.nodes.find(n => n.id === sourceId)
  const t = props.nodes.find(n => n.id === targetId)
  if (!s || !t) return ''
  const midY = (s.y + t.y) / 2
  return `M ${s.x}% ${s.y}% L ${s.x}% ${midY}% L ${t.x}% ${midY}% L ${t.x}% ${t.y}%`
}

const isEdgeActive = (edge: Edge) => {
  const s = props.nodes.find(n => n.id === edge.source)
  return s && s.level === 'mastered'
}
</script>

<style scoped>
.cyber-card {
  clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
}

.text-neon {
  text-shadow: 0 0 8px currentColor;
}

.flow-line {
  stroke-dasharray: 20;
  animation: flow 1s linear infinite;
}

@keyframes flow {
  to {
    stroke-dashoffset: -40;
  }
}
</style>
