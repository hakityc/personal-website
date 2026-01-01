<template>
  <div
    class="cyber-card group relative transition-colors duration-300"
    :class="[
      glitchActive ? 'animate-glitch-skew' : '',
      'clip-cyber'
    ]"
    style="overflow: visible;"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- 背景 -->
    <div class="absolute inset-0 glass-cyber"></div>

    <!-- 边框发光效果 -->
    <div
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      :class="variant === 'danger' ? 'border-glow-red' : 'border-glow-yellow'"
    ></div>

    <!-- 顶部装饰线 -->
    <div class="absolute top-0 left-0 right-0 h-[2px]">
      <div
        class="h-full transition-opacity duration-300"
        :class="variant === 'danger'
          ? 'bg-gradient-to-r from-transparent via-cyber-red to-transparent'
          : 'bg-gradient-to-r from-transparent via-cyber-yellow to-transparent'"
        :style="{ opacity: glitchActive ? 1 : 0.5 }"
      ></div>
    </div>

    <!-- 左上角装饰 -->
    <div class="absolute top-0 left-0 w-24 h-24">
      <div
        class="absolute top-0 left-0 w-full h-[2px]"
        :class="variant === 'danger' ? 'bg-cyber-red' : 'bg-cyber-yellow'"
      ></div>
      <div
        class="absolute top-0 left-0 w-[2px] h-full"
        :class="variant === 'danger' ? 'bg-cyber-red' : 'bg-cyber-yellow'"
      ></div>
    </div>

    <!-- 右下角装饰 -->
    <div class="absolute bottom-0 right-0 w-24 h-24">
      <div
        class="absolute bottom-0 right-0 w-full h-[2px]"
        :class="variant === 'danger' ? 'bg-cyber-red' : 'bg-cyber-yellow'"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-[2px] h-full"
        :class="variant === 'danger' ? 'bg-cyber-red' : 'bg-cyber-yellow'"
      ></div>
    </div>

    <!-- 扫描线效果 -->
    <div
      v-if="glitchActive"
      class="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <div class="absolute w-full h-[2px] bg-cyber-yellow/50 animate-scan-line"></div>
    </div>

    <!-- 主要内容 -->
    <div class="relative z-10 p-20">
      <!-- 标题区域 -->
      <div
        v-if="$slots.header || title"
        class="mb-16"
      >
        <slot name="header">
          <div class="flex items-center gap-12">
            <div
              v-if="icon"
              class="text-cyber-yellow text-20"
            >
              <component
                :is="icon"
                :size="20"
              />
            </div>
            <!-- 标题标签装饰 -->
            <div class="flex items-center gap-8">
              <div
                class="w-4 h-12"
                :class="variant === 'danger' ? 'bg-cyber-red' : 'bg-cyber-yellow'"
              ></div>
              <h3
                class="terminal-text text-18 font-bold uppercase tracking-wider"
                :class="[
                  variant === 'danger' ? 'text-cyber-red' : 'text-cyber-yellow',
                  glitchActive ? 'glitch-effect' : ''
                ]"
                :data-text="title"
              >
                {{ title }}
              </h3>
            </div>
          </div>
          <div
            v-if="subtitle"
            class="mt-8 text-12 text-cyber-text-dim terminal-text tracking-wider ml-12"
          >
            // {{ subtitle }}
          </div>
        </slot>
      </div>

      <!-- 默认插槽 -->
      <div class="card-content">
        <slot></slot>
      </div>

      <!-- 底部插槽 -->
      <div
        v-if="$slots.footer"
        class="mt-16 pt-16 border-t border-cyber-yellow/20"
      >
        <slot name="footer"></slot>
      </div>
    </div>

    <!-- 故障效果层 -->
    <div
      v-if="glitchActive"
      class="glitch-layers pointer-events-none"
    >
      <div class="glitch-layer glitch-layer-1"></div>
      <div class="glitch-layer glitch-layer-2"></div>
    </div>

    <!-- 噪点 -->
    <div class="absolute inset-0 noise-overlay pointer-events-none opacity-50"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Component } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  icon?: Component
  variant?: 'default' | 'danger'
  enableGlitch?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  enableGlitch: true
})

const glitchActive = ref(false)
let glitchTimer: number | null = null

const onMouseEnter = () => {
  if (props.enableGlitch) {
    glitchActive.value = true
    // 清理之前的定时器
    if (glitchTimer !== null) {
      clearTimeout(glitchTimer)
    }
    // 短暂的故障效果
    glitchTimer = window.setTimeout(() => {
      glitchActive.value = false
      glitchTimer = null
    }, 250)
  }
}

const onMouseLeave = () => {
  glitchActive.value = false
  if (glitchTimer !== null) {
    clearTimeout(glitchTimer)
    glitchTimer = null
  }
}
</script>

<style scoped>
.glitch-layers {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.glitch-layer {
  position: absolute;
  inset: 0;
}

.glitch-layer-1 {
  left: 3px;
  animation: glitch-shift-1 0.25s ease-in-out;
  background: linear-gradient(45deg, rgba(255, 0, 60, 0.1) 0%, transparent 100%);
}

.glitch-layer-2 {
  left: -3px;
  animation: glitch-shift-2 0.25s ease-in-out;
  background: linear-gradient(-45deg, rgba(0, 212, 255, 0.1) 0%, transparent 100%);
}

@keyframes glitch-shift-1 {

  0%,
  100% {
    clip-path: inset(0 0 0 0);
  }

  25% {
    clip-path: inset(10% 0 60% 0);
  }

  50% {
    clip-path: inset(30% 0 40% 0);
  }

  75% {
    clip-path: inset(50% 0 20% 0);
  }
}

@keyframes glitch-shift-2 {

  0%,
  100% {
    clip-path: inset(0 0 0 0);
  }

  25% {
    clip-path: inset(60% 0 10% 0);
  }

  50% {
    clip-path: inset(40% 0 30% 0);
  }

  75% {
    clip-path: inset(20% 0 50% 0);
  }
}
</style>
