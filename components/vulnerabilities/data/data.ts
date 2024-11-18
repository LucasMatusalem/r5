import { CheckCircledIcon } from '@radix-icons/vue'
import circleFull from '@/components/vulnerabilities/components/icons/circle-full.vue'
import { CircleIcon } from '@radix-icons/vue'
import { h } from 'vue'

export const data = {
  status: {
    options: [
      {
        value: 'open',
        label: 'Open',
        icon: h(CircleIcon),
      },
      {
        value: 'closed',
        label: 'Closed',
        icon: h(CheckCircledIcon),
      },
    ],
    title: "Status",
    isFilter: true,
  },
  criticality: {
    options: [
      {
        value: 'low',
        label: 'Low',
        icon: h(circleFull),
        class: 'text-yellow-500'
      },
      {
        value: 'medium',
        label: 'Medium',
        icon: h(circleFull),
        class: 'text-orange-500'
      },
      {
        value: 'high',
        label: 'High',
        icon: h(circleFull),
        class: 'text-red-600'
      },
      {
        value: 'critical',
        label: 'Crítico',
        icon: h(circleFull),
        class: 'text-zinc-700'
      },
    ],
    title: "Criticidade",
    isFilter: true,
  },
  VULID: {
    options: [
      {
        value: 'low',
        label: 'Low',
        icon: h(circleFull),
        class: 'text-yellow-500'
      },
      {
        value: 'medium',
        label: 'Medium',
        icon: h(circleFull),
        class: 'text-orange-500'
      },
      {
        value: 'high',
        label: 'High',
        icon: h(circleFull),
        class: 'text-red-600'
      },
      {
        value: 'critical',
        label: 'Crítico',
        icon: h(circleFull),
        class: 'text-zinc-700'
      },
    ],
    title: "VULID",
    isFilter: true,
  },
  hosts: {
    options: [
      {
        value: 'low',
        label: 'Low',
        icon: h(circleFull),
        class: 'text-yellow-500'
      },
      {
        value: 'medium',
        label: 'Medium',
        icon: h(circleFull),
        class: 'text-orange-500'
      },
      {
        value: 'high',
        label: 'High',
        icon: h(circleFull),
        class: 'text-red-600'
      },
      {
        value: 'critical',
        label: 'Crítico',
        icon: h(circleFull),
        class: 'text-zinc-700'
      },
    ],
    title: "Hosts",
    isFilter: true,
  },
}