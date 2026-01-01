<template>
  <g>
    <!-- 底层：深灰色轨道（背景管道） -->
    <path
      :d="orthogonalPath"
      stroke="#3a1a1a"
      stroke-width="4"
      fill="none"
      :opacity="trackOpacity"
      class="cp-circuit-track"
    />
    
    <!-- 顶层：发光信号路径（仅解锁状态） -->
    <path
      v-if="!isLocked"
      :d="orthogonalPath"
      :stroke="signalColor"
      stroke-width="3"
      fill="none"
      :stroke-dasharray="dashArray"
      :stroke-dashoffset="dashOffset"
      class="cp-circuit-signal"
      :style="{ filter: 'drop-shadow(0 0 3px ' + signalColor + ')' }"
    />
    
    <!-- 锁定状态：虚线轨道 -->
    <path
      v-if="isLocked"
      :d="orthogonalPath"
      stroke="#3a1a1a"
      stroke-width="4"
      fill="none"
      stroke-dasharray="6 4"
      opacity="0.3"
      class="cp-circuit-track-locked"
    />
  </g>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import type { EdgeProps } from '@vue-flow/core'

interface Props extends EdgeProps {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition?: string
  targetPosition?: string
  data?: {
    sourceStatus?: string
    targetStatus?: string
    categoryColor?: string
  }
}

const props = defineProps<Props>()

// 计算严格正交路径（L 形，90度直角，无曲线）
const orthogonalPath = computed(() => {
  const { sourceX, sourceY, targetX, targetY } = props
  
  // 计算中间转折点（严格的中点）
  const midX = (sourceX + targetX) / 2
  const midY = (sourceY + targetY) / 2
  
  // 创建 L 形路径（电路板风格，严格正交）
  // 判断主要方向：水平距离 vs 垂直距离
  if (Math.abs(targetX - sourceX) > Math.abs(targetY - sourceY)) {
    // 水平距离更大：先水平，后垂直
    return `M ${sourceX} ${sourceY} L ${midX} ${sourceY} L ${midX} ${targetY} L ${targetX} ${targetY}`
  } else {
    // 垂直距离更大：先垂直，后水平
    return `M ${sourceX} ${sourceY} L ${sourceX} ${midY} L ${targetX} ${midY} L ${targetX} ${targetY}`
  }
})

// 判断是否锁定
const isLocked = computed(() => {
  return props.data?.targetStatus === 'locked'
})

// 信号颜色（顶层发光路径）
const signalColor = computed(() => {
  return props.data?.categoryColor || '#ff003c' // CP2077 默认红色
})

// 轨道透明度
const trackOpacity = computed(() => {
  return isLocked.value ? 0.3 : 0.6
})

// 动画：stroke-dasharray 配置
const dashArray = '20 80' // 20px 实线，80px 空白
const dashOffset = ref(0)

// 动画循环：模拟数据包沿线路移动
let animationFrame: number | null = null

const animate = () => {
  if (isLocked.value) return
  
  // 增加偏移量，创建向前移动的效果
  dashOffset.value += 0.5
  // 当偏移量超过 dashArray 总长度时重置（20 + 80 = 100）
  if (dashOffset.value >= 100) {
    dashOffset.value = 0
  }
  
  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  if (!isLocked.value) {
    animate()
  }
})

onUnmounted(() => {
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<style scoped>
/* CP2077 电路轨道 - 底层管道 */
.cp-circuit-track {
  /* 深灰色轨道，作为背景管道 */
}

/* CP2077 电路信号 - 顶层发光路径 */
.cp-circuit-signal {
  /* 动画信号，使用 stroke-dasharray 模拟数据包移动 */
  transition: stroke 0.3s ease;
}

/* 锁定状态的轨道 */
.cp-circuit-track-locked {
  /* 锁定状态使用虚线样式 */
}
</style>
