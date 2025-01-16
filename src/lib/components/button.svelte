<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  const colors = {
    primary: "bg-mauve text-black",
    secondary: "bg-sky text-black",
    surface0: "bg-surface0 text-text",
    surface1: "bg-surface1 text-text",
  };

  interface Props extends HTMLButtonAttributes {
    variant?: keyof typeof colors;
    children: Snippet;
  }

  const { variant = "surface0", children, ...restProps }: Props = $props();
</script>

<button
  class={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 transition duration-150 active:scale-90 ${colors[variant]} h-10 px-4 py-2`}
  {...restProps}
>
  {@render children()}
</button>
