import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { products, collections } from '../src/catalog.js';

const html = await readFile('dist/index.html', 'utf8');
const routes = [
  ...Object.entries(collections).map(([key, [title]]) => ['collections/' + key, title]),
  ...products.map(product => ['products/' + product.id, product.name]),
  ...Object.entries({
    about: 'Our Story', delivery: 'Delivery', returns: 'Returns',
    faq: 'Frequently Asked Questions', contact: 'Contact', privacy: 'Privacy',
  }).map(([key, title]) => ['pages/' + key, title]),
  ...Object.entries({ wishlist: 'Wishlist', search: 'Search', account: 'Account', bag: 'Bag', checkout: 'Checkout' }),
];

function page(title) {
  return html.replace(/<title>.*?<\/title>/, '<title>Liora Row | ' + title.replaceAll('&', '&amp;') + '</title>');
}

await Promise.all(routes.map(async ([route, title]) => {
  await mkdir('dist/' + route, { recursive: true });
  await writeFile('dist/' + route + '/index.html', page(title));
}));
await writeFile('dist/404.html', page('Page unavailable'));
