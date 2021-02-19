import { deletePost, getPostBySlug } from '@lib/firebase';
import { useRouter } from 'next/router';
import styles from '@styles/post.module.scss';
import { getFormattedDate } from '@lib/utils';
import { Icon, Layout } from '@components';
import { useAuth } from '@contexts/auth';
import 'semantic-ui-css/semantic.min.css'
import Disqus from '../../components/Disqus';
import {Divider} from 'semantic-ui-react';
import Head from 'next/head';

import {FacebookShareButton, FacebookIcon} from "react-share";
import {TwitterShareButton, TwitterIcon} from "react-share";
import {LinkedinShareButton, LinkedinIcon} from "react-share";
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
                <div style={{float:"right"}}>
                <label>Share</label>
          <FacebookShareButton
            url={"https://agdevblog.vercel.app/post/"+post.slug}
            quote={post.title}
            hashtag="#webdeveloper">
            <FacebookIcon size={40}  round={true}/>
          </FacebookShareButton>
          <TwitterShareButton
            url={"https://agdevblog.vercel.app/post/"+post.slug}
            quote={post.title}
            hashtag="#webdeveloper">
            <TwitterIcon size={40}  round={true}/>
          </TwitterShareButton>          
          <LinkedinShareButton
            url={"https://agdevblog.vercel.app/"}
            quote={post.title}
            summary="My Blog as A Web Developer">
            <LinkedinIcon size={40}  round={true}/>
          </LinkedinShareButton>
          </div>
            <div style={{display:"flex", marginTop:"5%"}}>
            <img src="https://spotify-now-playing-woad.vercel.app/api/spotify-playing" style={{display:"inlineFlex", margin:"auto"}} lt="Spotify Now Playing" width="50%"/>
            </div>
            <Divider />
            </div>

            <Disqus />

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
