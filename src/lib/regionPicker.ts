import type { Selected } from "bits-ui";

export const regions = [
  { value: "eu-uk", label: "EU/UK" },
  { value: "us", label: "US" },
  { value: "australia", label: "Australia" },
  { value: "india", label: "India" },
  { value: "canada", label: "Canada" },
  { value: "global", label: "Other countries worldwide" },
] as Selected<string>[];
