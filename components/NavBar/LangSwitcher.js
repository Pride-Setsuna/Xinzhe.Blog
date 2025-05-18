import { TranslateIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import { useEffect as useIsomorphicLayoutEffect } from 'react'

const LangSwitcher = ({ showLangMenu, setShowLangMenu, showMenu, setShowMenu }) => {
  const router = useRouter()
  const { locale, asPath, pathname, query } = router
  const menuRef = useRef(null)

  // 语言配置
  const languages = [
    { code: 'zh', name: '中文' },
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' }
  ]

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowLangMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuRef, setShowLangMenu])

  // 滚动时自动关闭语言切换器
  useEffect(() => {
    if (!showLangMenu) return;
    const handleScroll = () => {
      setShowLangMenu(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showLangMenu, setShowLangMenu]);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        aria-label='LangSwitcher'
        onClick={() => {
          setShowLangMenu((prev) => {
            if (!prev) setShowMenu(false)
            return !prev
          })
        }}
        className='p-2 ml-1 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg dark:text-gray-100'
      >
        <TranslateIcon className='h-5 w-5' />
      </button>
      
      {showLangMenu && (
        <div className="absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="language-menu">
            {languages.map((lang) => {
              // 只在文章详情页做特殊处理
              if (query.slug) {
                // 文章详情页
                return (
                  <div
                    key={lang.code}
                    className={`block px-4 py-2 text-sm cursor-pointer ${
                      locale === lang.code
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    role="menuitem"
                    onClick={async () => {
                      setShowLangMenu(false)
                      // 统一 slug 组名（去除 -en/-ja 后缀）
                      let baseSlug = query.slug.replace(/(-en|-ja)$/,'')
                      let targetSlug = baseSlug
                      if (lang.code === 'en') targetSlug = `${baseSlug}-en`
                      else if (lang.code === 'ja') targetSlug = `${baseSlug}-ja`
                      // 检查是否有对应slug的文章
                      const res = await fetch(`/api/check-slug?slug=${targetSlug}`)
                      const data = await res.json()
                      if (data.found) {
                        router.push(`/${targetSlug}`, `/${targetSlug}`, { locale: lang.code })
                      } else {
                        router.push('/404')
                      }
                    }}
                  >
                    {lang.name}
                  </div>
                )
              } else {
                // 其它页面保持原有逻辑
                return (
                  <Link
                    key={lang.code}
                    href={asPath}
                    locale={lang.code}
                    scroll={false}
                    onClick={() => setShowLangMenu(false)}
                  >
                    <div
                      className={`block px-4 py-2 text-sm cursor-pointer ${
                        locale === lang.code
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      role="menuitem"
                    >
                      {lang.name}
                    </div>
                  </Link>
                )
              }
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default LangSwitcher
