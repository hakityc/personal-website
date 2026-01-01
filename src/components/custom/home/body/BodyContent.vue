<template>
  <div class="w-full max-w-960 flex flex-col items-center md:items-end text-center md:text-right brutal-text-bold">
    <div class="flex flex-col gap-8">
      <span
        class="text-brutal-black text-xl md:text-4xl lg:text-6xl font-900 leading-[0.9] tracking-[-0.02em] brutal-text-reveal"
        style="animation-delay: 0.6s"
      >{{ t('home.content.welcome') }}</span>
      <span
        class="text-brutal-yellow text-xl md:text-4xl lg:text-6xl font-900 leading-[0.9] tracking-[-0.02em] brutal-text-reveal"
        style="animation-delay: 0.8s"
      >{{ t('home.content.name') }}</span>
      <span
        class="text-brutal-black text-xl md:text-4xl lg:text-6xl font-900 leading-[0.9] tracking-[-0.02em] brutal-text-reveal"
        style="animation-delay: 1s"
      >{{ t('home.content.blog') }}</span>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

</script>

<style lang='less' scoped></style>