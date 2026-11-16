import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { catalogImage, categories, collections, galleryFor, money, products, sizes } from './catalog.js';
import './style.css';

const navKeys = ['black-friday', 'new-in', 'clothing', 'petite', 'dresses', 'separates', 'workwear', 'sale'];
const labels = { ...categories, ...Object.fromEntries(Object.entries(collections).map(([id, [title]]) => [id, title])), clothing: 'Clothing' };
const collectionUrl = id => '/collections/' + id + '/';
const productUrl = p => '/products/' + p.id + '/';
const image = name => '/images/' + name + '.jpg';
const lookup = Object.fromEntries(products.map(p => [p.id, p]));

const icons = {
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></>,
  person: <><circle cx="12" cy="7" r="3.3"/><path d="M4.5 21v-2.5c0-3 3-4.5 7.5-4.5s7.5 1.5 7.5 4.5V21"/></>,
  heart: <path d="M20.4 5.5a5.2 5.2 0 0 0-7.4 0l-1 1-1-1a5.2 5.2 0 0 0-7.4 7.4l1 1 7.4 7.3 7.4-7.3 1-1a5.2 5.2 0 0 0 0-7.4Z"/>,
  bag: <><path d="M4 8h16l1 13H3L4 8Z"/><path d="M8 10V6a4 4 0 1 1 8 0v4"/></>,
  menu: <path d="M3 6h18M3 12h18M3 18h18"/>,
  close: <path d="m5 5 14 14M19 5 5 19"/>,
  left: <path d="m15 5-7 7 7 7"/>,
  right: <path d="m9 5 7 7-7 7"/>,
};
function Icon({ name }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}

const menuGroups = {
  'black-friday': [['Shop the sale', ['black-friday', 'dresses', 'petite', 'knitwear']], ['Seasonal edits', ['velvet', 'workwear']]],
  'new-in': [['Categories', ['new-in', 'dresses', 'tops', 'skirts', 'trousers']], ['On trend', ['velvet', 'petite']]],
  clothing: [['Categories', ['clothing', 'dresses', 'knitwear', 'tops']], ['More to explore', ['skirts', 'trousers', 'coats-jackets', 'jumpsuits']]],
  petite: [['Categories', ['petite', 'dresses', 'trousers']]],
  dresses: [['Categories', ['dresses', 'petite']], ['Edits', ['velvet', 'new-in', 'sale']]],
  separates: [['Categories', ['separates', 'tops', 'knitwear', 'skirts', 'trousers']]],
  workwear: [['Categories', ['workwear', 'coats-jackets', 'tops', 'trousers']]],
  sale: [['Categories', ['sale', 'black-friday', 'velvet']]],
};

