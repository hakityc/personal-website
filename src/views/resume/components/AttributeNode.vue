<template>
  <div class="cp-attribute-node">
    <!-- 输入 Handle（从中心 Hub 连接） -->
    <Handle
      type="target"
      :position="getHandlePosition()"
      class="invisible"
    />
    
    <!-- 属性卡片节点 -->
    <div
      class="attribute-card glass-cyber clip-cyber-sm border-2 p-20 transition-all duration-300 cursor-pointer group"
      :class="getAttributeCardClass()"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- 图标 -->
      <div 
        class="w-20 h-20 clip-cyber-sm mx-auto mb-12 flex items-center justify-center transition-colors"
        :class="getIconContainerClass()"
      >
        <span class="text-20 font-bold" :class="getIconTextClass()">{{ icon }}</span>
      </div>

      <!-- 名称 -->
      <div class="text-center mb-8">
        <div class="terminal-text text-12 text-cyber-yellow uppercase tracking-wider mb-2">
          {{ data.name }}
        </div>
        <div class="terminal-text text-10 text-cyber-text-dim mb-1">
          // {{ data.nameEn }}
        </div>
        <div class="terminal-text text-9 text-cyber-text-dim/60">
          {{ data.description }}
        </div>
      </div>

      <!-- 等级 -->
      <div class="text-center">
        <div class="text-24 font-bold text-cyber-yellow text-glow-yellow">
          {{ data.totalLevel }}
        </div>
      </div>

      <!-- 悬停提示 -->
      <Transition name="tooltip">
        <div
          v-if="hovered"
          class="absolute -top-80 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div class="glass-cyber clip-cyber-sm p-16 border border-cyber-yellow/50 min-w-[200px]">
            <div class="terminal-text text-10 text-cyber-yellow uppercase tracking-wider mb-8">
              技能统计
            </div>
            <div class="space-y-6 text-11 text-cyber-text">
              <div>技能数: <span class="text-cyber-yellow">{{ data.skillCount }}</span></div>
              <div>平均等级: <span class="text-cyber-yellow">{{ data.averageLevel }}%</span></div>
            </div>
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-6 overflow-hidden">
              <div class="w-8 h-8 bg-cyber-yellow/50 rotate-45 transform origin-top-left"></div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
    
    <!-- 输出 Handle（可选，用于后续扩展） -->
    <Handle
      type="source"
      :position="Position.Bottom"
      class="invisible"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import type { NodeProps } from '@vue-flow/core'

interface AttributeNodeData {
  id: string
  name: string
  nameEn: string
  totalLevel: number
  skillCount: number
  averageLevel: number
  description: string
  color: string
  icon: string
  onSelect?: (id: string) => void
  onHover?: (id: string | null) => void
}

interface Props extends NodeProps {
  data: AttributeNodeData
}

const props = defineProps<Props>()

const hovered = ref(false)

const handleClick = () => {
  if (props.data.onSelect) {
    props.data.onSelect(props.data.id)
  }
}

const handleMouseEnter = () => {
  hovered.value = true
  if (props.data.onHover) {
    props.data.onHover(props.data.id)
  }
}

const handleMouseLeave = () => {
  hovered.value = false
  if (props.data.onHover) {
    props.data.onHover(null)
  }
}

// 根据节点位置确定 Handle 位置（从中心指向节点）
const getHandlePosition = () => {
  // 简化处理：根据节点的相对位置返回 Handle 位置
  // 由于布局是从中心向外，可以根据位置计算
  return Position.Bottom // 默认，实际位置由布局决定
}

// 获取属性卡片样式类
const getAttributeCardClass = () => {
  const colorClass = getAttributeColorClass()
  return [
    colorClass,
    'hover:scale-110'
  ].join(' ')
}

// 获取属性颜色类
const getAttributeColorClass = (): string => {
  const colorMap: Record<string, string> = {
    'cyber-red': 'border-cyber-red/50 hover:border-cyber-red',
    'cyber-cyan': 'border-cyber-cyan/50 hover:border-cyber-cyan',
    'cyber-orange': 'border-[#ff9e00]/50 hover:border-[#ff9e00]',
    'cyber-purple': 'border-[#b026ff]/50 hover:border-[#b026ff]',
    'cyber-green': 'border-cyber-green/50 hover:border-cyber-green'
  }
  return colorMap[props.data.color] || 'border-cyber-yellow/50 hover:border-cyber-yellow'
}

// 获取图标容器样式
const getIconContainerClass = (): string => {
  const colorMap: Record<string, string> = {
    'cyber-red': 'bg-cyber-red/20 group-hover:bg-cyber-red/40',
    'cyber-cyan': 'bg-cyber-cyan/20 group-hover:bg-cyber-cyan/40',
    'cyber-orange': 'bg-[#ff9e00]/20 group-hover:bg-[#ff9e00]/40',
    'cyber-purple': 'bg-[#b026ff]/20 group-hover:bg-[#b026ff]/40',
    'cyber-green': 'bg-cyber-green/20 group-hover:bg-cyber-green/40'
  }
  return colorMap[props.data.color] || 'bg-cyber-yellow/20 group-hover:bg-cyber-yellow/40'
}

// 获取图标文字样式
const getIconTextClass = (): string => {
  const colorMap: Record<string, string> = {
    'cyber-red': 'text-cyber-red',
    'cyber-cyan': 'text-cyber-cyan',
    'cyber-orange': 'text-[#ff9e00]',
    'cyber-purple': 'text-[#b026ff]',
    'cyber-green': 'text-cyber-green'
  }
  return colorMap[props.data.color] || 'text-cyber-yellow'
}

// 图标 prop（从 data 中获取）
const icon = computed(() => props.data.icon)
</script>

<style scoped>
.cp-attribute-node {
  position: relative;
}

.attribute-card {
  width: 140px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.2s ease-out;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateY(10px) translateX(-50%);
}

.invisible {
  opacity: 0;
  pointer-events: none;
}
</style>

