<script lang="ts">
  import ShopRegionPicker from "$lib/components/shop-region-picker.svelte";
  import ShopItemDialog from "$lib/components/shop-item-dialog.svelte";
  import Button from "$lib/components/button.svelte";
  import { regions } from "$lib/regionPicker";
  import { page } from "$app/state";
  import type { ShopItem } from "$lib/server/shop";

  const { shopItems, person } = page.data;
  // biome-ignore lint/style/useConst: svelte moment
  let region = $state(regions[0]);
  // biome-ignore lint/style/useConst: svelte moment
  let regionValue = $derived(region.value);
  const regionKey = $derived.by(() => {
    switch (regionValue) {
      case "eu-uk":
        return "enabledEu";
      case "us":
        return "enabledUs";
      case "australia":
        return "enabledAu";
      case "india":
        return "enabledIn";
      case "canada":
        return "enabledCa";
      default:
        return "enabledXx";
    }
  });

  const availableShopItems = $derived.by(() => {
    return shopItems
      .filter((item) => item[regionKey])
      .map((item) => {
        const price = region.value === "us" ? item.priceUs : item.priceGlobal;
        return {
          ...item,
          price,
          canAfford: (person?.doubloonsBalance || 0) > price,
        };
      })
      .sort((a, b) => a.price - b.price);
  });

  let shopItemDialogOpen = $state(false);
  let shopItemDialogItem = $state<ShopItem | null>(null);

  function openShopItemDialog(item: ShopItem) {
    shopItemDialogItem = item;
    shopItemDialogOpen = true;
  }
</script>

<svelte:head>
  <title>Shop - High Seas v2</title>
</svelte:head>

<div class="m-6 space-y-3">
  <div class="mb-6 text-center flex justify-center flex-col">
    <h1 class="text-4xl text-center font-black mb-1">Shop</h1>
    <p class="mb-4">Choose a region to view the items available!</p>
    <div><ShopRegionPicker bind:region /></div>
  </div>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each availableShopItems as item}
      <button class="h-full" onclick={() => openShopItemDialog(item)}>
        <div class="bg-surface0 shadow p-4 rounded-lg h-full flex flex-col">
          <div class="flex-grow">
            <h2 class="text-xl font-bold">{item.name}</h2>
            <p class="text-sm text-muted-foreground mb-2">
              {@html item.subtitle}
            </p>
            <p class="text-lg font-medium">
              {item.price} doubloons
            </p>
            {#if item.imageUrl}
              <img
                src={item.imageUrl}
                alt="Image for {item.name}"
                class="rounded-lg mt-4"
              />
            {/if}
          </div>
          <a href="/api/buy?itemId={item.id}" target="_blank" class="w-full">
            <Button
              variant="surface1"
              class="w-full hover:bg-mauve hover:text-black duration-250 mt-4"
              disabled={!item.canAfford}
              onclick={(event) => event.stopPropagation()}
              >{item.canAfford
                ? "Buy"
                : `${item.price - (person?.doubloonsBalance || 0)} more doubloons needed`}</Button
            >
          </a>
        </div>
      </button>
    {/each}
  </div>
</div>
{#if shopItemDialogItem}
  <ShopItemDialog
    bind:open={shopItemDialogOpen}
    bind:item={shopItemDialogItem}
  />
{/if}
