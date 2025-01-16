<script lang="ts">
  import Pill from "$lib/components/pill.svelte";
  import Button from "$lib/components/button.svelte";
  import { page } from "$app/state";

  const { ships } = page.data;
</script>

<ul class="m-6 space-y-3">
  <div class="mb-6">
    <h1 class="text-4xl text-center font-black mb-4">Shipyard</h1>
    <div class="flex justify-center gap-2">
      <Button variant="primary">Draft a ship</Button>
      <Button variant="surface0">Generate an idea</Button>
    </div>
  </div>
  <ol class="space-y-2.5">
    {#each ships! as ship}
      <li
        class="rounded-lg bg-surface0 shadow-sm flex flex-col sm:gap-2 sm:flex-row items-start sm:items-center p-4 hover:bg-surface1 transition-colors duration-200"
      >
        <div class="flex gap-4 items-center">
          <div class="w-16 h-16 relative mb-4 sm:mb-0 sm:mr-4 flex-shrink-0">
            <img
              src={ship.screenshotUrl}
              alt={`Screenshot of ${ship.title}`}
              class="object-cover w-full h-full absolute top-0 left-0 rounded"
            />
          </div>
          <h2 class="text-xl font-semibold text-left mb-2 sm:hidden block">
            {ship.title}
          </h2>
        </div>
        <div class="flex-grow">
          <h2 class="text-xl font-semibold text-left mb-2 sm:block hidden">
            {ship.title}
          </h2>
          <div class="flex flex-wrap items-start gap-2 text-sm">
            {#if ship.paidOut}
              <Pill>{ship.doubloonPayout} doubloons</Pill>
            {/if}
            {#if ship.creditedHours != null}
              <Pill>{Math.round(ship.creditedHours * 10) / 10} hours</Pill>
              <Pill>
                {Math.round((ship.doubloonPayout / ship.creditedHours) * 10) /
                  10} doubloons/hr</Pill
              >
            {/if}
          </div>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-auto">
          <Button variant="secondary">Ship an update!</Button>
        </div>
      </li>
    {/each}
  </ol>
</ul>
