// External sites can require login, show bot challenges, or sleep. HTTP 200 is
// reachability evidence, not proof that a certificate/profile is accessible.
import { renderPage } from '../src/page.mjs';
import { writeFile } from 'node:fs/promises';
const html=renderPage();
const urls=[...new Set([...html.matchAll(/href="(https:[^"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&')))];
const results=[];
for(let start=0;start<urls.length;start+=6){
  const batch=await Promise.all(urls.slice(start,start+6).map(async url=>{
    try{
      const response=await fetch(url,{signal:AbortSignal.timeout(45000),headers:{'User-Agent':'Mozilla/5.0 PortfolioLinkCheck/1.0'}});
      const body=await response.text();
      const title=(body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]||'').replace(/\s+/g,' ').trim();
      const challenged=/checking your browser|recaptcha|security verification|captcha/i.test(title);
      return {url,status:response.status,finalUrl:response.url,title,verification:challenged?'browser challenge — manual check needed':response.ok?'HTTP reachable — content not independently verified':'HTTP error'};
    }catch(error){return {url,error:error.message,verification:'unverified'};}
  }));
  results.push(...batch);
  batch.forEach(r=>console.log(r.status||'UNVERIFIED',r.url,r.verification));
}
await writeFile(new URL('../docs/link-checks.json',import.meta.url),JSON.stringify({checkedAt:new Date().toISOString(),results},null,2));
if(results.some(r=>r.status>=400||r.error))process.exitCode=1;
