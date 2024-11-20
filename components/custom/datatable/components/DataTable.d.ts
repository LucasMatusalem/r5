export type DataCfg<T = string> = Record<T, {
  options?: {
    value: string,
    label: string,
    icon?: ReturnType<typeof h>,
    class?: string,
  }[],
  title: string,
  isFilter: boolean,
}>;

export type TableCfg<SchemaKeys = string> = {
  dataCfg: DataCfg<SchemaKeys>,
  options: {
    showFilters: boolean,
    showPagination: boolean,
    inputFilters: SchemaKeys[],
  }
}