function Header({ count, open, go }) {
  const [menu, setMenu] = useState('');
  const [mobile, setMobile] = useState(false);
  const [promo, setPromo] = useState(0);
  const promos = [['BLACK FRIDAY · UP TO 50% OFF', 'black-friday'], ['DISCOVER OUR NEW ARRIVALS', 'new-in'], ['SHOP THE KNITWEAR COLLECTION', 'knitwear']];
  const preview = menu ? products.filter(collections[menu][2]).slice(0, 3) : [];

  useEffect(() => {
    const id = setInterval(() => setPromo(value => (value + 1) % 3), 6500);
    return () => clearInterval(id);
  }, []);

  function closeNav(event) {
    if (event.target.closest('a')) { setMenu(''); setMobile(false); }
    if (event.key === 'Escape') { setMenu(''); setMobile(false); }
  }

  return <>
    <a className="skip" href="#main">Skip to content</a>
    <div className="announcement">
      <button aria-label="Previous announcement" onClick={() => setPromo((promo + 2) % 3)}><Icon name="left" /></button>
      <a href={collectionUrl(promos[promo][1])}><span className="announcement-copy" key={promo}>{promos[promo][0]} <span>→</span></span></a>
      <button aria-label="Next announcement" onClick={() => setPromo((promo + 1) % 3)}><Icon name="right" /></button>
    </div>
    <header className="site-header" onClick={closeNav} onKeyDown={closeNav} onMouseLeave={() => setMenu('')} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setMenu(''); }}>
      <div className="header-inner">
        <button className="icon mobile-menu" aria-expanded={mobile} aria-label="Menu" onClick={() => setMobile(!mobile)}><Icon name={mobile ? 'close' : 'menu'} /></button>
        <a className="wordmark" href="/" aria-label="Liora Row home">Liora<span> Row</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navKeys.map(id => <div className="nav-item" key={id} onMouseEnter={() => setMenu(id)}>
            <a className={id === 'black-friday' ? 'accent' : ''} href={collectionUrl(id)}>{labels[id]}</a>
            <button aria-label={'Show ' + labels[id] + ' menu'} aria-expanded={menu === id} onClick={() => setMenu(menu === id ? '' : id)}>⌄</button>
          </div>)}
        </nav>
        <div className="tools" onMouseEnter={() => setMenu('')}>
          <form className="header-search" role="search" onSubmit={event => { event.preventDefault(); const q = new FormData(event.currentTarget).get('q').trim(); go('/search/?q=' + encodeURIComponent(q)); }}>
            <input name="q" aria-label="Search products" placeholder="Search" />
            <button aria-label="Search"><Icon name="search" /></button>
          </form>
          <a className="icon account-link" href="/account/" aria-label="Account"><Icon name="person" /></a>
          <a className="icon" href="/wishlist/" aria-label="Wishlist"><Icon name="heart" /></a>
          <button className="icon bag-icon" aria-label={'Open bag, ' + count + ' items'} onClick={open}><Icon name="bag" /><span>{count}</span></button>
        </div>
      </div>
      {menu && <div className="mega">
        <div className="mega-links">{menuGroups[menu].map(([title, ids]) => <div key={title}><h3>{title}</h3>{ids.map(id => <a key={id} href={collectionUrl(id)}>{labels[id]}</a>)}</div>)}</div>
        <div className="mega-products">{preview.map(p => <a key={p.id} href={productUrl(p)}><img src={p.image} alt="" /><span>{p.name}</span></a>)}</div>
      </div>}
      {mobile && <nav className="mobile-nav" aria-label="Mobile navigation">{[...navKeys, ...Object.keys(categories).filter(id => !navKeys.includes(id))].map(id => <a key={id} href={collectionUrl(id)}>{labels[id]} <span>→</span></a>)}<a href="/search/">Search <span>→</span></a><a href="/account/">Account <span>→</span></a></nav>}
    </header>
  </>;
}

function Price({ p }) {
  return <div className="price">{p.sale && <s>{money(p.regular)}</s>} <span className={p.sale ? 'reduced' : ''}>{money(p.price)}</span></div>;
}

function ProductCard({ p, saved, toggle }) {
  return <article className="product-card">
    <div className="product-image">
      <a href={productUrl(p)}><img src={p.image} alt={p.name + ' in ' + p.colour.toLowerCase()} loading="lazy" /></a>
      {p.sale && <span className="sale-tag">-{Math.round((1 - p.price / p.regular) * 100)}%</span>}
      <button className={'icon favourite' + (saved ? ' saved' : '')} aria-pressed={saved} aria-label={'Save ' + p.name} onClick={() => toggle(p.id)}><Icon name="heart" /></button>
    </div>
    <a className="product-name" href={productUrl(p)}>{p.name}</a>
    <Price p={p} />
  </article>;
}

function Tile({ id, file, label, wide = false }) {
  const source = file.startsWith('campaign-') ? image(file) : catalogImage(file);
  return <a className={'edit-tile' + (wide ? ' wide-tile' : '')} href={collectionUrl(id)}>
    <img src={source} loading="lazy" alt="" /><div><h2>{label || labels[id]}</h2><span>Shop now <span aria-hidden="true">→</span></span></div>
  </a>;
}

