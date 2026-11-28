const V="poslab-v32";
const ASSETS=["./","./index.html","./manifest.webmanifest","./icon.svg","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS.map(a=>new Request(a,{cache:"reload"})))).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V&&n.startsWith("poslab-")).map(n=>caches.delete(n)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{ if(e.request.method!=="GET") return; const u=new URL(e.request.url); if(u.origin!==location.origin) return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{ if(res&&res.ok){ const cp=res.clone(); caches.open(V).then(c=>c.put(e.request,cp)); } return res; }).catch(()=>e.request.mode==="navigate"?caches.match("./index.html"):Response.error())));});
