"use client"
import TodosPage from "@/app/_features/todos/page"
import { useUserContext } from "@/app/contexts/UserDataProviderContext"
import { redirect } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function TodosWorkSpace() {
  const { user } = useUserContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user === null && !loading) {
      redirect("/") // Redirect to home if user is null and it's not loading
    }
  }, [user, loading])

  useEffect(() => {
    if (user !== null) {
      setLoading(false) // Stop loading once the user is available
    }
  }, [user])

  if (loading) {
    return (
      <div className="container w-full p-4 flex flex-col gap-4 mx-auto">
        {/* Show loading indicator or message */}
        <p>Loading user data...</p>
      </div>
    )
  }

  return (
    <div className="container w-full p-4 flex flex-col gap-4 mx-auto">
      <TodosPage />
    </div>
  )
}

