// 1. imports
import axios from "axios"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// 2. action definitions
const GET_CHORES = "chores/GET_CHORES"
const GET_COUNT = "chores/GET_COUNT"

// 3. initial state
const initialState = {
  chores: [],
  count: 0
}

// 4. reducer state (default export)
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHORES:
      return { ...state, chores: action.payload }
    case GET_COUNT:
      return { ...state, count: action.payload }
    default:
      return state
  }
}

// 5. action creators
function getChores() {
  return dispatch => {
    axios.get("/chores").then(resp => {
      dispatch({
        type: GET_CHORES,
        payload: resp.data
      })
    })
    dispatch(countChores())
  }
}

function addChore(chore) {
  return dispatch => {
    axios.post("/chores", { chore, status: "active" }).then(resp => {
      dispatch(getChores())
    })
  }
}

function delChore(id) {
  return dispatch => {
    axios.delete("/chores/" + id).then(resp => {
      dispatch(getChores())
    })
  }
}

function toggleChore(id) {
  return dispatch => {
    axios.get("/chores/" + id).then(resp => {
      if (resp.data.status === "completed") {
        axios.patch("/chores/" + id, { status: "active" }).then(resp => {
          dispatch(getChores())
        })
      } else {
        axios.patch("/chores/" + id, { status: "completed" }).then(resp => {
          dispatch(getChores())
        })
      }
    })
  }
}

function countChores() {
  return dispatch => {
    axios.get("/chores?status=active").then(resp => {
      dispatch({
        type: GET_COUNT,
        payload: resp.data.length
      })
    })
  }
}

function filterChores(status) {
  return dispatch => {
    let query = ""

    if (status === "all") {
      query = ""
    } else if (status === "completed") {
      query = "?status=completed"
    } else if (status === "active") {
      query = "?status=active"
    }
    axios.get(`/chores${query}`).then(resp => {
      dispatch({
        type: GET_CHORES,
        payload: resp.data
      })
    })
    dispatch(countChores())
  }
}

// function clearChores() {
//   return dispatch => {
//     axios.get('/chores?status=completed').then(resp => {
//       Promise.all(resp.data.map(chore => {
//         new Promise((resolve, reject) => {
//           axios.delete('/chores/' + chore.id).then(resp => {
//             resolve()
//           })
//         }).then(values => {
//           dispatch(getChores())
//         })
//       }))
//     })
//   }
// }

// 6 custom hook (named export) useChores
export function useChores() {
  const dispatch = useDispatch()
  const chores = useSelector(appState => appState.choreState.chores)
  const count = useSelector(appState => appState.choreState.count)
  const add = chore => dispatch(addChore(chore))
  const del = choreId => dispatch(delChore(choreId))
  const toggle = id => dispatch(toggleChore(id))
  const filter = status => dispatch(filterChores(status))
  // const clear = () => dispatch(clearChores())

  useEffect(() => {
    dispatch(getChores())
  }, [dispatch])

  return { chores, add, del, toggle, count, filter }
}
