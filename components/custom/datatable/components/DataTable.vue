<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FlexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { ref } from "vue";
import { Loader2Icon } from "lucide-vue-next";
import DataTablePagination from "./DataTablePagination.vue";
import DataTableToolbar from "./DataTableToolbar.vue";
import { getColumns } from "./columns";
import type { TableCfg } from "./DataTable";
import { valueUpdater } from "../datatable-utils";

interface DataTableProps {
  data: any[];
  tableCfg: TableCfg;
}
const props = defineProps<DataTableProps>();

const columns = getColumns(props.tableCfg.dataCfg) as ColumnDef<any, any>[];
const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const globalFilter = ref("");
const rowSelection = ref({});

const isLoading = ref(false);

const emit = defineEmits(["showModal"])

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return columns;
  },
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
    get globalFilter() {
      return globalFilter.value;
    },
  },
  enableRowSelection: false,
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, rowSelection),
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  globalFilterFn: (row, columnId, value) => {
    const searchableColumns = props.tableCfg.options.inputFilters;
    const searchValue = value.toLowerCase();
    return searchableColumns.some((columnName) => {
      const cellValue = row.original[columnName];
      return cellValue
        ? String(cellValue).toLowerCase().includes(searchValue)
        : false;
    });
  },
  onGlobalFilterChange: (updaterOrValue) => {
    globalFilter.value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(globalFilter.value)
        : updaterOrValue;
  },
});
</script>

<template>
  <div class="space-y-4">
    <DataTableToolbar
      :table="table"
      :table-cfg="props.tableCfg"
      v-if="props.tableCfg.options.showFilters"
    />
    <div class="rounded-lg border relative">
      <Table class="bg-card">
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <div
              v-if="isLoading"
              class="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm"
            >
              <Loader2Icon class="h-8 w-8 animate-spin text-primary" />
            </div>
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
              class="cursor-pointer"
              @click="$emit('showModal', row.original.id)"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                  class="truncate max-w-[600px]"
                />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else-if="!isLoading">
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <DataTablePagination
      :table="table"
      v-if="props.tableCfg.options.showPagination"
    />
  </div>
</template>
