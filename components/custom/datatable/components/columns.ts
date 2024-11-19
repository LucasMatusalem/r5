import type { ColumnDef } from "@tanstack/vue-table";

import { h } from "vue";
import DataTableColumnHeader from "./DataTableColumnHeader.vue";
import type { DataCfg } from "./DataTable";

export const getColumns = (data: DataCfg): ColumnDef<any, any>[] => {
  const dataKeys = Object.keys(data);
  const columns: ColumnDef<any>[] = dataKeys.map((key) => {
    return {
      accessorKey: key,
      header: ({ column }: { column: any }) =>
        h(DataTableColumnHeader, { column, title: data[key].title }),
      cell: ({ row }: { row: any }) => {
        {
          const keyOptions = data[key].options;
          if (!keyOptions)
            return h("div", { class: "" }, row.getValue(key));
          const option = keyOptions.find(
            (option) => option.value === row.getValue(key)
          );

          if (!option) return h("div", { class: "" }, row.getValue(key));
          return h("div", { class: "flex items-center" }, [
            option.icon &&
              h(option.icon, { class: "mr-2 mt-0.5 h-4 w-4 " + option.class }),
            h("span", {}, option.label),
          ]);
        }
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
      enableSorting: true,
      enableHiding: false,
    };
  });
  return columns;
};
