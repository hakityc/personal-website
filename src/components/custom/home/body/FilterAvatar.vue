<template>
  <div class="flex shrink-0 items-center justify-center p-24 md:p-32 relative">
    <div
      class="w-full h-full rounded-full filter-blur-100 absolute avatar-animate"
      :style="avatarStle"
    ></div>
    <div class="brutal-border-thick z-10 rounded-full p-6 md:p-8 bg-brutal-white">
      <img
        ref="avatarRef"
        :src="avatar"
        class="!w-320 !h-320 md:!w-480 md:!h-480 rounded-full object-cover"
        alt="Avatar"
      />
    </div>
  </div>
</template>

<script lang='ts' setup>
// import avatar from '@/assets/avatar.png'
import avatar from '@/assets/avatar.jpg'
import { useColorThief } from '@/hooks/useColorThief'

const { getColor, mainColor } = useColorThief()

interface Props {
  size: number
}
const props = defineProps<Props>()
const avatarRef = ref<HTMLElement>()
const avatarStle = computed(() => {
  return {
    //TODO 暂时不用mainColor
    // backgroundColor: mainColor.value,
    backgroundImage: `url(${avatar})`
  }
})

const initColor = async () => {
  try {
    // await getColor(avatarRef.value)
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await initColor()
})
</script>

<style scoped>
.avatar-animate {
  animation: avatar 0.6s ease-in-out;
}

@keyframes avatar {
  0% {
    width: 0;
    height: 0;
  }

  100% {
    width: 100%;
    height: 100%;
  }
}
</style>