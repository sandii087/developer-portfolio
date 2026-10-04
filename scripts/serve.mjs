import http from 'node:http';
import { readFile, watch } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const directory = resolve(root,'dist');
const production = process.argv.includes('--production');
await build();
const port = Number(process.env.PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.pdf':'application/pdf','.svg':'image/svg+xml','.png':'image/png','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8'};
const server = http.createServer(async (req,res) => {
  try {
    const path = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const target = resolve(directory,'.'+path+(path.endsWith('/')?'index.html':''));
    if (!target.startsWith(directory+sep)) {res.writeHead(403);return res.end('Forbidden');}
    if (!['GET','HEAD'].includes(req.method)) {res.writeHead(405,{'Allow':'GET, HEAD'});return res.end();}
    const file = await readFile(target);
    res.writeHead(200,{'Content-Type':types[extname(target)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':production?'public, max-age=300':'no-store'});
    res.end(req.method==='HEAD'?undefined:file);
  } catch {
    res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
    res.end(await readFile(resolve(directory,'404.html')));
  }
});
server.listen(port,'127.0.0.1',()=>console.log(`Portfolio running at http://localhost:${port}`));
if(!production) {
  let rebuilding = false;
  for(const dir of ['src','public']) (async()=>{
    for await(const event of watch(resolve(root,dir),{recursive:true})) {
      if(rebuilding)continue;
      rebuilding=true;
      // Fresh process ensures ES module content changes are reloaded.
      const {spawn} = await import('node:child_process');
      const child = spawn(process.execPath,[resolve(root,'scripts/build.mjs')],{stdio:'inherit'});
      child.on('exit',()=>{rebuilding=false;});
    }
  })().catch(error=>console.error('Watch unavailable; rerun npm run build after edits:',error.message));
}
