export default function TopBar() {
  const options = ["play", "scores", "about"]

  return (
    <div className="topbar-container flex">
      <h1 className="topbar-title">Find The Fighter</h1>
      <ul className="topbar-options-container flex">
        {options.reduce((prev, curr, i) => {
          let newArr = prev.concat([
            <li className="topbar-option" key={i}>
              {curr}
            </li>,
          ])
          if (i < options.length - 1) {
            newArr = newArr.concat([
              <li className="topbar-spacer" key={100 + i}>
                ·
              </li>,
            ])
          }
          return newArr
        }, [])}
      </ul>
    </div>
  )
}