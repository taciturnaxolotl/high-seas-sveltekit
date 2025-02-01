<script lang="ts">
  import ShopRegionPicker from "$lib/components/shop-region-picker.svelte";
  import ShopItemDialog from "$lib/components/shop-item-dialog.svelte";
  import { regions } from "$lib/regionPicker";
  import { page } from "$app/state";
  import type { ShopItem } from "$lib/server/shop";

  const { shopItems } = page.data;
  // biome-ignore lint/style/useConst: svelte moment
  let region = $state(regions[0]);
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
      .sort((a, b) =>
        region.value === "us"
          ? a.priceUs - b.priceUs
          : a.priceGlobal - b.priceGlobal
      );
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

  <div class="grid lg:grid-cols-3 gap-4">
    {#each availableShopItems as item}
      <button class="h-full" onclick={() => openShopItemDialog(item)}>
        <div class="bg-surface0 shadow p-4 rounded-lg h-full">
          <div class="mb-4">
            <h2 class="text-xl font-bold">{item.name}</h2>
            <p class="text-sm text-muted-foreground mb-2">
              {@html item.subtitle}
            </p>
            <p class="text-lg font-medium">
              {region.value === "us" ? item.priceUs : item.priceGlobal} doubloons
            </p>
          </div>
          {#if item.imageUrl}
            <img
              src={item.imageUrl}
              alt="Image for {item.name}"
              class="rounded-lg"
            />
          {/if}
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
