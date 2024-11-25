<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { toast } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import OtpInput from '@/components/custom/OtpInput.vue'
import { LoaderCircle } from 'lucide-vue-next'

const auth = useAuthStore()

const username = ref('')
const password = ref('')
const otpCode = ref('')
const isLoading = ref(false)
const showOtpInput = ref(false)
const error = reactive({
  errorUsername: {
    value: false,
    message: ''
  },
  errorPassword: {
    value: false,
    message: ''
  }
})

function validateUsername() {
  if (username.value === '') {
    error.errorUsername.value = true
    error.errorUsername.message = 'Nome de usuário inválido'
    return false
  }

  const usernameRegex = /^(?=.*[a-z\d])[a-z\d_]{4,30}$/
  if (!usernameRegex.test(username.value)) {
    error.errorUsername.value = true
    error.errorUsername.message = 'Nome de usuário ou e-mail inválidos'
    return false
  }

  return true
}

function validatePassword() {
  if (password.value.length < 6) {
    error.errorPassword.value = true
    error.errorPassword.message = 'Senha deve ter, no mínimo, 6 caracteres'
    return false
  }
  return true
}

function validateInputs() {
  const validLogin = validateUsername()
  const validPassword = validatePassword()
  
  if (validPassword && validLogin) return true
  return false
}

function removeErrors() {
  error.errorUsername.value = false
  error.errorUsername.message = ''
  
  error.errorPassword.value = false
  error.errorPassword.message = ''
}

async function handleLogin() {
  if (!validateInputs()) {
    toast({
      title: 'Error',
      description: 'Please fill in all fields'
    })
    return
  }

  try {
    isLoading.value = true
    
    if (showOtpInput.value) {
      const result = await auth.login(username.value, password.value, otpCode.value)
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Successfully logged in',
        })
        navigateTo('/')
      }
    } else {
      const result = await auth.login(username.value, password.value)
      if (result.requireOtp) {
        showOtpInput.value = true
        toast({
          title: 'OTP Required',
          description: 'Please enter your OTP code',
        })
      } else if (result.success) {
        toast({
          title: 'Success',
          description: 'Successfully logged in',
        })
        navigateTo('/')
      }
    }
  } catch (error: any) {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive',
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-muted/50">
    <Card class="w-[350px]">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Transition name="slide" mode="out-in">
          <div v-if="!showOtpInput" key="login-inputs" class="grid gap-4">
            <div class="grid gap-2">
              <Input
                id="username"
                v-model="username"
                placeholder="Username"
                type="text"
                :disabled="isLoading"
                :class="{ 'border-red-500': error.errorUsername.value}"
                @input="removeErrors"
              />
              <span 
                v-if="error.errorUsername.value"
                class="ml-1 text-red-500 text-xs"
              >{{ error.errorUsername.message }}</span>
            </div>
            <div class="grid gap-2">
              <Input
                id="password"
                v-model="password"
                placeholder="Password"
                type="password"
                :disabled="isLoading"
                :class="{ 'border-red-500': error.errorPassword.value}"
                @input="removeErrors"
              />
              <span 
                v-if="error.errorPassword.value"
                class="ml-1 text-red-500 text-xs"
              >{{ error.errorPassword.message }}</span>
            </div>
          </div>
          <div v-else key="otp-inputs" class="grid gap-4">
            <div class="text-center mb-4">
              <h3 class="text-lg font-medium">Enter OTP Code</h3>
              <p class="text-sm text-muted-foreground">
                Please enter the verification code
              </p>
            </div>
            <div class="flex justify-center">
              <OtpInput v-model="otpCode" :length="6" />
            </div>
          </div>
        </Transition>
      </CardContent>
      <CardFooter>
        <Button class="w-full" :disabled="isLoading" @click="handleLogin">
          <template v-if="isLoading">
            <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </template>
          <template v-else>
            {{ showOtpInput ? 'Verify OTP' : 'Sign In' }}
          </template>
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>