<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useToast } from '@/components/ui/toast/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const auth = useAuthStore()
const { toast } = useToast()

const username = ref('')
const password = ref('')
const otpCode = ref('')
const loading = ref(false)
const showOtpInput = ref(false)

async function handleLogin() {
  if (!username.value || !password.value) {
    toast({
      title: 'Error',
      description: 'Please fill in all fields',
      variant: 'destructive',
    })
    return
  }

  try {
    loading.value = true
    
    if (showOtpInput.value) {
      const result = await auth.verifyOtp(username.value, password.value, otpCode.value)
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
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-muted/50">
    <Card class="w-[350px]">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Input
            id="username"
            v-model="username"
            placeholder="Username"
            type="text"
            :disabled="loading || showOtpInput"
          />
        </div>
        <div class="grid gap-2">
          <Input
            id="password"
            v-model="password"
            placeholder="Password"
            type="password"
            :disabled="loading || showOtpInput"
          />
        </div>
        <div v-if="showOtpInput" class="grid gap-2">
          <Input
            id="otp"
            v-model="otpCode"
            placeholder="Enter OTP code"
            type="text"
            :disabled="loading"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full" :disabled="loading" @click="handleLogin">
          <template v-if="loading">
            <Icon icon="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
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