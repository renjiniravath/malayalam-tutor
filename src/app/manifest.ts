import type { MetadataRoute } from 'next'

/** Web app manifest (CLAUDE.md: installable PWA, standalone display). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Learn Malayalam',
    short_name: 'Malayalam',
    description: 'Learn Malayalam — the way Kerala actually talks.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafaf9',
    theme_color: '#fafaf9',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
