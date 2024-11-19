import { CheckCircledIcon } from "@radix-icons/vue";
import { CircleIcon } from "@radix-icons/vue";
import { h } from "vue";
import CircleFull from "@/components/custom/datatable/components/icons/circle-full.vue";
import type { dataSchema } from "./schema";
import type { DataCfg } from "~/components/custom/datatable/components/DataTable";


export const dataCfg: DataCfg<keyof dataSchema> = {
  id: {
    title: "VULNID",
    isFilter: false,
  },

  tid: {
    title: "Vulnerabilidade",
    isFilter: false
  },

  name: {
    title: "Título",
    isFilter: false,
  },

  host: {
    title: "Host",
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

  ip: {
    title: "IP",
    isFilter: true,
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

  },

  description: {
    title: "Descrição",
    isFilter: false,
  },
}