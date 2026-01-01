<template>
  <div class="cp-attribute-hub-node">
    <!-- 输入 Handle（可选，用于连接） -->
    <Handle
      type="target"
      :position="Position.Top"
      class="invisible"
    />
    
    <!-- 中央 Hub 节点 -->
    <div
      class="hub-node glass-cyber clip-cyber-sm border-2 border-cyber-yellow/50 p-24 cursor-pointer group transition-all duration-300 hover:border-cyber-yellow hover:scale-110"
      @click="handleClick"
    >
      <div class="text-center">
        <div class="w-16 h-16 bg-cyber-yellow/20 clip-cyber-sm mx-auto mb-12 group-hover:bg-cyber-yellow/40 transition-colors flex items-center justify-center">
          <span class="text-24 font-bold text-cyber-yellow">Σ</span>
        </div>
        <div class="terminal-text text-14 text-cyber-yellow uppercase tracking-wider mb-4">
          等级
        </div>
        <div class="text-32 font-bold text-cyber-yellow text-glow-yellow">
          {{ data.totalLevel }}
        </div>
      </div>
    </div>
    
    <!-- 输出 Handle（用于连接到属性节点） -->
    <Handle
      type="source"
      :position="Position.Top"
      class="invisible"
    />
    <Handle
      type="source"
      :position="Position.Right"
      class="invisible"
    />
    <Handle
      type="source"
      :position="Position.Bottom"
      class="invisible"
    />
    <Handle
      type="source"
      :position="Position.Left"
      class="invisible"
    />
  </div>
</template>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { NodeProps } from '@vue-flow/core'

interface HubNodeData {
  totalLevel: number
  onReset?: () => void
}

interface Props extends NodeProps {
  data: HubNodeData
}

const props = defineProps<Props>()

// Vue Flow 节点不支持 emit，需要通过 data 中的回调函数
const handleClick = () => {
  if (props.data.onReset) {
    props.data.onReset()
  }
}
</script>

<style scoped>
.cp-attribute-hub-node {
  position: relative;
}

.hub-node {
  width: 160px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.invisible {
  opacity: 0;
  pointer-events: none;
}
</style>

