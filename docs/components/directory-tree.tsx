'use client';

import React, { useState, createContext, useContext } from 'react';
import {
  Folder as FolderIcon,
  FolderOpen,
  File as FileIcon,
  ChevronRight,
  ChevronDown,
  FileJson,
  FileType,
  type LucideIcon
} from 'lucide-react';
import {
  TbBrandTypescript,
  TbBrandJavascript,
  TbToml,
  TbFileTypeXml,
  TbSettings,
  TbMarkdown,
  TbFileTypeTxt,
} from "react-icons/tb"
import { SiYaml, SiMdx, SiDocker } from "react-icons/si"
import { cn } from '@/lib/utils';
import type { IconType } from 'react-icons';

const DirectoryTreeContext = createContext<{ compact: boolean }>({ compact: false });

// Unified type for both Lucide and react-icons
type IconComponent = LucideIcon | IconType;

const fileTypeIcons: Record<string, IconComponent> = {
  // TypeScript/JavaScript
  typescript: TbBrandTypescript,
  tsx: TbBrandTypescript,
  ts: TbBrandTypescript,
  javascript: TbBrandJavascript,
  jsx: TbBrandJavascript,
  js: TbBrandJavascript,
  mjs: TbBrandJavascript,
  cjs: TbBrandJavascript,

  // Config/Data files
  json: FileJson,
  yaml: SiYaml,
  yml: SiYaml,
  toml: TbToml,
  xml: TbFileTypeXml,
  ini: TbSettings,
  env: FileType,

  // Documentation
  markdown: TbMarkdown,
  md: TbMarkdown,
  mdx: SiMdx,
  txt: TbFileTypeTxt,

  // Docker
  docker: SiDocker,
  dockerfile: SiDocker,
};

const getFileIcon = (type?: string, name?: string): IconComponent => {
  // Check explicit type prop first
  if (type && fileTypeIcons[type]) {
    return fileTypeIcons[type];
  }

  // Check filename patterns for special files
  if (name) {
    const lowerName = name.toLowerCase();

    // Docker files
    if (
      lowerName === 'dockerfile' ||
      lowerName.startsWith('dockerfile.') ||
      lowerName === 'docker-compose.yml' ||
      lowerName === 'docker-compose.yaml' ||
      lowerName === 'compose.yml' ||
      lowerName === 'compose.yaml'
    ) {
      return SiDocker;
    }

    // TypeScript config files
    if (lowerName === 'tsconfig.json' || lowerName.startsWith('tsconfig.')) {
      return TbBrandTypescript;
    }

    // Env files
    if (lowerName === '.env' || lowerName.startsWith('.env.')) {
      return FileType;
    }

    // Check file extension
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext && fileTypeIcons[ext]) {
      return fileTypeIcons[ext];
    }
  }

  return FileIcon;
};

interface DirectoryTreeProps {
  children: React.ReactNode;
  rootLabel?: string;
  compact?: boolean;
  className?: string;
}

export function DirectoryTree({
  children,
  rootLabel,
  compact = false,
  className
}: DirectoryTreeProps) {
  return (
    <DirectoryTreeContext.Provider value={{ compact }}>
      <div
        className={cn(
          'not-prose rounded-lg border font-mono text-sm mb-4',
          'bg-neutral-50 border-neutral-200',
          'dark:bg-neutral-900 dark:border-neutral-800',
          compact ? 'p-3' : 'p-4',
          className
        )}
      >
        {rootLabel && (
          <div className={cn(
            'flex items-center gap-2 font-semibold',
            'text-neutral-900 dark:text-neutral-100',
            compact ? 'mb-2' : 'mb-3'
          )}>
            <FolderIcon className="h-4 w-4" />
            <span>{rootLabel}</span>
          </div>
        )}
        <div className="space-y-0.5">
          {children}
        </div>
      </div>
    </DirectoryTreeContext.Provider>
  );
}

interface FolderProps {
  name: string;
  children?: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  highlight?: boolean;
  className?: string;
}

export function Folder({
  name,
  children,
  collapsible = false,
  defaultOpen = true,
  highlight = false,
  className
}: FolderProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { compact } = useContext(DirectoryTreeContext);

  const shouldShowOpen = !collapsible || isOpen;

  const ContentElement = collapsible ? 'button' : 'div';

  return (
    <div className={className}>
      <ContentElement
        {...(collapsible && { onClick: () => setIsOpen(!isOpen) })}
        className={cn(
          'flex items-center gap-2 w-full text-left transition-colors rounded',
          collapsible && 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
          highlight && 'bg-amber-50 dark:bg-amber-950/20',
          highlight && 'text-amber-900 dark:text-amber-100',
          !highlight && 'text-neutral-700 dark:text-neutral-300',
          compact ? 'px-1 py-0.5' : 'px-2 py-1'
        )}
      >
        {collapsible && (
          <>
            {isOpen ? (
              <ChevronDown className="h-3.5 w-3.5 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
            )}
          </>
        )}
        {shouldShowOpen ? (
          <FolderOpen className="h-4 w-4 flex-shrink-0" />
        ) : (
          <FolderIcon className="h-4 w-4 flex-shrink-0" />
        )}
        <span className="truncate">{name}</span>
      </ContentElement>
      {shouldShowOpen && children && (
        <div className={cn(
          'border-l ml-2',
          'border-neutral-200 dark:border-neutral-700',
          compact ? 'pl-3 mt-0.5' : 'pl-4 mt-1'
        )}>
          <div className="space-y-0.5">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

interface FileProps {
  name: string;
  type?:
    | 'typescript' | 'tsx' | 'ts'
    | 'javascript' | 'jsx' | 'js' | 'mjs' | 'cjs'
    | 'json'
    | 'yaml' | 'yml' | 'toml' | 'xml' | 'ini' | 'env'
    | 'markdown' | 'md' | 'mdx' | 'txt'
    | 'docker' | 'dockerfile';
  highlight?: boolean;
  className?: string;
}

export function File({
  name,
  type,
  highlight = false,
  className
}: FileProps) {
  const { compact } = useContext(DirectoryTreeContext);
  const Icon = getFileIcon(type, name);

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded transition-colors',
        highlight && 'bg-amber-50 dark:bg-amber-950/20',
        highlight && 'text-amber-900 dark:text-amber-100',
        !highlight && 'text-neutral-600 dark:text-neutral-400',
        compact ? 'px-1 py-0.5' : 'px-2 py-1',
        className
      )}
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      <span className="truncate">{name}</span>
    </div>
  );
}

export default DirectoryTree;