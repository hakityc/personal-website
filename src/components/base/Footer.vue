<script lang="ts" setup>
const handleClick = () => {
  window.open('https://beian.miit.gov.cn/#/Integrated/index')
}
</script>
<template>
  <div class="flex w-full justify-center items-center absolute bottom-0 pb-16 md:pb-24 lg:pb-32">
    <button 
      class="brutal-card px-16 md:px-24 py-8 md:py-12 text-brutal-gray text-12 md:text-14 lg:text-16 font-600 uppercase tracking-wider cursor-pointer transition-all duration-200 hover:text-brutal-black hover:transform hover:-translate-y-1"
      @click="handleClick"
      type="button"
      aria-label="备案信息">
      赣ICP备2024019685号-2
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
