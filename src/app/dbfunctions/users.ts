import axios from "axios"
import { MainUserObject } from "../contexts/UserDataProviderContext"

export async function checkUser(user: MainUserObject) {
  try {
    const response = (
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/check-user/${user.uid}`
      )
    ).data
    return response.exist
  } catch (error) {
    console.log(error)
  }
}

export async function checkUserNameExist(username: string) {
  try {
    const response = (
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/check-username/${username}`
      )
    ).data
    return response.exist
  } catch (error) {
    console.log(error)
  }
}

export async function createUser(user: MainUserObject) {
  const isUserExisted = await checkUser(user)

  if (!isUserExisted) {
    console.log(user, "At createUser")
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/create-user`,
        { user }
      )
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}

export async function fetchUser(uid: string) {
  try {
    const user = (
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/fetch-user/${uid}`
      )
    ).data.userObject

    // Convert createdAt and lastLoginAt to Date objects if they exist
    if (user.createdAt) user.createdAt = new Date(user.createdAt)
    if (user.lastLoginAt) user.lastLoginAt = new Date(user.lastLoginAt)

    console.log("Fetched user", user)
    return user
  } catch (error) {
    console.log("Error fetching user:", error)
  }
}

export async function updateUserProfile(
  uid: string,
  username: string,
  name: string
) {
  console.log("Came to upadte profile")

  const updateFields = { username: username, name: name }
  console.log(updateFields)

  try {
    console.log("Started")
    const response = (
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update-profile/${uid}`,
         updateFields 
      )
    ).data
    console.log("Completed")

    console.log("response", response)

    return response
  } catch (error) {
    console.log(error)
  }
}

// export async function updateLastLoginAt(uid : string){
//   const date = new Date().toISOString()
//   try{

//   }catch(error){

//   }
// }
