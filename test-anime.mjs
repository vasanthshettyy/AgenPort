import * as animePkg from './node_modules/animejs/lib/anime.es.js';
console.log('Keys in anime.es.js:', Object.keys(animePkg));
if (animePkg.default) {
  console.log('Keys in anime.es.js default export:', Object.keys(animePkg.default));
}
