import Link from "next/link"
import React from "react"

export default function Navbar() {
  return (
    <div className="p-4 mx-auto flex justify-center items-center">
      <ul className="flex justify-between gap-5">
        <li>
          <Link className="p-2 focus-within:text-sky-400" href={"/"}>Home</Link>
        </li>
        <li>
          <Link className="p-2 focus-within:text-sky-400" href={"/work"}>Work</Link>
        </li>
        <li>
          <Link className="p-2 focus-within:text-sky-400" href={"/profile"}>Profile</Link>
        </li>
        <li>
          <Link className="p-2 focus-within:text-sky-400" href={"/auth/login"}>Login</Link>
        </li>
      </ul>
    </div>
  )
}
