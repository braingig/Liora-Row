export const sizes = [6, 8, 10, 12, 14, 16, 18, 20];
export const catalogImage = name => '/images/catalog/' + name + '.jpg';

const inventory = {
  dresses: ['Dresses', [
    ['Dahlia Floral Wrap Midi Dress', 'Plum', 78, "A plum ground sets off Dahlia’s soft floral print. The crossover neckline and waist tie define the shape, while the midi skirt moves easily with each step. Style it with pointed pumps or ankle boots.", 49],
    ['Sabine Satin Drape Maxi Dress', 'Moss', 89, "Sabine pairs moss satin with a draped cowl neckline and a long, gently flared skirt. Keep the styling simple with slim sandals and small gold earrings."],
    ['Nina Velvet Mini Dress', 'Black', 65, "Nina combines a square neckline, puff sleeves and a short flared skirt in black velvet. Wear it with sheer tights and slingbacks for a winter party.", 39],
    ['Alba Long Sleeve Midi Dress', 'Lilac', 75, "Fine gathers run from Alba’s high neckline into a wide, defined waist. The lilac midi skirt and cuffed sleeves keep the silhouette soft and fluid."],
    ['Sylvie Belted Shirt Dress', 'Teal', 72, "Sylvie brings shirt detailing to a teal midi dress, with a pointed collar, button front and matching belt. Wear it with tall boots to echo the clean lines of the skirt."],
    ['Iris Floral Tea Dress', 'Ivory', 68, "Iris has a scattered floral print on an ivory ground, short sleeves and a softly flared midi skirt. Try it with flat sandals for a daytime occasion.", 38],
  ]],
  knitwear: ['Knitwear', [
    ['Esme Cable Knit Jumper', 'Oat', 58, "Esme’s oatmeal cable pattern gives this crew-neck jumper a textured finish. Ribbed cuffs and hem frame the knit. Pair it with charcoal trousers or dark denim.", 29],
    ['Maris Ribbed Cardigan', 'Wine', 54, "Maris has a wine-coloured rib, a V-neck and a neat row of buttons. Wear it buttoned with jeans or open over a plain tee."],
    ['Aster Stripe Polo Jumper', 'Grey', 62, "Aster combines an open polo collar with cream stripes on grey. Wear it with straight-leg denim and loafers for an easy weekend outfit."],
    ['Noa Soft Crew Neck Jumper', 'Lilac', 49, "Noa has a plain lilac crew neck and a relaxed sleeve, finished with ribbing at the cuffs and hem. Let the colour stand out against black or charcoal tailoring."],
    ['Lena Zip Neck Jumper', 'Black', 58, "Lena is a black jumper with a high funnel collar and a short zip. Wear the collar closed on cooler days or unzip it to show a layer underneath.", 35],
    ['Briar Argyle Jumper', 'Moss', 59, "Briar’s moss-green knit is patterned with cream and olive argyle diamonds. The simple crew neck works with a white shirt underneath or on its own with dark denim."],
  ]],
  tops: ['Tops & Blouses', [
    ['Celine Satin Bow Blouse', 'Ivory', 48, "A wide bow softens the neckline of this ivory satin blouse. The long sleeves and lustrous finish work well with matte black tailoring."],
    ['Saskia Printed Chiffon Blouse', 'Rust', 49, "Saskia has a warm rust botanical print, soft gathers at the neck and full sleeves drawn in at the cuffs. Tuck it into plain trousers to give the print space.", 25],
    ['Livia Velvet Button Shirt', 'Black', 55, "Livia combines a pointed collar and button front with the soft sheen of black velvet. Wear it with straight-leg trousers for dinner or over a simple camisole.", 32],
    ['Anais Longline Cotton Shirt', 'Plum', 48, "Anais is a plum cotton shirt with a curved longline hem. Button it through and leave it untucked, or roll the cuffs for a relaxed fit."],
    ['Mina Poplin Shirt', 'Blue', 42, "Mina is a sky-blue poplin shirt with a pointed collar, pale buttons and a clean front. Tuck it into tailored trousers or wear it loose with jeans."],
    ['Clara Lace Blouse', 'Cream', 55, "Clara has a high neckline and cream floral lace across the bodice and long sleeves. Let the lace stand out against simple dark separates."],
  ]],
  skirts: ['Skirts', [
    ['Sienna Satin Midi Skirt', 'Wine', 56, "Sienna is a wine satin midi with a clean waist and a softly swinging hem. Pair it with a fitted knit or tuck in a simple blouse.", 30],
    ['Blythe Pleated Midi Skirt', 'Black', 59, "Even pleats give Blythe’s black midi skirt a defined shape and movement. A close-fitting jumper keeps the waist in view, while pointed flats finish the look."],
    ['June A-Line Midi Skirt', 'Mocha', 54, "June’s mocha skirt widens from a defined waist into a classic A-line midi. Wear it with tall brown boots and a cream knit for a tonal outfit."],
    ['Ada Tiered Cotton Skirt', 'Ivory', 49, "Ada’s ivory cotton skirt falls in gathered tiers to a midi hem. Balance its volume with a fitted top and simple sandals."],
    ['Greta Denim Midi Skirt', 'Moss', 58, "Greta is a moss denim midi with a button waistband and visible front seam. The straight shape pairs well with a tucked-in vest or a cropped jacket."],
    ['Juno Checked Mini Skirt', 'Grey', 49, "Juno combines a fine grey check with a short, subtly flared hem. Style it with opaque tights, a black knit and loafers."],
  ]],
  trousers: ['Trousers', [
    ['Etta Tailored Wide Leg Trousers', 'Camel', 64, "Etta’s camel tailoring sits high at the waist and falls into a full, wide leg. A tucked ivory blouse lets the waistband and front pleats show."],
    ['Vera Velvet Trousers', 'Plum', 65, "Vera’s plum velvet catches the light along the wide leg. Wear it with a close-fitting tonal knit to highlight the movement of the trousers.", 39],
    ['Emilia Pleated Trousers', 'Grey', 62, "Emilia is cut with front pleats and a generous straight fall in charcoal grey. Team it with a fitted roll neck or a tucked shirt."],
    ['Maeve Straight Leg Trousers', 'Cream', 56, "Maeve combines a high waist with a clean, straight leg in cream. Wear it with a satin blouse in a similar shade or a contrasting dark knit."],
    ['Alma Tapered Trousers', 'Navy', 55, "Alma’s navy trousers taper neatly towards the ankle. Their narrow profile pairs well with pointed flats, a fine knit or a structured blazer."],
    ['Olive Corduroy Trousers', 'Moss', 58, "Olive’s moss corduroy gives these trousers a visibly ribbed finish. The straight, easy leg suits a cable-knit jumper and flat shoes.", 30],
  ]],
  'coats-jackets': ['Coats & Jackets', [
    ['Romy Long Wool Blend Coat', 'Camel', 128, "Romy is a long camel coat with wide lapels and a straight fall. Wear it open over a tonal knit and trousers to show the layers underneath.", 79],
    ['Audra Tailored Blazer', 'Plum', 92, "Audra is a plum blazer with a defined shoulder and notched lapels. Wear it over a black top for an office outfit with a little colour."],
    ['Gia Cropped Jacket', 'Black', 76, "Gia is a cropped black jacket with a round neck, contrast edging and polished buttons. The short hem sits neatly above high-waisted trousers."],
    ['Marlowe Belted Trench Coat', 'Moss', 110, "Marlowe has a double-breasted front and a matching waist belt in moss green. Tie the belt to define the shape or wear the trench open over separates."],
    ['Freya Double Breasted Coat', 'Grey', 120, "Freya combines grey tailoring with notched lapels and a double row of buttons. Its long silhouette layers easily over dark trousers and a roll neck."],
    ['Leonie Teddy Jacket', 'Ivory', 84, "Leonie is a short ivory teddy jacket with a plush texture and a generous collar. Wear it over a plain knit to keep the different textures in view.", 49],
  ]],
  jumpsuits: ['Jumpsuits', [
    ['Vianne Crepe Jumpsuit', 'Black', 79, "Vianne is a sleeveless black crepe jumpsuit with a crossover neckline and a wide leg. Keep the neckline simple and add a slim heel or small earrings."],
    ['Eloise Velvet Jumpsuit', 'Plum', 85, "Eloise has a crossover bodice, long sleeves and a tie waist in plum velvet. The wide leg shows off the way the fabric catches the light.", 49],
    ['Rhea Utility Jumpsuit', 'Teal', 72, "Rhea takes its cues from utility dressing, with a teal collar, front pockets and an easy straight leg. Wear it with ankle boots or trainers."],
    ['Lara Belted Jumpsuit', 'Navy', 75, "Lara has a navy V-neck bodice and a matching belt that defines the waist before the leg falls straight. Try it with pointed flats and a structured bag."],
    ['Sol Linen Blend Jumpsuit', 'Camel', 76, "Sol is a sand-coloured linen-blend jumpsuit with a collar, short sleeves and a self-tie waist. Wear it with simple sandals for a relaxed daytime outfit."],
    ['Rosa Wrap Jumpsuit', 'Wine', 82, "Rosa combines a wine-coloured wrap front with softly flared short sleeves and wide legs. A slim sandal balances the fluid shape.", 45],
  ]],
};

