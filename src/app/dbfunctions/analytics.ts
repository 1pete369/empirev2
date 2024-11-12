import axios from "axios"
import { formatDate } from "./basics"
import { MainUserObject } from "../contexts/UserDataProviderContext"

export function getDailyActivUsers() {
  const todayDate = formatDate(new Date().toISOString())
}

export async function getAllUsers():Promise<MainUserObject[]> {
  try {
    const result = (
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/get-all-users`)
    ).data
    console.log(result.allUsers)
    return result.allUsers
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message)
    }
  }
  return []
}
