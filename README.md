# riff — community coins for music

This repository contains the static roadmap site for **riff**, an open-source
launch protocol being developed on Solana. A coin creator selects a music
artist to support; part of the platform fees is reserved for that artist, who
can verify and claim it. If the artist declines or the claim window expires,
the reserved fees go to an independent music charity instead.

Riff does not exist as a live product yet. This site documents the project's
direction and roadmap while it's being built in public.

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
index.html         main page
style.css           all styling
script.js           progressive-enhancement behavior (see comments at top for
                    the two link placeholders)
404.html            not-found page
robots.txt          crawler rules + sitemap reference
sitemap.xml         single-page sitemap
assets/
  riff-logo.webp    wave-into-wordmark lockup (nav, footer, social meta)
  riff-mark.webp    isolated glyph mark
  riff-wave.webp    the mirrored echo-wave, cropped from the supplied artwork
  brand/            lightly-compressed copies of the original supplied images
  favicon.svg       simplified vector mark
  social-card.jpg   Open Graph / Twitter card image
  fonts/            self-hosted Archivo + Hanken Grotesk variable fonts
  grain.svg         low-opacity print-texture overlay
```

## Placeholders to replace before publishing

These appear as literal strings — a project-wide find-and-replace handles
all of them:

| Placeholder | Where | Replace with |
|---|---|---|
| `https://github.com/REPLACE-ME` | `index.html`, `404.html`, `script.js` | your GitHub repository URL |
| `https://x.com/REPLACE-ME` | `index.html`, `script.js` | your X/Twitter profile URL |
| `https://REPLACE-ME.github.io/` | `index.html` (canonical, OG, Twitter), `robots.txt`, `sitemap.xml` | your GitHub Pages URL |

`script.js` documents the two link placeholders at the very top of the file
for convenience; the working links live in the HTML so the site remains
fully functional with JavaScript disabled.

## Deploying to GitHub Pages

This site is built to be served from the root of a branch with GitHub Pages:

- `index.html` is already at the repository root.
- Every asset reference uses a relative path.
- There is no server-side routing or environment configuration required.

Push to the branch configured for Pages and the site will build as-is.

## License

MIT — see [LICENSE](LICENSE).