function Home({ saved, toggle }) {
  const strip = useRef(null);
  const featured = ['dresses', 'tops', 'knitwear', 'skirts', 'trousers', 'coats-jackets', 'jumpsuits'].map(key => products.find(p => p.category === key && p.sale));
  function shift(direction) { strip.current.scrollBy({ left: direction * strip.current.clientWidth * .72, behavior: 'smooth' }); }
  return <>
    <section className="campaign" aria-label="Black Friday at Liora Row">
      <a className="campaign-main" href={collectionUrl('black-friday')} tabIndex={-1} aria-hidden="true"><img src={image('campaign-main')} alt="" fetchPriority="high" /></a>
      <div className="campaign-title"><h1>BLACK<br/>FRIDAY</h1></div>
      <a className="campaign-portrait" href={collectionUrl('black-friday')} tabIndex={-1} aria-hidden="true"><img src={image('campaign-portrait')} alt="" /></a>
      <div className="campaign-detail"><img src={image('campaign-detail')} alt="" /></div>
      <div className="campaign-offer"><div><p>UP TO 50% OFF</p><span>Selected styles</span></div><a className="campaign-button" href={collectionUrl('black-friday')}>SHOP NOW <span>→</span></a></div>
    </section>
    <section className="feature frame">
      <div className="section-title"><div><p>THE BLACK FRIDAY EDIT</p><h2>Most wanted</h2></div><div className="carousel-buttons"><button className="icon" onClick={() => shift(-1)} aria-label="Previous products"><Icon name="left" /></button><button className="icon" onClick={() => shift(1)} aria-label="Next products"><Icon name="right" /></button></div></div>
      <div className="product-strip" ref={strip}>{featured.map(p => <ProductCard key={p.id} p={p} saved={saved.includes(p.id)} toggle={toggle} />)}</div>
      <a className="underline center-link" href={collectionUrl('black-friday')}>Shop the Black Friday edit</a>
    </section>
    <div className="editorial frame">
      <Tile id="dresses" file="campaign-dresses" label="Dresses for the season" wide />
      <div className="edit-pair"><Tile id="petite" file="dresses-4" label="The Petite Edit" /><Tile id="velvet" file="jumpsuits-2" label="The Velvet Edit" /></div>
      <a className="ribbon" href={collectionUrl('sale')}>Black Friday · Up to 50% off <span>Shop the sale →</span></a>
      <div className="edit-pair"><Tile id="knitwear" file="knitwear-2" /><Tile id="workwear" file="coats-jackets-2" /></div>
      <Tile id="new-in" file="campaign-portrait" label="New In" wide />
      <div className="edit-quad"><Tile id="trousers" file="trousers-1" /><Tile id="skirts" file="skirts-1" /><Tile id="tops" file="tops-1" /><Tile id="sale" file="dresses-3" label="Last Chance" /></div>
    </div>
  </>;
}

function Breadcrumb({ items }) {
  return <nav aria-label="Breadcrumb" className="breadcrumb"><a href="/">Home</a>{items.map(([label, href]) => <React.Fragment key={label}><span aria-hidden="true">/</span>{href ? <a href={href}>{label}</a> : <span aria-current="page">{label}</span>}</React.Fragment>)}</nav>;
}

function Catalog({ id, query, saved, toggle, go }) {
  const [sort, setSort] = useState('featured');
  const [size, setSize] = useState('');
  const [colour, setColour] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const search = id === 'search';
  const wishlist = id === 'wishlist';
  const [title, description, filter] = collections[id] || [search ? 'Search' : 'Wishlist', '', p => search ? query.trim().toLowerCase().split(/\s+/).every(word => [p.name, p.colour, categories[p.category]].join(' ').toLowerCase().includes(word)) : saved.includes(p.id)];
  const base = products.filter(filter);
  const filtered = base.filter(p => (!size || p.sizes.includes(Number(size))) && (!colour || p.colour === colour) && (!category || p.category === category) && (!price || p.price <= Number(price)));
  if (sort === 'ascending') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'descending') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
  const filters = [
    ['Category', category, setCategory, [...new Set(base.map(p => p.category))].map(key => [key, categories[key]])],
    ['Size', size, setSize, sizes.map(s => [s, 'UK ' + s])],
    ['Colour', colour, setColour, [...new Set(base.map(p => p.colour))].sort().map(c => [c, c])],
    ['Price', price, setPrice, [[30, '£30 and under'], [50, '£50 and under'], [75, '£75 and under']]],
  ];

  return <div className="frame catalog">
    <Breadcrumb items={[[title]]} />
    <div className="catalog-heading"><h1>{title}</h1>{description && <p>{description}</p>}{search && <form className="search-page-form" onSubmit={e => { e.preventDefault(); go('/search/?q=' + encodeURIComponent(new FormData(e.currentTarget).get('q').trim())); }}><input name="q" defaultValue={query} aria-label="Search the catalog" placeholder="Search by style, colour or item" /><button className="button">Search</button></form>}</div>
    {id === 'clothing' && <div className="category-links">{Object.keys(categories).map(key => <a key={key} href={collectionUrl(key)}>{categories[key]}</a>)}</div>}
    {!wishlist && <div className="catalog-toolbar">
      <div className="filters">{filters.map(([label, value, update, options]) => options.length > 1 && <select key={label} aria-label={'Filter by ' + label.toLowerCase()} value={value} onChange={e => update(e.target.value)}><option value="">{label}</option>{options.map(([key, text]) => <option key={key} value={key}>{text}</option>)}</select>)}
      {(size || colour || category || price) && <button className="underline" onClick={() => { setSize(''); setColour(''); setCategory(''); setPrice(''); }}>Clear filters</button>}</div>
      <div className="sort"><span aria-live="polite">{filtered.length} products</span><select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="ascending">Price, low to high</option><option value="descending">Price, high to low</option><option value="name">Name, A to Z</option></select></div>
    </div>}
    {filtered.length ? <div className="product-grid">{filtered.map(p => <ProductCard key={p.id} p={p} saved={saved.includes(p.id)} toggle={toggle} />)}</div> : <div className="empty"><h2>{wishlist ? 'Your wishlist is empty' : 'No products found'}</h2><a className="button" href={collectionUrl('clothing')}>Shop all clothing</a></div>}
  </div>;
}

