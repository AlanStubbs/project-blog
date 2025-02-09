import { BLOG_TITLE } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers"
import RSS from 'rss';

export async function GET() {
    const blogPostList = await getBlogPostList() as any[];

    const rootUrl = 'http://localhost:3000';

    const feed = new RSS({ title: BLOG_TITLE, feed_url: `${rootUrl}/rss.xml`, site_url: rootUrl })

    blogPostList.map(({ slug, title, abstract, publishedOn }) => {
        feed.item({ url: `${rootUrl}/${slug}`, title, description: abstract, date: publishedOn })

    });

    return new Response(
        feed.xml(),
        {
            headers: {
                'Content-Type': 'text/xml',
            },
        }
    )
}