#!/usr/bin/env bun

import { chdir, cwd } from 'node:process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { postInstall } from 'fumadocs-mdx/next';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const docsDir = resolve(projectRoot, 'docs');

const previousCwd = cwd();

try {
  chdir(docsDir);
  await postInstall('source.config.ts', '.source');
} catch (error) {
  console.error('[docs:generate] failed to build MDX source:', error);
  process.exitCode = 1;
} finally {
  chdir(previousCwd);
}
