import thumb from "../images/thumbnails/mario.png"

export default function CharacterCard({ character }) {
  return (
    <div className="character-card-container flex">
      <img src={thumb} alt="mario" />
      <span className="character-card-caption">{character}</span>
    </div>
  )
}
