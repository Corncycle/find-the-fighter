export default function SmashButton({ onClick, text }) {
  return (
    <div className="smash-button-border" onClick={onClick}>
      <button className="smash-button">{text}</button>
    </div>
  )
}
