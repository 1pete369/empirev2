"use client"

import { useUserContext } from "@/app/contexts/UserDataProviderContext"
import {
  deleteTodo,
  getTodos,
  patchTodo,
  postTodo
} from "@/app/dbfunctions/todos"
import React, { useEffect, useReducer, useState } from "react"
import { FaTrash} from "react-icons/fa"

export type Todo = {
  id: string
  uid: string
  date: string
  name: string
  completed: boolean
  createdAt: string
  status: "completed" | "pending" | "overdue"
}

export type FetchedTodo = {
  _id: string
  id: string
  uid: string
  date: string
  name: string
  completed: boolean
  createdAt: string
  status: string
  __v: number
}

// // Step 1: Capture user's local timezone dynamically
// const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// console.log("User's Timezone: " + userTimezone);

// // Step 2: Get current time in UTC format
// const localDate = new Date(); // Current time in user's local timezone
// const utcDate = localDate.toISOString(); // Converts to UTC format

// // Simulate saving data (you would typically save this to a database)
// const dataToSave = {
//   timestamp: utcDate,
//   timezone: userTimezone,
// };
// console.log("Data to save:", dataToSave);

// // Step 3: Simulate retrieving data from the database
// const storedUTCDate = dataToSave.timestamp;
// const retrievedTimezone = dataToSave.timezone;

// // Convert UTC time to user's local time
// const localTime = new Date(storedUTCDate).toLocaleString('en-US', { timeZone: retrievedTimezone });
// console.log("Local Time to display:", localTime);

const createTodo = (name: string, uid: string): Todo => {
  const date = new Date().toISOString()
  const todo: Todo = {
    id: crypto.randomUUID(),
    uid: uid,
    date: new Date(date).toLocaleDateString(),
    name: name,
    completed: false,
    createdAt: new Date().toISOString(),
    status: "pending"
  }
  return todo
}

type AddTodo = {
  type: "AddTodo"
  todo: Todo
}

type LoadTodos = {
  type: "LoadTodos"
  todos: FetchedTodo[]
}

type CheckTodo = {
  type: "CheckTodo"
  id: string
}

type DeleteTodo = {
  type: "DeleteTodo"
  id: string
}

type Action = AddTodo | CheckTodo | DeleteTodo | LoadTodos

const mapFetchedTodoToTodo = (fetchedTodo: FetchedTodo): Todo => {
  return {
    id: fetchedTodo.id,
    uid: fetchedTodo.uid,
    date: fetchedTodo.date,
    name: fetchedTodo.name,
    completed: fetchedTodo.completed,
    createdAt: fetchedTodo.createdAt,
    status: ["completed", "pending", "overdue"].includes(
      fetchedTodo.status as "completed" | "pending" | "overdue"
    )
      ? (fetchedTodo.status as "completed" | "pending" | "overdue")
      : "pending" // Default to "pending" if the status is invalid
  }
}

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "LoadTodos":
      return Array.isArray(action.todos)
        ? action.todos.map(mapFetchedTodoToTodo)
        : state
    case "AddTodo":
      return [...state, action.todo]
    case "CheckTodo":
      return state.map((todo: Todo): Todo => {
        if (todo.id === action.id) {
          if (!todo.completed) {
            return { ...todo, completed: true, status: "completed" }
          } else {
            return { ...todo, completed: false, status: "pending" }
          }
        }
        return todo
      })
    case "DeleteTodo":
      return state.filter((todo) => todo.id !== action.id)
    default:
      return state
  }
}

