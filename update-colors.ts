import fs from 'fs';
import path from 'path';

function walk(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('ui')) results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/text-slate-900/g, 'text-foreground');
  content = content.replace(/text-slate-800/g, 'text-foreground');
  content = content.replace(/text-slate-700/g, 'text-muted-foreground');
  content = content.replace(/text-slate-600/g, 'text-muted-foreground');
  content = content.replace(/text-slate-500/g, 'text-muted-foreground');
  content = content.replace(/text-slate-400/g, 'text-muted-foreground');
  content = content.replace(/bg-slate-300/g, 'bg-border');
  content = content.replace(/bg-slate-200/g, 'bg-border');
  content = content.replace(/bg-slate-100/g, 'bg-muted');
  content = content.replace(/bg-slate-50/g, 'bg-card');
  content = content.replace(/border-slate-300/g, 'border-border');
  content = content.replace(/border-slate-200/g, 'border-border');
  content = content.replace(/border-slate-100/g, 'border-border');
  content = content.replace(/text-slate-300/g, 'text-muted-foreground');
  content = content.replace(/bg-white\/95/g, 'bg-background\/95');
  content = content.replace(/bg-white/g, 'bg-background');
  content = content.replace(/text-black/g, 'text-primary-foreground');
  fs.writeFileSync(file, content);
});
