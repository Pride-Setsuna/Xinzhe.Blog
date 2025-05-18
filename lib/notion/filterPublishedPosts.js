export default function filterPublishedPosts({
  posts,
  onlyNewsletter,
  onlyPost,
  onlyHidden,
  onlyNotes,
  onlyProjects,
  onlyBook,
  tagFilter = '',
  locale = ''
}) {
  if (!posts || !posts.length) return []
  return posts
    .filter((post) =>
      onlyNewsletter
        ? post?.type?.[0] === 'Newsletter'
        : post
    )
    .filter((post) =>
      onlyPost
        ? post?.type?.[0] === 'Post'
        : post
    )
    .filter((post) =>
      onlyHidden
        ? post?.type?.[0] === 'Hidden'
        : post?.type?.[0] !== 'Hidden'
    )
    .filter((post) =>
      onlyNotes
        ? post?.type?.[0] === 'Notes'
        : post
    )
    .filter((post) =>
      onlyProjects
        ? post?.type?.[0] === 'Projects'
        : post
    )
    .filter((post) =>
      onlyBook
        ? post?.type?.[0] === 'Book'
        : post
    )
    .filter((post) => {
      return (
        post.title &&
        post.slug &&
        post?.status?.[0] === 'Published' &&
        post.date <= new Date()
      )
    })
    .filter((post) => {
      if (tagFilter && (!post.tags || !post.tags.includes(tagFilter))) {
        return false
      }
      return true
    })
    .filter((post) => {
      if (locale) {
        return post.lang && post.lang[0] === locale
      }
      return true
    })
}