export default function TodosPage() {
  const [todoname, setTodoName] = useState("")
  const [state, dispatch] = useReducer(reducer, [])

  const [isLoading, setIsLoading] = useState(false)

  const { user } = useUserContext()

  const handleCheckTodo = async (todo: Todo) => {
    dispatch({ type: "CheckTodo", id: todo.id })
    let updatedTodo: Todo = {
      ...todo,
      completed: todo.completed ? false : true,
      status: todo.completed ? "pending" : "completed"
    }

    console.log(updatedTodo)
    try {
      await patchTodo(updatedTodo)
    } catch (err) {
      console.log(err)
    }
  }

  const handlePostTodo = async (todoname: string) => {
    let uid = ""
    if (user) {
      uid = user.uid
    }
    const newTodo = createTodo(todoname, uid)
    dispatch({ type: "AddTodo", todo: newTodo })
    try {
      if (user) {
        await postTodo(newTodo, user)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteTodo = async (todo: Todo) => {
    dispatch({ type: "DeleteTodo", id: todo.id })
    try {
      await deleteTodo(todo)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (todoname.trim() === "") return
    handlePostTodo(todoname)
    setTodoName("")
  }

  useEffect(() => {
    async function fetchTodos() {
      if (user) {
        setIsLoading(true) // Set loading to true before starting the fetch
        console.log("Loading todos...")

        try {
          const todos = await getTodos(user)
          console.log("Fetched todos:", todos)

          if (Array.isArray(todos)) {
            dispatch({ type: "LoadTodos", todos: todos })
          } else {
            console.log("Failed to load todos: Invalid data")
          }
        } catch (error) {
          console.log("Error fetching todos:", error)
        } finally {
          setIsLoading(false) // Ensure isLoading is set to false once the fetch completes
          console.log("Loading complete")
        }
      }
    }
    fetchTodos()
  }, [user])

  useEffect(() => {
    console.log("state", state)
  }, [state])

  return (
    <div className="max-w-md w-full p-4 shadow-lg border border-gray-200 rounded-lg mx-auto select-none">
      <span className="text-xl font-semibold underline mb-4 block text-center">
        Todo Space!
      </span>
      <form
        action=""
        className="flex flex-col gap-4 sm:flex-row"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:border-sky-500 focus:ring focus:ring-sky-200 focus:outline-none"
          placeholder="Write a todo here! keep it simple"
          onChange={(e) => setTodoName(e.target.value)}
          value={todoname}
        />
        <button
          type="submit"
          className="bg-sky-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-sky-600 transition duration-200"
        >
          Add
        </button>
      </form>

      {/* <span className="block text-lg font-semibold mt-2">Todos</span> */}

      <div className="mt-4 max-h-[400px] max-w-full overflow-y-auto">
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex gap-1 justify-between bg-slate-200">
            <div className="p-2 text-left w-[130px] sm:w-1/2">Task</div>
            <div className="flex gap-0.5 justify-between mr-2">
            <div className="py-2 text-center w-[35px] sm:w-[40p]">
              ✅
            </div>
            <div className="py-2 text-center w-[52px]">Delete</div>
            <div className="py-2 text-center w-[52px]">Status</div>
            </div>
          </div>
          {state.length > 0 ? (
            state.map((todo) => {
              return (
                <div
                  className="flex gap-1 justify-between items-center bg-sky-100"
                  key={todo.id}
                >
                  <div
                    className={`p-2 text-left w-[130px] sm:w-1/2  break-words  ${
                      todo.completed && " line-through"
                    }`}
                  >
                    {todo.name}
                  </div>
            <div className="flex justify-between mr-2">

                  <div className="py-2 text-center w-[40px] sm:w-[40p] flex justify-center items-center">
                    <input
                      type="checkbox"
                      className="h-5 w-5 border-gray-300 rounded-lg custom-checkbox"
                      id={todo.id}
                      checked={todo.completed}
                      onChange={() => handleCheckTodo(todo)}
                    />
                  </div>
                  <button className="py-2 text-center w-[52px] flex justify-center items-center">
                    <FaTrash
                      size={20}
                      className=" text-red-500 cursor-pointer"
                      onClick={() => handleDeleteTodo(todo)}
                    />
                  </button>
                  <div
                    className="py-2 text-center w-[52px] flex justify-center items-center"
                    title={todo.status}
                  >
                    {todo.status === "pending"
                      ? "🟠"
                      : todo.status === "completed"
                      ? "🟢"
                      : "🔴"}
                  </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="block text-center">
              {" "}
              {isLoading ? "Loading..." : "No todos!"}
            </div> // Show this after the fetch is complete
          )}
        </div>
      </div>
    </div>
  )
}
