import { useEffect, useRef, useState } from 'react'
import { doorPhoto } from 'virtual:door-photo'
import Doraemon from './Doraemon.jsx'
import { Confetti, Decorations } from './Decorations.jsx'
import NameText from './NameText.jsx'
import { config } from '../config.js'
import './DoorScene.css'

/**
 * Scene 5 — the Doraemon-inspired Anywhere Door.
 *
 * The door itself is the button. Opening it swings the leaf, floods the
 * frame with portal light and hands the stage to the finale card, where
 * confetti falls and the experience can be replayed from the start.
 */

const { door } = config

const OPEN_MS = 1150

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 2.4l2.1 6.3 6.3 2.1-6.3 2.1L12 19.2l-2.1-6.3L3.6 10.8l6.3-2.1z"
        fill="currentColor"
      />
      <circle cx="19.4" cy="19.2" r="1.6" fill="currentColor" opacity="0.7" />
      <circle cx="4.6" cy="4.4" r="1.2" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

function ReplayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M4.4 12a7.6 7.6 0 1 0 2.3-5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M4.2 3.9v4.6h4.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function DoorScene({ onReplay }) {
  const [stage, setStage] = useState('closed') // closed | opening | open
  const [burst, setBurst] = useState(0)

  const timer = useRef(null)
  const finaleRef = useRef(null)

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current)
    },
    [],
  )

  const isOpen = stage === 'open'
  const swung = stage !== 'closed'

  // The door fades away as the finale arrives, so move focus with it.
  useEffect(() => {
    if (isOpen) finaleRef.current?.focus()
  }, [isOpen])

  const openDoor = () => {
    if (stage !== 'closed') return

    setStage('opening')
    timer.current = window.setTimeout(() => {
      setStage('open')
      setBurst((count) => count + 1)
    }, OPEN_MS)
  }

  return (
    <main
      className={`scene scene--door${isOpen ? ' is-open' : ''}`}
      aria-labelledby="door-title"
    >
      <Decorations variant="dark" />
      <Confetti burstKey={burst} />

      <div className="door-scene">
        <header className="door-scene__head">
          <p className="eyebrow eyebrow--dark">{door.eyebrow}</p>
          <h1 id="door-title" className="door-scene__title display display--dark">
            <NameText text={door.title} />
          </h1>
          <p className="door-scene__message">{door.message}</p>
        </header>

        <div className="door-scene__stage">
          <div className={`door-scene__prop${isOpen ? ' is-away' : ''}`}>
            <div className="door-scene__mascot" aria-hidden="true">
              <Doraemon mood={swung ? 'happy' : 'idle'} />
            </div>

            <div className="door-portal">
              <button
                type="button"
                className={`anywhere-door${swung ? ' is-opening' : ''}`}
                onClick={openDoor}
                aria-label={door.doorLabel}
                disabled={swung}
              >
                <span className="anywhere-door__glow" aria-hidden="true" />
                <span className="anywhere-door__frame" aria-hidden="true">
                  <span className="anywhere-door__light" />
                </span>
                <span className="anywhere-door__leaf" aria-hidden="true">
                  <span className="anywhere-door__sign">{door.doorSign}</span>
                  <span className="anywhere-door__knob" />
                </span>
              </button>

              <p className="door-scene__hint">{door.doorHint}</p>
            </div>
          </div>

          {isOpen && (
            <article
              ref={finaleRef}
              className={`finale-card${doorPhoto ? ' finale-card--photo' : ''}`}
              tabIndex={-1}
              aria-labelledby="finale-title"
            >
              {doorPhoto ? (
                <figure className="door-photo">
                  <span className="door-photo__aura" aria-hidden="true" />
                  <span
                    className="door-photo__backdrop"
                    style={{ backgroundImage: `url("${doorPhoto}")` }}
                    aria-hidden="true"
                  />
                  <img className="door-photo__img" src={doorPhoto} alt={door.photoAlt} />
                  <span className="door-photo__shine" aria-hidden="true" />
                  <span className="door-photo__spark door-photo__spark--a" aria-hidden="true">
                    <SparkIcon />
                  </span>
                  <span className="door-photo__spark door-photo__spark--b" aria-hidden="true">
                    <SparkIcon />
                  </span>
                </figure>
              ) : (
                <span className="finale-card__spark" aria-hidden="true">
                  <SparkIcon />
                </span>
              )}

              <p className="eyebrow eyebrow--dark">{door.finale.eyebrow}</p>
              <h2 id="finale-title" className="finale-card__title display display--dark">
                {door.finale.title}
              </h2>
              <p className="finale-card__body">{door.finale.body}</p>
              <p className="finale-card__signature">{door.finale.signature}</p>

              <button
                type="button"
                className="btn btn--primary finale-card__replay"
                onClick={onReplay}
              >
                <ReplayIcon />
                <span>{door.finale.replayLabel}</span>
              </button>
            </article>
          )}
        </div>
      </div>
    </main>
  )
}
