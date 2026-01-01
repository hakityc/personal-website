<template>
  <div class="inline-flex items-start gap-24 md:gap-32 lg:gap-46 flex-wrap">
    <template v-for="item in items">
      <NavBarItem
        :is-active="item.path == router.currentRoute.value.path"
        :title="item.title"
        @click="handleClickItem(item)"></NavBarItem>
    </template>
    <button
      @click="handleRedirectBlog"
      class="brutal-button-inverse !w-auto !h-40 md:!h-48 flex flex-row items-center justify-center !px-16 md:!px-24 !py-4 text-24 md:text-32 font-700 uppercase tracking-wider" 
      type="button"
      aria-label="博客">
      <span class="text-nowrap">博客</span>
      <i-gg-arrow-top-right class="ml-4 md:ml-8"></i-gg-arrow-top-right>
    </button>
    <!-- <NavBarSearch></NavBarSearch> -->
  </div>
</template>

<script lang="ts" setup>
import { useI18nStore } from '@/stores/modules/i18n'
const i18nStore = useI18nStore()

interface Item {
  title: string
  name: string
  path: string
}
const router = useRouter()

const items = computed(() => {
  const { options } = router
  return options.routes.map((item: any) => {
    const { meta, path, name } = item
    const { title, title_cn } = meta
    return {
      title: i18nStore.isCurrentCN ? title_cn : title,
      name,
      path
    }
  })
})

const handleClickItem = (item: Item) => {
  try {
    const { path } = item
    router.push({
      path
    })
  } catch (error) {}
}

const handleRedirectBlog = () => {
  window.open('./blog', '_blank')
}
</script>

<style lang="less" scoped></style>
