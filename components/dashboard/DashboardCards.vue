<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>

  <Card>
    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle class="text-lg font-medium">
        Domínios
      </CardTitle>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="h-8 w-8 text-muted-foreground">
        <title>domain</title>
        <path
          d="M18,15H16V17H18M18,11H16V13H18M20,19H12V17H14V15H12V13H14V11H12V9H20M10,7H8V5H10M10,11H8V9H10M10,15H8V13H10M10,19H8V17H10M6,7H4V5H6M6,11H4V9H6M6,15H4V13H6M6,19H4V17H6M12,7V3H2V21H22V7H12Z" />
      </svg>
    </CardHeader>
    <CardContent>
      <div class="text-4xl font-bold">
        60
      </div>
    </CardContent>
  </Card>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle class="text-lg font-medium">
        Subomínios
      </CardTitle>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="h-8 w-8 text-muted-foreground">
        <title>domain-plus</title>
        <path d="M12 7V3H2V21H13.35A5.8 5.8 0 0 1 13 19H12V17H13.35A5 5 0 0 1 14 15.69V15H12V13H14V11H12V9H20V13.09A5.58 5.58 0 0 1 22 13.81V7M6 19H4V17H6M6 15H4V13H6M6 11H4V9H6M6 7H4V5H6M10 19H8V17H10M10 15H8V13H10M10 11H8V9H10M10 7H8V5H10M16 13H18V11H16M16 11V13H18V11M16 11V13H18V11M20 15V18H23V20H20V23H18V20H15V18H18V15Z" />
      </svg>
    </CardHeader>
    <CardContent>
      <div class="text-4xl font-bold">
        84
      </div>
    </CardContent>
  </Card>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle class="text-lg font-medium">
        Vulnerabilidades
      </CardTitle>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" class="h-8 w-8 text-muted-foreground">
        <title>alert</title><path d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z" />
      </svg>
    </CardHeader>
    <CardContent>
      <div class="text-4xl font-bold">
        621
      </div>
    </CardContent>
  </Card>
</template>
