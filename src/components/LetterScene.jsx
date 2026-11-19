import { useEffect, useRef, useState } from 'react'
import { Decorations } from './Decorations.jsx'
import { config, withName } from '../config.js'
import './LetterScene.css'

/**
 * Scene 4 — the love letter from Ajay.
 *
 * Closed envelope → opening animation → the letter unfolds and its
 * lines reveal one after another. Continue stays disabled until the
 * reveal has finished, so nobody skips past the moment by accident.
 */

const { letter } = config

const OPEN_MS = 900
const REVEAL_START = OPEN_MS + 220 // lines begin once the card has landed
const READY_MS = REVEAL_START + 1900

/* per-line reveal delay, in seconds, from the moment the card appears */
const LINE_DELAYS = [0.1, 0.4, 0.72, 1.04, 1.36]

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 20.3c-.4 0-.8-.15-1.1-.42C6.2 15.9 3 13.1 3 9.5 3 6.9 5 5 7.5 5c1.5 0 2.9.7 3.8 1.9l.7.9.7-.9C13.6 5.7 15 5 16.5 5 19 5 21 6.9 21 9.5c0 3.6-3.2 6.4-7.9 10.38-.3.27-.7.42-1.1.42z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function LetterScene({ onNext }) {
  const [stage, setStage] = useState('closed') // closed | opening | open
  const [ready, setReady] = useState(false)

  const timers = useRef([])

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer))
    },
    [],
  )

  const openLetter = () => {
    if (stage !== 'closed') return

    setStage('opening')

    timers.current.push(window.setTimeout(() => setStage('open'), OPEN_MS))
    timers.current.push(window.setTimeout(() => setReady(true), READY_MS))
  }

  const isOpen = stage === 'open'
  const opening = stage === 'opening'

  return (
    <main className="scene scene--letter">
      <Decorations variant="dark" />

      <div className={`letter-scene${isOpen ? ' is-open' : ''}`}>
        <p className="eyebrow eyebrow--dark">{letter.eyebrow}</p>
        <h1 className="letter-scene__heading">{withName(letter.title)}</h1>

        <div className="letter-scene__stage">
          {isOpen ? (
            <article className="letter-card">
              <span className="letter-card__flourish" aria-hidden="true">
                <HeartIcon />
              </span>

              <p className="letter-card__line letter-card__greeting" style={{ '--d': `${LINE_DELAYS[0]}s` }}>
                {withName(letter.greeting)}
              </p>

              {letter.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="letter-card__line letter-card__para"
                  style={{ '--d': `${LINE_DELAYS[index + 1]}s` }}
                >
                  {paragraph}
                </p>
              ))}

              <div
                className="letter-card__line letter-card__sign"
                style={{ '--d': `${LINE_DELAYS[4]}s` }}
              >
                <p>{letter.closing}</p>
                <p className="letter-card__signature">{letter.signature}</p>
              </div>

              {!ready && <span className="letter-card__caret" aria-hidden="true" />}
            </article>
          ) : (
            <div className={`letter-stage${opening ? ' is-opening' : ''}`}>
              <button
                type="button"
                className="envelope"
                onClick={openLetter}
                aria-label={letter.openLabel}
              >
                <span className="envelope__letter" aria-hidden="true" />
                <span className="envelope__front" aria-hidden="true" />
                <span className="envelope__flap" aria-hidden="true" />
                <span className="envelope__seal" aria-hidden="true">
                  <HeartIcon />
                </span>
              </button>

              <p className="letter-stage__hint">{letter.envelopeHint}</p>
            </div>
          )}
        </div>

        {isOpen && (
          <div className={`letter-scene__next${ready ? ' is-ready' : ''}`}>
            <button
              type="button"
              className="btn btn--primary"
              onClick={onNext}
              disabled={!ready}
            >
              {letter.continueLabel}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
