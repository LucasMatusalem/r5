<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { FileText as PDFIcon, FileImage as ImageIcon } from 'lucide-vue-next'

import attachmentsData from "@/components/vulnerabilities/vulnerabilities-datatable/data/attachments.json";
import { formattedDate } from '@/components/custom/utils/utils';

const emit = defineEmits(["closeModal"])
const props = defineProps({
  data: Object,
})
console.log(props.data)
onMounted(() => {
  document.body.style.overflow = 'hidden';
})

onUnmounted(() => {
  document.body.style.overflow = 'auto';
})

const getStatusDefaultValue = computed(() => {
  if (props.data?.status == 'NULL') return true
})

function getIcon(type: any) {
  const icon: any = {
    'application/pdf': PDFIcon,
    'image': ImageIcon,
    default: PDFIcon
  }

  return icon[type] || icon.default
}

// Block Scroll
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center !my-0">

    <div class="fixed w-full h-full bg-slate-600 opacity-75 !my-0 z-10" @click="$emit('closeModal')">
    </div>

    <Card class="w-full max-w-[800px] lg:max-w-[1000px] absolute z-[15] overflow-auto">
      <CardHeader class="flex justify-between">
        <div class="flex flex-col">
          <CardDescription class="text-sm mb-2">VULN-{{ props.data?.id }} </CardDescription>
          <CardTitle class="">{{ props.data?.name }}</CardTitle>
          <CardDescription class="text-md mt-2">{{ props.data?.host }}</CardDescription>
        </div>
        <div class="cursor-pointer" @click="$emit('closeModal')">
          <span>X</span>
        </div>
      </CardHeader>
      <CardContent class="grid grid-cols-5 gap-x-10">
        <div class="flex flex-col col-span-3 gap-y-5">

          <div class="flex gap-10">
            <div class="grid gap-1 min-w-[150px]">
              <CardDescription class="text-md bold mr-3">Status:</CardDescription>
              <Select :default-value="props.data?.status.toString()" class="">
                <SelectTrigger id="security-level" class="w-full truncate">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OPEN">
                    Open
                  </SelectItem>
                  <SelectItem value="CLOSED">
                    Closed
                  </SelectItem>
                  <SelectItem v-if="getStatusDefaultValue" value="NULL">
                    Null
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="grid gap-1 min-w-[150px]">
              <CardDescription class="text-md bold">Criticidade: </CardDescription>
              <Select :default-value="props.data?.severity.toString()">
                <SelectTrigger id="security-level" class="w-full truncate">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    Low
                  </SelectItem>
                  <SelectItem value="medium">
                    Medium
                  </SelectItem>
                  <SelectItem value="high">
                    High
                  </SelectItem>
                  <SelectItem value="critical">
                    Critical
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>

          <div class="">
            <CardDescription class="text-md">Descrição:</CardDescription>
            <p class="">{{ props.data?.description }}</p>
          </div>

          <div v-if="props.data?.extractedresults && props.data?.extractedresults !== `'N/A'`" class="">
            <CardDescription class="text-md">Data:</CardDescription>
            <p class="text-sm">{{ formattedDate(props.data?.extractedresults) }}</p>
          </div>

          <div v-if="props.data?.comments">
            <!-- if // props.data?.comments -->

            <CardDescription class="text-sm">Comentários:</CardDescription>
            <ul>
              <li v-for="(comment, index) in props.data?.comments" :key="comment?.id">
                aaaaaaaaaaa
              </li>
            </ul>
          </div>
        </div>

        <div class="col-span-2">
          <!-- if // props.data?.atachmments -->
          <div v-if="attachmentsData">
            <CardDescription class="text-sm">Anexos:</CardDescription>

            <ul>
              <!-- v-for="(atachmment, index) in props.data?.atachmments" :key="atachmment?.id" -->
              <li v-for="(atachmment, index) in attachmentsData" :key="atachmment?.id" class="mb-3 hover:opacity-65">
                <a :href="atachmment?.url">
                  <div class="flex gap-2 items-center">
                    <component :is="getIcon(atachmment?.type)" class="w-7 h-7 justify-self-center self-center mt-2"></component>
                    <div class="flex flex-col">
                      <h2 class="text-md">{{ atachmment?.name }}</h2>
                      <p class="text-xs text-color text-muted-foreground">Adicionado em {{ formattedDate('2024-11-21T15:18:57.657Z') }}</p>
                    </div>
                  </div>

                </a>
              </li>
            </ul>
          </div>

          <!-- <h2>{{ props.data }}</h2> -->
        </div>
      </CardContent>
    </Card>
  </div>
</template>