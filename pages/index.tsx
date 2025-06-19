import { GetStaticProps } from 'next';
import Head from 'next/head';
import { siteConfig } from '../lib/config';
import { getBlogPosts } from '../lib/notion';

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getBlogPosts(siteConfig.notionPageId);
  return {
    props: { posts },
    revalidate: 60
  };
};

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
      </Head>
      <main>
        <h1>{siteConfig.name}</h1>
        <p>{siteConfig.description}</p>
        {posts.length === 0 ? (
          <p>No posts yet. Add one in Notion.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}