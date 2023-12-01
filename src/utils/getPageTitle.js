import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Test-IT Request System'

export default function getPageTitle(pageTitle) {
  return pageTitle ? `${pageTitle} - ${title}` : `${title}`
}
