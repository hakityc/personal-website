/**
 * 技能树系统 - CP2077 风格
 */

export type SkillStatus = 'locked' | 'unlocked' | 'mastered'

export interface SkillNode {
  id: string
  name: string
  nameEn?: string
  icon?: string // 图标名称或路径
  level: number // 0-100
  status: SkillStatus
  description: string
  children?: SkillNode[] // 树状结构
  position?: {
    x: number // 相对位置 0-100
    y: number
  }
}

export interface AttributeCategory {
  id: string
  name: string
  nameEn: string
  totalLevel: number // 该分类的总等级
  skills: SkillNode[] // 技能列表（可以是扁平或树状）
  position?: {
    x: number // 在 Hub 中的位置
    y: number
  }
}

export interface SkillHubData {
  attributes: AttributeCategory[]
  totalPoints: number
  availablePoints: number
}

