
const CACHE_NAME = 'way-digital-university-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/App.tsx',
  '/types.ts',
  '/data/mockData.ts',
  '/services/geminiService.ts',
  '/components/icons.tsx',
  '/components/auth/LoginScreen.tsx',
  '/components/common/Chatbot.tsx',
  '/components/common/ProfileDropdown.tsx',
  '/components/common/ProfileModal.tsx',
  '/components/student/StudentDashboard.tsx',
  '/components/student/StudentSectionDetail.tsx',
  '/components/professor/ProfessorDashboard.tsx',
  '/components/professor/CreateSectionModal.tsx',
  '/components/professor/AddContentModal.tsx',
  '/index.tsx'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache, caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // We only want to handle GET requests.
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      const cachedResponse = await cache.match(event.request);
      
      const fetchPromise = fetch(event.request).then(networkResponse => {
        // If the request is successful, clone the response and cache it
        if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      }).catch(err => {
        console.error('Fetch failed from network:', err);
        throw err;
      });

      // Stale-while-revalidate strategy: return cache if available, but always fetch fresh data.
      return cachedResponse || fetchPromise;
    })
  );
});
