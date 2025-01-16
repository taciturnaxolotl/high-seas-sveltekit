import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import catppuccin from '@catppuccin/tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', ...fontFamily.sans],
      },
    },
  },

  plugins: [typography, forms, catppuccin({ defaultFlavour: "mocha" })]
} satisfies Config;
