<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import MainNav from '@/components/custom/MainNav.vue'
import DateRangePicker from '@/components/custom/DateRangePicker.vue'

import OvertimeChart from '@/components/custom/charts/overtime/OvertimeChart.vue'
import DashboardCards from '@/components/dashboard/DashboardCards.vue'
import PieChart from '@/components/custom/charts/pie/PieChart.vue'


import UserNav from '@/components/custom/UserNav.vue'

</script>

<template>
  <div class="md:hidden">
    <VPImage alt="Dashboard" width="1280" height="1214" class="block" :image="{
      dark: '/examples/dashboard-dark.png',
      light: '/examples/dashboard-light.png',
    }" />
  </div>

  <div class="hidden flex-col md:flex">
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <!-- <TeamSwitcher /> -->
        <MainNav class="mx-6" />
        <div class="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
    <div class="flex-1 space-y-4 p-8 pt-6">
      <div class="flex items-center justify-between space-y-2">
        <h2 class="text-3xl font-bold tracking-tight">
          Dashboard
        </h2>
      </div>
      <div class="pb-4">
        <div class="grid gap-4 grid-cols-1 lg:grid-cols-3">
          <DashboardCards></DashboardCards>
        </div>
      </div>
      <div class="grid gap-4 grid-cols-2 lg:grid-cols-3">
        <Card class="col-span-2">
          <CardHeader class="justify-between">
            <CardTitle>Overtime</CardTitle>
            <DateRangePicker></DateRangePicker>
          </CardHeader>
          <CardContent class="pl-0">
            <OvertimeChart />
          </CardContent>
        </Card>
        <Card class="col-span-1 min-h-[380px]">
          <CardHeader>
            <CardTitle>Overtime1</CardTitle>
          </CardHeader>
          <CardContent class="pl-0">
            <PieChart></PieChart>
          </CardContent>
        </Card>
        <Card class="col-span-1 min-h-[380px]">
          <CardHeader>
            <CardTitle>Overtime2</CardTitle>
          </CardHeader>
          <CardContent class="pl-0">
            <PieChart></PieChart>
          </CardContent>
        </Card>
        <Card class="col-span-2">
          <CardHeader class="justify-between">
            <CardTitle>Overtime</CardTitle>
            <DateRangePicker></DateRangePicker>
          </CardHeader>
          <CardContent class="pl-0">
            <OvertimeChart />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>