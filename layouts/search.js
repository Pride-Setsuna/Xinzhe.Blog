import { useState, useEffect } from 'react'
import BlogPost from '@/components/BlogPost'
import Container from '@/components/Container'
import Tags from '@/components/Common/Tags'
import PropTypes from 'prop-types'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'

const SearchLayout = ({ tags, posts, currentTag }) => {
  const [searchValue, setSearchValue] = useState('')
  const { locale } = useRouter()
  const t = lang[locale]

  let filteredBlogPosts = []
  if (posts) {
    filteredBlogPosts = posts.filter((post) => {
      const tagContent = post.tags ? post.tags.join(' ') : ''
      const searchContent = post.title + post.summary + tagContent
      return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })
  }

  // 新增状态变量 showTags，用于控制是否显示标签
  const [showTags, setShowTags] = useState(true)

  // 在搜索结果发生变化时，更新 showTags 状态
  useEffect(() => {
    // 只有当搜索框中有输入时，才更新 showTags 状态
    if (searchValue !== '') {
      if (filteredBlogPosts.length > 0) {
        setShowTags(false)
      } else {
        setShowTags(true)
      }
    } else {
      // 当搜索框为空时，根据 currentTag 的值来更新 showTags 状态
      if (currentTag) {
        setShowTags(false)
      } else {
        setShowTags(true)
      }
    }
  }, [filteredBlogPosts, searchValue, currentTag])

  return (
    <Container>
      <div className='relative'>
        <input
          type='text'
          placeholder={
            currentTag
              ? `${t.SEARCH.ONLY_SEARCH} #${currentTag}`
              : `${t.SEARCH.PLACEHOLDER}`
          }
          className='w-full bg-white dark:bg-gray-600 shadow-md rounded-lg outline-none focus:shadow p-3'
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <svg
          className='absolute right-3 top-3 h-5 w-5 text-gray-400'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          ></path>
        </svg>
      </div>
      <div className='article-container my-8'>
        {!filteredBlogPosts.length && (
          <p className='text-gray-500 dark:text-gray-300'>
            {t.SEARCH.NOT_FOUND}
          </p>
        )}
        {/* 只有当 showTags 为 true 时才渲染 Tags 组件 */}
        {showTags && <Tags tags={tags} currentTag={currentTag} />}
        {filteredBlogPosts.slice(0, 20).map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </Container>
  )
}
SearchLayout.propTypes = {
  posts: PropTypes.array.isRequired,
  tags: PropTypes.object.isRequired,
  currentTag: PropTypes.string
}
export default SearchLayout