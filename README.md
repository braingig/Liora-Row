# Liora Row

A React and Vite womenswear storefront. The catalog contains 42 sample products across seven clothing categories, with a dedicated URL for every product and collection.

## Run locally

Use Node.js 22.12 or later.

```sh
npm ci
npm run dev
```

`npm run build` creates the static site in `dist/`. Serve the directory over HTTP. Each product and collection has its own built HTML entry point.

Bag, wishlist, and profile preferences use local browser storage. Checkout is a demonstration with example pricing and shipping. It does not create orders or process payments. The newsletter form saves a local preference.

## Photography

The images in `public/images/` were made with the built-in ImageGen tool. The campaign briefs requested a square editorial photograph of a fictional fashion model in a plum floral wrap dress in a travertine gallery and a matching photo sheet with a portrait, fabric detail, and a second model in a lilac satin dress. The catalog briefs requested individual studio photos of diverse models wearing six distinctive styles per category, against consistent warm grey backdrops.
