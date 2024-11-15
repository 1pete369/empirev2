"use client"

import { useUserContext } from '@/app/contexts/UserDataProviderContext'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function EditProfilePage() {

    const [username,setUsername] = useState("")
    const [displayName,setDisplayName] = useState("")
    const [success,setSuccess] = useState("")
    const [isLoading,setIsLoading] = useState(false)

    const { error , user , handleProfileUpdate } = useUserContext()

    const handleSubmit=async (e : React.FormEvent)=>{
        e.preventDefault()
        setSuccess('')
        setIsLoading(true)
        if(user!==null){
             await handleProfileUpdate(user.uid,user.personalInfo?.email, username, displayName)
        }
        setSuccess("Update successful!")
        setIsLoading(false)
    }

    useEffect(()=>{
        if(user===null){
            redirect('/auth/login')
        }
    })

  return (
    <div className=' h-screen text-lg p-4 flex items-center justify-center overflow-hidden'>
       {
        user!==null &&
      <form
      onSubmit={handleSubmit}
      className="p-4 flex flex-col gap-6 items-center shadow-md rounded-sm box-border"
      >
        <span className='text-xl font-semibold'>Edit profile page</span>
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
          className={`rounded-sm border-2 border-solid border-black/30 focus-within:border-black outline-none px-2 py-1.5 placeholder:text-stone-500 text-black min-w-60 lowercase ${username!=="" && "bg-sky-100"}`}
          placeholder={user.personalInfo?.username!}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex gap-6 items-center justify-center">
        <label htmlFor="displayName" className="hidden">
          Name:
        </label>
        <input
          required
          type="displayName"
          id="displayName"
          className={`rounded-sm border-2 border-solid border-black/30 focus-within:border-black outline-none px-2 py-1.5 placeholder:text-stone-500 text-black min-w-60 ${displayName!=="" && "bg-sky-100"}`}
          placeholder={user.personalInfo?.displayName as string}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
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
          className={`rounded-sm border-2 border-solid border-black/30 focus-within:border-black outline-none px-2 py-1.5 placeholder:text-stone-500 text-black min-w-60 ${user.personalInfo.email!=="" && "bg-sky-100"}`}
          placeholder="Enter email"
          value={user.personalInfo?.email}
          disabled
          />
      </div>
      <button
        type="submit"
        className="rounded-sm bg-sky-500 text-sky-100 px-2 py-1.5 flex-1 min-w-60"
        disabled={isLoading} // Disable button when loading
      >
        {isLoading ? "Updating..." : "Update"}
      </button>
      <p>
        Don't want to update?
        <span className="text-sm text-sky-500 underline ml-1">
          <Link href={"/profile"}> Go back!</Link>
        </span>
      </p>
    </form>
        }
    </div>
  )
}
