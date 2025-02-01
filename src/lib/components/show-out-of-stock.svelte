<script lang="ts">
  import { Checkbox, Label } from "bits-ui";
  import { Check } from "lucide-svelte";

  // biome-ignore lint/style/useConst: svelte moment
  let { checked = $bindable(false) } = $props();
</script>

<div class="inline-flex justify-center items-center space-x-3">
  <Checkbox.Root
    id="terms"
    aria-labelledby="terms-label"
    class="peer inline-flex size-[25px] items-center justify-center rounded-md border border-surface0 bg-mauve transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:bg-base data-[state=unchecked]:hover:border-surface1"
    bind:checked
  >
    <Checkbox.Indicator
      let:isChecked
      class="inline-flex items-center justify-center text-base"
    >
      {#if isChecked}
        <Check class="size-[15px]" />
      {/if}
    </Checkbox.Indicator>
  </Checkbox.Root>
  <Label.Root
    id="out-of-stock-label"
    for="out-of-stock"
    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >
    Show items out of stock
  </Label.Root>
</div>
