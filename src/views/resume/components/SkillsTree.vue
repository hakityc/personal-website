<template>
  <section class="py-80 px-20 relative overflow-hidden min-h-screen cp-perk-bg-full">
    <!-- CP2077 背景层已通过 cp-perk-bg-full 类应用 -->

    <div class="relative z-10 max-w-[1600px] mx-auto">
      <!-- 顶部导航栏 -->
      <div class="flex items-center justify-between mb-40">
        <!-- 返回按钮 -->
        <button
          @click="emit('back')"
          class="glass-cyber clip-cyber-sm px-20 py-12 border border-cyber-yellow/50 flex items-center gap-10 text-cyber-yellow hover:border-cyber-yellow hover:bg-cyber-yellow/10 transition-all duration-300 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="group-hover:translate-x-[-2px] transition-transform duration-300"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          <span class="terminal-text text-12 uppercase tracking-wider">返回</span>
          <div class="w-6 h-6 bg-cyber-yellow/30 clip-cyber-sm group-hover:bg-cyber-yellow group-hover:animate-cyber-pulse transition-colors"></div>
        </button>

        <!-- 分类标题 -->
        <div class="text-center">
          <h2 
            class="text-32 font-bold text-cyber-yellow terminal-text uppercase tracking-wider text-glow-yellow mb-4 glitch-text"
            :class="{ 'glitch-active': isGlitching }"
            :data-text="attribute.name"
            @mouseenter="triggerGlitch"
          >
            {{ glitchedTitle }}
          </h2>
          <p class="text-14 text-cyber-text-dim terminal-text tracking-wider">
            // {{ attribute.nameEn }} - 技能树
          </p>
        </div>

        <!-- 统计信息 -->
        <div class="glass-cyber clip-cyber-sm px-20 py-12 border border-cyber-yellow/30">
          <div class="flex items-center gap-16">
            <div class="text-center">
              <div class="text-20 font-bold text-cyber-yellow">{{ attribute.skills.length }}</div>
              <div class="text-10 text-cyber-text-dim terminal-text uppercase">技能数</div>
            </div>
            <div class="w-[1px] h-24 bg-cyber-yellow/30"></div>
            <div class="text-center">
              <div class="text-20 font-bold text-cyber-red">{{ getAverageLevel() }}%</div>
              <div class="text-10 text-cyber-text-dim terminal-text uppercase">平均</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vue Flow 技能树容器 - CP2077 风格 -->
      <div class="relative h-[800px] border border-cyber-yellow/20 clip-cyber-sm">
        <VueFlow
          :nodes="flowNodes"
          :edges="flowEdges"
          :node-types="nodeTypes"
          :edge-types="edgeTypes"
          :default-edge-options="{ type: 'circuit-edge' }"
          :fit-view-on-init="true"
          :min-zoom="0.2"
          :max-zoom="2"
          class="vue-flow-container cp-perk-flow"
          @pane-ready="onPaneReady"
        >
          <!-- 控制按钮 -->
          <Controls />
          
          <!-- 缩放控制 -->
          <MiniMap
            node-color="#fcee0a"
            mask-color="rgba(15, 3, 3, 0.8)"
          />
        </VueFlow>
      </div>

      <!-- 底部状态栏 -->
      <div class="mt-60 flex justify-center">
        <div class="glass-cyber clip-cyber px-40 py-20 border border-cyber-yellow/30">
          <div class="flex items-center gap-40">
            <div class="text-center">
              <div class="text-24 font-bold text-cyber-yellow terminal-text">
                {{ getMasteredCount() }}
              </div>
              <div class="text-10 text-cyber-text-dim terminal-text mt-4 uppercase tracking-wider">
                已掌握
              </div>
            </div>
            <div class="w-[2px] h-40 bg-gradient-to-b from-transparent via-cyber-yellow to-transparent"></div>
            <div class="text-center">
              <div class="text-24 font-bold text-cyber-cyan terminal-text">
                {{ getUnlockedCount() }}
              </div>
              <div class="text-10 text-cyber-text-dim terminal-text mt-4 uppercase tracking-wider">
                学习中
              </div>
            </div>
            <div class="w-[2px] h-40 bg-gradient-to-b from-transparent via-cyber-yellow to-transparent"></div>
            <div class="text-center">
              <div class="text-24 font-bold text-cyber-text-dim terminal-text">
                {{ getLockedCount() }}
              </div>
              <div class="text-10 text-cyber-text-dim terminal-text mt-4 uppercase tracking-wider">
                计划中
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'
import '@vue-flow/minimap/dist/style.css'
import type { AttributeCategory, SkillNode } from '@/models/skills'
import { useLayout } from '@/composables/useLayout'
import { useSound } from '@/composables/useSound'
import SkillCardNode from './SkillCardNode.vue'
import CircuitEdge from './CircuitEdge.vue'

interface Props {
  attribute: AttributeCategory
}

const props = defineProps<Props>()

const emit = defineEmits<{
  back: []
  selectSkill: [skill: SkillNode]
}>()

