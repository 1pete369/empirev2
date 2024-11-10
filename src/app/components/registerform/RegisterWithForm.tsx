"use client"

import { useUserContext } from "@/app/contexts/UserDataProviderContext"
import Link from "next/link"
import { redirect } from "next/navigation"
import React, { useEffect, useState } from "react"
// import { useUser } from '@/app/contexts/UserProviderContext';

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false) // Loading state

  const { error, handleEmailSignup, user } = useUserContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess("")
    setIsLoading(true)
    await handleEmailSignup(email.trim(), password.trim(), username.trim(), name.trim())
    setIsLoading(false)
    setSuccess('Registration successful!')
  }

  useEffect(()=>{
    if(user !== null){
      redirect('/profile')
    }
  },[user])

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 flex flex-col gap-6 items-center shadow-md rounded-sm box-border"
    >
      {error && <p className="text-red-500">{error}</p>}
      {/* Display error from context */}
      {error === '' && <p className="text-green-500">{success}</p>}
      {/* Display success message */}
      <div className="flex gap-6 items-center justify-center">
        <label htmlFor="username" className="hidden">
          UserName:
        </label>
        <input
          required
          type="text"
          id="username"
          className={`rounded-sm border-2 border-solid border-black/30 focus-within:border-black outline-none px-2 py-1.5 placeholder:text-stone-500 text-black min-w-60 ${username!=="" && "bg-sky-100"}`}
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex gap-6 items-center justify-center">
        <label htmlFor="name" className="hidden">
          Name:
        </label>
        <input
          required
          type="name"
          id="name"
          className={`rounded-sm border-2 border-solid border-black/30 focus-within:border-black outline-none px-2 py-1.5 placeholder:text-stone-500 text-black min-w-60 ${name!=="" && "bg-sky-100"}`}
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex gap-6 items-center justify-center">
        <label htmlFor="email" className="hidden">
          Email:
        </label>
        <input
          required
          type="email"
          id="email"
          className={`rounded-sm border-2 border-solid border-black/30 focus-within:border-black outline-none px-2 py-1.5 placeholder:text-stone-500 text-black min-w-60 ${email!=="" && "bg-sky-100"}`}
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex gap-6 items-center justify-center">
        <label htmlFor="password" className="hidden">
          Password:
        </label>
        <input
          required
          type="password"
          id="password"
          className={`rounded-sm border-2 border-solid border-black/30 focus-within:border-black outline-none px-2 py-1.5 placeholder:text-stone-500 text-black min-w-60 ${password!=="" && "bg-sky-100"}`}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="rounded-sm bg-sky-500 text-sky-100 px-2 py-1.5 flex-1 min-w-60"
        disabled={isLoading} // Disable button when loading
      >
        {isLoading ? "Registering..." : "Register"}{" "}
        {/* Change button text on loading */}
      </button>
      <p>
        Already have an account?{" "}
        <span className="text-sm text-sky-500 underline">
          <Link href={"/auth/login"}>Login</Link>
        </span>
      </p>
    </form>
  )
}
