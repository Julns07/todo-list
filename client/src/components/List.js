import React, { useState } from "react"
import { useChores } from "../hooks"
import { FaRegCircle, FaCheckCircle } from "react-icons/fa"
import { MdClose } from "react-icons/md"

export default props => {
  const { chores, del, toggle, count, filter } = useChores()
  const [view, setView] = useState("all")

  function changeView(status) {
    setView(status)
    filter(status)
  }

  return (
    <div>
      {chores.map((chore, i) => (
        <div
          className={
            chore.status === "completed" ? "completed itemList" : "itemList"
          }
          key={"chore-" + i}
        >
          <FaCheckCircle className="checkCircle circle" />
          <FaRegCircle
            onClick={e => toggle(chore.id)}
            className="normalCircle circle"
          />
          <p>{chore.chore}</p>
          <MdClose className="del" onClick={e => del(chore.id)} />
        </div>
      ))}
      <p className="count">You have {count} items left</p>
      <div className="inputs">
        <label className="buttonLabels" htmlFor="all">
          All
        </label>
        <input
          checked={view === "all" ? true : false}
          onChange={e => changeView("all")}
          type="radio"
          name="view"
          id="all"
        />
        <label className="buttonLabels" htmlFor="completed">
          Completed
        </label>
        <input
          checked={view === "completed" ? true : false}
          onChange={e => changeView("completed")}
          type="radio"
          name="view"
          id="completed"
        />
        <label className="buttonLabels" htmlFor="active">
          Active
        </label>
        <input
          checked={view === "active" ? true : false}
          onChange={e => changeView("active")}
          type="radio"
          name="view"
          id="active"
        />

        {/* <button onClick={e => clear}>Clear Completed</button> couldn't figure out */}
      </div>
    </div>
  )
}
