import SmashButton from "./SmashButton"

export default function Instructions({ startGameFunction }) {
  return (
    <div className="main-content-container flex">
      <div className="instructions-container flex-col center">
        <span className="instructions-text">
          Click the three randomly chosen fighters in the Smash Bros. Ultimate
          mural as fast as possible!
        </span>
        <SmashButton text="Start Game" onClick={startGameFunction} />
      </div>
    </div>
  )
}
