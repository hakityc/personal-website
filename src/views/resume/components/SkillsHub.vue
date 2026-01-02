<template>
  <section class="skills-module py-10 px-110 relative bg-cp-bg-dark h-screen flex items-center justify-center">
    <div class="relative w-full h-full overflow-hidden flex flex-col font-mono text-gray-200">
      <div class="crt-overlay"></div>

      <main class="relative z-10 flex-1 flex items-center justify-center overflow-hidden">
        <transition
          name="glitch"
          mode="out-in"
        >
          <SkillsHubView
            v-if="view === 'hub'"
            key="hub"
            :categories="skillData.categories"
            :total-mastery="totalMastery"
            :get-category-stats="getCategoryStats"
            @select-category="selectCategory"
          />

          <SkillsTreeView
            v-else
            key="tree"
            :category="activeCategory"
            :subcategories="sortedSubcategories"
            :nodes="activeNodes"
            :edges="activeEdges"
            :selected-skill="selectedSkill"
            :hover-skill="hoverSkill"
            :stats="getCategoryStats(activeCategory)"
            @back="view = 'hub'"
            @select-skill="selectSkill"
            @hover-skill="handleMouseEnter"
            @hover-leave="handleMouseLeave"
          />
        </transition>
      </main>

      <CyberFooter />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { createIcons, icons } from 'lucide'
import type { Category, Skill, Edge } from './skills/types'
import { SKILL_DATA } from '@/views/resume/data/skillsData'
import SkillsHubView from './skills/SkillsHubView.vue'
import SkillsTreeView from './skills/SkillsTreeView.vue'
import CyberFooter from './skills/CyberFooter.vue'

const view = ref<'hub' | 'tree'>('hub')
const selectedSkill = ref<Skill | null>(null)
const hoverSkill = ref<Skill | null>(null)
let hoverTimer: ReturnType<typeof setTimeout> | null = null

const skillData = ref(SKILL_DATA)
const activeCategory = ref<Category>(skillData.value.categories[0])

// Flatten data with inherited subcategory properties
const flattenData = (categories: Category[]) => {
  const allSkills: Skill[] = []
  categories.forEach(cat => {
    cat.subcategories.forEach(sub => {
      sub.items.forEach(item => {
        allSkills.push({
          ...item,
          subcategory: sub.name,
          categoryId: cat.id,
          layout_col: sub.layout_col
        })
      })
    })
  })
  return allSkills
}

const allSkillsFlat = computed(() => flattenData(skillData.value.categories))

const sortedSubcategories = computed(() => {
  if (!activeCategory.value?.subcategories) return []
  return [...activeCategory.value.subcategories].sort((a, b) => (a.layout_col || 0) - (b.layout_col || 0))
})

const getCategoryStats = (category: Category) => {
  const catSkills = allSkillsFlat.value.filter(s => s.categoryId === category.id)
  const total = catSkills.length
  const mastered = catSkills.filter(s => s.level === 'mastered').length
  const percent = total === 0 ? 0 : Math.round((mastered / total) * 100)
  return { percent, mastered, total }
}

const totalMastery = computed(() => {
  const total = allSkillsFlat.value.length
  const mastered = allSkillsFlat.value.filter(s => s.level === 'mastered').length
  return total === 0 ? 0 : Math.round((mastered / total) * 100)
})

const activeNodes = computed(() => {
  const skills = allSkillsFlat.value.filter(s => s.categoryId === activeCategory.value.id)
  const subCats = sortedSubcategories.value
  const totalCols = subCats.length
  const colWidth = 100 / totalCols

  return skills.map(skill => {
    const y = 90 - ((skill.row || 0) * 18)
    const colIndex = subCats.findIndex(sub => sub.name === skill.subcategory)
    const x = colIndex !== -1 ? (colIndex * colWidth) + (colWidth / 2) : 50
    return { ...skill, x, y }
  })
})

const activeEdges = computed<Edge[]>(() => {
  const nodes = activeNodes.value
  const edges: Edge[] = []
  nodes.forEach(node => {
    if (node.deps) {
      node.deps.forEach(parentId => {
        if (nodes.find(n => n.id === parentId)) {
          edges.push({
            id: `e_${parentId}_${node.id}`,
            source: parentId,
            target: node.id
          })
        }
      })
    }
  })
  return edges
})

const handleMouseEnter = (node: Skill) => {
  if (hoverTimer) clearTimeout(hoverTimer)
  hoverSkill.value = node
}

const handleMouseLeave = () => {
  hoverTimer = setTimeout(() => { hoverSkill.value = null }, 300)
}

const selectCategory = (cat: Category) => {
  activeCategory.value = cat
  view.value = 'tree'
  selectedSkill.value = null
}

const selectSkill = (node: Skill) => {
  selectedSkill.value = node
}

const refreshIcons = () => {
  nextTick(() => {
    createIcons({ icons })
  })
}

onMounted(() => {
  refreshIcons()
})

watch(view, () => setTimeout(refreshIcons, 350))
watch(activeCategory, () => setTimeout(refreshIcons, 100))
</script>

<style scoped>
.skills-module {
  background-color: #050508;
  position: relative;
  overflow: hidden;
}

.crt-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 50;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), radial-gradient(circle at center, transparent 60%, black 100%);
  background-size: 100% 4px, 100% 100%;
}

.glitch-enter-active {
  animation: glitch 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.glitch-leave-active {
  animation: glitch 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both;
}

@keyframes glitch {
  0% {
    transform: translate(0);
    opacity: 0;
  }

  20% {
    transform: translate(-4px, 4px);
    opacity: 1;
    clip-path: inset(20% 0 80% 0);
  }

  40% {
    transform: translate(4px, -4px);
    clip-path: inset(80% 0 20% 0);
  }

  60% {
    transform: translate(-4px, 0);
    clip-path: inset(40% 0 40% 0);
  }

  80% {
    transform: translate(4px, 4px);
    clip-path: inset(0 0 0 0);
  }

  100% {
    transform: translate(0);
    opacity: 1;
  }
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #0a0a10;
}

::-webkit-scrollbar-thumb {
  background: #3e3e3e;
}
</style>
