import { getAllPosts } from '@/lib/notion'

export default async function handler(req, res) {
  const { slug } = req.query
  if (!slug) {
    res.status(400).json({ found: false })
    return
  }
  const posts = await getAllPosts({ onlyNewsletter: false })
  const found = posts.some(post => post.slug === slug)
  res.status(200).json({ found })
} 