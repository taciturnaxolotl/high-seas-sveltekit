<script lang="ts">
  import { Dialog, Label, Separator } from "bits-ui";
  import { fade } from "svelte/transition";
  import { flyAndScale } from "$lib/utils";
  import Button from "$lib/components/button.svelte";
  import X from "lucide-svelte/icons/x";
  import OpenAI from "openai";
  import { onMount } from "svelte";
  import { PUBLIC_OPENAI_API_KEY } from "$env/static/public";

  let openai: OpenAI | undefined = $state();
  onMount(() => {
    // FIXME: get rid of cors proxy
    openai = new OpenAI({
      //  baseURL: "https://ai.hackclub.com",
      apiKey: PUBLIC_OPENAI_API_KEY,
      // FIXME: DO NOT SHIP THIS, AI.HACKCLUB.COM IS DOWN
      dangerouslyAllowBrowser: true, // ai.hackclub.com is public ;)
    });
  });

  // biome-ignore lint/style/useConst: cannot bind to a constant in Svelte
  let { open = $bindable(false) } = $props();
  let aiResponse = $state("");
  let generating = $state(false);

  async function generateIdea() {
    if (!openai) return;
    aiResponse = "";
    generating = true;

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 1.3,
      messages: [
        {
          role: "user",
          content: `Generate a 30-40 word software project idea that is fun and engaging.
             Ideally, It should be a 10-30 hour project. It could be a game, tool,
             website, bot, you name it - as long as it's fun and engaging! Please don't
             make Tic Tac Toe, calculator, or any other simple projects like that. No yapping,
             include the idea only. Only generate a single 30-40 word idea. No sub-ideas or
             explanations. Don't create a storytelling project or anything like that.
             ${Math.random()}`,
        },
      ],
      stream: true,
    });
    for await (const chunk of stream) {
      aiResponse += chunk.choices[0]?.delta?.content || "";
    }

    generating = false;
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay
      transition={fade}
      transitionConfig={{ duration: 150 }}
      class="fixed inset-0 z-50 bg-crust/80"
    />
    <Dialog.Content
      transition={flyAndScale}
      class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-lg border border-surface0 bg-base p-5 shadow-sm outline-none sm:max-w-[490px] md:w-full"
    >
      <Dialog.Title
        class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
        >Generate Idea</Dialog.Title
      >
      <Separator.Root class="-mx-5 mb-6 mt-5 block h-px bg-surface0" />
      <Dialog.Description class="text-sm">
        Need some help thinking of an idea? No problem! We'll generate one for
        you.
      </Dialog.Description>

      <!-- Dialog content -->
      <div class="flex flex-col items-start gap-4 pb-2 pt-4">
        <Button
          variant="primary"
          onclick={() => generateIdea()}
          disabled={openai === undefined || generating}>Generate idea</Button
        >
        {#if aiResponse}
          <div class="bg-surface0 p-4 rounded shadow">
            {aiResponse}
          </div>
        {/if}
        <Dialog.Close
          class="absolute right-5 top-5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface1 focus-visible:ring-offset-[2px] focus-visible:ring-offset-surface0 active:scale-98"
        >
          <div>
            <X class="size-5 text-text" />
            <span class="sr-only">Close</span>
          </div>
        </Dialog.Close>
      </div></Dialog.Content
    >
  </Dialog.Portal>
</Dialog.Root>
