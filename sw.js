/* Phylab service worker. The cache name is stamped from index.html by tools/build-seo-pages.js, so every release is a new cache. */
const V='phylab-bddbb7bf',CORE=['./','index.html','offline.html','manifest.webmanifest','favicon.svg','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(V);
await c.addAll(CORE.map(u=>new Request(u,{cache:'reload'})));/* core must succeed, otherwise the install fails and the old version stays */
try{const t=await(await fetch('sitemap.xml',{cache:'reload'})).text(),b=new URL('./',self.location).href;/* guide pages are best-effort */
await Promise.allSettled([...t.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]).filter(u=>u.startsWith(b)&&u!==b).map(u=>c.add(new Request(u,{cache:'reload'}))))}catch(_){}})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('phylab-')&&k!==V)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('message',e=>{if(e.data==='SKIP_WAITING')self.skipWaiting()});
async function nav(r){const c=await caches.open(V),u=new URL(r.url),key=new Request(u.origin+u.pathname);
try{const res=await Promise.race([fetch(r),new Promise((_,j)=>setTimeout(j,3000))]);
if(res.ok&&res.type=='basic'&&(res.headers.get('content-type')||'').includes('text/html'))c.put(key,res.clone());return res}
catch(_){return await c.match(key)||(u.pathname.endsWith('/')||u.pathname.endsWith('/index.html')?await c.match('index.html'):null)||await c.match('offline.html')}}
async function asset(r){const c=await caches.open(V),m=await c.match(r,{ignoreSearch:true});if(m)return m;
try{const res=await fetch(r);if(res.ok&&res.type=='basic')c.put(r,res.clone());return res}catch(_){return Response.error()}}
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!='GET'||u.origin!=location.origin||r.headers.has('range'))return;
e.respondWith(r.mode=='navigate'?nav(r):asset(r))});
