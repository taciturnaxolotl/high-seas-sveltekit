<script lang="ts">
  import { Dialog, Label, Separator } from "bits-ui";
  import { fade } from "svelte/transition";
  import X from "lucide-svelte/icons/x";
  import LockKeyholeOpen from "lucide-svelte/icons/lock-keyhole-open";
  import { flyAndScale } from "$lib/utils";

  // biome-ignore lint/style/useConst: cannot bind to a constant in Svelte
  export let open = false;
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
        >Stage Ship</Dialog.Title
      >
      <Separator.Root class="-mx-5 mb-6 mt-5 block h-px bg-surface0" />
      <Dialog.Description class="text-sm">
        It's time to draft a ship! Don't worry, you'll be able to change it
        later and review your project before it's sent off to the Wonderdome!
      </Dialog.Description>

      <!-- Dialog content -->
      <div class="flex flex-col items-start gap-4 pb-11 pt-4">
        <div class="w-full space-y-1">
          <Label.Root for="shipName" class="text-sm font-medium"
            >Ship name</Label.Root
          >
          <div class="relative w-full">
            <input
              id="shipName"
              class="inline-flex h-input w-full items-center rounded-md border border-surface1 bg-surface0 px-4 text-sm hover:border-dark-40 focus:outline-none focus:ring-2 focus:ring-surface1 focus:ring-offset-2 focus:ring-offset-surface1"
              placeholder="Orpheus Finder"
              type="text"
              autocomplete="off"
            />
          </div>
        </div>

        <div class="w-full space-y-1">
          <Label.Root for="repoUrl" class="text-sm font-medium"
            >Repo URL</Label.Root
          >
          <div class="relative w-full">
            <input
              id="repoUrl"
              class="inline-flex h-input w-full items-center rounded-md border border-surface1 bg-surface0 px-4 text-sm hover:border-dark-40 focus:outline-none focus:ring-2 focus:ring-surface1 focus:ring-offset-2 focus:ring-offset-surface1"
              placeholder="https://github.com/OrpheusNetwork/orpheus-finder"
              type="text"
              autocomplete="off"
            />
          </div>
        </div>

        <div class="w-full space-y-1">
          <Label.Root for="readmeUrl" class="text-sm font-medium"
            >README URL</Label.Root
          >
          <div class="relative w-full pb-1">
            <input
              id="readmeUrl"
              class="inline-flex h-input w-full items-center rounded-md border border-surface1 bg-surface0 px-4 text-sm hover:border-dark-40 focus:outline-none focus:ring-2 focus:ring-surface1 focus:ring-offset-2 focus:ring-offset-surface1"
              placeholder="https://raw.githubusercontent.com/OrpheusNetwork/orpheus-finder/refs/heads/main/README.md"
              type="text"
              autocomplete="off"
            />
          </div>
          <Label.Root for="readmeUrl" class="text-sm font-medium text-green"
            >URL looks good!</Label.Root
          >
        </div>

        <div class="w-full space-y-1">
          <Label.Root for="demoUrl" class="text-sm font-medium"
            >Demo URL</Label.Root
          >
          <div class="relative w-full">
            <input
              id="demoUrl"
              class="inline-flex h-input w-full items-center rounded-md border border-surface1 bg-surface0 px-4 text-sm hover:border-dark-40 focus:outline-none focus:ring-2 focus:ring-surface1 focus:ring-offset-2 focus:ring-offset-surface1"
              placeholder="https://orpheus-finder.vercel.app/"
              type="text"
              autocomplete="off"
            />
          </div>
        </div>

        <div class="w-full space-y-1">
          <Label.Root for="screenshotUrl" class="text-sm font-medium"
            >Screenshot URL</Label.Root
          >
          <div class="relative w-full">
            <input
              id="screenshotUrl"
              class="inline-flex h-input w-full items-center rounded-md border border-surface1 bg-surface0 px-4 text-sm hover:border-dark-40 focus:outline-none focus:ring-2 focus:ring-surface1 focus:ring-offset-2 focus:ring-offset-surface1"
              placeholder="https://cdn.skyfall.dev/agi-demo-do-not-leak.png"
              type="text"
              autocomplete="off"
            />
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex w-full justify-end">
        <Dialog.Close
          class="inline-flex h-10 items-center justify-center rounded-md bg-mauve px-[50px] text-[15px] font-semibold text-black shadow-sm hover:bg-mauve/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base focus-visible:ring-offset-2 focus-visible:ring-offset-surface0 active:scale-98"
        >
          Save
        </Dialog.Close>
      </div>
      <Dialog.Close
        class="absolute right-5 top-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface1 focus-visible:ring-offset-[2px] focus-visible:ring-offset-surface0 active:scale-98"
      >
        <div>
          <X class="size-5 text-text" />
          <span class="sr-only">Close</span>
        </div>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
