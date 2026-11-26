/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "402b66900e731ca748771b6fc5e7a068"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "8d27b41e45069481d736a7e67321a502"
  }, {
    "url": "pwa-512x512.png",
    "revision": "49501159facb63a955530ee2c2e05c32"
  }, {
    "url": "pwa-192x192.png",
    "revision": "9e490123e591c0bff43b3f5cf88aa606"
  }, {
    "url": "index.html",
    "revision": "eec740cd146a21d4b11bac7750703aa3"
  }, {
    "url": "icon.svg",
    "revision": "5008f07c0b8607220417e1d0f09062db"
  }, {
    "url": "favicon.ico",
    "revision": "3e589c94f61b2d59740683a8f04f37f8"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "1288cdfff1363ba0f5f1bf7113cd88d7"
  }, {
    "url": "assets/solutionsIIB-DLlQ2OBl.js",
    "revision": null
  }, {
    "url": "assets/solutionsIIA-hX-7YquZ.js",
    "revision": null
  }, {
    "url": "assets/solutionsIB-VE1RZWq2.js",
    "revision": null
  }, {
    "url": "assets/solutionsIA-BWM8gfqH.js",
    "revision": null
  }, {
    "url": "assets/index-DRg762GY.css",
    "revision": null
  }, {
    "url": "assets/index-CUdnLGGc.js",
    "revision": null
  }, {
    "url": "assets/KaTeX_Typewriter-Regular-CO6r4hn1.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Typewriter-Regular-C0xS9mPB.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size4-Regular-Dl5lxZxV.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size4-Regular-BF-4gkZK.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size3-Regular-CTq5MqoE.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size2-Regular-oD1tc_U0.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size2-Regular-Dy4dx90m.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size1-Regular-mCD8mA8B.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size1-Regular-C195tn64.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Script-Regular-D5yQViql.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Script-Regular-D3wIWfF6.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Regular-DDBCnlJ7.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Regular-CS6fqUqJ.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Italic-DN2j7dab.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Italic-C3H0VqGB.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Bold-DbIhKOiC.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Bold-D1sUS0GD.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Math-Italic-t53AETM-.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Math-Italic-DA0__PXp.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Math-BoldItalic-iY-2wyZ7.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Math-BoldItalic-CZnvNsCZ.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Regular-Dr94JaBh.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Regular-B22Nviop.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Italic-NWA7e6Wa.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Italic-BMLOBm91.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-BoldItalic-SpSLRI95.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-BoldItalic-DxDJ3AOS.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Bold-Jm3AIy58.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Bold-Cx986IdX.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Fraktur-Regular-Dxdc4cR9.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Fraktur-Regular-CTYiF6lA.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Fraktur-Bold-CL6g_b3V.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Fraktur-Bold-BsDP51OF.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Caligraphic-Regular-Di6jR-x-.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Caligraphic-Regular-CTRA-rTL.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Caligraphic-Bold-Dq_IR9rO.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Caligraphic-Bold-BEiXGLvX.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_AMS-Regular-DMm9YOAa.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_AMS-Regular-BQhdFMY1.woff2",
    "revision": null
  }, {
    "url": "assets/aistudio/image_e2656dd0.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_cbdff388.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_bc6ecde8.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_bae638e2.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_a9f1eaff.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_9bda1df3.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_67018e37.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_2ab1c6f3.png",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "1288cdfff1363ba0f5f1bf7113cd88d7"
  }, {
    "url": "favicon.ico",
    "revision": "3e589c94f61b2d59740683a8f04f37f8"
  }, {
    "url": "icon.svg",
    "revision": "5008f07c0b8607220417e1d0f09062db"
  }, {
    "url": "pwa-192x192.png",
    "revision": "9e490123e591c0bff43b3f5cf88aa606"
  }, {
    "url": "pwa-512x512.png",
    "revision": "49501159facb63a955530ee2c2e05c32"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "8d27b41e45069481d736a7e67321a502"
  }, {
    "url": "manifest.webmanifest",
    "revision": "cca9575afa286409a711b1ae24baf8e7"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
