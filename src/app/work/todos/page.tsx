"use client"
import TodosPage from "@/app/_features/todos/page"
import { useUserContext } from "@/app/contexts/UserDataProviderContext"
import { redirect } from "next/navigation"
import React, { useEffect } from "react"

export default function TodosWorkSpace() {
  const { user } = useUserContext()
  useEffect(() => {
    setTimeout(() => {
      if (user === null) {
        redirect("/")
      }
    }, 3000);
  }, [user])
  return (
    <div className="container w-full p-4 flex flex-col gap-4 mx-auto">
      <TodosPage />
    </div>
  )
}
