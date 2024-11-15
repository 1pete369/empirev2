"use client"

import { useAdminAnalyticsContext } from "@/app/contexts/AdminAnalyticsProvider"
import { useUserContext } from "@/app/contexts/UserDataProviderContext"
import Link from "next/link"
import { redirect } from "next/navigation"
import React, { useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import ActiveUsers from "./_adminComponents/ActiveUsers"
import AllUser from "./_adminComponents/AllUser"

export default function Page() {
  const { user } = useUserContext()
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL

  useEffect(() => {
    if (user === null) return
    if (user.personalInfo.email !== adminEmail) {
      redirect("/")
    }
  }, [user])

  if (user === null || (user && user.personalInfo.email !== adminEmail)) {
    return <p>Loading...</p>
  }

  return (
    <div className="">
      <div className="bg-blue-600 text-white p-2 px-4 flex justify-between sm:justify-start sm:gap-32 items-center">
        <p className=" text-xl ">Admin DashBoard</p>
        <Link
          href={"/profile"}
          className=" border-2 rounded-sm flex items-center font-semibold"
        >
          <BiArrowBack size={25} />
        </Link>
      </div>
      <AllUser user={user} />
      <ActiveUsers />
    </div>
  )
}
