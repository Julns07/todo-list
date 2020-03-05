import React, { useState } from "react"
import { useChores } from "../hooks"

export default props => {
  const [chore, setChore] = useState("")
  const { add } = useChores()

  function handleSubmit(e) {
    e.preventDefault()

    if (chore !== "") {
      add(chore)
      setChore("")
    }
  }

  return (
    <div className="header">
      <h1>My To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="listMaker"
          placeholder="What should I do?"
          onChange={e => setChore(e.target.value)}
          value={chore}
        />
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}
