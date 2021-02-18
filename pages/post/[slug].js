import { deletePost, getPostBySlug } from '@lib/firebase';
import { useRouter } from 'next/router';

import styles from '@styles/post.module.scss';
import { getFormattedDate } from '@lib/utils';
import { Icon, Layout } from '@components';
import { useAuth } from '@contexts/auth';

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
                <div>
                    <h1>{post.title}</h1>
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
                </div>

                <br></br>
                <span>Published {getFormattedDate(post.dateCreated)}</span>
                <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
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
