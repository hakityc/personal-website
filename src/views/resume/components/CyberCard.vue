<template>
  <div
    class="cyber-card group relative overflow-hidden clip-cyber transition-colors duration-200"
  >
    <!-- 背景 -->
    <div class="absolute inset-0 glass-cyber"></div>

    <!-- 顶部装饰线 -->
    <div 
      class="absolute top-0 left-0 right-0 h-[2px] opacity-50 group-hover:opacity-100 transition-opacity"
      :class="variant === 'danger' 
        ? 'bg-gradient-to-r from-transparent via-cyber-red to-transparent' 
        : 'bg-gradient-to-r from-transparent via-cyber-yellow to-transparent'"
    ></div>

    <!-- 左上角装饰 -->
    <div class="absolute top-0 left-0 w-16 h-16">
      <div class="absolute top-0 left-0 w-full h-[2px]" :class="variant === 'danger' ? 'bg-cyber-red' : 'bg-cyber-yellow'"></div>
      <div class="absolute top-0 left-0 w-[2px] h-full" :class="variant === 'danger' ? 'bg-cyber-red' : 'bg-cyber-yellow'"></div>
    </div>

    <!-- 右下角装饰 -->
    <div class="absolute bottom-0 right-0 w-16 h-16">
      <div class="absolute bottom-0 right-0 w-full h-[2px]" :class="variant === 'danger' ? 'bg-cyber-red' : 'bg-cyber-yellow'"></div>
      <div class="absolute bottom-0 right-0 w-[2px] h-full" :class="variant === 'danger' ? 'bg-cyber-red' : 'bg-cyber-yellow'"></div>
    </div>

    <!-- 主要内容 -->
    <div class="relative z-10 p-20">
      <!-- 标题区域 -->
      <div v-if="$slots.header || title" class="mb-16">
        <slot name="header">
          <div class="flex items-center gap-12">
            <div v-if="icon" class="text-cyber-yellow text-20">
              <component :is="icon" :size="20" />
            </div>
            <!-- 标题标签装饰 -->
            <div class="flex items-center gap-8">
              <div class="w-3 h-12" :class="variant === 'danger' ? 'bg-cyber-red' : 'bg-cyber-yellow'"></div>
              <h3
                class="terminal-text text-18 font-bold uppercase tracking-wider"
                :class="variant === 'danger' ? 'text-cyber-red' : 'text-cyber-yellow'"
              >
                {{ title }}
              </h3>
            </div>
          </div>
          <div v-if="subtitle" class="mt-8 text-12 text-cyber-text-dim terminal-text tracking-wider ml-12">
            // {{ subtitle }}
          </div>
        </slot>
      </div>

      <!-- 默认插槽 -->
      <div class="card-content">
        <slot></slot>
      </div>

      <!-- 底部插槽 -->
      <div v-if="$slots.footer" class="mt-16 pt-16 border-t border-cyber-yellow/20">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Component } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  icon?: Component
  variant?: 'default' | 'danger'
  enableGlitch?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  enableGlitch: false
})
</script>

<style scoped>
</style>
