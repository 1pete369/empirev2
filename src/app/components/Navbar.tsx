"use client"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

export default function Navbar() {

  const router= useRouter()
  const path = router.pathname.split('/')[1]

  return (
    <div className="p-4 mx-auto flex justify-center items-center">
      <ul className="flex justify-between gap-5">
        <li>
          <Link className={`p-2  ${path==="/" && "focus-within:text-sky-400 underline"}`} href={"/"}>Home</Link>
        </li>
        <li>
          <Link className={`p-2  ${path==="/work" && "focus-within:text-sky-400 underline"}`} href={"/work"}>Work</Link>
        </li>
        <li>
          <Link className={`p-2  ${path==="/profile" && "focus-within:text-sky-400 underline"}`} href={"/profile"}>Profile</Link>
        </li>
        <li>
          <Link className={`p-2  ${path==="/login" && "focus-within:text-sky-400 underline"}`} href={"/auth/login"}>Login</Link>
        </li>
      </ul>
    </div>
  )
}
