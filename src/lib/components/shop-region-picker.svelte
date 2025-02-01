<script lang="ts">
  import { Select, type Selected } from "bits-ui";
  import { ChevronsUpDown, Check, Globe } from "lucide-svelte";
  import { flyAndScale } from "$lib/utils";
  import { regions } from "../regionPicker";

  // biome-ignore lint/style/useConst: cannot bind to a constant in Svelte
  let { region = $bindable() }: { region: Selected<string> } = $props();
</script>

<Select.Root items={regions} bind:selected={region}>
  <Select.Trigger
    class="inline-flex bg-surface0 py-3 px-4 w-[296px] items-center rounded-md px-[11px] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-surface0 focus:ring-offset-2 focus:ring-offset-overlay0"
    aria-label="Select a region"
  >
    <Globe class="mr-[9px] size-6 text-muted-foreground" />
    <Select.Value class="text-sm" placeholder="Select a region" />
    <ChevronsUpDown class="ml-auto size-6 text-overlay0" />
  </Select.Trigger>
  <Select.Content
    class="w-full rounded-xl border border-surface0 bg-mantle px-1 py-3 shadow-popover outline-none"
    transition={flyAndScale}
    sideOffset={8}
  >
    {#each regions as region}
      <Select.Item
        class="flex h-10 w-full select-none items-center rounded-md py-3 pl-5 pr-1.5 text-sm outline-none transition-all duration-75 data-[highlighted]:bg-surface0"
        value={region.value}
        label={region.label}
      >
        {region.label}
        <Select.ItemIndicator class="ml-auto" asChild={false}>
          <Check />
        </Select.ItemIndicator>
      </Select.Item>
    {/each}
  </Select.Content>
  <Select.Input name="regionSelected" />
</Select.Root>
