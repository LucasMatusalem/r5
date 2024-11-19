import type { dataSchema } from "./schema";
import type { DataCfg } from "~/components/custom/datatable/components/DataTable";


export const dataCfg: DataCfg<keyof dataSchema> = {
  id: {
    title: "VULNID",
    isFilter: false,
  },

  tid: {
    title: "Vulnerabilidade",
    isFilter: true
  },

  name: {
    title: "Título",
    isFilter: true,
  },

  host: {
    title: "Host",
    isFilter: true,
  },

  ip: {
    title: "IP",
    isFilter: true,
  },

  description: {
    title: "Descrição",
    isFilter: false,
  },
}