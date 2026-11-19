import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/

const PUBLIC_DIR = 'public'
const PHOTO_DIR = 'public/photos'
const VIRTUAL_ID = 'virtual:photos'
const RESOLVED_ID = '\0' + VIRTUAL_ID
const IMAGE_RE = /\.(avif|gif|jpe?g|png|webp)$/i

// A single optional photo for the Anywhere Door finale: public/door-photo.*
const DOOR_ID = 'virtual:door-photo'
const RESOLVED_DOOR_ID = '\0' + DOOR_ID
// Tolerates double extensions straight from a phone, e.g. door-photo.jpg.jpeg
const DOOR_RE = /^door-photo(?:\.[a-z0-9]+)+$/i

/** "first-snow_2024.jpg" -> "First snow 2024" */
function captionFor(file) {
  const base = file
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return base.replace(/^./, (first) => first.toUpperCase())
}

/**
 * Photos dropped into public/photos/ are plain static files, so the app
 * cannot discover them at runtime. This plugin reads that folder at build
 * (and dev) time and exposes the list through `virtual:photos`, which keeps
 * the folder drop-in: add a file, it appears in the gallery.
 */
function photoManifest() {
  let root = path.dirname(fileURLToPath(import.meta.url))

  return {
    name: 'photo-manifest',

    configResolved(resolved) {
      root = resolved.root
    },

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
      if (id === DOOR_ID) return RESOLVED_DOOR_ID
    },

    load(id) {
      if (id === RESOLVED_DOOR_ID) {
        const dir = path.resolve(root, PUBLIC_DIR)
        const file = existsSync(dir)
          ? readdirSync(dir)
              .filter((name) => DOOR_RE.test(name))
              .sort((a, b) =>
                a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
              )[0]
          : undefined

        return `export const doorPhoto = ${
          file ? JSON.stringify(`/${encodeURIComponent(file)}`) : 'null'
        }`
      }

      if (id !== RESOLVED_ID) return

      const dir = path.resolve(root, PHOTO_DIR)
      const files = existsSync(dir)
        ? readdirSync(dir)
            .filter((file) => IMAGE_RE.test(file))
            .sort((a, b) =>
              a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
            )
        : []

      const photos = files.map((file) => ({
        file,
        src: `/photos/${encodeURIComponent(file)}`,
        caption: captionFor(file),
      }))

      return `export const photos = ${JSON.stringify(photos)}`
    },

    configureServer(server) {
      const photos = path.resolve(root, PHOTO_DIR)
      const publicDir = path.resolve(root, PUBLIC_DIR)
      server.watcher.add(photos)
      server.watcher.add(publicDir)

      const refresh = (file) => {
        const full = path.resolve(file)
        if (full.startsWith(photos) || DOOR_RE.test(path.basename(full))) {
          server.ws.send({ type: 'full-reload' })
        }
      }

      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
    },
  }
}

export default defineConfig({
  plugins: [react(), photoManifest()],
})
