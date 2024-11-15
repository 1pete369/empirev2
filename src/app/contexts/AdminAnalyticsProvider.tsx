"use client"

import { createContext, useContext, useState } from "react"
import React from "react"
import { FetchedMainUserObject, MainUserObject } from "./UserDataProviderContext"
import { getActiveUsersDataByDate, getAllUsers } from "../dbfunctions/analytics"

export type ActiveUsersDataType = {
  date : string
  activeUserCount : number
}


type AdminAnalyticsContextType = {
  allUsers: FetchedMainUserObject[]
  handleGetAllUsers: () => Promise<void>
  handleActiveUsers: () => Promise<void>
  dateRangeForActiveUsers : string | null
  setDateRangeForActiveUsers : React.Dispatch<React.SetStateAction<string>>
  pastDaysData : ActiveUsersDataType[]
}


const adminAnalyticsContext = createContext<AdminAnalyticsContextType | null>(
  null
)

export const AdminAnalyticsProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [allUsers, setAllUsers] = useState<FetchedMainUserObject[] | []>([])
  const [pastDaysData , setPastDaysData]= useState<ActiveUsersDataType[] | []>([])
  const [dateRangeForActiveUsers,setDateRangeForActiveUsers] = useState<string | "">("")

  const handleGetAllUsers = async () => {
    const response = await getAllUsers()
    setAllUsers(response)
  }

  const handleActiveUsers =async ()=>{

    const response : ActiveUsersDataType[] =await getActiveUsersDataByDate(allUsers, dateRangeForActiveUsers)
    setPastDaysData(response)
  }

  return (
    <adminAnalyticsContext.Provider value={{ allUsers, handleGetAllUsers ,pastDaysData , handleActiveUsers , setDateRangeForActiveUsers, dateRangeForActiveUsers }}>
      {children}
    </adminAnalyticsContext.Provider>
  )
}

export const useAdminAnalyticsContext = () => {
  const context = useContext(adminAnalyticsContext)
  if (context === null) {
    throw new Error("admin analytics context must be within the provider")
  }
  return context
}
