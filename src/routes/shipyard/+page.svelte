<script lang="ts">
  import Pill from "$lib/components/pill.svelte";
  import Button from "$lib/components/button.svelte";
  import ShipDialog from "$lib/components/ship-dialog.svelte";
  import GenerateIdeaDialog from "$lib/components/generate-idea-dialog.svelte";
  import { page } from "$app/state";
  import ViewShipDialog from "$lib/components/view-ship-dialog.svelte";
  import type { ShipGroup } from "$lib/server/data";

  const { ships } = page.data;

  let shipDialogOpen = $state(false);
  let generateIdeaDialogOpen = $state(false);
  let viewShipDialogOpen = $state(false);
  let viewShipDialogShipGroup = $state<ShipGroup | null>(null);

  function openShipDialog() {
    shipDialogOpen = true;
  }

  function openGenerateIdeaDialog() {
    generateIdeaDialogOpen = true;
  }

  function openViewShipDialog(shipGroup: ShipGroup) {
    viewShipDialogShipGroup = shipGroup;
    viewShipDialogOpen = true;
  }
</script>

<svelte:head>
  <title>Shipyard - High Seas v2</title>
</svelte:head>

<div class="m-6 space-y-3">
  <div class="mb-6">
    <h1 class="text-4xl text-center font-black mb-4">Shipyard</h1>
    <div class="flex justify-center gap-2">
      <Button variant="primary" onclick={openShipDialog}>Draft a ship</Button>
      <Button variant="surface0" onclick={openGenerateIdeaDialog}
        >Generate an idea</Button
      >
    </div>
  </div>
  <ul class="space-y-3">
    {#each ships! as ship}
      <li class="w-full">
        <button
          onclick={() => openViewShipDialog(ship)}
          class="rounded-lg {ship.isInYswsBase
            ? 'border-yellow-200 border-2 text-yellow-200'
            : ''} w-full bg-surface0 hover:bg-surface1 shadow-sm flex flex-col sm:gap-2 sm:flex-row items-start sm:items-center p-4 transition-colors duration-200"
        >
          <div class="flex gap-4 items-center">
            <div class="w-16 h-16 relative mb-4 sm:mb-0 sm:mr-4 flex-shrink-0">
              <img
                src={ship.ships[ship.ships.length - 1].screenshotUrl}
                alt={`Screenshot of ${ship.title}`}
                class="object-cover w-full h-full absolute top-0 left-0 rounded"
              />
            </div>
          </div>
          <div class="flex-grow">
            <h2
              class="text-xl {ship.isInYswsBase
                ? 'font-bold'
                : 'font-semibold'} text-left mb-2 sm:block hidden"
            >
              {ship.title}
            </h2>
            <div class="flex flex-wrap items-start gap-2 text-sm">
              {#if ship.totalDoubloons != null}
                <Pill>{ship.totalDoubloons} doubloons</Pill>
              {/if}
              {#if ship.totalHours != null}
                <Pill>{Math.round(ship.totalHours * 10) / 10} hours</Pill>
                <Pill>
                  {Math.round((ship.totalDoubloons / ship.totalHours) * 10) /
                    10} doubloons/hr</Pill
                >
              {/if}
            </div>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-auto">
            <Button variant="secondary">Ship an update!</Button>
          </div>
        </button>
      </li>
    {/each}
  </ul>
</div>

<ShipDialog bind:open={shipDialogOpen} />
<GenerateIdeaDialog bind:open={generateIdeaDialogOpen} />
{#if viewShipDialogShipGroup}
  <ViewShipDialog
    bind:open={viewShipDialogOpen}
    bind:shipGroup={viewShipDialogShipGroup}
  />
{/if}
