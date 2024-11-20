<script setup lang="ts">
import { ref, computed } from "vue";
import type { Column, Table } from "@tanstack/vue-table";
import type { Component } from "vue";
import { debounce } from "lodash-es";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckIcon, PlusCircledIcon } from "@radix-icons/vue";

interface DataTableFacetedFilterOption {
  label: string;
  value: string;
  icon?: Component;
  class?: string;
}

interface DataTableFacetedFilter {
  table: Table<any>;
  column?: Column<any, any>;
  title?: string;
  options?: DataTableFacetedFilterOption[];
  shouldResetFilters?: boolean;
}

const props = defineProps<DataTableFacetedFilter>();
const selectedValues = ref(new Set<string>());
const facets = computed(() => props.column?.getFacetedUniqueValues());
const opts = computed(() => {
  if (props.options) return props.options;
  const uniqueValues = facets.value;
  if (!uniqueValues) return [];
  return Array.from(uniqueValues, ([key]) => ({
    label: key,
    value: key,
    icon: undefined,
    class: undefined,
  }));
});

const debouncedSetFilter = debounce((column, filterValues) => {
  column?.setFilterValue(filterValues.length ? filterValues : undefined);
}, 300);

const toggleSelection = (option: DataTableFacetedFilterOption) => {
  const currentSelectedValues = new Set(selectedValues.value);
  if (currentSelectedValues.has(option.value)) {
    currentSelectedValues.delete(option.value);
  } else {
    currentSelectedValues.add(option.value);
  }

  selectedValues.value = currentSelectedValues;

  const filterValues = Array.from(currentSelectedValues);
  debouncedSetFilter(props.column, filterValues);
};

const clearFilters = () => {
  selectedValues.value.clear();
  props.column?.setFilterValue(undefined);
};

watch(
  () => props.shouldResetFilters,
  () => {
    selectedValues.value.clear();
  }
);
</script>

<template>
  <span v-if="!opts.length"></span>
  <Popover v-else>
    <PopoverTrigger as-child>
      <Button variant="outline" size="sm" class="h-8 border-dashed">
        <PlusCircledIcon class="h-4 w-4" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator orientation="vertical" class="mx-2 h-4" />
          <Badge
            variant="secondary"
            class="rounded-sm px-1 font-normal lg:hidden"
          >
            {{ selectedValues.size }}
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <Badge
              v-if="selectedValues.size > 2"
              variant="secondary"
              class="rounded-sm px-1 font-normal"
            >
              {{ selectedValues.size }}
            </Badge>
            <template v-else>
              <Badge
                v-for="option in opts.filter((o) =>
                  selectedValues.has(o.value)
                )"
                :key="option.value"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                {{ option.label }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0" align="start">
      <Command
        :filter-function="(list: any, term) => list.filter((i:any) => i.label.toLowerCase()?.includes(term)) "
      >
        <CommandInput :placeholder="title" />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in opts"
              :key="option.value"
              :value="option"
              @select="() => toggleSelection(option)"
            >
              <div
                :class="
                  cn(
                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                    selectedValues.has(option.value)
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible'
                  )
                "
              >
                <CheckIcon :class="cn('h-4 w-4')" />
              </div>
              <component
                :is="option.icon"
                v-if="option.icon"
                class="mr-2 h-4 w-4 text-muted-foreground"
              />
              <span>{{ option.label }}</span>
              <span
                v-if="facets?.get(option.value)"
                class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs"
              >
                {{ facets.get(option.value) }}
              </span>
            </CommandItem>
          </CommandGroup>
        </CommandList>

        <template v-if="selectedValues.size > 0">
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              :value="{ label: 'Remover filtros' }"
              class="justify-center text-center"
              @select="clearFilters"
            >
              Remover filtros
            </CommandItem>
          </CommandGroup>
        </template>
      </Command>
    </PopoverContent>
  </Popover>
</template>
