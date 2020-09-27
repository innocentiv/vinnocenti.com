const PRECACHE = "precache-v5";

const PRECACHE_URLS = [
  "index.html",
  "./", // Alias for index.html
  "images/cv.svg",
  "images/github.svg",
  "images/linkedin.svg",
  "images/me160.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    );
  }
});
