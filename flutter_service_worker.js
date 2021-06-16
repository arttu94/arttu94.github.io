'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "7dd88ffffa31a93f7873d65e7a9955f2",
"assets/assets/images/amongus.gif": "1b32f712f3dd6418a0cd26f67cc6bc72",
"assets/assets/images/blender.png": "c4f7218e1113c1624bf93d399c627214",
"assets/assets/images/bongo.gif": "99a699254ae374747cd43a519bbcb1ab",
"assets/assets/images/cpp.png": "146d0e64b330ac22fa4300d1ac585928",
"assets/assets/images/crow.gif": "745be0adf05846c1e149f7de73669bd3",
"assets/assets/images/csharp.png": "de3c9a135ddfe8ef7e21cf2b88907658",
"assets/assets/images/dimensio.png": "227a4f4e37095c2ddf1f1f83821c857a",
"assets/assets/images/dimensio_gameplay.gif": "205e9e0896f01f724b77ab2edc5f191f",
"assets/assets/images/g950.png": "21c95be30c1e0893fa988a6b659f8b1e",
"assets/assets/images/github-icon.png": "e258b5af9785038e16408ec8fb36d2bd",
"assets/assets/images/github.png": "b857cd7a34dc3fdda04153a74964e44e",
"assets/assets/images/Icon-AG.png": "4916cfe2d7c9d74c1d28cd0344ccce89",
"assets/assets/images/mail.png": "7a0fffc3e7d1cf241ea191eab0cd0d76",
"assets/assets/images/metro_icon.png": "92cc950c0b7b0b493fa975a9e8b5a6f7",
"assets/assets/images/microsoft-store-icon.png": "d6460c6dfffba865cfd87b95f24c6328",
"assets/assets/images/mobile.png": "79141f326a7a766207e74ac179348318",
"assets/assets/images/pathfind.gif": "0df2c82b87cd3fc908b60513cc5cc974",
"assets/assets/images/planes.png": "a831a33a264698df6151cf2560501ff8",
"assets/assets/images/planes_icon.png": "42e89589a428597aeab12fdf141b167a",
"assets/assets/images/planetoblaster.png": "0ae6335d97bbfd39e48ccb0a5d76b1a8",
"assets/assets/images/planeto_icon.png": "60b1196fd857765af9088c3aaa679a61",
"assets/assets/images/play-store-icon.png": "ae945df4bc2587a29799d66b1c1ac654",
"assets/assets/images/substance.png": "bf1dfc40c68943ce72aba47a041d3a9c",
"assets/assets/images/unity.png": "2cfdc95e19e986fbbb1d8a22c624d006",
"assets/assets/images/unreal.png": "e3b2317bf23472838a8fd50c2bbb3063",
"assets/FontManifest.json": "bf083a2007611a33b5b4d75b1eac0b8f",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/fonts/OpenSans/OpenSans-Bold.ttf": "1025a6e0fb0fa86f17f57cc82a6b9756",
"assets/fonts/OpenSans/OpenSans-Light.ttf": "2d0bdc8df10dee036ca3bedf6f3647c6",
"assets/fonts/OpenSans/OpenSans-Regular.ttf": "3ed9575dcc488c3e3a5bd66620bdf5a4",
"assets/fonts/Roboto/Roboto-Bold.ttf": "e07df86cef2e721115583d61d1fb68a6",
"assets/fonts/Roboto/Roboto-Light.ttf": "88823c2015ffd5fa89d567e17297a137",
"assets/fonts/Roboto/Roboto-Regular.ttf": "11eabca2251325cfc5589c9c6fb57b46",
"assets/fonts/Roboto/Roboto-Thin.ttf": "321de678e592d0b8f44f1a82d7ca4b62",
"assets/NOTICES": "c6df21899079f3ba72d509f83183202d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "00bb2b684be61e89d1bc7d75dee30b58",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "4b6a9b7c20913279a3ad3dd9c96e155b",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "dffd9504fcb1894620fa41c700172994",
"favicon.png": "dcbaec14edabe6f8874a8f850a6866bc",
"icons/Icon-192.png": "5006e68949e8bdb8d734f04927d4a36e",
"icons/Icon-512.png": "4916cfe2d7c9d74c1d28cd0344ccce89",
"index.html": "16f0f089de4a31c04431d3eb7661dbf8",
"/": "16f0f089de4a31c04431d3eb7661dbf8",
"main.dart.js": "64fa3dd54ca31af925d0d0b05aa93f8e",
"manifest.json": "f2873832d8cdf4e414c68ec98261fee2",
"version.json": "5357382c75ab340e680958daa009f070"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
