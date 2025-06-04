import type { ColorMode } from "@/shared/types";
import { useColorMode } from "@vueuse/core";
import { computed, type ComputedRef } from "vue";

export function useTheme() {
  const mode = useColorMode({ disableTransition: true });

  const colorMode: ComputedRef<ColorMode> = computed(() => {
    return mode.value as ColorMode;
  });

  function toggleColorMode() {
    if (mode.value === 'light') {
      mode.value = 'dark';
    } else {
      mode.value = 'light'
    }
  }

  return {
    colorMode,
    toggleColorMode,
  };
}