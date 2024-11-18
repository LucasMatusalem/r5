import type { ColumnDef } from '@tanstack/vue-table'
import type { Task } from '../data/schema'

import { h } from 'vue'
import { data } from '../data/data'
import DataTableColumnHeader from './DataTableColumnHeader.vue'

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'VULNID' }),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('id')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Título' }),
  },
  {
    accessorKey: 'criticality',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Criticidade' }),
    cell: ({ row }) => {
      const criticality = data.criticality.options.find(
        criticality => criticality.value === row.getValue('criticality'),
      )

      if (!criticality)
        return null

      return h('div', { class: 'flex items-center' }, [
        criticality.icon && h(criticality.icon, { class: 'mr-2 mt-0.5 h-4 w-4 ' + criticality.class }),
        h('span', {}, criticality.label),
      ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Host' }),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Status' }),

    cell: ({ row }) => {
      const status = data.status.options.find(
        status => status.value === row.getValue('status'),
      )

      if (!status)
        return null

      return h('div', { class: 'flex w-[100px] items-center' }, [
        status.icon && h(status.icon, { class: 'mr-2 h-4 w-4 text-muted-foreground' }),
        h('span', status.label),
      ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Descrição' }),
  },
]