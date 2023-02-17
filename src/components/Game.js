import muralImg from "../images/mural-quarter.jpg"
import CharacterCard from "./CharacterCard"

export default function Game({ gameState }) {
  return (
    <div className="game-container flex-col">
      <div className="character-cards-container flex">
        {gameState.charsToFind.map((char, i) => {
          return <CharacterCard key={i} character={char} />
        })}
      </div>
      <div className="mural-img-container flex">
        {
          <img
            className="mural-img"
            alt="Smash Bros Ultimate Mural"
            src={muralImg}
          ></img>
        }
      </div>
    </div>
  )
}
