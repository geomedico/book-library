import fs from 'fs/promises';
import { globby } from 'globby';

const files = await globby('build/**/*.js');

for (const file of files) {
  let code = await fs.readFile(file, 'utf8');

  code = code.replace(
    /(import\s.*?from\s+['"])(\.\/[^'"]+?)(?<!\.js)(['"])/g,
    '$1$2.js$3'
  );

  await fs.writeFile(file, code);
  // eslint-disable-next-line no-undef
  console.log(`🛠 Patched ${file}`);
}
