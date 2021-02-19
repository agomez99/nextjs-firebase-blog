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

import {FacebookShareButton, FacebookIcon} from "react-share";
import {TwitterShareButton, TwitterIcon} from "react-share";
import {LinkedinShareButton, LinkedinIcon} from "react-share";

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
        <title>Austines Blog</title>
        <meta property="og:url" content="https://agdevblog.vercel.app"/>
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Blog"/>
        <meta property="og:description"
          content="My blog as developer"
        />
        <meta property="og:image" content="https://coverimages.igi-global.com/images-e-content-pro/metadata-in-publishing.png"/>
      
        <meta property="fb:app_id" content="134816985125175" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Austine's Blog"/>
        <meta name="twitter:description" content="My Blog As A Developer"/>
        <meta name="twitter:image" content="https://coverimages.igi-global.com/images-e-content-pro/metadata-in-publishing.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        
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
          <label>Share</label>
          <FacebookShareButton
            url={"https://agdevblog.vercel.app/"}
            quote={post.title}
            hashtag="#webdeveloper">
            <FacebookIcon size={36}  round={true}/>
          </FacebookShareButton>
          <TwitterShareButton
            url={"https://agdevblog.vercel.app/"}
            quote={post.title}
            related="austine_gomez"
            hashtag="#webdeveloper">
            <TwitterIcon size={36}  round={true}/>
          </TwitterShareButton>          
          <LinkedinShareButton
            url={"https://agdevblog.vercel.app/"}
            quote={post.title}
            summary="My Blog as A Web Developer">
            <LinkedinIcon size={36}  round={true}/>
          </LinkedinShareButton>
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