function ProductGallery({ product }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const photos = galleryFor(product);
  const photo = photos[active];

  function step(offset) {
    setActive(index => (index + offset + photos.length) % photos.length);
  }

  function onKeyDown(event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    step(event.key === 'ArrowLeft' ? -1 : 1);
  }

  return <section className="product-gallery" aria-label="Product gallery" onKeyDown={onKeyDown}>
    <button className="zoom-image" onClick={() => setZoom(true)} aria-label={'Enlarge product photo, ' + photo.view.toLowerCase() + ' view'}>
      <img key={photo.src} src={photo.src} alt={photo.alt} fetchPriority={active === 0 ? 'high' : 'auto'} />
      <span><Icon name="search" /></span>
    </button>
    <div className="gallery-thumbnails" role="group" aria-label="Choose a product view">
      {photos.map(({ view, src }, index) => <button key={view} type="button" aria-label={view + ' view'} aria-pressed={active === index} onClick={() => setActive(index)}>
        <img src={src} alt="" /><span>{view}</span>
      </button>)}
    </div>
    {zoom && <Modal className="zoom-dialog" onClose={() => setZoom(false)} label="Product photo">
      <img key={photo.src} src={photo.src} alt={photo.alt} />
      <div className="gallery-zoom-controls">
        <button className="icon" aria-label="Previous product photo" onClick={() => step(-1)}><Icon name="left" /></button>
        <span role="status">{photo.view} view · {active + 1} of {photos.length}</span>
        <button className="icon" aria-label="Next product photo" onClick={() => step(1)}><Icon name="right" /></button>
      </div>
    </Modal>}
  </section>;
}

