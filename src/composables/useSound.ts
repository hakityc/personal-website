/**
 * 音效 Composable - CP2077 风格
 */
import { ref } from 'vue'

const audioContext = ref<AudioContext | null>(null)

// 初始化 AudioContext
const initAudioContext = () => {
  if (!audioContext.value) {
    audioContext.value = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioContext.value
}

// 数字蜂鸣声（高音调）
export const playChirp = () => {
  try {
    const ctx = initAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.frequency.value = 800 // 高音调
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.1)
  } catch (error) {
    // 静默失败，避免控制台错误
  }
}

// 重低音点击声
export const playBassClick = () => {
  try {
    const ctx = initAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.frequency.value = 60 // 低音调
    oscillator.type = 'square'
    
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.15)
  } catch (error) {
    // 静默失败
  }
}

export const useSound = () => {
  return {
    playChirp,
    playBassClick
  }
}

