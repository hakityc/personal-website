// TypeScript types for Skills module

export interface Skill {
  id: string
  name: string
  brand?: string
  icon?: string
  desc: string
  url: string
  mastered: boolean
  level: 'available' | 'locked'
  row: number
  deps: string[]
  // Computed properties added during flatten
  subcategory?: string
  categoryId?: string
  layout_col?: number
  x?: number
  y?: number
}

export interface Subcategory {
  name: string
  layout_col: number
  items: Skill[]
}

export interface Category {
  id: string
  name: string
  desc: string
  color: string
  icon: string
  subcategories: Subcategory[]
}

export interface SkillData {
  $schema: string
  description: string
  categories: Category[]
}

export interface CategoryStats {
  percent: number
  mastered: number
  total: number
}

export interface Position {
  x: number
  y: number
}

export interface Edge {
  id: string
  source: string
  target: string
}
