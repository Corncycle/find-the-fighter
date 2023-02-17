export default function SmashButton({ onClick, text }) {
  return (
    <div className="smash-button-border" onClick={onClick}>
      <button onClick={onClick} className="smash-button">
        {text}
      </button>
    </div>
  )
}
