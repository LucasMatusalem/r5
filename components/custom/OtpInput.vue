<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { ref, onMounted } from 'vue'

const props = defineProps<{
  length?: number
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const inputs = ref<HTMLInputElement[]>([])
const inputRefs = ref<any[]>([])

onMounted(() => {
  inputs.value = inputRefs.value.map(ref => ref.$el)
  inputs.value[0]?.focus()
})

const handleInput = (e: Event, index: number) => {
  const target = e.target as HTMLInputElement
  let value = target.value

  // Allow only numbers
  value = value.replace(/[^\d]/g, '')
  target.value = value.slice(-1)

  // Update model value
  const newValue = [...(props.modelValue || '').split('')]
  newValue[index] = value
  emit('update:modelValue', newValue.join(''))

  // Move to next input if value exists
  if (value && index < (props.length || 6) - 1) {
    inputs.value[index + 1]?.focus()
  }
}

const handleKeydown = (e: any, index: number) => {
  // Move to previous input on backspace if current input is empty
  if (e.key === 'Backspace' && !e?.currentTarget?.value && index > 0) {
    inputs.value[index - 1]?.focus()
  }
}

const handlePaste = (e: ClipboardEvent) => {
  e.preventDefault()
  const pastedData = e.clipboardData?.getData('text')
  if (!pastedData) return

  // Get only numbers from pasted data
  const numbers = pastedData.replace(/[^\d]/g, '').split('')
  
  // Fill inputs with pasted numbers
  numbers.forEach((num, index) => {
    if (index < (props.length || 6)) {
      if (inputs.value[index]) {
        inputs.value[index].value = num
        const newValue = [...(props.modelValue || '').split('')]
        newValue[index] = num
        emit('update:modelValue', newValue.join(''))
      }
    }
  })

  // Focus last filled input or next empty one
  const lastIndex = Math.min(numbers.length, (props.length || 6) - 1)
  inputs.value[lastIndex]?.focus()
}
</script>

<template>
  <div class="flex gap-2 max-w-full">
    <template v-for="i in (length || 6)" :key="i">
      <Input
        :ref="el => inputRefs[i - 1] = el"
        type="text"
        maxlength="1"
        class="w-9 h-9 text-center text-lg p-0"
        @input="(e: any) => handleInput(e, i - 1)"
        @keydown="(e: any) => handleKeydown(e, i - 1)"
        @paste="handlePaste"
      />
    </template>
  </div>
</template>