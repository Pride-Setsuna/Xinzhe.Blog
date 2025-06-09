import BLOG from '@/blog.config'
import Link from 'next/link'
import Avatar from './NotionAvatar.js'
import Social from '../Common/Social.js'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import {
  MailIcon,
  RssIcon,
  ClipboardCheckIcon
} from '@heroicons/react/outline'
import NotionRenderer from '@/components/Post/NotionRenderer'

const Hero = ({ blockMap }) => {
  const [showCopied, setShowCopied] = useState(false)
  const { locale } = useRouter()
  const t = lang[locale]
  const [showText, setShowText] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setShowText(false)
      } else {
        setShowText(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const clickCopy = async () => {
    setShowCopied(true)
    navigator.clipboard.writeText(BLOG.link + '/feed')
    setTimeout(() => {
      setShowCopied(false)
    }, 1000)
  }

  return (
    <>
      <div className='container mx-auto flex flex-col md:flex-row items-start md:items-end px-5 py-2 mb-10'>

        <div className='flex flex-col md:w-3/5 md:items-start mb-6 md:mb-0 text-left'>
          {blockMap ? (
            <NotionRenderer
              className='md:ml-0'
              blockMap={blockMap}
              frontMatter={{}}
              subPageTitle={null}
            />
          ) : null}
          <Social />
          <div className='flex flex-col sm:flex-row sm:justify-center gap-4 mt-6'>

          </div>
        </div>

        <div className='w-full md:w-2/5 flex justify-center md:justify-end mt-6 md:mt-0'>
          <div className='self-end'>
            <Avatar className='w-28 h-28 md:w-32 md:h-32 text-gray-600 dark:text-gray-300 rounded-full' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
