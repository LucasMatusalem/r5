import type { TableCfg } from "~/components/custom/datatable/components/DataTable";
import type { dataSchema } from "./schema";
import { dataCfg } from "./data-cfg";

export const tableCfg: TableCfg<keyof dataSchema> = {
  dataCfg: dataCfg,
  options: {
    showFilters: true,
    showPagination: true,
    inputFilters: ["id", "host", 'domain', 'ip'],
    pageSize: 20,
  }
}