function Product({ p, saved, toggle, add }) {
  const [size, setSize] = useState('');
  const [error, setError] = useState(false);
  function buy() {
    if (!size) { setError(true); document.getElementById('size-options').focus(); return; }
    add(p.id, size);
  }
  return <div className="frame product-page">
    <Breadcrumb items={[[categories[p.category], collectionUrl(p.category)], [p.name]]} />
    <div className="product-layout">
      <ProductGallery product={p} />
      <div className="product-detail-copy"><a className="eyebrow" href={collectionUrl(p.category)}>{categories[p.category]}</a><h1>{p.name}</h1><Price p={p} /><p className="colour-label">Colour <strong>{p.colour}</strong></p>
        <fieldset id="size-options" tabIndex="-1"><legend>Size (UK)</legend><div className="sizes">{sizes.map(s => <button key={s} disabled={!p.sizes.includes(s)} aria-pressed={size === s} onClick={() => { setSize(s); setError(false); }}>{s}</button>)}</div>{error && <p role="alert" className="reduced">Select a size to add this item.</p>}</fieldset>
        <div className="add-row"><button className="button" onClick={buy}>Add to bag</button><button className={'icon product-save' + (saved.includes(p.id) ? ' saved' : '')} aria-label="Save to wishlist" aria-pressed={saved.includes(p.id)} onClick={() => toggle(p.id)}><Icon name="heart" /></button></div>
        <p className="delivery-note">UK standard delivery £3.95 · Free over £100</p>
        <details open><summary>Product details</summary><p>{p.description}</p></details>
        <details><summary>Size guide</summary><p>Measurements are in centimetres. Measure around the fullest part of your bust and hips and around your natural waist.</p><table><thead><tr><th>UK</th><th>Bust</th><th>Waist</th><th>Hip</th></tr></thead><tbody>{sizes.map((s, i) => <tr key={s}><th>{s}</th><td>{78 + i * 5}</td><td>{60 + i * 5}</td><td>{86 + i * 5}</td></tr>)}</tbody></table></details>
        <details><summary>Delivery & returns</summary><p>Standard UK delivery takes 3–5 working days. See our <a href="/pages/delivery/">delivery guide</a> and <a href="/pages/returns/">returns policy</a>.</p></details>
      </div>
    </div>
    <section className="related"><h2>You may also like</h2><div className="product-grid">{products.filter(other => other.category === p.category && other.id !== p.id).slice(0, 4).map(other => <ProductCard key={other.id} p={other} saved={saved.includes(other.id)} toggle={toggle} />)}</div></section>
  </div>;
}

function Modal({ children, onClose, className = '', label }) {
  const dialog = useRef(null);
  useEffect(() => {
    const node = dialog.current;
    node.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { node.close(); document.body.style.overflow = previous; };
  }, []);
  return <dialog ref={dialog} className={className} aria-label={label} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="modal-content"><button className="icon modal-close" aria-label="Close" onClick={onClose}><Icon name="close" /></button>{children}</div>
  </dialog>;
}

const subtotal = bag => bag.reduce((total, line) => total + lookup[line.id].price * line.quantity, 0);

function Bag({ bag, adjust, close }) {
  return <>
    {bag.length ? <>
      <div className="bag-lines">{bag.map(line => {
        const p = lookup[line.id];
        return <div className="bag-line" key={line.id + line.size}>
          <a href={productUrl(p)} onClick={close}><img src={p.image} alt={p.name} /></a>
          <div><a href={productUrl(p)} onClick={close}>{p.name}</a><p>{p.colour} · UK {line.size}</p>
          <div className="quantity"><button aria-label={'Decrease quantity of ' + p.name} onClick={() => adjust(line.id, line.size, -1)}>−</button><span>{line.quantity}</span><button aria-label={'Increase quantity of ' + p.name} onClick={() => adjust(line.id, line.size, 1)}>+</button></div>
          <button className="underline remove" onClick={() => adjust(line.id, line.size, -line.quantity)}>Remove</button></div><strong>{money(p.price * line.quantity)}</strong>
        </div>;
      })}</div>
      <div className="bag-total"><div><span>Subtotal</span><strong>{money(subtotal(bag))}</strong></div><p>Delivery calculated at checkout.</p><a className="button" href="/checkout/" onClick={close}>Checkout</a>{close && <a className="underline center-link" href="/bag/" onClick={close}>View bag</a>}</div>
    </> : <div className="empty"><p>Your shopping bag is empty.</p><a className="button" href={collectionUrl('clothing')} onClick={close}>Continue shopping</a></div>}
  </>;
}

