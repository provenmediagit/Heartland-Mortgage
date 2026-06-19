import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('components/ui');
const destDir = path.resolve('src/components/ui');

fs.readdirSync(srcDir).forEach(file => {
  fs.renameSync(path.join(srcDir, file), path.join(destDir, file));
});
console.log('done moving');
