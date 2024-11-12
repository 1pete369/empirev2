import axios from "axios"
import { Todo } from "../_features/todos/page"
import { MainUserObject } from "../contexts/UserDataProviderContext"
import  { checkDayExists } from "./days"
import { formatDate } from "./basics"

export async function postTodo(todo: Todo, user: MainUserObject) {
  console.log("Came to post Todo")

  const date = formatDate(new Date().toISOString())

  try {
    const isDayExists = await checkDayExists(date, user.uid)
    console.log("IsDayExist at postTodo" , isDayExists)
    if (isDayExists) {
      const response = (
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/todos/create-todo`,
          { todo }
        )
      ).data

      console.log("Response After todo added", response)

      if(response.flag){
          const dayDate = formatDate(new Date().toISOString())

          console.log("Daydate at push todo",dayDate)
          console.log("New todo ObjectId", response.newTodoObject._id)
          const todoId = response.newTodoObject._id
          const response2 = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/days/push-day-id/${user.uid}`,
              { todoId ,dayDate}
            )
            console.log("Todo id added to day", response2)
        }
    }
  } catch (err : unknown) {
    if(err instanceof Error){
        console.log(err.message)
    }
  }
}

export async function patchTodo(todo: Todo) {
  const updateFields = { completed: todo.completed, status: todo.status }
  console.log("Update fields", updateFields)

  try {
    const response = (
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/todos/check-todo/${todo.id}`,
        updateFields
      )
    ).data
    console.log("Updated Todo response", response)
  } catch (err : unknown) {
    if(err instanceof Error){
        console.log(err.message)
    }
  }
}

export async function deleteTodo(todo: Todo) {
  const id = todo.id
  try {
    const response = (
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/todos/delete-todo/${id}`
      )
    ).data
    console.log(response)
  } catch (err : unknown) {
    if(err instanceof Error){
        console.log(err.message)
    }
  }
}

export async function getTodos(user : MainUserObject, dayDate : string) {

  console.log("Get todos called")
  try {
    const response = (
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/todos/get-todos/${user.uid}`,{ params : {dayDate} })
    ).data
    return response.todos
  } catch (err : unknown) {
    if(err instanceof Error){
        console.log(err.message)
    }
  }
}