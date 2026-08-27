import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

const site = defineCollection({
  loader: glob({ base: "./src/content/site", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locale: z.enum(["en", "tr"]),
    kind: z.enum(["home", "consultancy", "cv"]),
    role: z.string().optional(),
  }),
})

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      locale: z.enum(["en", "tr"]),
      cover: image(),
      coverAlt: z.string(),
    }),
})

export const collections = { site, blog }
