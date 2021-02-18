// This component represents the index page for the site. You
// can read more about Pages in the Next.js docs at:
// https://nextjs.org/docs/basic-features/pages
import 'semantic-ui-css/semantic.min.css'
import styles from '@styles/index.module.scss';
import {Divider} from 'semantic-ui-react';
import { getPosts } from '@lib/firebase';
import { Layout } from '@components';
export { default as Icon } from '../components/Icon/Icon'
import GoogleAnalytics from "../components/googleAnalytics";
import Head from 'next/head';

const getFormattedDate = (milliseconds) => {
  const formatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  };
  const date = new Date(milliseconds);
  return date.toLocaleDateString(undefined, formatOptions);
};

const HomePage = ({ posts }) => (
  <Layout>
  <Head>
  </Head>
  <GoogleAnalytics />

  <div className={styles.HomePage}>
    <h1>Blog Posts</h1>
    <Divider />
    {posts.map((post) => (
      <article key={post.slug}>
        <img src={post.coverImage} alt={post.coverImageAlt} />
        <div>
          <h2>{post.title}</h2>
          <span>{getFormattedDate(post.dateCreated)}</span>
          <p
            dangerouslySetInnerHTML={{
              __html: `${post.content.substring(0, 200)}...`,
            }}
          ></p>
          <a href={`/post/${post.slug}`}>Continue Reading</a>

        </div>
      </article>
    ))}
  </div>
  </Layout>
);

// This is for fetching data every time the page is visited. We do this
// so that we don't have to redploy the site every time we add a blog post.
// You can read more about this in the Next.js docs at:
// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering

export async function getServerSideProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}

export default HomePage;