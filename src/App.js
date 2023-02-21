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
    case "end_game": {
      return {
        ...state,
        playing: false,
      }
    }
    case "show_prompt": {
      return {
        ...state,
        promptShown: true,
      }
    }
    case "hide_prompt": {
      return {
        ...state,
        promptShown: false,
      }
    }
    case "find_character": {
      if (state.charsFound.includes(action.name)) {
        return { ...state }
      } else {
        return {
          ...state,
          charsFound: state.charsFound.concat([action.name]),
        }
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
    promptShown: false,
  })

  useEffect(() => {
    console.log("initializing")
    // preload mural image (because it is large)
    const img = new Image()
    img.src = muralImg
  }, [])

  useEffect(() => {
    if (gameState.charsFound.length === 3) {
      dispatch({ type: "end_game" })
    }
  }, [gameState.charsFound])

  return (
    <div
      className="main-container flex-col"
      onClick={() => {
        dispatch({ type: "hide_prompt" })
      }}
    >
      <TopBar />
      {gameState.playing ? (
        <Game gameState={gameState} dispatch={dispatch} />
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
