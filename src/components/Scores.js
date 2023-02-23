import { getHighScores } from "../firebase"
import { useEffect, useState } from "react"

export default function Scores() {
  const [highScores, setHighScores] = useState([])

  useEffect(() => {
    ;(async () => {
      setHighScores(await getHighScores(10))
    })()
  }, [])

  return (
    <div className="main-content-container flex-col">
      <div className="scores-container flex-col">
        <div className="instructions-text scores-title">Top scores</div>
        {highScores.length > 0 ? (
          <div className="high-scores-container flex-col">
            {highScores.map((hs, i) => {
              return (
                <div key={i} className="high-score-row flex">
                  <div className="high-score-name">{hs.name}</div>
                  <div className="high-score-time">{`${hs.time}s`}</div>
                </div>
              )
            })}
          </div>
        ) : (
          <div>Loading high scores...</div>
        )}
      </div>
    </div>
  )
}
