<script lang="ts" setup>
import { message } from 'ant-design-vue'
import HomeAvatar from "@/views/home/components/HomeAvatar.vue"
import IconGithub from '~icons/tabler/brand-github'
import IconJuejin from '~icons/tabler/brand-juejin'

enum UrlType {
  BILIBILI = 'https://space.bilibili.com/23076184',
  GITHUB = 'https://github.com/Hakityc',
  EMAIL = 'mailto:tangchony@qq.com',
  JUEJIN = 'https://juejin.cn/user/44448182708696'
}

const buttons = reactive([
  {
    key: 1,
    name: 'GitHub',
    url: UrlType.GITHUB,
    icon: IconGithub
  },
  {
    key: 3,
    name: '掘金',
    url: UrlType.JUEJIN,
    icon: IconJuejin
  }
  // {
  //   key: 2,
  //   name: '邮箱',
  //   url: UrlType.EMAIL,
  //   icon: 'i-tabler:mail'
  // },

  // {
  //   key: 0,
  //   name: '哔哩哔哩',
  //   url: UrlType.BILIBILI,
  //   icon: 'i-tabler:brand-bilibili'
  // }
])

const handleClick = (url: UrlType) => {
  if (url == UrlType.EMAIL) {
    return
  }
  window.open(url)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-48 md:gap-64">
    <div class="flex flex-row justify-center items-center brutal-card p-24 md:p-32">
      <FilterAvatar :size="60"></FilterAvatar>
    </div>
    <div class="brutal-card p-14 md:p-18 flex flex-row gap-32 md:gap-48 justify-evenly items-center">
      <template v-for="(item, index) in buttons" :key="item.key">
        <template v-if="item.key == 2">
          <dev-message>
            <button
              class="brutal-button-social flex items-center justify-center w-48 h-48 md:w-64 md:h-64 p-0 cursor-pointer transition-all duration-200"
              :style="{ animationDelay: `${1.2 + index * 0.1}s` }"
              @click="handleClick(item.url)"
              :aria-label="item.name">
              <component :is="item.icon" class="text-36 md:text-48 text-brutal-black" />
            </button>
          </dev-message>
        </template>
        <template v-else>
          <button
            class="brutal-button-social flex items-center justify-center w-48 h-48 md:w-64 md:h-64 p-0 cursor-pointer transition-all duration-200"
            :style="{ animationDelay: `${1.2 + index * 0.1}s` }"
            @click="handleClick(item.url)"
            :aria-label="item.name">
            <component :is="item.icon" class="text-36 md:text-48 text-brutal-black" />
          </button>
        </template>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.brutal-button-social {
  background: transparent;
  border: none;
  position: relative;
  animation: brutal-scale-in 0.5s ease-out forwards;
  opacity: 0;
}

.brutal-button-social:hover {
  transform: scale(1.15) translateY(-2px);
}

.brutal-button-social:active {
  transform: scale(0.9);
}

.brutal-button-social:focus-visible {
  outline: 4px solid var(--color-brutal-black);
  outline-offset: 4px;
}
</style>
