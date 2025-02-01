<script lang="ts">
  import "../app.css";
  import "@fontsource-variable/inter";

  import Header from "$lib/components/header.svelte";
  const { children } = $props();
</script>

<Header />
<main class="pb-2">
  {@render children()}
</main>
