import { CheckCircledIcon } from '@radix-icons/vue'
import { CircleIcon } from '@radix-icons/vue'
import { h } from 'vue'
import type { dataSchema } from './schema'
import type { DataCfg } from '~/components/custom/datatable/components/DataTable'
import CircleFull from '~/components/custom/datatable/components/icons/circle-full.vue'

export const dataCfg: DataCfg<keyof dataSchema> = {
  id: {
    title: "VULNID",
    isFilter: true,
  },

  name: {
    title: "Título",
    isFilter: true,
  },

  severity: {
    title: "Criticidade",
    isFilter: true,
    options: [
      {
        value: 'low',
        label: 'Low',
        icon: h(CircleFull),
        class: 'text-yellow-500'
      },
      {
        value: 'medium',
        label: 'Medium',
        icon: h(CircleFull),
        class: 'text-orange-500'
      },
      {
        value: 'high',
        label: 'High',
        icon: h(CircleFull),
        class: 'text-red-600'
      },
      {
        value: 'critical',
        label: 'Crítico',
        icon: h(CircleFull),
        class: 'text-zinc-700'
      },
    ],
  },

  host: {
    title: "Host",
    isFilter: true,
  },

  status: {
    title: "Status",
    isFilter: true,
    options: [
      {
        value: 'OPEN',
        label: 'Open',
        icon: h(CircleIcon),
      },
      {
        value: 'CLOSED',
        label: 'Closed',
        icon: h(CheckCircledIcon),
      },
    ],
  },

  description: {
    title: "Descrição",
    isFilter: false,
  },
}