import Layout from '@/layouts/layout'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'
import NotFound from '@/components/NotFound'

const Post = ({ post, blockMap }) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Loading />
    )
  }
  if (!post) {
    return <NotFound statusCode={404} />
  }
  return (
    <Layout blockMap={blockMap} frontMatter={post} fullWidth={post.fullWidth} />
  )
}

export async function getStaticPaths({ locales }) {
  const posts = await getAllPosts({ onlyNewsletter: false })
  
  // 为每种语言生成路径
  let paths = []
  
  // 为每个语言生成路径
  if (locales) {
    for (const locale of locales) {
      paths = paths.concat(
        posts.map((row) => ({
          params: { slug: row.slug },
          locale
        }))
      )
    }
  } else {
    paths = posts.map((row) => ({
      params: { slug: row.slug }
    }))
  }
  
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params: { slug }, locale }) {
  // 根据slug和当前语言获取对应的内容
  // 比如对于"about"页面:
  // 中文使用 "about"
  // 英文使用 "about-en"
  // 日文使用 "about-ja"
  
  let targetSlug = slug
  if (locale === 'en') {
    if (slug === 'about') {
    targetSlug = 'about-en'
    } else if (slug === 'notes') {
      targetSlug = 'notes-en'
    } else if (slug === 'projects') {
      targetSlug = 'projects-en'
    }
  } else if (locale === 'ja') {
    if (slug === 'about') {
    targetSlug = 'about-ja'
    } else if (slug === 'notes') {
      targetSlug = 'notes-ja'
    } else if (slug === 'projects') {
      targetSlug = 'projects-ja'
    }
  }
  
  const posts = await getAllPosts({ onlyNewsletter: false })
  let post = posts.find((t) => t.slug === targetSlug)
  
  // 如果找不到特定语言的内容，则使用默认内容
  if (!post && targetSlug !== slug) {
    post = posts.find((t) => t.slug === slug)
  }

  if (!post) {
    return {
      props: {
        post: null,
        blockMap: null
      }
    }
  }

  try {
    const blockMap = await getPostBlocks(post.id)
    return {
      props: {
        post,
        blockMap
      },
      revalidate: 1
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        post: null,
        blockMap: null
      }
    }
  }
}

export default Post
