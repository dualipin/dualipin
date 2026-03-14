import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const collections = {
  work: defineCollection({
    loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
    schema: z.object({
      title: z.string(),
    }),
  }),
};