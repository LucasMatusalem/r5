<script setup lang="ts">
import MainNav from "@/components/custom/MainNav.vue";
import UserNav from "@/components/custom/UserNav.vue";
import ColorMode from "@/components/custom/color-mode/ColorMode.vue";
</script>

<template>
  <div class="hidden flex-col md:flex">
    <!-- Header Section -->
    <header class="border-b bg-card">
      <div class="flex h-16 items-center justify-between px-12">
        <MainNav />
        <div class="flex items-center space-x-4">
          <ColorMode />
          <UserNav />
        </div>
      </div>
    </header>

    <!-- Main Content Section -->
    <main class="flex-1 space-y-4 p-8 pt-6 bg-muted">
      <slot />
    </main>
  </div>
</template>
