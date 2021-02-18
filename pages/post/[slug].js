import { deletePost, getPostBySlug } from '@lib/firebase';
import { useRouter } from 'next/router';
import styles from '@styles/post.module.scss';
import { getFormattedDate } from '@lib/utils';
import { Icon, Layout } from '@components';
import { useAuth } from '@contexts/auth';
import 'semantic-ui-css/semantic.min.css'
import Disqus from '../../components/Disqus';
import {Divider} from 'semantic-ui-react'
const PostPage = ({ post }) => {
    const router = useRouter();
    if (!post && typeof window !== 'undefined') {
        router.push('/404');
        return;
    }

    if (!post) {
        return null;
    }

    const [user] = useAuth();

    return (
        <Layout>
            <div className={styles.PostPage}>
                <img src={post.coverImage} alt={post.coverImageAlt} />
                <Divider />

                <div>
                    <h1>{post.title}</h1>

                    {user && (
                    <span>
                        <a href={`/edit/${post.slug}`}>
                            <Icon name="pencil-alt" />
                        </a>
                        <button onClick={() => {
                                const shouldDeletePost = confirm(
                                    'Are you sure you want to delete this post?',
                                );
                                if (shouldDeletePost) {
                                    deletePost(post.slug).then(() => {
                                        router.push('/');
                                    });
                                }
                            }}
                        >
                            <Icon name="trash-alt" />
                        </button>
                    </span>
                    )}
                </div>

                <br></br>
                <span>Published {getFormattedDate(post.dateCreated)}</span>
                <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
            </div>
            <Divider />
            <div style={{display:"flex", marginTop:"5%"}}>
            <img src="https://spotify-now-playing-woad.vercel.app/api/spotify-playing" style={{display:"inlineFlex", margin:"auto"}} lt="Spotify Now Playing" width="50%"/>
            </div>
            <Divider />

            <div>
            <Disqus />

            </div>
        </Layout>
    );
};



export async function getServerSideProps(context) {
    const post = await getPostBySlug(context.query.slug);

    return {
        props: {
            post,
        },
    };
}

export default PostPage;
