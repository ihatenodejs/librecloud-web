import { createElement } from 'react';
import type { LoaderPlugin } from 'fumadocs-core/source';
import type { IconType } from 'react-icons/lib';

type IconCollection = Record<string, IconType>;

interface ReactIconsPluginOptions {
  /**
   * Map of icon set prefixes to their exported components.
   * The prefix is matched against the start of the icon name (case-insensitive).
   */
  collections?: Record<string, IconCollection>;
  defaultIcon?: string;
}

export function reactIconsPlugin(
  options: ReactIconsPluginOptions = {},
): LoaderPlugin {
  const entries = Object.entries(options.collections ?? {}).map(([prefix, mod]) => [
    prefix.toLowerCase(),
    mod,
  ] as const);

  const resolveIcon = (iconName?: string) => {
    const targetName = iconName ?? options.defaultIcon;
    if (!targetName) return;

    const lowered = targetName.toLowerCase();

    let iconModule: IconCollection | undefined;

    for (const [prefix, mod] of entries) {
      if (lowered.startsWith(prefix)) {
        iconModule = mod;
        break;
      }
    }

    if (!iconModule) {
      for (const [, mod] of entries) {
        if (targetName in mod) {
          iconModule = mod;
          break;
        }
      }
    }

    if (!iconModule) {
      console.warn(
        `[react-icons-plugin] Unknown icon set for ${targetName}. Ensure its collection is configured.`,
      );
      return;
    }

    const Icon = iconModule[targetName];

    if (!Icon) {
      console.warn(
        `[react-icons-plugin] Unknown icon detected: ${targetName}. Ensure it exists in the configured collection.`,
      );
      return;
    }

    return createElement(Icon);
  };

  const replaceIcon = <T extends { icon?: unknown }>(node: T) => {
    if (node.icon === undefined) {
      if (options.defaultIcon) {
        const resolved = resolveIcon();

        if (resolved !== undefined) {
          node.icon = resolved;
        }
      }

      return node;
    }

    if (typeof node.icon === 'string') {
      const resolved = resolveIcon(node.icon);

      if (resolved !== undefined) {
        node.icon = resolved;
      }
    }

    return node;
  };

  return {
    name: 'react-icons-plugin',
    transformPageTree: {
      file: replaceIcon,
      folder: replaceIcon,
      separator: replaceIcon,
    },
  };
}
