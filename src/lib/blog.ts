import { getCollection, type CollectionEntry } from "astro:content"

export type BlogLocale = "en" | "tr"

export async function getBlogPosts(locale: BlogLocale) {
  const posts = await getCollection("blog")

  return posts
    .filter((post) => post.data.locale === locale)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
}

export function getBlogSlug(post: CollectionEntry<"blog">) {
  return post.id.split("/").slice(1).join("/")
}

export function formatBlogDate(date: Date, locale: BlogLocale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}
