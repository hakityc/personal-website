<template>
  <Transition name="hub-transition" mode="out-in">
    <!-- Hub View -->
    <section
      v-if="!selectedAttribute"
      key="hub"
      class="py-80 px-20 relative overflow-hidden min-h-screen cp-perk-bg-full"
    >
      <div class="relative z-10 max-w-[1400px] mx-auto">
        <!-- 标题 -->
        <div class="text-center mb-60">
          <div class="inline-flex items-center gap-16 mb-16">
            <div class="flex items-center gap-4">
              <div class="w-20 h-[2px] bg-cyber-yellow"></div>
              <div class="w-8 h-[2px] bg-cyber-red"></div>
              <div class="w-4 h-[2px] bg-cyber-yellow/50"></div>
            </div>
            <span class="terminal-text text-12 text-cyber-yellow tracking-[0.4em] uppercase">
              技能矩阵.db
            </span>
            <div class="flex items-center gap-4">
              <div class="w-4 h-[2px] bg-cyber-yellow/50"></div>
              <div class="w-8 h-[2px] bg-cyber-red"></div>
              <div class="w-20 h-[2px] bg-cyber-yellow"></div>
            </div>
          </div>
          <h2 class="text-36 font-bold text-cyber-yellow terminal-text uppercase tracking-wider text-glow-yellow">
            属性面板
          </h2>
          <p class="text-14 text-cyber-text-dim mt-12 terminal-text tracking-wider">
            // ATTRIBUTE HUB - 选择分类查看技能树
          </p>
        </div>

        <!-- 统计信息显示 -->
        <div class="absolute top-20 left-20 glass-cyber clip-cyber-sm px-20 py-12 border border-cyber-yellow/30 z-20">
          <div class="flex flex-col gap-12">
            <div class="flex items-center gap-10">
              <div class="w-8 h-8 bg-cyber-cyan clip-cyber-sm"></div>
              <span class="terminal-text text-12 text-cyber-text-dim">
                <span class="text-cyber-cyan font-bold">{{ totalSkills }}</span> 总技能数
              </span>
            </div>
            <div class="flex items-center gap-10">
              <div class="w-8 h-8 bg-cyber-yellow clip-cyber-sm"></div>
              <span class="terminal-text text-12 text-cyber-text-dim">
                <span class="text-cyber-yellow font-bold">{{ averageLevel.toFixed(0) }}%</span> 平均等级
              </span>
            </div>
          </div>
        </div>

        <!-- Vue Flow 属性 Hub 容器 -->
        <div class="relative h-[700px] border border-cyber-yellow/20 clip-cyber-sm">
          <VueFlow
            :nodes="flowNodes"
            :edges="flowEdges"
            :node-types="nodeTypes"
            :edge-types="edgeTypes"
            :default-edge-options="{ type: 'circuit-edge' }"
            :fit-view-on-init="true"
            :min-zoom="0.5"
            :max-zoom="1.5"
            class="vue-flow-container cp-hub-flow"
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

        <!-- 底部提示 -->
        <div class="text-center mt-60">
          <div class="inline-flex items-center gap-12 glass-cyber clip-cyber-sm px-24 py-12 border border-cyber-yellow/30">
            <div class="w-6 h-6 bg-cyber-yellow clip-cyber-sm animate-cyber-pulse"></div>
            <span class="terminal-text text-12 text-cyber-text-dim uppercase tracking-wider">
              点击属性节点查看技能树
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Tree View -->
    <SkillsTree
      v-else
      key="tree"
      :attribute="getSelectedAttribute()"
      @back="resetView"
    />
  </Transition>
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
import type { AttributeCategory } from '@/models/skills'
import type { Node, Edge } from '@vue-flow/core'
import { resumeData } from '../data/resumeData'
import SkillsTree from './SkillsTree.vue'
import AttributeHubNode from './AttributeHubNode.vue'
import AttributeNode from './AttributeNode.vue'
import CircuitEdge from './CircuitEdge.vue'

