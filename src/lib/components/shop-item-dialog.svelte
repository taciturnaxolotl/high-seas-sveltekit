<script lang="ts">
  import { Dialog, Separator } from "bits-ui";
  import { fade } from "svelte/transition";
  import { flyAndScale } from "$lib/utils";
  import X from "lucide-svelte/icons/x";
  import type { ShopItem } from "$lib/server/shop";

  // biome-ignore lint/style/useConst: cannot bind to a constant in Svelte
  let {
    open = $bindable(false),
    item = $bindable(),
  }: { open: boolean; item: ShopItem } = $props();
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay
      transition={fade}
      transitionConfig={{ duration: 150 }}
      class="fixed inset-0 z-50 bg-crust/80"
    />
    <Dialog.Content
      transition={flyAndScale}
      class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-[94%] sm:max-w-[490px] md:w-full max-h-[90vh] rounded-lg border border-surface0 bg-base p-5 shadow-sm outline-none overflow-hidden flex flex-col"
    >
      <Dialog.Title
        class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
        >View "{item.name}"</Dialog.Title
      >
      <Separator.Root class="-mx-5 mb-6 mt-5 block h-px bg-surface0" />

      <!-- Dialog content -->
      <div class="flex flex-col gap-4 py-4 overflow-y-auto scrollbar">
        <div class="prose w-full max-w-none antialiased">
          {@html item.description || "<i>No description provided</i>"}
        </div>
        {#if item.fulfillment_description}
          <hr />
          <div class="prose w-full max-w-none antialiased">
            {@html item.fulfillment_description}
          </div>
        {/if}
        {#if item.limited_qty}
          <div
            class="bg-blue text-blue-900 px-3 py-2 rounded shadow font-semibold w-full max-w-none"
          >
            Limited quantity available!
          </div>
        {/if}
        {#if item.customs_likely}
          <div
            class="bg-yellow text-yellow-900 px-3 py-2 rounded shadow font-semibold w-full max-w-none"
          >
            Customs may apply outside of US!
          </div>
        {/if}
        <Dialog.Close
          class="absolute right-5 top-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface1 focus-visible:ring-offset-[2px] focus-visible:ring-offset-surface0 active:scale-98"
        >
          <div>
            <X class="size-5 text-text" />
            <span class="sr-only">Close</span>
          </div>
        </Dialog.Close>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
