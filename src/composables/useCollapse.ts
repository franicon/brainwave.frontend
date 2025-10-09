import { ref, onMounted, onUnmounted, computed } from 'vue'

export function useCollapse() {
  const isCollapsed = ref(localStorage.getItem('sidebar_collapsed') === 'true')
  const isMobile = ref(false)

  let mediaQuery: MediaQueryList | undefined

  const updateIsMobile = () => {
    isMobile.value = window.innerWidth < 1024 // Tailwind 'lg' breakpoint
  }

  onMounted(() => {
    updateIsMobile()
    mediaQuery = window.matchMedia('(max-width: 1023px)')
    mediaQuery.addEventListener('change', updateIsMobile)
  })

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', updateIsMobile)
  })

  const toggleCollapse = () => {
    if (!isMobile.value) {
      isCollapsed.value = !isCollapsed.value
      localStorage.setItem('sidebar_collapsed', String(isCollapsed.value))
    }
  }

  const showLabels = computed(() => isMobile.value || !isCollapsed.value)

  return {
    isCollapsed,
    isMobile,
    toggleCollapse,
    showLabels,
  }
}
