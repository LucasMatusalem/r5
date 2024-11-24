<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { BackendApi } from "~/services/backend-api";
import { ref, computed } from "vue";

const api = new BackendApi();
const { data: companies } = api.getCompanies();

// Store selected company and search query
const selectedCompany = ref(companies.value?.[0]?.id || '');
const searchQuery = ref('');

// Filter companies based on search
const filteredCompanies = computed(() => {
  if (!searchQuery.value) return companies.value;
  return companies.value?.filter(company => 
    company.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Get selected company name for display
const selectedCompanyName = computed(() => {
  return companies.value?.find(c => c.id === selectedCompany.value)?.name || '';
});

// Handle company selection
function selectCompany(companyId: string) {
  selectedCompany.value = companyId;
  api.setTenantId(companyId);
}
</script>

<template>
  <div class="min-w-[180px]">
    <Select v-model="selectedCompany">
      <SelectTrigger class="h-8">
        <SelectValue :placeholder="selectedCompanyName" />
      </SelectTrigger>
      <SelectContent>
        <Command>
          <CommandInput 
            placeholder="Buscar empresa..." 
            v-model="searchQuery"
            class="h-8"
          />
          <CommandList>
            <CommandEmpty>Nenhuma empresa encontrada.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="company in filteredCompanies"
                :key="company.id"
                :value="company"
                @select="() => selectCompany(company.id)"
              >
                {{ company.name }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </SelectContent>
    </Select>
  </div>
</template>