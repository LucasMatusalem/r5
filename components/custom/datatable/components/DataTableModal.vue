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

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { 
  FileText as PDFIcon,
  FileImage as ImageIcon,
  CirclePlus as AddIcon 
} from 'lucide-vue-next'

import attachments from "@/components/vulnerabilities/vulnerabilities-datatable/data/attachments.json";
import comments from "@/components/vulnerabilities/vulnerabilities-datatable/data/comments.json";
import { formattedDate } from '@/components/custom/utils/utils';
import { addComponent } from 'nuxt/kit'

const emit = defineEmits(["closeModal"])
const props = defineProps({
  data: Object,
})
onMounted(() => {
  document.body.style.overflow = 'hidden';
})

onUnmounted(() => {
  document.body.style.overflow = 'auto';
})

// let selectTeste: any = ref()
let inputFile: any = ref()
let attachmentsData: any = reactive(attachments)
let commentsData: any = reactive(comments)
let inputComment: any = ref('')

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

function addFile(file: File) {
  console.log(file)
  let uploadFile = {
    "id": `InputFile-${Date.now()}`,
    "name": file.name,
    "type": file.type,
    "createdAt": Date.now()
  }
  attachmentsData.push(uploadFile)
  // ---------------------------
  // request to back-end send file
  // ---------------------------
}

function addComment(comment: string) {
  let inputComment = {
    "id": `InputComment-${Date.now()}`,
    "createdAt": Date.now(),
    "updatedAt": Date.now(),
    "comment": comment,
    "vulnerabilityId": 1, //getVulnerabilityId
    "userId": "01934f2d-0076-71e1-b9a8-a516c3939b79", //getUserId
    "user": { //getUserInfo
      "username": "admin", 
      "email": "admin@matusa.dev"
    }
  }
  commentsData.push(inputComment)
  // ---------------------------
  // request to back-end send file
  // ---------------------------
}

function handleInputComment() {
  inputComment.value
  if (false) return //some validation
  addComment(inputComment.value)
}

function handleInputFile(file: File) {
  inputFile = file
  if (!isImageOrPDF(file)) return
  addFile(inputFile)
}

function isImageOrPDF (file: File) {
  if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'application/pdf') {
    return true
  }
  alert('Por favor, adicione uma imagem com um formato valido (PNG, JPEG, JPG ou PDF).')
  return false
}
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center !my-0">

    <div class="fixed w-full h-full bg-slate-600 opacity-75 !my-0 z-10" @click="$emit('closeModal')">
    </div>

    <Card class="w-full max-w-[800px] lg:max-w-[1000px] absolute z-[15] max-h-full overflow-y-auto">
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
            <div class="grid gap-1 min-w-[170px]">
              <CardDescription class="text-md bold mr-3">Status:</CardDescription>
              <div class="mx-1">
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
            </div>

            <div class="grid gap-1 min-w-[170px]">
              <CardDescription class="text-md bold">Criticidade: </CardDescription>
              <div class="mx-1">
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
          </div>

          <div class="">
            <CardDescription class="text-md mb-1">Descrição:</CardDescription>
            <p class="mx-1">{{ props.data?.description }}</p>
          </div>

          <div v-if="props.data?.extractedresults && props.data?.extractedresults !== `'N/A'`" class="">
            <CardDescription class="text-md">Data:</CardDescription>
            <p class="mx-1 text-sm">{{ formattedDate(props.data?.extractedresults) }}</p>
          </div>

          <div v-if="commentsData">
            <CardDescription class="text-sm mb-1 mb-2">Comentários:</CardDescription>
            <div class="grid gap-2 mb-4 mx-1">
              <Textarea
                id="comment"
                v-model="inputComment"
                placeholder="Adicionar comentário..."
              />
              <div class="flex justify-end">
                <Button @click="handleInputComment">Salvar</Button>
                <Button variant="ghost">
                  Cancelar
                </Button>
              </div>
            </div>
            <ul class="mx-1">
              <li v-for="comment in commentsData" :key="comment?.id">
                <div class="mb-5 mx-1">
                  <h2>{{ comment?.user?.username }} 
                    <span class="ml-2 text-xs text-color text-muted-foreground"> {{ formattedDate(comment?.createdAt) }}</span>
                  </h2>
                  <p>{{ comment?.comment }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-span-2 mr-3">
          <!-- if // props.data?.atachmments -->
          <div v-if="attachmentsData">
            <CardDescription class="text-sm mb-1">Anexos:</CardDescription>

            <ul>
              <li v-for="atachmment in attachmentsData" :key="atachmment?.id" class="mx-1 mb-3 hover:opacity-65">
                <a :href="atachmment?.url"> 
                  <div class="flex gap-2 items-center">
                    <component :is="getIcon(atachmment?.type)" class="w-7 h-7 justify-self-center self-center mt-1"></component>
                    <div class="flex flex-col">
                      <h3 class="text-md">{{ atachmment?.name }}</h3>
                      <p v-if="atachmment?.createdAt" class="text-xs text-color text-muted-foreground">Adicionado em {{ formattedDate(atachmment?.createdAt) }}</p>
                    </div>
                  </div>
                </a>
              </li>
              <div class="flex justify-center w-full mt-5 mx-2">
                <Button class="w-full flex align-center" @click="$refs.inputFile?.$el.click()">
                  <span>
                    <AddIcon class="mt-[2px] !h-5 !w-5"></AddIcon>
                  </span>
                  Adicionar anexo
                </Button>
              </div>
              <Input 
                id="inputFileId"
                type="file" 
                ref="inputFile"
                class="invisible" 
                accept="image/png, image/jpeg, image/jpg, application/pdf"
                @change="handleInputFile($event.target.files[0])"/>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>