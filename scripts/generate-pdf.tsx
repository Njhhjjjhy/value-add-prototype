import path from 'node:path';
import { createElement } from 'react';
import ReactPDF, { Font } from '@react-pdf/renderer';

async function main() {
  const projectRoot = process.cwd();

  const originalRegister = Font.register.bind(Font);
  (Font as unknown as { register: (opts: { src: unknown; [k: string]: unknown }) => void }).register = (opts) => {
    if (typeof opts.src === 'string' && opts.src.startsWith('/') && !opts.src.startsWith('/Users')) {
      opts.src = path.join(projectRoot, 'public', opts.src.replace(/^\//, ''));
    }
    originalRegister(opts as Parameters<typeof originalRegister>[0]);
  };

  const { default: InvestmentMemo } = await import('../src/components/pdf/InvestmentMemo');

  const outPath = path.join(projectRoot, 'MoreHarvest-Investment-Memo-Kumamoto.pdf');
  await ReactPDF.renderToFile(createElement(InvestmentMemo), outPath);
  console.log(`wrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
