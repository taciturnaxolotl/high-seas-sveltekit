<script lang="ts">
  import SignIn from "./sign-in.svelte";
  import Button from "./button.svelte";
  import { page } from "$app/state";

  const { slackSession, person } = page.data;
</script>

<header>
  <div class="flex gap-2 items-center px-4 py-3 border-b-[1px] border-surface1">
    <h1 class="text-xl">High Seas Astro</h1>
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
          <Button>Sign in with Slack</Button>
        </SignIn>
      {/if}
    </div>
  </div>
</header>
