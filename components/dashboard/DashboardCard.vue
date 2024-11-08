<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DomainIcon from "./icons/domainIcon.vue";
import SubdomainIcon from "./icons/subdomainIcon.vue";
import VulnerabilityIcon from "./icons/vulnerabilityIcon.vue";

const props = defineProps<{
  data: {
    title: string;
    value?: number;
  };
}>();

const icons = {
  domains: DomainIcon,
  subdomains: SubdomainIcon,
  vulnerabilities: VulnerabilityIcon,
}
</script>

<template>
  <Card>
    <CardHeader
      class="flex flex-row items-center justify-between space-y-0 pb-2"
    >
      <CardTitle class="text-lg font-medium">
        {{ props.data.title }}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-4xl font-bold">
        <span
          v-if="props.data.value !== null && props.data.value !== undefined"
        >
          {{ props.data.value }}
        </span>
        <span v-else> Loading... </span>
      </div>
    </CardContent>
  </Card>
</template>
