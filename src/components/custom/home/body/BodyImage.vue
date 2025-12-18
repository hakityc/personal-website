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
  <div class="flex flex-col items-center justify-center gap-64">
    <div class="flex flex-row justify-center items-center">
      <FilterAvatar :size="60"></FilterAvatar>
    </div>
    <div class="NBR p-18 flex flex-row gap-48 justify-evenly items-center">
      <template v-for="item in buttons">
        <template v-if="item.key == 2">
          <dev-message>
            <n-button
              type="text"
              class="flex items-center justify-center w-64 h-64 p-0"
              @click="handleClick(item.url)">
              <component :is="item.icon" class="text-48 text-default" />
            </n-button>
          </dev-message>
        </template>
        <template v-else>
          <n-button
            type="text"
            class="flex items-center justify-center w-64 h-64 p-0"
            @click="handleClick(item.url)">
            <component :is="item.icon" class="text-48 text-default" />
          </n-button>
        </template>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
