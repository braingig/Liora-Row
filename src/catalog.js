export const sizes = [6, 8, 10, 12, 14, 16, 18, 20];

const inventory = {
  dresses: ['Dresses', [
    ['Dahlia Floral Wrap Midi Dress', 'Plum', 78, 49],
    ['Sabine Satin Drape Maxi Dress', 'Moss', 89],
    ['Nina Velvet Mini Dress', 'Black', 65, 39],
    ['Alba Long Sleeve Midi Dress', 'Lilac', 75],
    ['Sylvie Belted Shirt Dress', 'Teal', 72],
    ['Iris Floral Tea Dress', 'Ivory', 68, 38],
  ]],
  knitwear: ['Knitwear', [
    ['Esme Cable Knit Jumper', 'Oat', 58, 29],
    ['Maris Ribbed Cardigan', 'Wine', 54],
    ['Aster Stripe Polo Jumper', 'Grey', 62],
    ['Noa Soft Crew Neck Jumper', 'Lilac', 49],
    ['Lena Zip Neck Jumper', 'Black', 58, 35],
    ['Briar Argyle Jumper', 'Moss', 59],
  ]],
  tops: ['Tops & Blouses', [
    ['Celine Satin Bow Blouse', 'Ivory', 48],
    ['Saskia Printed Chiffon Blouse', 'Rust', 49, 25],
    ['Livia Velvet Button Shirt', 'Black', 55, 32],
    ['Anais Longline Cotton Shirt', 'Plum', 48],
    ['Mina Poplin Shirt', 'Blue', 42],
    ['Clara Lace Blouse', 'Cream', 55],
  ]],
  skirts: ['Skirts', [
    ['Sienna Satin Midi Skirt', 'Wine', 56, 30],
    ['Blythe Pleated Midi Skirt', 'Black', 59],
    ['June A-Line Midi Skirt', 'Mocha', 54],
    ['Ada Tiered Cotton Skirt', 'Ivory', 49],
    ['Greta Denim Midi Skirt', 'Moss', 58],
    ['Juno Checked Mini Skirt', 'Grey', 49],
  ]],
  trousers: ['Trousers', [
    ['Etta Tailored Wide Leg Trousers', 'Camel', 64],
    ['Vera Velvet Trousers', 'Plum', 65, 39],
    ['Emilia Pleated Trousers', 'Grey', 62],
    ['Maeve Straight Leg Trousers', 'Cream', 56],
    ['Alma Tapered Trousers', 'Navy', 55],
    ['Olive Corduroy Trousers', 'Moss', 58, 30],
  ]],
  'coats-jackets': ['Coats & Jackets', [
    ['Romy Long Wool Blend Coat', 'Camel', 128, 79],
    ['Audra Tailored Blazer', 'Plum', 92],
    ['Gia Cropped Jacket', 'Black', 76],
    ['Marlowe Belted Trench Coat', 'Moss', 110],
    ['Freya Double Breasted Coat', 'Grey', 120],
    ['Leonie Teddy Jacket', 'Ivory', 84, 49],
  ]],
  jumpsuits: ['Jumpsuits', [
    ['Vianne Crepe Jumpsuit', 'Black', 79],
    ['Eloise Velvet Jumpsuit', 'Plum', 85, 49],
    ['Rhea Utility Jumpsuit', 'Teal', 72],
    ['Lara Belted Jumpsuit', 'Navy', 75],
    ['Sol Linen Blend Jumpsuit', 'Camel', 76],
    ['Rosa Wrap Jumpsuit', 'Wine', 82, 45],
  ]],
};

const descriptions = {
  dresses: 'An easy one-piece look for late lunches and plans after dark. Wear it with boots in the day or a slim heel for evenings.',
  knitwear: 'A softly textured layer for cooler days. Wear it loose over a shirt or tuck the front into tailored trousers.',
  tops: 'A wardrobe staple with an easy drape. Pair it with a midi skirt or tuck it into high-waisted trousers.',
  skirts: 'A versatile skirt to wear with a tucked-in blouse and flats, or a soft jumper and boots.',
  trousers: 'Smart trousers for everyday dressing. Style them with a tucked-in shirt or your favourite knit.',
  'coats-jackets': 'A polished outer layer with room for your favourite knit. Try it over a dress or with matching tones.',
  jumpsuits: 'An easy one-piece outfit with a defined waist. Wear it with flats by day and dress it up with jewellery after dark.',
};

export const categories = Object.fromEntries(Object.entries(inventory).map(([key, [title]]) => [key, title]));
export const products = Object.entries(inventory).flatMap(([category, [, items]]) => items.map(([name, colour, regular, sale], index) => ({
  id: name.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-'), name, colour, category, regular,
  price: sale ?? regular, sale: Boolean(sale),
  image: '/images/' + category + '-' + (index + 1) + '.jpg',
  sizes: sizes.filter((size, i) => index % 3 !== 2 || i !== 0),
  description: descriptions[category],
  index,
})));

export const collections = {
  'black-friday': ['Black Friday', 'Selected styles for the season, now up to 50% off.', p => p.sale],
  'new-in': ['New In', 'Fresh silhouettes and new colours for wherever the season takes you.', p => [1, 3, 4].includes(p.index)],
  clothing: ['All Clothing', 'Discover dresses, knits and everyday separates from Liora Row.', () => true],
  petite: ['Petite', 'Proportioned for a petite fit, from shorter hems to a raised waistline.', p => ['dresses', 'trousers', 'jumpsuits'].includes(p.category) && p.index % 2 === 1],
  separates: ['Separates', 'Mix, match and layer with pieces to build your everyday wardrobe.', p => ['knitwear', 'tops', 'skirts', 'trousers'].includes(p.category)],
  workwear: ['Workwear', 'Easy pieces for the office, from tailored trousers to polished layers.', p => ['trousers', 'coats-jackets', 'tops'].includes(p.category) && p.index < 3],
  sale: ['Sale', 'Find your favourites at a new price.', p => p.sale],
  velvet: ['The Velvet Edit', 'Soft texture and rich colour for occasions after dark.', p => p.name.includes('Velvet') || (p.category === 'dresses' && [0, 1].includes(p.index))],
  ...Object.fromEntries(Object.entries(categories).map(([key, title]) => [key, [title, descriptions[key], p => p.category === key]])),
};

export const money = amount => '£' + amount.toFixed(2);
