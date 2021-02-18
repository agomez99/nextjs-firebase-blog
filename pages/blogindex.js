
import 'semantic-ui-css/semantic.min.css'
import styles from '@styles/index.module.scss';
import { getPosts } from '@lib/firebase';
import { Layout } from '@components';
export { default as Icon } from '../components/Icon/Icon'
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
  <div className={styles.HomePage}>
    <h1>All Blogs</h1>
    {posts.map((post) => (
      <article key={post.slug}>
        <img src={post.coverImage} alt={post.coverImageAlt} style={{height:"50px"}}/>
        <div>
          <h2>{post.title}</h2><p>{getFormattedDate(post.dateCreated)}</p>
          <p
            dangerouslySetInnerHTML={{
              __html: `${post.content.substring(0, 300)}...`,
            }}
          ></p>
          <a href={`/post/${post.slug}`}>Continue Reading</a>

        </div>
      </article>
    ))}
  </div>
  </Layout>
);


export async function getServerSideProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}

export default HomePage;
