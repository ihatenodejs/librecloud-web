import { docs } from '../.source';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { reactIconsPlugin } from './react-icons-plugin';
import * as simpleIcons from 'react-icons/si';
import * as tablerIcons from 'react-icons/tb';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  plugins: [
    reactIconsPlugin({
      collections: {
        si: simpleIcons,
        tb: tablerIcons,
      },
    }),
    lucideIconsPlugin(),
  ],
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}

${processed}`;
}
