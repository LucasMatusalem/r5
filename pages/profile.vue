<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

definePageMeta({
  layout: 'page-layout',
})

const auth = useAuthStore()
</script>

<template>
  <div class="container mx-auto py-6">
    <Card>
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-1">
          <h3 class="font-medium">Username</h3>
          <p class="text-sm text-muted-foreground">{{ auth.user?.username }}</p>
        </div>
        <div class="grid gap-1">
          <h3 class="font-medium">Email</h3>
          <p class="text-sm text-muted-foreground">{{ auth.user?.email }}</p>
        </div>
        <div class="grid gap-1">
          <h3 class="font-medium">Role</h3>
          <p class="text-sm text-muted-foreground">{{ auth.user?.role }}</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>