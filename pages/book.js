import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import BookHero from '@/components/Hero/Book'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'

export async function getStaticProps({ locale }) {
  const posts = await getAllPosts({ onlyBook: true, locale })

  const heros = await getAllPosts({ onlyHidden: true })
  let hero
  if (locale === 'en') {
    hero = heros.find((t) => t.slug === 'book-en')
  } else if (locale === 'ja') {
    hero = heros.find((t) => t.slug === 'book-ja')
  } else {
    hero = heros.find((t) => t.slug === 'book')
  }

  let blockMap
  try {
    blockMap = hero ? await getPostBlocks(hero.id) : null
  } catch (err) {
    console.error(err)
    // return { props: { post: null, blockMap: null } }
  }

  return {
    props: {
      posts,
      blockMap
    },
    revalidate: 1
  }
}

const book = ({ posts, blockMap }) => {
  return (
    <Container title={BLOG.book} description={BLOG.description}>
      <BookHero blockMap={blockMap} />
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </Container>
  )
}

export default book 