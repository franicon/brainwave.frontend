import { ref, onMounted, type Ref } from 'vue';

export function useDarkMode(): { isDark: Ref<boolean>; toggleDark: () => void } {
  const isDark = ref<boolean>(false);

  onMounted(() => {
    isDark.value = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark.value);
  });

  const toggleDark = () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle('dark');
    localStorage.theme = isDark.value ? 'dark' : 'light';
  };

  return { isDark, toggleDark };
}