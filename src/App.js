import Game from "./components/Game"
import Instructions from "./components/Instructions"
import TopBar from "./components/TopBar"

import muralImg from "./images/mural-quarter.jpg"

import { useReducer, useEffect } from "react"

function gameStateReducer(state, action) {
  switch (action.type) {
    case "start_game": {
      console.log("starting game")
      return {
        ...state,
        playing: true,
      }
    }
    default: {
      throw new Error(`Unhandled action ${action.type}`)
    }
  }
}

function App() {
  const [gameState, dispatch] = useReducer(gameStateReducer, {
    playing: false,
    charsToFind: ["mario", "luigi", "shizue"],
    charsFound: [],
  })

  useEffect(() => {
    console.log("initializing")
    // preload mural image (because it is large)
    const img = new Image()
    img.src = muralImg
  }, [])

  return (
    <div className="main-container flex-col">
      <TopBar />
      {gameState.playing ? (
        <Game gameState={gameState} />
      ) : (
        <Instructions
          startGameFunction={() => {
            dispatch({ type: "start_game" })
          }}
        />
      )}
    </div>
  )
}

export default App
