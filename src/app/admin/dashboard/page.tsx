"use client"

import { MainUserObject } from "@/app/contexts/UserDataProviderContext"
import { formatDate } from "@/app/dbfunctions/basics"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import ReactCountryFlag from "react-country-flag"
import { BiArrowBack } from "react-icons/bi"

export default function Page() {
  const [users, setUsers] = useState<MainUserObject[] | []>([])

  useEffect(() => {
    async function getUsers() {
      const result = (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/get-all-users`)).data
      console.log(result.allUsers)
      setUsers(result.allUsers)
    }
    getUsers()
  }, [])

  return (
    <div className="">
      <div className="bg-blue-600 text-white p-2 px-4 flex justify-between sm:justify-start sm:gap-32 items-center">
      <p className=" text-xl ">Admin DashBoard</p>
      <Link href={"/profile"} className=" border-2 rounded-sm flex items-center font-semibold"><BiArrowBack size={25}/></Link>
      </div>
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
      {users.length > 0 &&
        users?.map((user: MainUserObject, i: number) => {
          return (
            <div className="flex flex-col gap-10 justify-between p-4 shadow-md rounded-sm max-w-lg border-2 border-solid box-border" key={user.uid}>
              <div className="flex gap-1 flex-col leading-8">
                <div className=" flex justify-between mr-6">
                  <h2 className="underline">User Details</h2>
                  <div className="h-10 overflow-hidden">
                    {user?.photoURL && (
                      <Image
                      src={user.photoURL}
                      width={40}
                      height={40}
                      className="rounded-sm"
                      alt="User profile picture"
                      />
                    )}
                  </div>
                </div>
                <p className="flex gap-2">
                  <span className=" font-semibold underline">UserName:</span>
                  <span className=" text-slate-600 ">{user?.username}</span>
                </p>
                <p className="flex gap-2">
                  <span className=" font-semibold underline">DisplayName:</span>
                  <span className=" text-slate-600 ">{user?.displayName}</span>
                </p>
                <p className="flex gap-2">
                  <span className=" font-semibold underline">Email:</span>
                  <span className=" text-slate-600 ">{user?.email}</span>
                </p>
                {/* <p className="flex gap-2"><span className=" font-semibold underline">Uid:</span><span className=" text-slate-600 ">{user?.uid}</span></p> */}
                <p className="flex gap-2">
                  <span className=" font-semibold underline">Provider:</span>
                  <span className=" text-slate-600 ">{user?.provider}</span>
                </p>
                <p className="flex gap-2">
                  <span className=" font-semibold underline">CreatedAt:</span>
                  <span className=" text-slate-600 ">
                    {formatDate(user.createdAt)}
                  </span>
                </p>
                <p className="flex gap-2">
                  <span className=" font-semibold underline">LastLoginAt:</span>
                  <span className=" text-slate-600 ">
                    {formatDate(user.lastLoginAt)}
                  </span>
                </p>
                <p className="flex gap-2">
                  <span className=" font-semibold underline">TimeZone:</span>
                  <span className=" text-slate-600 ">{user.timezone}</span>
                </p>
                <p className="flex gap-2 items-center">
                  <span className=" font-semibold underline">Country:</span>
                  <ReactCountryFlag
                    countryCode={user.countryCode}
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
