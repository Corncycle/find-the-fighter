import SmashButton from "./SmashButton"

import { submitScore } from "../firebase"
import { Link } from "react-router-dom"

export default function Instructions({
  startGameFunction,
  finishedGame,
  time,
  showSubmitForm,
  dispatch,
  currName,
  setCurrName,
}) {
  return (
    <div className="main-content-container flex justify-center">
      {!finishedGame ? (
        <div className="instructions-container flex-col center">
          <span className="instructions-text">
            Find the three randomly chosen fighters in the Smash Bros. Ultimate
            mural as quickly as possible!
          </span>
          <SmashButton text="Start Game" onClick={startGameFunction} />
        </div>
      ) : (
        <div className="instructions-container flex-col center">
          <span className="instructions-text">
            You found all of the characters in {time} seconds!
          </span>
          {showSubmitForm && (
            <>
              <span className="instructions-text">Submit your score?</span>
              <form
                className="submit-score-form flex center"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (currName.length === 0 || currName.length > 20) {
                    console.log("bad!")
                    const inputNode = document.querySelector(".submit-text")
                    inputNode.setCustomValidity(
                      "Names must be between 1 and 20 characters"
                    )
                    inputNode.reportValidity()
                  } else {
                    console.log("we good")
                    submitScore(currName, time)
                    dispatch({ type: "hide_submit_form" })
                  }
                }}
              >
                <input
                  type="text"
                  className="submit-text"
                  placeholder="Your Name"
                  value={currName}
                  onInput={(e) => {
                    e.target.setCustomValidity("")
                    setCurrName(e.target.value)
                  }}
                />
                <SmashButton text="Submit" />
              </form>
            </>
          )}
          <div style={{ height: "50px" }} />
          <div className="flex button-set">
            <SmashButton text="Play again" onClick={startGameFunction} />
            <Link to="/scores">
              <SmashButton text="View Scores" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
