# Doraemon Birthday Surprise Website

A cute, Doraemon-inspired birthday surprise website built with React and Vite.
It is a small, single-page gift: a welcome screen, a birthday letter that comes
out of an animated envelope, and a final surprise behind an "Anywhere Door"
with a cake, candles and confetti.

Everything is drawn with plain SVG and CSS — there are no image files to worry
about — and the design adapts to phones, tablets and desktops.

## Sections

1. **Welcome** — a hero card with a waving Doraemon and an "Open Your Surprise" button.
2. **The letter** — tap the envelope and it opens to reveal the birthday letter.
3. **The surprise** — tap the Anywhere Door to reveal the cake, then press **Celebrate!**.

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer (which includes `npm`).
- A terminal (Command Prompt, PowerShell, Terminal, or Git Bash).

## Install dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

This downloads React, Vite and the other tools the project needs. You only have
to do it once, or again after changing `package.json`.

## Run the website locally

```bash
npm run dev
```

Vite will print a local address such as `http://localhost:5173/`. Open it in your
browser. Any file you save is reloaded on the page automatically. Press `Ctrl+C`
in the terminal to stop the server.

## Create a production build

```bash
npm run build
```

The finished, optimised website is written to the `dist/` folder. To preview that
build exactly as it will run in production, use:

```bash
npm run preview
```

You can then upload the contents of `dist/` to any static hosting service.

## Personalising the birthday messages

All of the text on the website lives in one file: **`src/config.js`**. You do not
need to touch any component to change what the site says.

- **The name** — edit `person.name`. The default is `Kalpana Didi`.
- **The birthday message** — edit the strings inside `welcome` and `birthday`.
- **The letter** — edit `letter.eyebrow`, `letter.title`, `letter.greeting`, the
  `letter.paragraphs` list, `letter.closing` and `letter.signature`.
- **The final surprise** — edit `surprise.title`, `surprise.message`,
  `surprise.cakeCaption`, `surprise.celebrateButton` and `surprise.afterCelebrate`.

Anywhere you write `{name}` in those strings, it is replaced with the value of
`person.name`, so changing the name once updates every section of the site.
The page title in the browser tab is also built from that name.

## Project structure

```
index.html            page shell and web fonts
src/main.jsx          React entry point
src/App.jsx           puts the three sections together
src/config.js         all editable text (name, messages, letter, surprise)
src/components/       the three sections and the SVG artwork
src/index.css         colour palette and global styles
public/               favicon and icons
```

## Tech stack

React 19, Vite 8, and hand-written CSS animations.
