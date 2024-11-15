import axios from "axios"
import { FetchedMainUserObject } from "../contexts/UserDataProviderContext"
import { eachDayOfInterval, format, isSameDay, parse, subDays } from "date-fns"

export async function getAllUsers(): Promise<FetchedMainUserObject[]> {
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

export async function getActiveUsersDataByDate(users: FetchedMainUserObject[] , startDate : string ) {

  const dates = eachDayOfInterval({
    start: startDate ? startDate : subDays(new Date(),7),
    end: new Date()
  })

  const activeUserData = dates.map((date) => {
    const activeUserCount = users.reduce((count, user) => {
      const userWasActive = user.customData.days.some((day) => {
        const entryDate = parse(day.date, "MMM dd, yyyy", new Date())
        return isSameDay(entryDate, date)
      })
      return userWasActive ? count + 1 : count
    }, 0)
    return { date: format(date, "MMM dd , yyyy"), activeUserCount }
  })

  return activeUserData
}
