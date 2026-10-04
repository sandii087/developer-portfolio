import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { renderPage } from '../src/page.mjs';
import { profile, skills, projects, education, certifications } from '../src/content.mjs';

const root = fileURLToPath(new URL('../',import.meta.url));
const html = renderPage();
const decode = text => text.replaceAll('&amp;', '&').replaceAll('&#39;', "'");
const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(x=>decode(x[1]));

test('every unique resume link is preserved exactly', async()=>{
  const links = JSON.parse(await readFile(resolve(root,'docs/resume-links.json'),'utf8'));
  for(const {uri} of links) assert(hrefs.includes(uri),`Missing original link: ${uri}`);
});
test('all anchor targets exist and HTML IDs are unique',()=>{
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
  assert.equal(new Set(ids).size,ids.length);
  for(const href of hrefs.filter(x=>x.startsWith('#'))) assert(ids.includes(href.slice(1)),`Missing anchor ${href}`);
});
test('every local href and asset resolves to a real file',async()=>{
  const urls=[...hrefs,...[...html.matchAll(/src="([^"]+)"/g)].map(x=>x[1])];
  for(const path of urls.filter(x=>x.startsWith('./'))) await access(resolve(root,'public',path));
});
test('all resume skills, education, certification dates, and projects are present',()=>{
  for(const group of skills)for(const item of group.items)assert(html.includes(item.replaceAll('&','&amp;')));
  for(const e of education){assert(html.includes(e.name));assert(html.includes(e.result));assert(html.includes(e.school));}
  for(const cert of certifications){assert(html.includes(cert.name));assert(html.includes(cert.date));}
  for(const p of projects)assert(html.includes(p.name));
  assert(html.includes('project-based'));
  assert(!html.includes('under 100 ms'));
  assert(!/\b(lorem ipsum|TODO|placeholder|your name|example\.com)\b/i.test(html));
});
test('semantic, SEO, accessibility, and external-link requirements',()=>{
  assert.equal([...html.matchAll(/<h1[ >]/g)].length,1);
  assert.equal([...html.matchAll(/<main[ >]/g)].length,1);
  assert(html.includes('lang="en"'));
  assert(html.includes('Skip to content'));
  assert(html.includes('name="description"'));
  assert(html.includes('application/ld+json'));
  assert(html.includes('aria-controls="main-nav"'));
  for(const tag of html.matchAll(/<a\b[^>]+>/g)) if(tag[0].includes('target="_blank"'))assert(tag[0].includes('rel="noopener noreferrer"'));
  assert(renderPage('https://portfolio.test').includes('https://portfolio.test/assets/social-card.png'));
});

function element(dataset={}) {
  const attrs = new Map(); const events = {}; const classes = new Set();
  return {dataset,hidden:false,events,attrs,hash:'',textContent:'',content:'',focused:false,
    setAttribute(k,v){attrs.set(k,v);},getAttribute(k){return attrs.get(k);},removeAttribute(k){attrs.delete(k);},
    addEventListener(k,fn){events[k]=fn;},focus(){this.focused=true;},querySelectorAll(){return[];},
    classList:{add(x){classes.add(x);},remove(x){classes.delete(x);},contains(x){return classes.has(x);},toggle(x,on){on?classes.add(x):classes.delete(x);}}
  };
}
async function appHarness(storageBlocked=false){
  const nav=element(),menu=element(),theme=element(),meta=element(),status=element(),filter=element();
  menu.setAttribute('aria-expanded','false');
  const cards=[element({category:'Backend'}),element({category:'Full-stack'}),element({category:'Backend'})];
  const buttons=['All','Backend','Full-stack'].map(x=>element({filter:x}));
  const sections=Object.fromEntries(['about','projects','skills'].map(x=>['#'+x,element()]));
  const links=Object.keys(sections).map(hash=>Object.assign(element(),{hash}));nav.querySelectorAll=()=>links;
  const deeplink=Object.assign(element(),{hash:'#project-devhub'});
  const document={documentElement:element(),events:{},addEventListener(k,f){this.events[k]=f;},getElementById(id){return id==='project-devhub'?cards[1]:null;},querySelector(s){return {'#main-nav':nav,'.menu-toggle':menu,'.theme-toggle':theme,'meta[name="theme-color"]':meta,'.project-filters':filter,'#filter-status':status,...sections}[s];},querySelectorAll(s){return s==='[data-category]'?cards:s==='[data-filter]'?buttons:s==='a[href^="#project-"]'?[deeplink]:[];}};
  const stored={};const window={events:{},location:{hash:''},matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(k,f){this.events[k]=f;}};
  const localStorage={setItem(k,v){if(storageBlocked)throw new Error('blocked');stored[k]=v;},getItem(k){return stored[k];}};
  vm.runInNewContext(await readFile(resolve(root,'public/main.js'),'utf8'),{document,window,localStorage});
  return {nav,menu,theme,cards,buttons,status,stored,document,window,links,sections,deeplink};
}
test('project filters work and a deep link reveals a hidden project',async()=>{
  const app=await appHarness();app.buttons[1].events.click();
  assert.deepEqual(app.cards.map(c=>c.hidden),[false,true,false]);
  assert.equal(app.buttons[1].getAttribute('aria-pressed'),'true');
  assert.equal(app.status.textContent,'2 backend projects shown.');
  app.deeplink.events.click();assert(app.cards.every(c=>!c.hidden));
});
test('mobile menu supports open, close, Escape focus, and navigation',async()=>{
  const app=await appHarness();app.menu.events.click();assert(app.nav.classList.contains('is-open'));
  assert.equal(app.menu.getAttribute('aria-expanded'),'true');
  app.document.events.keydown({key:'Escape'});assert.equal(app.menu.getAttribute('aria-expanded'),'false');assert(app.menu.focused);
  app.menu.events.click();app.links[0].events.click();assert(!app.nav.classList.contains('is-open'));assert(app.sections['#about'].focused);
});
test('theme toggles and remains usable when storage is blocked',async()=>{
  for(const blocked of [false,true]) {
    const app=await appHarness(blocked);app.theme.events.click();
    assert.equal(app.document.documentElement.dataset.theme,'dark');
    assert.equal(app.theme.getAttribute('aria-label'),'Switch to light theme');
    app.theme.events.click();assert.equal(app.document.documentElement.dataset.theme,'light');
  }
});
