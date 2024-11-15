"use client"

import { useAdminAnalyticsContext } from "@/app/contexts/AdminAnalyticsProvider"
import {
  FetchedMainUserObject,
  MainUserObject,
  useUserContext
} from "@/app/contexts/UserDataProviderContext"
import { formatDate } from "@/app/dbfunctions/basics"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import ReactCountryFlag from "react-country-flag"

export default function AllUser({ user }: { user: MainUserObject }) {
  const [isLoading, setIsLoading] = useState(false)
  const { allUsers, handleGetAllUsers } = useAdminAnalyticsContext()

  useEffect(() => {
    if (user !== null) {
      const fetchUsers = async () => {
        setIsLoading(true)
        await handleGetAllUsers()
        setIsLoading(false)
      }
      fetchUsers()
    }
  }, [])

  return (
    <div className="p-4">
      {isLoading ? (
        <p className="text-xl p-4 py-2 font-semibold">Loading...</p>
      ) : (
        <p className="text-xl block p-4 py-2 font-semibold">All users</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allUsers.length > 0 &&
          allUsers?.map((user: FetchedMainUserObject) => {
            return (
              <div
                className="flex flex-col gap-10 justify-between p-4 shadow-md rounded-sm max-w-sm border-2 border-solid box-border"
                key={user.uid}
              >
                <div className="flex gap-1 flex-col leading-8">
                  <div className=" flex justify-between mr-6">
                    <h2 className="underline">User Details</h2>
                    <div className="h-10 overflow-hidden">
                      {user?.personalInfo.photoURL && (
                        <Image
                          src={user.personalInfo.photoURL}
                          width={40}
                          height={40}
                          className="rounded-sm"
                          alt="User profile picture"
                        />
                      )}
                    </div>
                  </div>
                  <p className="flex gap-2">
                    <span className=" font-semibold underline">Uid:</span>
                    <span className=" text-slate-600 ">{user?.uid}</span>
                  </p>
                  <p className="flex gap-2">
                    <span className=" font-semibold underline">UserName:</span>
                    <span className=" text-slate-600 ">
                      {user?.personalInfo.username}
                    </span>
                  </p>
                  <p className="flex gap-2">
                    <span className=" font-semibold underline">
                      DisplayName:
                    </span>
                    <span className=" text-slate-600 ">
                      {user?.personalInfo.displayName}
                    </span>
                  </p>
                  <p className="flex gap-2">
                    <span className=" font-semibold underline">Email:</span>
                    <span className=" text-slate-600 ">
                      {user?.personalInfo.email}
                    </span>
                  </p>
                  {/* <p className="flex gap-2"><span className=" font-semibold underline">Uid:</span><span className=" text-slate-600 ">{user?.personalInfo.uid}</span></p> */}
                  <p className="flex gap-2">
                    <span className=" font-semibold underline">Provider:</span>
                    <span className=" text-slate-600 ">
                      {user?.personalInfo.provider}
                    </span>
                  </p>

                  <p className="flex gap-2">
                    <span className=" font-semibold underline">
                      isEmailVerified:
                    </span>
                    <span className=" text-slate-600 ">
                      {user?.personalInfo.isEmailVerified ? "Yes" : "No"}{" "}
                    </span>
                  </p>
                  <p className="flex gap-2">
                    <span className=" font-semibold underline">CreatedAt:</span>
                    <span className=" text-slate-600 ">
                      {formatDate(user.timings.createdAt)}
                    </span>
                  </p>
                  <p className="flex gap-2">
                    <span className=" font-semibold underline">
                      LastLoginAt:
                    </span>
                    <span className=" text-slate-600 ">
                      {formatDate(user.timings.lastLoginAt)}
                    </span>
                  </p>
                  <p className="flex gap-2">
                    <span className=" font-semibold underline">TimeZone:</span>
                    <span className=" text-slate-600 ">
                      {user.customData.timezone.timezoneName}
                    </span>
                  </p>
                  <p className="flex gap-2 items-center">
                    <span className=" font-semibold underline">Country:</span>
                    <ReactCountryFlag
                      countryCode={user.customData.timezone.countryCode}
                      svg
                      style={{ width: "20px", height: "20px" }}
                      title="United States"
                    />
                  </p>
                </div>
                {/* <Image src={"/svgviewer-output.svg"} alt="Grid Logo" width={600} height={200} />
          <img src="/grid.svg" alt="Grid Logo" width="600" height="200" loading="lazy" decoding="async" /> */}
              </div>
            )
          })}
      </div>
    </div>
  )
}
