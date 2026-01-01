<template>
  <div
    class="flex flex-col cursor-pointer relative text-24 md:text-32 font-700 uppercase tracking-wider transition-colors duration-200 hover:text-brutal-black"
    :class="`${isActive ? 'text-brutal-black' : 'text-brutal-gray'}`"
  >
    <slot>{{ title }}</slot>

    <div class="flex flex-row w-full justify-center absolute -bottom-16 md:-bottom-20">
      <transition
        enter-active-class="animate-enter"
        leave-active-class="animate-leave"
      >
        <div
          v-if="isActive"
          class="flex w-full h-6 md:h-8 bg-brutal-black brutal-border-thick"
        ></div>
      </transition>
    </div>

  </div>
</template>

<script lang='ts' setup>
interface Props {
  isActive: boolean
  title: string
}
const props = defineProps<Props>()
</script>

<style lang='less' scoped>
.animate-enter {
  animation: line-animate 0.6s;
}

.animate-leave {
  animation: line-animate 0.2s reverse;
}

@keyframes line-animate {
  0% {
    transform: translateY(-5px);
    opacity: 0.5;
    width: 128px;
    border-radius: 50%;
  }

  50% {
    transform: translateY(0);
    opacity: 1;
    width: 128px;
    border-radius: 50%;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>