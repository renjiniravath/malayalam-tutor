import type { MetadataRoute } from 'next';

/** PWA manifest (PLAN.md §11): installable, standalone, offline lessons. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Learn Malayalam',
    short_name: 'Malayalam',
    description: 'Learn conversational Malayalam, the way Kerala actually talks.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f6f2',
    theme_color: '#1d7044',
    icons: [
      { src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icons/icon-maskable.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
