export default function CharacterCard({ character, rawName, found, imgLoc }) {
  return (
    <div className={"character-card-container flex" + (found ? " found" : "")}>
      <img src={imgLoc} alt={rawName} />
      <span
        className="character-card-caption"
        dangerouslySetInnerHTML={{ __html: rawName }}
      ></span>
    </div>
  )
}