const { fitView } = useVueFlow()
// CP2077 风格布局：Bottom-to-Top 方向，增加节点间距以适应粗边
const layout = useLayout({ 
  direction: 'BT', // Bottom-to-Top（根节点在底部，如游戏中的技能树）
  nodeWidth: 100,  // 节点宽度（80px 图标 + 边距）
  nodeHeight: 120, // 节点高度（80px 图标 + 下方文本约 40px）
  ranksep: 250,    // 层级间距（增加以适应 4px 粗边）
  nodesep: 150     // 节点间距（增加以适应 4px 粗边和切角图标）
})
const { playBassClick } = useSound()

// 故障效果
const isGlitching = ref(false)
const glitchedTitle = ref('')

// 技能层级定义
const getSkillTier = (skillName: string): number => {
  const tierMap: Record<string, number> = {
    'JavaScript': 0,
    'TypeScript': 0,
    'Vue 3': 1,
    'React': 1,
    'Node.js': 1,
    'Vite': 2,
    'Webpack': 2,
    'Tailwind CSS': 2,
    'Ant Design Vue': 2,
    'Element Plus': 2,
    'AntV X6': 2,
    'Git': 3,
    'CI/CD': 3,
    'Docker': 3
  }
  return tierMap[skillName] ?? 1
}

// 构建图数据并计算布局
const { nodes: initialNodes, edges: initialEdges } = layout.buildGraphFromSkills(
  props.attribute.skills,
  getSkillTier
)

const { nodes: layoutedNodes, edges: layoutedEdges } = layout.calculateLayout(
  initialNodes,
  initialEdges
)

// 添加领域颜色到边数据
const flowEdges = computed(() => {
  return layoutedEdges.map(edge => ({
    ...edge,
    data: {
      ...edge.data,
      categoryColor: getDomainColor()
    }
  }))
})

// 流节点
const flowNodes = computed(() => layoutedNodes)

// 注册自定义节点和边类型
const nodeTypes = {
  'skill-card': SkillCardNode
}

const edgeTypes = {
  'circuit-edge': CircuitEdge
}

// 获取领域颜色
const getDomainColor = (): string => {
  const colorMap: Record<string, string> = {
    'application-core': '#ff003c',
    'user-interface': '#00d4ff',
    'engineering-infra': '#ff9e00',
    'ai-intelligence': '#b026ff',
    'server-network': '#05ffa1'
  }
  return colorMap[props.attribute.id] || '#fcee0a'
}

// 初始化标题
const initTitle = () => {
  glitchedTitle.value = props.attribute.name
}

// 触发故障效果
const triggerGlitch = () => {
  if (isGlitching.value) return
  
  isGlitching.value = true
  const originalText = props.attribute.name
  const glitchChars = ['█', '▓', '▒', '░', '▄', '▀', '■', '□']
  
  let iterations = 0
  const glitchInterval = setInterval(() => {
    glitchedTitle.value = originalText
      .split('')
      .map((char, i) => {
        if (Math.random() > 0.7) {
          return glitchChars[Math.floor(Math.random() * glitchChars.length)]
        }
        return char
      })
      .join('')
    
    iterations++
    if (iterations > 5) {
      clearInterval(glitchInterval)
      glitchedTitle.value = originalText
      isGlitching.value = false
    }
  }, 50)
}

// 面板就绪时自动适应视图
const onPaneReady = () => {
  setTimeout(() => {
    fitView({ padding: 0.2, duration: 400 })
  }, 100)
}

// 获取平均等级
const getAverageLevel = (): number => {
  if (props.attribute.skills.length === 0) return 0
  return Math.round(
    props.attribute.skills.reduce((sum, skill) => sum + skill.level, 0) / props.attribute.skills.length
  )
}

// 统计数量
const getMasteredCount = (): number => {
  return props.attribute.skills.filter(s => s.status === 'mastered').length
}

const getUnlockedCount = (): number => {
  return props.attribute.skills.filter(s => s.status === 'unlocked').length
}

const getLockedCount = (): number => {
  return props.attribute.skills.filter(s => s.status === 'locked').length
}

onMounted(() => {
  initTitle()
  playBassClick()
})
</script>

<style scoped>
/* Vue Flow 容器样式 - CP2077 Perk Screen */
.vue-flow-container.cp-perk-flow {
  background: transparent;
}

/* 覆盖 Vue Flow 默认样式 */
:deep(.vue-flow__node) {
  background: transparent;
}

/* 移除默认边样式（使用自定义 CircuitEdge） */
:deep(.vue-flow__edge-path) {
  display: none; /* 隐藏默认路径，使用自定义 CircuitEdge 组件 */
}

:deep(.vue-flow__controls) {
  background: rgba(15, 3, 3, 0.9);
  border: 1px solid rgba(255, 0, 60, 0.3);
  backdrop-filter: blur(8px);
}

:deep(.vue-flow__controls-button) {
  background: transparent;
  border: 1px solid rgba(255, 0, 60, 0.3);
  color: var(--cp-neon-red);
  transition: all 0.2s ease;
}

