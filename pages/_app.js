import '../styles/globals.css'
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/posts">Posts</Link>
        </nav>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
