<script lang="ts">
  import { page } from "$app/state";
  const { ships, person } = page.data;
</script>

<a href="#ships" class="text-mauve underline font-semibold">Jump to Ships</a>
<a href="#person" class="text-mauve underline font-semibold">Jump to Person</a>

<h2 class="text-4xl font-black my-2" id="ships">Ships</h2>
{#if ships}
  {#each ships as ship}
    <pre>{JSON.stringify(ship, null, 2)}</pre>
  {/each}
{:else}
  No ships
{/if}

<h2 class="text-4xl font-black my-2" id="person">Person</h2>
<pre>{JSON.stringify(person, null, 2)}</pre>
