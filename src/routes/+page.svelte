<script>
  import Button from "$lib/components/button.svelte";
  import highSeasLogo from "$lib/assets/highseas.png";
</script>

<main>
  <div class="flex flex-col items-center justify-center mx-auto px-4 py-16">
    <div class="max-w-4xl mx-auto text-center">
      <img
        src={highSeasLogo}
        alt="High Seas"
        class="sm:w-[50%] mb-4 inline-flex justify-center h-auto"
      />

      <p class="text-xl mb-8 leading-relaxed">
        A faster, nicer to use client for High Seas.
      </p>

      <div class="flex justify-center gap-2">
        <a href="/shipyard"><Button variant="primary">Visit Shipyard</Button></a
        >
        <a href="/shop"><Button>Visit Shop</Button></a>
      </div>
    </div>
  </div>
</main>
