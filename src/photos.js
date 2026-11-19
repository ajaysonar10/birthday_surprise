import { photos as manifest } from 'virtual:photos'
import { config } from './config.js'

/**
 * Importing `virtual:photos` makes the build list every image in
 * public/photos/. A caption can be overridden per file name in
 * `config.gallery.captions`; otherwise the file name is humanised.
 */
const overrides = config.gallery.captions ?? {}

export const photos = manifest.map((photo) => ({
  ...photo,
  caption: overrides[photo.file] ?? photo.caption,
}))
