import Head from 'next/head'
import { Image } from "react-datocms";
import { request } from "../../lib/datocms";
import {responsiveImage} from '../../utils/queryHelpers';
import styles from '../../styles/Post.module.css';

const ALL_POSTS_QUERY = `
  query AllPosts {
    allPosts {
      slug
    }
  }
`;

const POST_QUERY = `
  query Post($slug: String!) {
    post(filter: {slug: {eq: $slug}}) {
      title
      content
      heroImage {
        ${responsiveImage('fit: crop, w: 1200, h: 500, auto: format')}
      }
    }
  }
`;

// export async function getStaticPaths() {
//   const data = await request({
//     query: ALL_POSTS_QUERY
//   });
//   return {
//     paths: data.allPosts.map(item => {
//       return {
//         params: { slug: item.slug }
//       }
//     }),
//     fallback: true
//   };
// }
//
// export async function getStaticProps({ params }) {
//   const data = await request({
//     query: POST_QUERY,
//     variables: { slug: params.slug}
//   });
//   return {
//     props: { ...data }
//   };
// }

export async function getServerSideProps({ params }) {
  const data = await request({
    query: POST_QUERY,
    variables: { slug: params.slug}
  });
  return {
    props: { ...data }
  };
}

export default function Post({ post }) {
  return (
    <div>
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1>{post.title}</h1>
      <Image data={post.heroImage.responsiveImage} />
      <div className={styles.postContent}>
        {post.content}
      </div>
    </div>
  )
}
