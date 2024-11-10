import axios from "axios"
import { Day, MainUserObject } from "../contexts/UserDataProviderContext"

export async function checkDayExists(date: string, uid: string) {

    console.log("Day at CheckDayExists", date)

  try {
    const response = (
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/days/check-day/${uid}`,{ params : {date} }
      )
    ).data

    return response.flag
  } catch (err) {
    console.log("Error at checkDayExists",err)
  }
}

export default async function createOrUpdateDayObject(user: MainUserObject) {

  const date = new Date().toISOString()

  const dateForChecking = new Date(date).toLocaleDateString()

  const dayObject: Day = {
    uid: user.uid,
    date: new Date(date).toLocaleDateString(),
    dateId: `${new Date(date).toLocaleDateString()}_${crypto
      .randomUUID()
      .slice(0, 10)}`,
    todos: [],
    dayCompleted: false
  }

  try {
    const flag = await checkDayExists(dateForChecking, user.uid)
    if (!flag) {
      const response = (
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/days/create-day`,
          dayObject
        )
      ).data
      console.log("Day created", response)

      if (response.flag) {
        const dayId = response.createdDayObject._id
        const dayIdResponse = (
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/users/push-day-id/${user.uid}`,
            { dayId }
          )
        ).data
        console.log("Day id Added to user", dayIdResponse)
      }
    }
  } catch (err) {
    console.log(err)
  }
}
