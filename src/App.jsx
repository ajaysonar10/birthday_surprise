import { useCallback, useEffect, useState } from 'react'
import SceneOne from './components/SceneOne.jsx'
import SceneTwo from './components/SceneTwo.jsx'
import MemoryGallery from './components/MemoryGallery.jsx'
import LetterScene from './components/LetterScene.jsx'
import DoorScene from './components/DoorScene.jsx'
import { config, withName } from './config.js'
import './App.css'

const SCENE_COUNT = 5

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M14.5 5.5 8 12l6.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function App() {
  const [scene, setScene] = useState(1)
  const [direction, setDirection] = useState('forward')

  useEffect(() => {
    document.title = withName(config.site.title)
  }, [])

  const goTo = useCallback(
    (next) => {
      const clamped = Math.max(1, Math.min(SCENE_COUNT, next))
      if (clamped === scene) return

      setDirection(clamped > scene ? 'forward' : 'back')
      setScene(clamped)
    },
    [scene],
  )

  /* Replay starts the whole experience over again. The shoebox photos are
     static files, so there is nothing to reset besides the scene. */
  const restart = useCallback(() => {
    setDirection('back')
    setScene(1)
  }, [])

  return (
    <div className="app">
      <div key={scene} className={`app__scene app__scene--${direction}`}>
        {scene === 1 && <SceneOne onNext={() => goTo(2)} />}
        {scene === 2 && <SceneTwo onNext={() => goTo(3)} />}
        {scene === 3 && <MemoryGallery onNext={() => goTo(4)} />}
        {scene === 4 && <LetterScene onNext={() => goTo(5)} />}
        {scene === 5 && <DoorScene onReplay={restart} />}

        {scene > 1 && (
          <button
            type="button"
            className="scene-back"
            onClick={() => goTo(scene - 1)}
          >
            <BackIcon />
            <span>Back</span>
          </button>
        )}
      </div>
    </div>
  )
}