function Checkout({ bag }) {
  const [placed, setPlaced] = useState(false);
  const [shipping, setShipping] = useState('standard');
  const total = subtotal(bag);
  const delivery = shipping === 'express' ? 6.95 : total >= 100 ? 0 : 3.95;
  if (placed) return <div className="empty frame"><h1>Demo checkout complete</h1><p>Your bag is saved for continued browsing. No payment was taken.</p><a className="button" href={collectionUrl('clothing')}>Continue shopping</a></div>;
  if (!bag.length) return <div className="empty frame"><h1>Your bag is empty</h1><a className="button" href={collectionUrl('clothing')}>Continue shopping</a></div>;
  return <div className="frame checkout"><Breadcrumb items={[[ 'Bag', '/bag/' ], ['Checkout']]} /><h1>Checkout</h1><div className="checkout-grid">
    <form className="checkout-form" onSubmit={e => { e.preventDefault(); setPlaced(true); window.scrollTo(0, 0); }}>
      <p className="demo-note">Demo checkout. Use sample details to try this flow.</p>
      <h2>Contact</h2><label>Email<input type="email" name="email" autoComplete="email" required /></label>
      <h2>Delivery</h2><div className="field-pair"><label>First name<input name="given-name" autoComplete="given-name" required /></label><label>Last name<input name="family-name" autoComplete="family-name" required /></label></div><label>Street address<input name="street-address" autoComplete="street-address" required /></label><div className="field-pair"><label>Town or city<input name="city" autoComplete="address-level2" required /></label><label>Postcode<input name="postal-code" autoComplete="postal-code" required /></label></div><p>United Kingdom</p>
      <label>Delivery method<select value={shipping} onChange={e => setShipping(e.target.value)}><option value="standard">Standard · {total >= 100 ? 'Free' : '£3.95'}</option><option value="express">Express · £6.95</option></select></label>
      <button className="button">Complete demo checkout</button>
    </form>
    <aside className="order-summary"><h2>Order summary</h2>{bag.map(line => { const p = lookup[line.id]; return <div className="summary-line" key={p.id + line.size}><img src={p.image} alt="" /><div>{p.name}<br /><small>UK {line.size} · Qty {line.quantity}</small></div><strong>{money(p.price * line.quantity)}</strong></div>; })}<div className="summary-total"><p>Subtotal <strong>{money(total)}</strong></p><p>Delivery <strong>{delivery ? money(delivery) : 'Free'}</strong></p><p>Total <strong>{money(total + delivery)}</strong></p></div></aside>
  </div></div>;
}

const info = {
  about: ['Our Story', 'Liora Row brings together dresses, soft knitwear and tailoring for the everyday wardrobe. We design our seasonal edits around pieces you can combine and wear again, from the office to occasions.'],
  delivery: ['Delivery', 'UK standard delivery costs £3.95 and takes 3–5 working days. Standard delivery is free on orders of £100 or more. Express UK delivery costs £6.95.'],
  returns: ['Returns', 'Our example returns window is 30 days from delivery. Keep the original tags attached and retain your order details when contacting customer care.'],
  faq: ['Frequently Asked Questions', 'Use the UK size guide on each product page to compare your measurements. Save favourites using the heart icon and select a size before adding an item to your bag.'],
  contact: ['Contact', 'For sizing questions, see the size guide on each product page. Visit Delivery or Returns for information about shipping and returning items.'],
  privacy: ['Privacy', 'This demo uses local browser storage to remember your bag, wishlist, and preferences. Checkout details stay in the form during the session.'],
};

function Account() {
  const [email, setEmail] = useStored('liora-profile', '');
  return <div className="frame account-page"><Breadcrumb items={[[ 'Account' ]]} /><div className="account-form"><h1>My account</h1>{email ? <><p>Saved profile email</p><p>{email}</p><button className="button" onClick={() => setEmail('')}>Clear profile</button></> : <><p>Save your email in this browser for a demo profile.</p><form onSubmit={e => { e.preventDefault(); setEmail(new FormData(e.currentTarget).get('email')); }}><label>Email address<input type="email" name="email" required /></label><button className="button">Save profile</button></form></>}</div></div>;
}

function Footer() {
  const [signed, setSigned] = useStored('liora-newsletter', false);
  const groups = [
    ['Help & Information', [['Delivery', '/pages/delivery/'], ['Returns', '/pages/returns/'], ['FAQs', '/pages/faq/'], ['My Account', '/account/']]],
    ['About', [['Our Story', '/pages/about/'], ['Contact', '/pages/contact/'], ['Privacy', '/pages/privacy/']]],
    ['Shop', [['New In', collectionUrl('new-in')], ['All Clothing', collectionUrl('clothing')], ['Dresses', collectionUrl('dresses')], ['Sale', collectionUrl('sale')]]],
  ];
  return <footer>
    <section className="subscribe"><h2>Subscribe</h2><p>Sign up for news about new arrivals and offers.</p>
      {signed ? <p role="status">Your preference is saved on this device.</p> : <form onSubmit={event => { event.preventDefault(); setSigned(true); }}><input type="email" aria-label="Your email" placeholder="Your email" required /><button className="button">Sign up</button></form>}
    </section>
    <div className="footer-main"><div className="footer-grid frame"><a className="wordmark" href="/">Liora<span> Row</span></a>{groups.map(([title, links]) => <div key={title}><h3>{title}</h3>{links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div>)}</div><div className="footer-bottom frame">© {new Date().getFullYear()} Liora Row</div></div>
  </footer>;
}

function useStored(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; }
    catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }, [key, value]);
  return [value, setValue];
}

