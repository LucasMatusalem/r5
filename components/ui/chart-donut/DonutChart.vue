<script setup lang="ts" generic="T extends Record<string, any>">
import type { BaseChartProps } from ".";
import { ChartSingleTooltip, defaultColors } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { Donut, type BulletLegendItemInterface } from "@unovis/ts";
import { VisDonut, VisSingleContainer } from "@unovis/vue";
import { useMounted } from "@vueuse/core";
import { type Component, computed, ref } from "vue";

const props = withDefaults(
  defineProps<
    Pick<
      BaseChartProps<T>,
      | "data"
      | "colors"
      | "index"
      | "margin"
      | "showLegend"
      | "showTooltip"
      | "filterOpacity"
    > & {
      /**
       * Sets the name of the key containing the quantitative chart values.
       */
      category: KeyOfT;
      /**
       * Change the type of the chart
       * @default "donut"
       */
      type?: "donut" | "pie";
      /**
       * Function to sort the segment
       */
      sortFunction?: (a: any, b: any) => number | undefined;
      /**
       * Controls the formatting for the label.
       */
      valueFormatter?: (tick: number, i?: number, ticks?: number[]) => string;
      /**
       * Render custom tooltip component.
       */
      customTooltip?: Component;
    }
  >(),
  {
    margin: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
    sortFunction: () => undefined,
    valueFormatter: (tick: number) => `${tick}`,
    type: "donut",
    filterOpacity: 0.2,
    showTooltip: true,
    showLegend: true,
  }
);

const emits = defineEmits<{
  legendItemClick: [d: BulletLegendItemInterface, i: number];
}>();

type KeyOfT = Extract<keyof T, string>;
type Data = (typeof props.data)[number];

const category = computed(() => props.category as KeyOfT);
const index = computed(() => props.index as KeyOfT);

const isMounted = useMounted();
const activeSegmentKey = ref<string>();
const colors = computed(() =>
  props.colors?.length
    ? props.colors
    : defaultColors(
        props.data.filter((d) => d[props.category]).filter(Boolean).length
      )
);

const legendItems = ref<BulletLegendItemInterface[]>(
  props.data.map((item, i) => ({
    name: item[props.index],
    color: colors.value[i],
    inactive: false,
  }))
);

const totalValue = computed(() =>
  props.data.reduce((prev, curr) => {
    return prev + curr[props.category];
  }, 0)
);

// function handleLegendItemClick(d: BulletLegendItemInterface, i: number) {
//   emits("legendItemClick", d, i);
// }
</script>

<template>
  <div :class="cn('w-full h-full flex flex-col justify-around', $attrs.class ?? '')">

    
    <VisSingleContainer
      :style="{ height: isMounted ? '60%' : 'auto' }"
      :margin="{ left: 20, right: 20 }"
      :data="data"
    >
      <ChartSingleTooltip
        :selector="Donut.selectors.segment"
        :index="category"
        :items="legendItems"
        :value-formatter="valueFormatter"
        :custom-tooltip="customTooltip"
      />

      <VisDonut
        :value="(d: Data) => d[category]"
        :sort-function="sortFunction"
        :color="colors"
        :arc-width="type === 'donut' ? 45 : 0"
        :show-background="false"
        :central-label="type === 'donut' ? valueFormatter(totalValue) : ''"
      />

      <slot />
    </VisSingleContainer>

    
    <ChartLegend
      class="!w-full pl-4 pb-2 lg:pb-6 text-center pt-6"
      v-if="showLegend"
      v-model:items="legendItems"
    />
  </div>
</template>
