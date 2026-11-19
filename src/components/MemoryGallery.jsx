import { Decorations } from './Decorations.jsx'
import { config } from '../config.js'
import { photos } from '../photos.js'
import './MemoryGallery.css'

/**
 * Scene 3 — the shoebox.
 *
 * Every image in public/photos/ is listed at build time (see the
 * `photo-manifest` plugin in vite.config.js), so this scene is read-only:
 * it lays all of them out as a scrapbook, one frame style per photo.
 */

const { gallery } = config

const FRAMES = ['polaroid', 'tape', 'glass', 'stamp', 'sticker']
const TILTS = ['-2.4deg', '1.8deg', '-1.2deg', '2.6deg', '-2deg', '1.4deg']
const ARTS = ['star', 'heart', 'sparkle', 'moon', 'cloud']

// The last word of the heading gets the gradient accent, matching the
// question scenes.
const titleCut = gallery.title.lastIndexOf(' ')
const titleLead = gallery.title.slice(0, titleCut)
const titleAccent = gallery.title.slice(titleCut + 1)

function StickerArt({ name }) {
  if (name === 'heart') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M12 20.2S3.6 15 3.6 9.2A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 8.4 2.2c0 5.8-8.4 11-8.4 11Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (name === 'sparkle') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M12 2.6c.5 4.6 1.6 6.1 6.6 6.7-4.9.7-6.1 2.1-6.6 6.6-.5-4.5-1.7-5.9-6.6-6.6 5-.6 6.1-2.1 6.6-6.7Z"
          fill="currentColor"
        />
        <path
          d="M18.2 15.2c.3 2 .8 2.6 2.9 2.9-2.1.3-2.6.9-2.9 2.9-.3-2-.8-2.6-2.9-2.9 2.1-.3 2.6-.9 2.9-2.9Z"
          fill="currentColor"
          opacity=".72"
        />
      </svg>
    )
  }

  if (name === 'moon') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M15.5 3.2a8.8 8.8 0 1 0 5.2 12.4A9.4 9.4 0 0 1 15.5 3.2Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (name === 'cloud') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M7.2 18.2a3.7 3.7 0 0 1-.3-7.4 5 5 0 0 1 9.5-1.1 3.9 3.9 0 0 1 1.2 7.6l-.5.9H7.2Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="m12 2.9 2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.7 6.4 20l1.4-6.3L3 9.4l6.4-.6L12 2.9Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function MemoryGallery({ onNext }) {
  return (
    <main className="scene scene--memories" aria-labelledby="memories-title">
      <Decorations variant="dark" />

      <div className="memories">
        <header className="memories__head">
          <p className="eyebrow eyebrow--dark">{gallery.eyebrow}</p>
          <h1 id="memories-title" className="memories__title display display--dark">
            {titleLead} <span className="memories__title-accent">{titleAccent}</span>
          </h1>
          <p className="memories__subtitle">{gallery.subtitle}</p>
        </header>

        {photos.length > 0 ? (
          <div className="memories__board">
            <ul className="memories__grid">
              {photos.map((photo, index) => {
                const frame = FRAMES[index % FRAMES.length]
                const art = ARTS[index % ARTS.length]

                return (
                  <li key={photo.file}>
                    <figure
                      className={`memory memory--${frame}`}
                      style={{
                        '--tilt': TILTS[index % TILTS.length],
                        '--delay': `${Math.min(index, 11) * 70}ms`,
                      }}
                    >
                      <span className="memory__paper">
                        <span className="memory__tape memory__tape--a" aria-hidden="true" />
                        <span className="memory__tape memory__tape--b" aria-hidden="true" />

                        <span className="memory__photo">
                          <img
                            src={photo.src}
                            alt={photo.caption || `Memory ${index + 1}`}
                            loading={index < 3 ? 'eager' : 'lazy'}
                            decoding="async"
                          />
                          <span className="memory__shine" aria-hidden="true" />
                        </span>

                        <figcaption className="memory__caption">{photo.caption}</figcaption>

                        <span className="memory__sticker" aria-hidden="true">
                          <StickerArt name={art} />
                        </span>
                      </span>
                    </figure>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : (
          <p className="memories__empty-note">{gallery.emptyTitle}</p>
        )}

        <div className="memories__actions">
          <button type="button" className="btn btn--primary" onClick={onNext}>
            {gallery.continueLabel}
          </button>
        </div>
      </div>
    </main>
  )
}
