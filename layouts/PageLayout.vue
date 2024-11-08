<script setup lang="ts">
import MainNav from "@/components/custom/MainNav.vue";
import UserNav from "@/components/custom/UserNav.vue";
import ColorMode from "@/components/custom/color-mode/ColorMode.vue";
import { useColorMode } from "@vueuse/core";
import logoWhite from "@/public/logo/recon5_white.svg";
import logoBlack from "@/public/logo/recon5_black.svg";

const colorMode = useColorMode();

const logos = {
  light: logoBlack,
  dark: logoWhite,
};

const logo = computed(() => logos[colorMode.value as keyof typeof logos]);
const margin = computed(() =>
  colorMode.value === "light" ? "mt-[-2px]" : " mt-[-6px]"
);
</script>

<template>
  <div class="flex-col flex">
    <!-- Header Section -->
    <header class="border-b bg-card">
      <div class="flex h-16 items-center justify-between px-8 mt-1">
        <div class="flex items-center space-x-4">
          <span class="text-sm font-medium">
            <img
              :src="logo"
              alt="Logo"
              class="w-[150px] aspect-auto"
              :class="margin"
            />
          </span>
          <MainNav />
        </div>
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
