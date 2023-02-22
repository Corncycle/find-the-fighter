import muralImg from "../images/mural-quarter.jpg"
import xSvg from "../images/x.svg"
import CharacterCard from "./CharacterCard"

import { charData, charDataByName } from "../util"
import { useState } from "react"

const xTolerance = 0.025
const yTolerance = 0.3

let promptX = 0
let promptY = 0
let promptXPct = 0
let promptYPct = 0
let promptFlipped = false

let symbolsCounter = 0

function updatePromptLocation() {
  const promptNode = document.querySelector(".prompt-container")
  promptNode.style.left = `calc(${promptX}px - (80vh - 5rem) / 12)`
  promptNode.style.top = `calc(${promptY}px - (80vh - 5rem) / 12)`
  const namesNode = document.querySelector(".prompt-names-container")
  if (promptFlipped) {
    namesNode.classList.add("flipped")
  } else {
    namesNode.classList.remove("flipped")
  }
}

function isValidGuess(character, xPct, yPct) {
  let char
  for (const c of charData.characters) {
    if (c.name === character) {
      char = c
      break
    }
  }
  return (
    xPct <= char.x + xTolerance &&
    xPct >= char.x - xTolerance &&
    yPct >= char.y &&
    yPct <= char.y + yTolerance
  )
}

export default function Game({ gameState, dispatch, imgLocs }) {
  const [xSymbols, setXSymbols] = useState([])

  return (
    <div className="game-container flex-col">
      <div className="character-cards-container flex">
        {gameState.charsToFind.map((char, i) => {
          return (
            <CharacterCard
              key={i}
              character={char}
              rawName={charDataByName[char].rawName}
              found={gameState.charsFound.includes(char)}
              imgLoc={imgLocs[i]}
            />
          )
        })}
      </div>
      <div className="mural-img-container flex">
        {
          <img
            className="mural-img"
            alt="Smash Bros Ultimate Mural"
            src={muralImg}
            onClick={(e) => {
              e.stopPropagation()
              dispatch({ type: "show_prompt" })
              const rect = e.target.getBoundingClientRect()
              const x = e.clientX - rect.left
              const y = e.clientY - rect.top

              promptFlipped = x / e.target.width > 0.9
              promptX = x
              promptY = y
              promptXPct = x / e.target.width
              promptYPct = y / e.target.height

              updatePromptLocation()
            }}
          ></img>
        }
        <div
          className={
            "prompt-container" + (gameState.promptShown ? "" : " hidden")
          }
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className="prompt-outline"></div>
          <ul className="prompt-names-container">
            {gameState.charsToFind.map((name, i) => {
              return (
                <li
                  key={i}
                  className="prompt-name"
                  onClick={(e) => {
                    if (!gameState.charsFound.includes(name)) {
                      if (isValidGuess(name, promptXPct, promptYPct)) {
                        dispatch({ type: "find_character", name: name })
                      } else {
                        setXSymbols(
                          xSymbols.concat([[promptX, promptY, symbolsCounter]])
                        )
                        symbolsCounter += 1
                        setTimeout(() => {
                          setXSymbols((oldSymbols) => {
                            const copy = [...oldSymbols]
                            copy.shift()
                            return copy
                          })
                        }, 3000)
                      }
                    }
                    dispatch({ type: "hide_prompt" })
                  }}
                  dangerouslySetInnerHTML={{
                    __html: charDataByName[name].rawName,
                  }}
                ></li>
              )
            })}
          </ul>
        </div>
        {xSymbols.map((coords, i) => {
          return (
            <img
              key={coords[2]}
              alt="X"
              src={xSvg}
              style={{ left: coords[0] + "px", top: coords[1] + "px" }}
              className="incorrect-symbol"
            />
          )
        })}
      </div>
    </div>
  )
}
