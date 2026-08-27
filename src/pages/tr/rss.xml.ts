import rss from "@astrojs/rss"

import { getBlogPosts, getBlogSlug } from "@/lib/blog"

export async function GET(context: { site: URL | undefined }) {
  const posts = await getBlogPosts("tr")

  return rss({
    title: "Erdoğan Bulut",
    description: "Blog yazıları.",
    site: context.site ?? new URL("https://erdogan.cloud"),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/tr/blog/${getBlogSlug(post)}/`,
    })),
    customData: "<language>tr-tr</language>",
  })
}
