<script lang="ts">
  import { Dialog, Label, Separator } from "bits-ui";
  import { fade } from "svelte/transition";
  import { flyAndScale } from "$lib/utils";
  import X from "lucide-svelte/icons/x";
  import type { ShipGroup } from "$lib/server/data";
  import { micromark } from "micromark";
  import { gfmHtml, gfm } from "micromark-extension-gfm";
  import sanitizeHtml from "sanitize-html";

  // biome-ignore lint/style/useConst: cannot bind to a constant in Svelte
  let {
    open = $bindable(false),
    shipGroup = $bindable(),
  }: { open: boolean; shipGroup: ShipGroup } = $props();

  async function fetchReadme() {
    const latestShip = shipGroup.ships[shipGroup.ships.length - 1];
    const response = await fetch(latestShip.readmeUrl);
    const md = await response.text();
    return sanitizeHtml(
      micromark(md, {
        extensions: [gfm()],
        htmlExtensions: [gfmHtml()],
      })
    );
  }
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
      class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-lg border border-surface0 bg-base p-5 shadow-sm outline-none sm:max-w-[490px] md:w-full"
    >
      <Dialog.Title
        class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
        >View "{shipGroup.title}"</Dialog.Title
      >
      <Separator.Root class="-mx-5 mb-6 mt-5 block h-px bg-surface0" />

      <!-- Dialog content -->
      <div class="flex flex-col items-start gap-4 pb-2 pt-4">
        {#await fetchReadme()}
          <div class="bg-surface0 p-4 rounded shadow">Loading...</div>
        {:then md}
          <div class="prose max-w-full text-text">
            {@html md}
          </div>
        {:catch error}
          <div class="bg-surface0 p-4 rounded shadow">
            Error: {error.message}
          </div>
        {/await}
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
