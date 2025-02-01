<script lang="ts">
  import SignIn from "./sign-in.svelte";
  import Button from "./button.svelte";
  import { page } from "$app/state";

  const { slackSession, person } = page.data;
</script>

<header class="bg-surface0">
  <div class="flex gap-2 items-center px-4 py-3 border-b-[1px] border-surface1">
    <div class="flex gap-6 flex-row">
      <h1 class="text-xl">High Seas v2</h1>
      <div class="flex gap-4 items-center">
        <a
          href="/shipyard"
          class="font-semibold transition-colors duration-200"
          class:text-mauve={page.url.pathname === "/shipyard"}>Shipyard</a
        >
        <a
          href="/shop"
          class="font-semibold transition-colors duration-200"
          class:text-mauve={page.url.pathname === "/shop"}>Shop</a
        >
        <a
          href="/debug"
          class="font-semibold transition-colors duration-200"
          class:text-mauve={page.url.pathname === "/debug"}>Debug</a
        >
      </div>
    </div>
    <div class="ml-auto flex gap-2.5 items-center">
      {#if slackSession && person}
        <img
          src={slackSession.pfp}
          alt={slackSession.name}
          class="w-8 h-8 rounded-full"
        />
        <span class="text-xl">{person.doubloonsBalance} doubloons</span>
        <span class="text-xl">Hey, {slackSession.firstName}!</span>
      {:else}
        <SignIn>
          <Button variant="primary">Sign in with Slack</Button>
        </SignIn>
      {/if}
    </div>
  </div>
</header>
