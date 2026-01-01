/**
 * 布局计算 Composable - 使用 Dagre 自动布局
 */
import dagre from 'dagre'
import type { Node, Edge } from '@vue-flow/core'
import type { SkillNode } from '@/models/skills'

interface LayoutOptions {
  direction?: 'TB' | 'LR' | 'BT' | 'RL' // Top-Bottom, Left-Right, etc.
  nodeWidth?: number
  nodeHeight?: number
  ranksep?: number // 层级间距
  nodesep?: number // 节点间距
}

/**
 * 使用 Dagre 计算节点位置
 */
export const useLayout = (options: LayoutOptions = {}) => {
  const {
    direction = 'LR', // 默认从左到右
    nodeWidth = 150,
    nodeHeight = 200,
    ranksep = 200, // 层级间距
    nodesep = 100 // 节点间距
  } = options

  /**
   * 计算布局
   */
  const calculateLayout = (
    nodes: Node[],
    edges: Edge[]
  ): { nodes: Node[]; edges: Edge[] } => {
    // 创建 Dagre 图
    const g = new dagre.graphlib.Graph()
    g.setDefaultEdgeLabel(() => ({}))
    g.setGraph({
      rankdir: direction,
      nodesep,
      ranksep,
      align: 'UL' // 对齐方式
    })

    // 添加节点到图
    nodes.forEach((node) => {
      g.setNode(node.id, {
        width: nodeWidth,
        height: nodeHeight
      })
    })

    // 添加边到图
    edges.forEach((edge) => {
      g.setEdge(edge.source, edge.target)
    })

    // 计算布局
    dagre.layout(g)

    // 更新节点位置
    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = g.node(node.id)
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2
        }
      }
    })

    return {
      nodes: layoutedNodes,
      edges
    }
  }

  /**
   * 从技能数据构建节点和边
   */
  const buildGraphFromSkills = (
    skills: SkillNode[],
    getSkillTier: (name: string) => number
  ): { nodes: Node[]; edges: Edge[] } => {
    // 构建节点
    const nodes: Node[] = skills.map((skill) => ({
      id: skill.id,
      type: 'skill-card',
      position: { x: 0, y: 0 }, // 将由 Dagre 计算
      data: {
        skill,
        status: skill.status,
        level: skill.level
      }
    }))

    // 构建边（基于层级关系）
    const edges: Edge[] = []
    const tierGroups: Record<number, SkillNode[]> = {}

    // 按层级分组
    skills.forEach((skill) => {
      const tier = getSkillTier(skill.name)
      if (!tierGroups[tier]) {
        tierGroups[tier] = []
      }
      tierGroups[tier].push(skill)
    })

    // 连接相邻层级的节点
    const tiers = Object.keys(tierGroups)
      .map(Number)
      .sort((a, b) => a - b)

    tiers.forEach((tier, index) => {
      if (index === tiers.length - 1) return

      const currentTierNodes = tierGroups[tier]
      const nextTier = tiers[index + 1]
      const nextTierNodes = tierGroups[nextTier]

      // 每个父节点连接到最近的子节点
      currentTierNodes.forEach((parent) => {
        const nearestChild = nextTierNodes.reduce((nearest, child) => {
          // 简单的距离计算（基于索引）
          const currentDist = Math.abs(
            currentTierNodes.indexOf(parent) -
              nextTierNodes.indexOf(child)
          )
          const nearestDist = Math.abs(
            currentTierNodes.indexOf(parent) -
              nextTierNodes.indexOf(nearest)
          )
          return currentDist < nearestDist ? child : nearest
        }, nextTierNodes[0])

        edges.push({
          id: `${parent.id}-${nearestChild.id}`,
          source: parent.id,
          target: nearestChild.id,
          type: 'circuit-edge',
          animated: nearestChild.status !== 'locked',
          style: {
            stroke: nearestChild.status === 'locked' ? '#8a8a8a' : undefined,
            strokeWidth: 2
          },
          data: {
            sourceStatus: parent.status,
            targetStatus: nearestChild.status
          }
        })
      })
    })

    return { nodes, edges }
  }

  return {
    calculateLayout,
    buildGraphFromSkills
  }
}

