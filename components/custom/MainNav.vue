<script setup lang="ts">
import { cn } from "@/lib/utils";
import { ref, onMounted } from "vue";

// Links configuration
const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/vulnerabilities", label: "Vulnerabilidades" },
  { href: "/subdomains", label: "Subdomínios" },
];

const currentPath = ref("");
onMounted(() => {
  currentPath.value = window.location.pathname;
});
</script>

<template>
  <nav
    :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')"
  >
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :class="
        cn('text-md font-medium transition-colors hover:text-primary', {
          'text-muted-foreground': link.href !== currentPath,
        })
      "
    >
      {{ link.label }}
    </a>
  </nav>
</template>
