"use client"

import { createContext, useContext, useState } from "react"
import { MainUserObject } from "./UserDataProviderContext"
import { getAllUsers } from "../dbfunctions/analytics"

type AdminAnalyticsContextType = {
  allUsers: MainUserObject[]
  handleGetAllUsers: () => Promise<void>
}

const adminAnalyticsContext = createContext<AdminAnalyticsContextType | null>(
  null
)

export const AdminAnalyticsProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [allUsers, setAllUsers] = useState<MainUserObject[] | []>([])

  const handleGetAllUsers = async () => {
    const response = await getAllUsers()
    setAllUsers(response)
  }

  return (
    <adminAnalyticsContext.Provider value={{ allUsers, handleGetAllUsers }}>
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
