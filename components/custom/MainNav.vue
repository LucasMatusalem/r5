<script setup lang="ts">
import { cn } from '@/lib/utils'
import ColorMode from './color-mode/ColorMode.vue';
</script>

<template>
  <nav
    :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')"
  >
    <a
      href="/dashboard"
      class="text-sm font-medium transition-colors hover:text-primary"
    >
      Dashboard
    </a>
    <a
      href="/profile"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      Analistas
    </a>
    <ColorMode></ColorMode>
  </nav>
</template>