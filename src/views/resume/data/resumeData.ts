import type { ResumeData, TerminalLine } from '@/models/resume'
// @ts-ignore - Vite支持JSON导入
import resumeConfig from './resume.json'

// 从JSON配置文件导入数据
interface ResumeConfig {
  profile: ResumeData['profile']
  skills: ResumeData['skills']
  experiences: ResumeData['experiences']
  projects: ResumeData['projects']
  education?: ResumeData['education']
  terminal: {
    lines: TerminalLine[]
    userName: string
    systemName: string
  }
  ui: {
    sections: Array<{ id: string; label: string }>
    footer: {
      connectionTitle: string
      systemVersion: string
      copyrightText: string
    }
  }
}

const config = resumeConfig as unknown as ResumeConfig

// 导出简历数据
export const resumeData: ResumeData = {
  profile: config.profile,
  skills: config.skills,
  experiences: config.experiences,
  projects: config.projects,
  education: config.education
}

// 导出终端行数据
export const terminalLines: TerminalLine[] = config.terminal.lines

// 导出终端配置
export const terminalConfig = {
  userName: config.terminal.userName,
  systemName: config.terminal.systemName
}

// 导出UI配置
export const uiConfig = config.ui
