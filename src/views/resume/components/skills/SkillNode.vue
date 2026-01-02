<template>
  <div
    class="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
    :style="{ left: node.x + '%', top: node.y + '%' }"
    @mouseenter="$emit('mouseenter', node)"
    @mouseleave="$emit('mouseleave')"
    @click="$emit('click', node)"
  >
    <div class="relative group cursor-pointer">
      <!-- 悬浮卡 -->
      <a-popover
        :open="isHovered"
        placement="left"
        overlayClassName="cyber-popover-overlay"
        transitionName="hover-card"
        :arrow="false"
      >
        <template #content>
          <div class="pointer-events-auto">
            <div class="bg-black/95 border border-cp-dim cyber-card shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-sm">
              <div class="p-8 border border-white/10 cyber-card-inner w-100">
                <div class="flex items-center gap-8 mb-8 pb-8 border-b border-white/10 overflow-hidden">
                  <div
                    class="w-2 h-6 rounded-2 shrink-0"
                    :class="{
                      'bg-cp-yellow shadow-[0_0_5px_#fcee0a]': node.mastered,
                      'bg-current animate-pulse': node.level === 'available',
                      'bg-gray-700': node.level === 'locked'
                    }"
                    :style="{ color: node.level === 'available' ? categoryColor : '' }"
                  ></div>
                  <span
                    class="text-12 font-mono truncate transition-colors"
                    :class="{
                      'text-cp-yellow font-bold': node.mastered,
                      'text-white': node.level === 'available',
                      'text-gray-600': node.level === 'locked'
                    }"
                  >
                    {{ node.name }}
                  </span>
                </div>
                <div class="text-10 text-gray-300 leading-relaxed mb-12 font-mono">{{ node.desc }}</div>
                <div
                  v-if="node.url"
                  class="group/link flex items-center gap-8 text-10 uppercase tracking-wider cursor-pointer text-white transition-colors"
                  @click.stop="openLink(node.url)"
                >
                  <div class="p-4 border border-current rounded-sm">
                    <i
                      data-lucide="external-link"
                      class="w-12 h-12"
                    ></i>
                  </div>
                  <span class="underline decoration-dashed underline-offset-4 group-hover/link:decoration-solid">接入神经网
                    >></span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div
          class="w-60 h-60 flex items-center justify-center transition-all duration-300 cyber-card border-2 hover:scale-110 hover:z-20 hover:shadow-[0_0_20px_rgba(252,238,10,0.3)]"
          :class="nodeClasses"
          :style="nodeStyles"
        >
          <div
            v-if="node.level !== 'locked'"
            class="absolute top-0 right-0 w-2.5 h-2.5 border-b-2 border-l-2 border-current opacity-70"
          ></div>
          <div
            v-if="node.level !== 'locked'"
            class="absolute bottom-0 left-0 w-2.5 h-2.5 border-t-2 border-r-2 border-current opacity-70"
          ></div>

          <div
            v-if="node.brand"
            class="w-12 h-12 flex items-center justify-center"
          >
            <div
              class="w-full h-full icon-mask transition-all duration-300"
              :style="{ maskImage: `url(${brandIconUrl})`, '-webkit-mask-image': `url(${brandIconUrl})`, backgroundColor: iconColor }"
            >
            </div>
          </div>
          <i
            v-else
            :data-lucide="node.icon"
            class="w-10 h-10 transition-transform duration-200 stroke-[1.5]"
            :class="node.mastered ? 'text-black' : (node.level === 'locked' ? 'text-cp-dim' : 'text-white')"
          ></i>
          <div
            v-if="node.level === 'locked'"
            class="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[1px]"
          >
            <i
              data-lucide="lock"
              class="w-6 h-6 text-cp-dim/50"
            ></i>
          </div>
        </div>
      </a-popover>

      <div class="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-160 text-center pointer-events-none z-20">
        <div
          class="text-[10px] md:text-xs uppercase font-black tracking-widest bg-black px-3 py-1 inline-block whitespace-nowrap border-2 shadow-[0_0_10px_black] transition-colors duration-300"
          :style="labelStyles"
        >
          {{ node.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Skill } from './types'

const props = defineProps<{
  node: Skill & { x: number; y: number }
  categoryColor: string
  isHovered: boolean
}>()

defineEmits<{
  click: [node: Skill]
  mouseenter: [node: Skill]
  mouseleave: []
}>()

const brandIconUrl = computed(() => {
  if (!props.node.brand) return ''
  return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${props.node.brand}.svg`
})

const iconColor = computed(() => {
  if (props.node.mastered) return 'black'
  if (props.node.level === 'available') return props.categoryColor
  return '#374151'
})

const nodeClasses = computed(() => {
  if (props.node.mastered) return 'bg-cp-yellow border-cp-yellow shadow-[0_0_15px_rgba(252,238,10,0.6)]'
  if (props.node.level === 'available') return 'bg-cp-bg-dark border-current text-current shadow-[0_0_5px_currentColor] animate-pulse'
  return 'bg-cp-bg-dark border-gray-700 text-gray-700 opacity-60 grayscale'
})

const nodeStyles = computed(() => {
  if (props.node.level === 'available') return { borderColor: props.categoryColor, color: props.categoryColor }
  return {}
})

const labelStyles = computed(() => ({
  borderColor: props.node.mastered ? '#fcee0a' : (props.node.level === 'available' ? props.categoryColor : '#444'),
  color: props.node.mastered ? '#fcee0a' : (props.node.level === 'available' ? '#fff' : '#666')
}))

const openLink = (url: string) => {
  if (url) window.open(url, '_blank')
}
</script>

<style scoped>
.cyber-card {
  clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
}

.cyber-card-inner {
  clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
}

.icon-mask {
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}

.hover-card-enter-active,
.hover-card-leave-active {
  transition: all 0.2s ease;
}

.hover-card-enter-from,
.hover-card-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>



<style>
/* Global Ant Design Popover Overrides */
.cyber-popover-overlay {
  z-index: 50;
  pointer-events: none;
}

.cyber-popover-overlay .ant-popover-inner {
  background-color: transparent !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  pointer-events: auto;
}

.cyber-popover-overlay .ant-popover-arrow {
  display: none !important;
}

.cyber-popover-overlay .ant-popover-inner-content {
  padding: 0 !important;
  color: inherit !important;
}
</style>
