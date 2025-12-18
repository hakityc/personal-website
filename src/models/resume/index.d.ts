// 简历数据类型接口定义

/** 联系信息 */
export interface ContactInfo {
  email: string
  phone?: string
  github?: string
  linkedin?: string
  website?: string
}

/** 用户基本信息 */
export interface ProfileInfo {
  name: string
  nameEn?: string
  title: string
  experience: string
  location?: string
  avatar?: string
  contact: ContactInfo
}

/** 技能项 */
export interface SkillItem {
  name: string
  level: number // 0-100 熟练度
  category: 'core' | 'ui' | 'engineering' | 'tools'
  icon?: string
  description?: string
}

/** 技能分类 */
export interface SkillCategory {
  id: string
  name: string
  nameEn: string
  skills: SkillItem[]
}

/** 工作经历 */
export interface WorkExperience {
  id: string
  company: string
  companyEn?: string
  position: string
  positionEn?: string
  startDate: string
  endDate: string
  isCurrent: boolean
  location?: string
  description: string[]
  technologies: string[]
}

/** 项目亮点标签 */
export interface ProjectHighlight {
  text: string
  type: 'primary' | 'secondary' | 'accent'
}

/** 项目经验 */
export interface ProjectExperience {
  id: string
  name: string
  nameEn?: string
  company?: string
  role: string
  period: string
  description: string
  highlights: ProjectHighlight[]
  responsibilities: string[]
  technologies: string[]
  achievements?: string[]
}

/** 教育背景 */
export interface Education {
  school: string
  schoolEn?: string
  degree: string
  major: string
  startDate: string
  endDate: string
}

/** 完整简历数据 */
export interface ResumeData {
  profile: ProfileInfo
  skills: SkillCategory[]
  experiences: WorkExperience[]
  projects: ProjectExperience[]
  education?: Education[]
}

/** 终端命令行类型 */
export interface TerminalLine {
  type: 'command' | 'output' | 'system'
  content: string
  delay?: number
}
