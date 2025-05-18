import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import NewsletterHero from '@/components/Hero/Newsletter'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'

export async function getStaticProps({ locale }) {
  const posts = await getAllPosts({ onlyNewsletter: true, locale })

  const heros = await getAllPosts({ onlyHidden: true })
  let hero
  if (locale === 'en') {
    hero = heros.find((t) => t.slug === 'newsletter-en')
  } else if (locale === 'ja') {
    hero = heros.find((t) => t.slug === 'newsletter-ja')
  } else {
    hero = heros.find((t) => t.slug === 'newsletter')
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

const newsletter = ({ posts, blockMap }) => {
  return (
    <Container title={BLOG.newsletter} description={BLOG.description}>
      <NewsletterHero blockMap={blockMap} />
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </Container>
  )
}

export default newsletter
