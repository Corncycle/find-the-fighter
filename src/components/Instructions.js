import SmashButton from "./SmashButton"

export default function Instructions({
  startGameFunction,
  finishedGame,
  time,
}) {
  return (
    <div className="main-content-container flex">
      {!finishedGame ? (
        <div className="instructions-container flex-col center">
          <span className="instructions-text">
            Click the three randomly chosen fighters in the Smash Bros. Ultimate
            mural as fast as possible!
          </span>
          <SmashButton text="Start Game" onClick={startGameFunction} />
        </div>
      ) : (
        <div className="instructions-container flex-col center">
          <div style={{ height: "30px" }} />
          <span className="instructions-text">
            You found all of the characters in {time} seconds!
          </span>
          <span className="instructions-text">Submit your score?</span>
          <form
            className="submit-score-form flex center"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <input
              type="text"
              className="submit-text"
              placeholder="Your Name"
            />
            <SmashButton text="Submit" />
          </form>
          <div style={{ height: "30px" }} />
          <span className="instructions-text">Or play again!</span>
          <SmashButton text="Play again" onClick={startGameFunction} />
        </div>
      )}
    </div>
  )
}
