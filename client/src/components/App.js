import React from "react"
import { useChores } from "../hooks"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Form from "./Form"
import List from "./List"

export default props => {
  const { foo, get } = useChores()

  return (
    <div>
      <Form />
      <List />
    </div>
  )
}