// 技能分类映射
const skillCategoryMapping: Record<string, string> = {
  'Vue 3': 'application-core',
  'TypeScript': 'application-core',
  'JavaScript': 'application-core',
  'React': 'application-core',
  'Tailwind CSS': 'user-interface',
  'Ant Design Vue': 'user-interface',
  'Element Plus': 'user-interface',
  'AntV X6': 'user-interface',
  'Vite': 'engineering-infra',
  'Webpack': 'engineering-infra',
  'Git': 'engineering-infra',
  'CI/CD': 'engineering-infra',
  'Docker': 'engineering-infra',
  'AI Agent': 'ai-intelligence',
  'LLM Integration': 'ai-intelligence',
  'Prompt Engineering': 'ai-intelligence',
  'Node.js': 'server-network',
  'NestJS': 'server-network',
  'Express': 'server-network',
  'SQL': 'server-network',
  'HTTP': 'server-network'
}

// 5个战略领域定义
const strategicDomains = [
  {
    id: 'application-core',
    name: '应用核心',
    nameEn: 'Application Core',
    color: 'cyber-red',
    icon: '⚡',
    description: '逻辑层 / CPU'
  },
  {
    id: 'user-interface',
    name: '用户界面',
    nameEn: 'User Interface',
    color: 'cyber-cyan',
    icon: '👁️',
    description: '展示层 / Optics'
  },
  {
    id: 'engineering-infra',
    name: '工程与基础',
    nameEn: 'Engineering & Infra',
    color: 'cyber-orange',
    icon: '⚙️',
    description: '构建层 / Mechanics'
  },
  {
    id: 'ai-intelligence',
    name: 'AI 与智能',
    nameEn: 'AI & Intelligence',
    color: 'cyber-purple',
    icon: '🧠',
    description: '扩展层 / Netrunner'
  },
  {
    id: 'server-network',
    name: '服务与网络',
    nameEn: 'Server & Network',
    color: 'cyber-green',
    icon: '📡',
    description: '连接层 / Protocol'
  }
]

// 转换数据格式 - 按5个战略领域分组
const attributes = computed<AttributeCategory[]>(() => {
  const allSkills = resumeData.skills.flatMap(category => 
    category.skills.map(skill => ({
      ...skill,
      categoryId: skillCategoryMapping[skill.name] || 'application-core'
    }))
  )
  
  return strategicDomains.map(domain => {
    const domainSkills = allSkills.filter(skill => skill.categoryId === domain.id)
    
    return {
      id: domain.id,
      name: domain.name,
      nameEn: domain.nameEn,
      totalLevel: domainSkills.reduce((sum, skill) => sum + skill.level, 0),
      skills: domainSkills.map(skill => ({
        id: skill.name,
        name: skill.name,
        level: skill.level,
        status: skill.level >= 80 ? 'mastered' : skill.level >= 50 ? 'unlocked' : 'locked',
        description: skill.description || ''
      }))
    }
  }).filter(attr => attr.skills.length > 0)
})

const selectedAttribute = ref<string | null>(null)
const hoveredAttributeId = ref<string | null>(null)

// 计算总技能数
const totalSkills = computed(() => {
  return attributes.value.reduce((sum, attr) => sum + attr.skills.length, 0)
})

// 计算平均等级
const averageLevel = computed(() => {
  const allSkills = attributes.value.flatMap(attr => attr.skills)
  if (allSkills.length === 0) return 0
  return allSkills.reduce((sum, skill) => sum + skill.level, 0) / allSkills.length
})

// 计算总等级
const totalLevel = computed(() => {
  return attributes.value.reduce((sum, attr) => sum + attr.totalLevel, 0)
})

// 获取平均等级（单个属性）
const getAverageLevel = (attr: AttributeCategory): number => {
  if (attr.skills.length === 0) return 0
  return Math.round(attr.skills.reduce((sum, skill) => sum + skill.level, 0) / attr.skills.length)
}

