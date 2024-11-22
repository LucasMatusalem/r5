<script setup lang="ts">
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import InfoDatatable from "~/components/vulnerabilities/info-datatable/info-datatable.vue";
import VulnerabilitiesDatatable from "~/components/vulnerabilities/vulnerabilities-datatable/vulnerabilities-datatable.vue";
import DataTableModal from "~/components/custom/datatable/components/DataTableModal.vue"
import data from '../components/vulnerabilities/vulnerabilities-datatable/data/data.json'
import type { dataSchema }  from '../components/vulnerabilities/vulnerabilities-datatable/data/schema'


definePageMeta({
  layout: "page-layout",
});

let showModal = ref(false)
let dataId = ref(0)
let vulObject: dataSchema

function showModalContent(vulId: any) {
  // Request vulId to get Vulnerability infos
  dataId.value = vulId
  vulObject = data.find(el => el.id == vulId) as dataSchema
  toggleModal()
}

function toggleModal() {
  showModal.value = !showModal.value
}
</script>

<template>
  <Card class="p-5 border">
    <CardTitle class="mb-4">Vulnerabilidades</CardTitle>
    <CardContent class="pl-0 p-0 flex-1">
      <VulnerabilitiesDatatable @showModal="showModalContent"/>
    </CardContent>
  </Card>

  <Card class="p-5 border">
    <CardTitle class="mb-4">Info</CardTitle>
    <CardContent class="pl-0 p-0 flex-1">
      <InfoDatatable @showModal="showModalContent"/>
    </CardContent>
  </Card>

  <DataTableModal v-if="showModal" :data="vulObject" @closeModal="toggleModal"></DataTableModal>
</template>