function App() {
  const [location, setLocation] = useState(() => window.location.pathname + window.location.search);
  const [bag, setBag] = useStored('liora-bag', []);
  const [saved, setSaved] = useStored('liora-wishlist', []);
  const [drawer, setDrawer] = useState(false);
  const path = new URL(location, window.location.origin);
  const [route, id] = path.pathname.split('/').filter(Boolean);
  const query = path.searchParams.get('q') || '';
  const p = lookup[id];

  function go(to) {
    if (to !== window.location.pathname + window.location.search) window.history.pushState(null, '', to);
    setLocation(to);
    setDrawer(false);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    function back() { setLocation(window.location.pathname + window.location.search); setDrawer(false); }
    function follow(event) {
      const anchor = event.target.closest('a[href^="/"]');
      if (!anchor || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0 || anchor.target || anchor.origin !== window.location.origin) return;
      event.preventDefault();
      go(anchor.pathname + anchor.search);
    }
    window.addEventListener('popstate', back);
    document.addEventListener('click', follow);
    return () => { window.removeEventListener('popstate', back); document.removeEventListener('click', follow); };
  }, []);
  useEffect(() => {
    const title = (route === 'products' && p?.name) || (route === 'collections' && labels[id]) || (route === 'pages' && info[id]?.[0]) || (route ? route[0].toUpperCase() + route.slice(1) : 'Women’s Clothing');
    document.title = 'Liora Row | ' + title;
  }, [route, id, p]);

  function toggle(id) { setSaved(old => old.includes(id) ? old.filter(item => item !== id) : [...old, id]); }
  function adjust(id, size, change) {
    setBag(old => {
      const existing = old.find(line => line.id === id && line.size === size);
      if (!existing) return change > 0 ? [...old, { id, size, quantity: change }] : old;
      return old.map(line => line === existing ? { ...line, quantity: line.quantity + change } : line).filter(line => line.quantity > 0);
    });
  }

  const shared = { saved, toggle };
  let page;
  if (!route) page = <Home {...shared} />;
  else if (route === 'collections' && collections[id]) page = <Catalog key={id} id={id} {...shared} />;
  else if (route === 'wishlist' || route === 'search') page = <Catalog key={location} id={route} query={query} go={go} {...shared} />;
  else if (route === 'products' && p) page = <Product key={id} p={p} {...shared} add={(product, size) => { adjust(product, size, 1); setDrawer(true); }} />;
  else if (route === 'checkout') page = <Checkout bag={bag} />;
  else if (route === 'account') page = <Account />;
  else if (route === 'bag') page = <div className="frame bag-page"><Breadcrumb items={[[ 'Bag' ]]} /><h1>Your bag</h1><Bag bag={bag} adjust={adjust} /></div>;
  else if (route === 'pages' && info[id]) page = <div className="frame info"><Breadcrumb items={[[info[id][0]]]} /><article><h1>{info[id][0]}</h1><p>{info[id][1]}</p>{id === 'contact' && <p><a href="/pages/delivery/">Delivery</a> · <a href="/pages/returns/">Returns</a></p>}</article></div>;
  else page = <div className="frame empty"><h1>Page unavailable</h1><a className="button" href="/">Return home</a></div>;

  const count = bag.reduce((sum, line) => sum + line.quantity, 0);
  return <><Header count={count} open={() => setDrawer(true)} go={go} /><main id="main">{route ? <div className="page-transition" key={path.pathname}>{page}</div> : page}</main><Footer />{drawer && <Modal label="Shopping bag" className="bag-drawer" onClose={() => setDrawer(false)}><h2>Your bag ({count})</h2><Bag bag={bag} adjust={adjust} close={() => setDrawer(false)} /></Modal>}</>;
}

createRoot(document.getElementById('root')).render(<App />);
