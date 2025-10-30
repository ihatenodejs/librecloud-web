import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Gallery } from './components/gallery';
import { InfoBox } from './components/infobox';
import { DirectoryTree, Folder, File } from './components/directory-tree';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Gallery,
    gallery: Gallery,
    InfoBox,
    infobox: InfoBox,
    DirectoryTree,
    directoryTree: DirectoryTree,
    Folder,
    folder: Folder,
    File,
    file: File,
    ...components,
  };
}
