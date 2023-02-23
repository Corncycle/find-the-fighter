import Game from "./components/Game"
import Instructions from "./components/Instructions"
import TopBar from "./components/TopBar"

import muralImg from "./images/mural-quarter.jpg"

import { useReducer, useEffect, useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { sampleSize } from "lodash"

import { charNames } from "./util"
import About from "./components/About"
import Scores from "./components/Scores"

const imgs = require.context("./images/thumbnails", false)

function gameStateReducer(state, action) {
  switch (action.type) {
    case "start_game": {
      return {
        ...state,
        playing: true,
        charsToFind: state.queuedCharsToFind,
        queuedCharsToFind: action.nextCharacters,
        charsFound: [],
        promptShown: false,
        startTime: new Date(),
        endTime: null,
        showSubmitForm: true,
      }
    }
    case "enqueue_characters": {
      return {
        ...state,
        queuedCharsToFind: action.nextCharacters,
      }
    }
    case "end_game": {
      return {
        ...state,
        playing: false,
        finishedGame: true,
        endTime: new Date(),
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
    case "show_submit_form": {
      return {
        ...state,
        showSubmitForm: true,
      }
    }
    case "hide_submit_form": {
      return {
        ...state,
        showSubmitForm: false,
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
    finishedGame: false,
    charsToFind: [],
    queuedCharsToFind: [],
    charsFound: [],
    promptShown: false,
    startTime: null,
    endTime: null,
    showSubmitForm: true,
  })

  const [currName, setCurrName] = useState("")

  const location = useLocation()

  const [currImgs, setCurrImgs] = useState([])
  const [queuedImgs, setQueuedImgs] = useState([])
  const [currentPage, setCurrentPage] = useState("play")

  useEffect(() => {
    setCurrentPage(location)
    switch (location.pathname) {
      case undefined: {
        setCurrentPage("play")
        return
      }
      case "/": {
        setCurrentPage("play")
        return
      }
      case "/scores": {
        setCurrentPage("scores")
        return
      }
      case "/about": {
        setCurrentPage("about")
        return
      }
      default: {
        throw new Error(`Unhandled route ${location.path}`)
      }
    }
  }, [location])

  // used for preloading individual character images for responsiveness
  function imgsByArr(arr) {
    const out = []
    for (const char of arr) {
      // preload image
      const img = new Image()
      img.src = imgs("./" + char + ".png")
      out.push(imgs("./" + char + ".png"))
    }
    return out
  }

  useEffect(() => {
    // preload mural image (because it is large)
    const img = new Image()
    img.src = muralImg

    const newChars = sampleSize(charNames, 3)
    setQueuedImgs(imgsByArr(newChars))

    dispatch({ type: "enqueue_characters", nextCharacters: newChars })
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
      <TopBar currentPage={currentPage} />
      <Routes>
        <Route
          path="/"
          element={
            gameState.playing ? (
              <Game
                gameState={gameState}
                dispatch={dispatch}
                imgLocs={currImgs}
              />
            ) : (
              <Instructions
                startGameFunction={() => {
                  const newChars = sampleSize(charNames, 3)
                  const safeQueued = [...queuedImgs]
                  setCurrImgs(safeQueued)
                  setQueuedImgs(imgsByArr(newChars))

                  dispatch({ type: "start_game", nextCharacters: newChars })
                }}
                finishedGame={gameState.finishedGame}
                time={
                  Math.round((gameState.endTime - gameState.startTime) / 100) /
                  10
                }
                showSubmitForm={gameState.showSubmitForm}
                dispatch={dispatch}
                currName={currName}
                setCurrName={setCurrName}
              />
            )
          }
        />
        <Route path="/scores" element={<Scores />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