const collectionDescriptions = {
  dresses: 'An easy one-piece look for late lunches and plans after dark. Wear it with boots in the day or a slim heel for evenings.',
  knitwear: 'A softly textured layer for cooler days. Wear it loose over a shirt or tuck the front into tailored trousers.',
  tops: 'A wardrobe staple with an easy drape. Pair it with a midi skirt or tuck it into high-waisted trousers.',
  skirts: 'A versatile skirt to wear with a tucked-in blouse and flats, or a soft jumper and boots.',
  trousers: 'Smart trousers for everyday dressing. Style them with a tucked-in shirt or your favourite knit.',
  'coats-jackets': 'A polished outer layer with room for your favourite knit. Try it over a dress or with matching tones.',
  jumpsuits: 'An easy one-piece outfit with a defined waist. Wear it with flats by day and dress it up with jewellery after dark.',
};

export const categories = Object.fromEntries(Object.entries(inventory).map(([key, [title]]) => [key, title]));
export const products = Object.entries(inventory).flatMap(([category, [, items]]) => items.map(([name, colour, regular, description, sale], index) => ({
  id: name.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-'), name, colour, category, regular,
  price: sale ?? regular, sale: Boolean(sale),
  image: catalogImage(category + '-' + (index + 1)),
  sizes: sizes.filter((size, i) => index % 3 !== 2 || i !== 0),
  description,
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
  ...Object.fromEntries(Object.entries(categories).map(([key, title]) => [key, [title, collectionDescriptions[key], p => p.category === key]])),
};


export function galleryFor(product) {
  const alt = product.name + ' in ' + product.colour.toLowerCase();
  const base = product.image.replace(/\.jpg$/, '');
  return [
    { view: 'Front', src: product.image, alt: alt + ', front view' },
    { view: 'Side', src: base + '-side.jpg', alt: alt + ', side view' },
    { view: 'Back', src: base + '-back.jpg', alt: alt + ', back view' },
  ];
}

export const money = amount => '£' + amount.toFixed(2);
