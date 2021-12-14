import Head from 'next/head'
import { Image } from "react-datocms";
import Link from 'next/link';
import { request } from "../lib/datocms";
import styles from '../styles/Posts.module.css'
import {responsiveImage} from '../utils/queryHelpers'

const POSTS_QUERY = `
  query Posts {
    allPosts(first: "10") {
      title
      slug
      heroImage {
        ${responsiveImage()}
      }
    }
  }
`;

// export async function getStaticProps() {
//   const data = await request({
//     query: POSTS_QUERY
//   });
//   return {
//     props: { ...data }
//   };
// }

export async function getServerSideProps() {
  const data = await request({
    query: POSTS_QUERY
  });
  return {
    props: { ...data }
  };
}

export default function Posts({ allPosts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Posts</title>
      </Head>
      <h1>All Posts</h1>
      <ul className={styles.postsGrid}>
        {
          allPosts.map(item => (
            <li key={item.slug} className={styles.postsGridLink}>
              <Link href={`/post/${item.slug}`}>
                <div>
                  <Image data={item.heroImage.responsiveImage} />
                  <h3>{item.title}</h3>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
