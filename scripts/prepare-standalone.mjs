import { access, cp, mkdir } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const standaloneDir = path.join(rootDir, '.next', 'standalone');

async function exists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function copyIntoStandalone(sourceRelativePath, targetRelativePath) {
  const sourcePath = path.join(rootDir, sourceRelativePath);
  const targetPath = path.join(standaloneDir, targetRelativePath);

  if (!(await exists(sourcePath))) {
    return;
  }

  await mkdir(path.dirname(targetPath), { recursive: true });
  await cp(sourcePath, targetPath, { force: true, recursive: true });
}

if (!(await exists(standaloneDir))) {
  throw new Error('Standalone output was not found. Run "next build" first.');
}

await copyIntoStandalone('public', 'public');
await copyIntoStandalone(path.join('.next', 'static'), path.join('.next', 'static'));

console.log('Standalone bundle prepared with public and static assets.');
