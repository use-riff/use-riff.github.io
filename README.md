# riff — community coins for music

This repository contains the roadmap site for **riff**, a community-coin launch
protocol being developed on Solana. A coin creator selects a music artist to
support; part of the platform fees is reserved for that artist, who can verify
and claim it. If the artist declines or the claim window expires, the reserved
fees go to an independent music charity instead.

Riff does not exist as a live product yet. This site documents the project's
direction and roadmap while it is in development.

Live site: https://use-riff.github.io/
Updates: https://x.com/useRiffPad

## Stack

Plain HTML, CSS and vanilla JavaScript. No framework, no build step, no
runtime dependencies. Two self-hosted variable font files (Archivo for
display type, Hanken Grotesk for body/UI) are the only non-inline assets
besides the brand imagery.

## Running locally

Since there's no build step, you can either:

- Open `index.html` directly in a browser, or
- Serve the folder with any static server, e.g. `python3 -m http.server`

The site also works with JavaScript disabled: content, links and layout are
fully usable without it. JavaScript only adds scroll reveals, the roadmap
progress line, the sticky header surface and the hero sculpture's pointer
response.

## File structure

```
index.html          main page
style.css           all styling
script.js           progressive-enhancement behavior
404.html            not-found page
robots.txt          crawler rules + sitemap reference
sitemap.xml         single-page sitemap
assets/
  riff-logo.webp    wave-into-wordmark lockup (nav)
  riff-mark.webp    isolated glyph mark
  riff-wave.webp    the mirrored echo-wave from the brand artwork
  brand/            compressed copies of the original brand images
  favicon.svg       simplified vector mark
  social-card.jpg   Open Graph / X card image
  fonts/            self-hosted Archivo + Hanken Grotesk variable fonts
  grain.svg         low-opacity print-texture overlay
```

## Deploying to GitHub Pages

The site is served from the repository root by GitHub Pages:

- `index.html` is at the repository root.
- Every asset reference uses a relative path.
- There is no server-side routing or environment configuration required.

## License

All rights reserved — see [LICENSE](LICENSE). The bundled fonts are
distributed under the SIL Open Font License 1.1.
