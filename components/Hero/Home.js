import BLOG from '@/blog.config'
import Link from 'next/link'
import Avatar from './NotionAvatar.js'
import Social from '../Common/Social.js'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import { useState } from 'react'
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

  const clickCopy = async () => {
    setShowCopied(true)
    navigator.clipboard.writeText(BLOG.link + '/feed')
    setTimeout(() => {
      setShowCopied(false)
    }, 1000)
  }

  // 如果没有获取到对应语言的blockMap，显示一个静态的多语言欢迎语
  const renderStaticContent = () => {
    if (locale === 'en') {
      return (
        <div>
          <h1 className="text-3xl font-bold mb-2">Hello, I'm {BLOG.author}. Welcome to my blog!</h1>
          <p className="mb-4">Here you will find:</p>
          <ul className="list-disc ml-5 mb-4">
            <li className="mb-2">A fresh and interesting personal weekly newsletter</li>
            <li className="mb-2">Notes from my personal studies and learnings</li>
            <li className="mb-2">Daily thoughts and musings</li>
          </ul>
        </div>
      )
    } else if (locale === 'ja') {
      return (
        <div>
          <h1 className="text-3xl font-bold mb-2">こんにちは、{BLOG.author}です。ブログへようこそ！</h1>
          <p className="mb-4">ここでは以下のものを見つけることができます：</p>
          <ul className="list-disc ml-5 mb-4">
            <li className="mb-2">新鮮で面白い個人的な週刊ニュースレター</li>
            <li className="mb-2">個人的な学習からのノート</li>
            <li className="mb-2">日々の考えやつぶやき</li>
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          <h1 className="text-3xl font-bold mb-2">你好，我是{BLOG.author}。欢迎来到我的博客！</h1>
          <p className="mb-4">这里有：</p>
          <ul className="list-disc ml-5 mb-4">
            <li className="mb-2">一份新鲜有趣的个人周刊</li>
            <li className="mb-2">一些个人学习归纳的笔记</li>
            <li className="mb-2">以及日常的碎碎念</li>
          </ul>
        </div>
      )
    }
  }

  return (
    <>
      <div className='container mx-auto flex px-5 py-2 mb-10 md:flex-row flex-col items-center'>
        <div className='flex flex-col md:w-3/5 md:items-start mb-6 md:mb-0 text-left'>
          {blockMap ? (
            <NotionRenderer
              className='md:ml-0'
              blockMap={blockMap}
              frontMatter={{}}
              subPageTitle={null}
            />
          ) : (
            renderStaticContent()
          )}
          <Social />
          <div className='flex flex-col sm:flex-row sm:justify-center gap-4 mt-6'>
            {/*注释掉联系按钮*/}
            {/*
            <Link passHref href='/contact' scroll={false}>
              <button className='w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 inline-flex py-3 px-5 rounded-lg items-center'>
                <MailIcon className='inline-block text-gray-600 dark:text-day h-7 w-7 mt-1' />
                <span className='ml-4 flex items-start flex-col leading-none'>
                  <span className='text-xs text-gray-600 dark:text-day mb-1'>
                    {t.HERO.HOME.CONTACT_BUTTON_DES}
                  </span>
                  <span className='font-medium'>{t.HERO.HOME.CONTACT_BUTTON}</span>
                </span>
              </button>
            </Link>
            */}
            
            {/*注释掉RSS订阅按钮*/}
            {/*
            {showCopied ? (
              <button
                disabled
                className='bg-gray-200 dark:bg-gray-600 inline-flex py-3 px-5 rounded-lg items-center'
              >
                <ClipboardCheckIcon className='inline-block text-gray-600 dark:text-day h-7 w-7' />
                <span className='ml-4 flex items-start flex-col leading-none'>
                  <span className='text-xs text-gray-600 dark:text-day mb-1'>
                    {t.HERO.RSS_BUTTON_DES_COPIED}
                  </span>
                  <span className='font-medium'>
                    {t.HERO.RSS_BUTTON_COPIED}
                  </span>
                </span>
              </button>
            ) : (
              <button
                onClick={() => clickCopy()}
                className='bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 inline-flex py-3 px-5 rounded-lg items-center'
              >
                <RssIcon className='inline-block text-gray-600 dark:text-day h-7 w-7' />
                <span className='ml-4 flex items-start flex-col leading-none'>
                  <span className='text-xs text-gray-600 dark:text-day mb-1'>
                    {t.HERO.RSS_BUTTON_DES}
                  </span>
                  <span className='font-medium'>{t.HERO.HOME.RSS_BUTTON}</span>
                </span>
              </button>
            )}
            */}
          </div>
        </div>
        <div className='w-2/5 flex items-end'>
          <Avatar className='text-gray-600 dark:text-gray-300' />
        </div>
      </div>
    </>
  )
}

export default Hero
