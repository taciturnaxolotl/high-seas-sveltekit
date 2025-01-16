import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import catppuccin from '@catppuccin/tailwindcss';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {}
  },

  plugins: [typography, forms, catppuccin({ defaultFlavour: "mocha" })]
} satisfies Config;
