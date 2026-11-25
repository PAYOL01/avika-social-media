self.addEventListener('install',()=>self.skipWaiting());

self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));

self.addEventListener('push',e=>{
  let d={};
  try{d=e.data.json()}catch{};
  e.waitUntil(self.registration.showNotification('AVIKA Social',{
    body:d.body||'New activity — open AVIKA',
    icon:'./icon-192.png',
    tag:d.tag||'avika',
    data:{url:self.registration.scope}
  }));
});

self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil((async()=>{
    const list=await self.clients.matchAll({
      type:'window',
      includeUncontrolled:true
    });
    const c=list.find(x=>x.url.startsWith(self.registration.scope));
    if(c)return c.focus();
    return self.clients.openWindow(self.registration.scope);
  })());
});
