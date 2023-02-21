import thumb from "../images/thumbnails/mario.png"

export default function CharacterCard({ character, rawName, found }) {
  return (
    <div className={"character-card-container flex" + (found ? " found" : "")}>
      <img src={thumb} alt="mario" />
      <span className="character-card-caption">{rawName}</span>
    </div>
  )
}
