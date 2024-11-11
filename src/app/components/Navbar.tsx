"use client"
import Link from "next/link"
import { usePathname } from "next/navigation" // Import usePathname from next/navigation
import React, { useEffect, useState } from "react"

export default function Navbar() {
  const [path, setPath] = useState<string | null>(null)
  const pathname = usePathname() // Get the current path using usePathname

  useEffect(() => {
    const pathName = pathname.split('/')[1]  // Get the first segment of the path
    setPath(pathName)
  }, [pathname]) // Re-run the effect when pathname changes

  return (
    <div className="p-4 mx-auto flex justify-center items-center">
      <ul className="flex justify-between gap-5">
        <li>
          <Link className={`p-2  ${path === "" && "text-sky-400 underline"}`} href={"/"}>Home</Link>
        </li>
        <li>
          <Link className={`p-2  ${path === "work" && "text-sky-400 underline"}`} href={"/work"}>Work</Link>
        </li>
        <li>
          <Link className={`p-2  ${path === "profile" && "text-sky-400 underline"}`} href={"/profile"}>Profile</Link>
        </li>
        <li>
          <Link className={`p-2  ${path === "auth" && "text-sky-400 underline"}`} href={"/auth/login"}>Login</Link>
        </li>
      </ul>
    </div>
  )
}
