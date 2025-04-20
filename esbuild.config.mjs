// build.ts
import { build, initialize } from 'esbuild-wasm';
import { globby } from 'globby';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

await initialize({
  wasmURL: 'https://unpkg.com/esbuild-wasm@0.20.2/esbuild.wasm',
});

const files = await globby('src/**/*.ts');

await build({
  entryPoints: files,
  outdir: 'build',
  platform: 'node',
  format: 'esm', // Or 'cjs'
  target: ['node20'],
  bundle: false,
  resolveExtensions: ['.ts', '.js'],
});

await execAsync('node fix-extensions.js'); // or .ts with tsx/esr
