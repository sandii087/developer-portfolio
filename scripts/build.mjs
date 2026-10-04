import { mkdir, rm, cp, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage } from '../src/page.mjs';
import { defaultSiteUrl } from '../src/content.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
export async function build() {
  const siteUrl = process.env.SITE_URL || defaultSiteUrl;
  if (siteUrl && !/^https:\/\/[^\s?#]+$/.test(siteUrl)) throw new Error('SITE_URL must be an absolute HTTPS URL without query parameters.');
  await rm(resolve(root,'dist'), {recursive:true,force:true});
  await mkdir(resolve(root,'dist'), {recursive:true});
  await cp(resolve(root,'public'),resolve(root,'dist'),{recursive:true});
  await writeFile(resolve(root,'dist/index.html'),renderPage(siteUrl));
  const origin = siteUrl.replace(/\/$/,'');
  const basePath = siteUrl ? new URL(siteUrl).pathname.replace(/\/?$/, '/') : '/';
  await writeFile(resolve(root,'dist/robots.txt'), `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}`);
  if(origin) await writeFile(resolve(root,'dist/sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin.replace(/&/g,'&amp;')}</loc></url></urlset>`);
  await writeFile(resolve(root,'dist/404.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Sandeep Yadav</title><link rel="stylesheet" href="${basePath}styles.css"></head><body><main class="shell section"><p class="eyebrow">404</p><h1>This page isn’t here.</h1><p>Explore Sandeep’s projects or get in touch from the home page.</p><a class="button primary" href="${basePath}">Return home</a></main></body></html>`);
  console.log('Built static portfolio → dist/');
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
