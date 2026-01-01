<template>
  <div class="cp-skill-node-wrapper">
    <!-- 输入 Handle（顶部，隐藏） -->
    <Handle
      type="target"
      :position="Position.Top"
      class="invisible"
    />
    
    <!-- CP2077 Perk 图标节点 -->
    <div
      class="cp-perk-node clip-cp-perk cursor-pointer group transition-all duration-300 relative"
      :class="getPerkNodeClass()"
      @mouseenter="handleHover"
      @mouseleave="hovered = false"
    >
      <!-- 锁定状态：中心锁定图标 -->
      <div
        v-if="data.status === 'locked'"
        class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>

      <!-- 技能图标（锁定状态下低透明度） -->
      <div
        class="w-full h-full flex items-center justify-center p-10 transition-opacity duration-300"
        :class="getIconContainerClass()"
      >
        <component 
          :is="getSkillIcon(data.skill.name)" 
          class="w-14 h-14"
          :class="getIconColorClass()"
        />
      </div>

      <!-- 悬停 Tooltip -->
      <Transition name="cp-perk-tooltip">
        <div
          v-if="hovered"
          class="absolute -bottom-140 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div class="glass-cyber clip-cyber-sm p-12 border border-cyber-yellow/50 min-w-[200px]">
            <div class="cp-pixel-text text-cyber-yellow mb-8">
              {{ data.skill.name }}
            </div>
            <p class="text-11 text-cyber-text leading-relaxed mb-8">
              {{ data.skill.description }}
            </p>
            <div class="flex items-center justify-between text-10 text-cyber-text-dim">
              <span>熟练度: <span class="text-cyber-yellow">{{ data.level }}%</span></span>
              <span class="cp-pixel-text">{{ getStatusLabel() }}</span>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- 节点下方的等级文本 -->
    <div class="mt-8 text-center">
      <div class="cp-pixel-text text-cyber-text-dim">
        LEVEL {{ Math.ceil(data.level / 33) }}/3
      </div>
    </div>
    
    <!-- 输出 Handle（底部，隐藏） -->
    <Handle
      type="source"
      :position="Position.Bottom"
      class="invisible"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import type { NodeProps } from '@vue-flow/core'
import type { SkillNode } from '@/models/skills'
import { useSound } from '@/composables/useSound'

// 图标导入
import IconFileCode from '~icons/lucide/file-code'
import IconServer from '~icons/lucide/server'
import IconCpu from '~icons/lucide/cpu'
import IconCode from '~icons/lucide/code'
import IconPalette from '~icons/lucide/palette'
import IconPackage from '~icons/lucide/package'
import IconGitBranch from '~icons/lucide/git-branch'
import IconSettings from '~icons/lucide/settings'
import IconZap from '~icons/lucide/zap'
import IconDatabase from '~icons/lucide/database'
import IconNetwork from '~icons/lucide/network'
import IconBox from '~icons/lucide/box'
import IconWrench from '~icons/lucide/wrench'
import IconLayers from '~icons/lucide/layers'
import IconComponent from '~icons/lucide/component'

interface SkillCardData {
  skill: SkillNode
  status: string
  level: number
}

interface Props extends NodeProps {
  data: SkillCardData
}

const props = defineProps<Props>()
const hovered = ref(false)
const { playChirp } = useSound()

const handleHover = () => {
  hovered.value = true
  playChirp()
}

// 获取技能图标组件
const getSkillIcon = (name: string) => {
  const iconMap: Record<string, any> = {
    'Vue 3': IconZap,
    'TypeScript': IconFileCode,
    'JavaScript': IconCode,
    'React': IconZap,
    'Tailwind CSS': IconPalette,
    'Ant Design Vue': IconComponent,
    'Element Plus': IconLayers,
    'AntV X6': IconBox,
    'Vite': IconZap,
    'Webpack': IconPackage,
    'Git': IconGitBranch,
    'CI/CD': IconSettings,
    'Docker': IconBox,
    'Node.js': IconServer,
    'NestJS': IconServer,
    'Express': IconServer,
    'SQL': IconDatabase,
    'HTTP': IconNetwork,
    'default': IconCpu
  }
  return iconMap[name] || iconMap['default']
}

// 获取 Perk 节点状态类
const getPerkNodeClass = (): string => {
  const baseSize = 'w-20 h-20' // CP2077 Perk 图标标准尺寸：80px x 80px
  
  switch (props.data.status) {
    case 'locked':
      return `${baseSize} cp-perk-node-locked`
    case 'unlocked':
      return `${baseSize} cp-perk-node-unlocked`
    case 'mastered':
      return `${baseSize} cp-perk-node-mastered`
    default:
      return baseSize
  }
}

// 图标容器类
const getIconContainerClass = (): string => {
  if (props.data.status === 'locked') {
    return 'opacity-30'
  }
  return ''
}

// 图标颜色类
const getIconColorClass = (): string => {
  switch (props.data.status) {
    case 'mastered':
      // MASTERED: 图标为黑色（反转色，因为背景是黄色）
      return 'text-black'
    case 'unlocked':
      // AVAILABLE: 图标可见，使用默认颜色或轻微红色调
      return 'text-white'
    case 'locked':
      // LOCKED: 低透明度
      return 'text-white/30'
    default:
      return 'text-white'
  }
}

const getStatusLabel = (): string => {
  switch (props.data.status) {
    case 'mastered':
      return '已掌握'
    case 'unlocked':
      return '学习中'
    case 'locked':
      return '计划中'
    default:
      return '未知'
  }
}
</script>

<style scoped>
.cp-skill-node-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cp-perk-node {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Tooltip 过渡动画 */
.cp-perk-tooltip-enter-active,
.cp-perk-tooltip-leave-active {
  transition: all 0.2s ease-out;
}

.cp-perk-tooltip-enter-from,
.cp-perk-tooltip-leave-to {
  opacity: 0;
  transform: translateY(10px) translateX(-50%);
}

.invisible {
  opacity: 0;
  pointer-events: none;
}
</style>