:deep(.vue-flow__controls-button:hover) {
  background: rgba(255, 0, 60, 0.1);
  border-color: var(--cp-neon-red);
  box-shadow: 0 0 8px rgba(255, 0, 60, 0.4);
}

:deep(.vue-flow__minimap) {
  background: rgba(15, 3, 3, 0.9);
  border: 1px solid rgba(255, 0, 60, 0.3);
  backdrop-filter: blur(8px);
}

/* 故障文字效果 */
.glitch-text {
  position: relative;
}

.glitch-text.glitch-active::before,
.glitch-text.glitch-active::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text.glitch-active::before {
  left: 2px;
  text-shadow: -2px 0 #ff003c;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 0.3s infinite linear alternate-reverse;
}

.glitch-text.glitch-active::after {
  left: -2px;
  text-shadow: -2px 0 #00d4ff, 2px 2px #ff003c;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim2 0.3s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% { clip: rect(31px, 9999px, 94px, 0); transform: skew(0.5deg); }
  5% { clip: rect(12px, 9999px, 77px, 0); transform: skew(0.8deg); }
  10% { clip: rect(88px, 9999px, 15px, 0); transform: skew(0.3deg); }
  15% { clip: rect(54px, 9999px, 66px, 0); transform: skew(0.6deg); }
  20% { clip: rect(23px, 9999px, 89px, 0); transform: skew(0.4deg); }
  25% { clip: rect(76px, 9999px, 34px, 0); transform: skew(0.2deg); }
  30% { clip: rect(45px, 9999px, 78px, 0); transform: skew(0.7deg); }
  35% { clip: rect(67px, 9999px, 12px, 0); transform: skew(0.1deg); }
  40% { clip: rect(19px, 9999px, 56px, 0); transform: skew(0.5deg); }
  45% { clip: rect(82px, 9999px, 41px, 0); transform: skew(0.3deg); }
  50% { clip: rect(38px, 9999px, 95px, 0); transform: skew(0.6deg); }
  55% { clip: rect(61px, 9999px, 28px, 0); transform: skew(0.4deg); }
  60% { clip: rect(14px, 9999px, 73px, 0); transform: skew(0.2deg); }
  65% { clip: rect(87px, 9999px, 49px, 0); transform: skew(0.7deg); }
  70% { clip: rect(52px, 9999px, 16px, 0); transform: skew(0.1deg); }
  75% { clip: rect(29px, 9999px, 84px, 0); transform: skew(0.5deg); }
  80% { clip: rect(71px, 9999px, 37px, 0); transform: skew(0.3deg); }
  85% { clip: rect(43px, 9999px, 91px, 0); transform: skew(0.6deg); }
  90% { clip: rect(96px, 9999px, 25px, 0); transform: skew(0.4deg); }
  95% { clip: rect(58px, 9999px, 63px, 0); transform: skew(0.2deg); }
  100% { clip: rect(35px, 9999px, 79px, 0); transform: skew(0.7deg); }
}

@keyframes glitch-anim2 {
  0% { clip: rect(65px, 9999px, 100px, 0); transform: skew(0.3deg); }
  5% { clip: rect(14px, 9999px, 33px, 0); transform: skew(0.6deg); }
  10% { clip: rect(79px, 9999px, 8px, 0); transform: skew(0.2deg); }
  15% { clip: rect(42px, 9999px, 71px, 0); transform: skew(0.5deg); }
  20% { clip: rect(91px, 9999px, 26px, 0); transform: skew(0.4deg); }
  25% { clip: rect(18px, 9999px, 84px, 0); transform: skew(0.7deg); }
  30% { clip: rect(57px, 9999px, 49px, 0); transform: skew(0.1deg); }
  35% { clip: rect(23px, 9999px, 96px, 0); transform: skew(0.3deg); }
  40% { clip: rect(68px, 9999px, 15px, 0); transform: skew(0.6deg); }
  45% { clip: rect(37px, 9999px, 82px, 0); transform: skew(0.2deg); }
  50% { clip: rect(89px, 9999px, 54px, 0); transform: skew(0.5deg); }
  55% { clip: rect(12px, 9999px, 31px, 0); transform: skew(0.4deg); }
  60% { clip: rect(76px, 9999px, 67px, 0); transform: skew(0.7deg); }
  65% { clip: rect(29px, 9999px, 11px, 0); transform: skew(0.1deg); }
  70% { clip: rect(61px, 9999px, 88px, 0); transform: skew(0.3deg); }
  75% { clip: rect(45px, 9999px, 19px, 0); transform: skew(0.6deg); }
  80% { clip: rect(93px, 9999px, 72px, 0); transform: skew(0.2deg); }
  85% { clip: rect(16px, 9999px, 58px, 0); transform: skew(0.5deg); }
  90% { clip: rect(74px, 9999px, 39px, 0); transform: skew(0.4deg); }
  95% { clip: rect(27px, 9999px, 95px, 0); transform: skew(0.7deg); }
  100% { clip: rect(51px, 9999px, 22px, 0); transform: skew(0.1deg); }
}
</style>
