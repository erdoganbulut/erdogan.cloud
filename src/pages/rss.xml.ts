import rss from "@astrojs/rss"

import { getBlogPosts, getBlogSlug } from "@/lib/blog"

export async function GET(context: { site: URL | undefined }) {
  const posts = await getBlogPosts("en")

  return rss({
    title: "Erdoğan Bulut",
    description: "Blog posts.",
    site: context.site ?? new URL("https://erdogan.cloud"),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${getBlogSlug(post)}/`,
    })),
    customData: "<language>en-us</language>",
  })
}
