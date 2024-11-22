<script setup lang="ts">
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import SubdomainsDatatable from "~/components/subdomains/subdomains-datatable/subdomains-datatable.vue";

definePageMeta({
  layout: "page-layout",
});
</script>

<template>
  <Card class="p-5 border">
    <CardTitle class="mb-4">Subdomínios</CardTitle>
    <CardContent class="pl-0 p-0 flex-1">
      <SubdomainsDatatable/>
    </CardContent>
  </Card>
</template>
