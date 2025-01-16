<script lang="ts">
  const { children } = $props();
</script>

<div
  class="flex gap-1.5 w-fit items-center rounded-full border-[1px] border-surface1 bg-crust px-3 text-sm py-1"
>
  {@render children()}
</div>
