import type { dataSchema } from './schema'
import type { DataCfg } from '~/components/custom/datatable/components/DataTable'

export const dataCfg: DataCfg<keyof dataSchema> = {
  id: {
    title: "ID",
    isFilter: false,
  },

  domain: {
    title: "Domínio",
    isFilter: true,
  },

  host: {
    title: "Subdomínio",
    isFilter: true,
  },

  firstseen: {
    title: "Visto primeiro",
    isFilter: false,
  },

  lastseen: {
    title: "Visto por último",
    isFilter: false,
  },

  ip: {
    title: "IP",
    isFilter: true,
  },
}