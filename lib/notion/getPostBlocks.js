import BLOG from '@/blog.config'
import { NotionAPI } from 'notion-client'
import { getPreviewImageMap } from './previewImages'
import { fetchNotionSmart } from './notionFetchHelper'

export async function getPostBlocks(id) {
  const authToken = BLOG.notionAccessToken || null
  const api = new NotionAPI({ authToken })
  const pageBlock = await fetchNotionSmart(
    `getPostBlocks:${id}`,
    () => api.getPage(id),
    { retries: 5, delay: 2000, throttle: 400 }
  )
  if (BLOG.previewImagesEnabled) {
    const previewImageMap = await getPreviewImageMap(pageBlock)
    pageBlock.preview_images = previewImageMap
  }
  return pageBlock
}