// 计算节点位置（中心节点在中心，其他节点围绕中心分布）
const calculateNodePositions = (): { hubNode: Node; attributeNodes: Node[] } => {
  const centerX = 400 // 中心 X 坐标
  const centerY = 350 // 中心 Y 坐标
  const radius = 280 // 半径
  
  // 中央 Hub 节点
  const hubNode: Node = {
    id: 'hub-center',
    type: 'attribute-hub',
    position: { x: centerX - 80, y: centerY - 80 }, // 160x160 节点，居中
    data: {
      totalLevel: totalLevel.value,
      onReset: () => resetView()
    }
  }
  
  // 属性节点（围绕中心分布）
  const attributeNodes: Node[] = attributes.value.map((attr, index) => {
    const angleStep = (2 * Math.PI) / attributes.value.length
    const startAngle = -Math.PI / 2 // 从顶部开始（-90度）
    const angle = startAngle + (index * angleStep)
    
    const x = centerX + radius * Math.cos(angle) - 70 // 140x140 节点，居中
    const y = centerY + radius * Math.sin(angle) - 70
    
    const domain = strategicDomains.find(d => d.id === attr.id)
    
    return {
      id: attr.id,
      type: 'attribute',
      position: { x, y },
      data: {
        id: attr.id,
        name: attr.name,
        nameEn: attr.nameEn,
        totalLevel: attr.totalLevel,
        skillCount: attr.skills.length,
        averageLevel: getAverageLevel(attr),
        description: domain?.description || '',
        color: domain?.color || 'cyber-yellow',
        icon: domain?.icon || '●',
        onSelect: (id: string) => selectAttribute(id),
        onHover: (id: string | null) => {
          hoveredAttributeId.value = id
        }
      }
    }
  })
  
  return { hubNode, attributeNodes }
}

// 构建边（从中心 Hub 到各个属性节点）
const buildEdges = (): Edge[] => {
  return attributes.value.map(attr => ({
    id: `hub-${attr.id}`,
    source: 'hub-center',
    target: attr.id,
    type: 'circuit-edge',
    animated: true,
    data: {
      categoryColor: '#fcee0a' // Hub 连接使用黄色
    }
  }))
}

// 计算节点和边（使用 computed 以便响应式更新）
const flowNodes = computed<Node[]>(() => {
  const { hubNode, attributeNodes } = calculateNodePositions()
  return [hubNode, ...attributeNodes]
})
const flowEdges = computed<Edge[]>(() => buildEdges())

// 注册自定义节点和边类型
const nodeTypes = {
  'attribute-hub': AttributeHubNode,
  'attribute': AttributeNode
}

const edgeTypes = {
  'circuit-edge': CircuitEdge
}

// Vue Flow 方法
const { fitView } = useVueFlow()

const onPaneReady = () => {
  setTimeout(() => {
    fitView({ padding: 0.3, duration: 400 })
  }, 100)
}

// 选择属性
const selectAttribute = (id: string) => {
  selectedAttribute.value = id
}

// 重置视图
const resetView = () => {
  selectedAttribute.value = null
}

// 获取选中的属性
const getSelectedAttribute = (): AttributeCategory | undefined => {
  return attributes.value.find(attr => attr.id === selectedAttribute.value)
}
</script>

<style scoped>
/* Vue Flow 容器样式 - CP2077 Hub */
.vue-flow-container.cp-hub-flow {
  background: transparent;
}

/* 覆盖 Vue Flow 默认样式 */
:deep(.vue-flow__node) {
  background: transparent;
}

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

/* Hub 转场动画 */
.hub-transition-enter-active,
.hub-transition-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
}

.hub-transition-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
  filter: blur(10px);
}

.hub-transition-leave-to {
  opacity: 0;
  transform: scale(1.2) translateY(-20px);
  filter: blur(10px);
}

.hub-transition-enter-to,
.hub-transition-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
  filter: blur(0);
}
</style>
