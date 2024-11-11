"use client"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

export default function Navbar() {
  const [path, setPath] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)  // State to track whether the component is mounted
  const router = useRouter()

  useEffect(() => {
    // Set mounted to true after the component mounts
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      const pathName = router.pathname.split('/')[1]
      setPath(pathName)
    }
  }, [router.pathname, mounted])  // Run the effect when router pathname changes or after mounting

  if (!mounted) return null  // Ensure no rendering before the component is mounted

  return (
    <div className="p-4 mx-auto flex justify-center items-center">
      <ul className="flex justify-between gap-5">
        <li>
          <Link className={`p-2  ${path === "/" && "focus-within:text-sky-400 underline"}`} href={"/"}>Home</Link>
        </li>
        <li>
          <Link className={`p-2  ${path === "/work" && "focus-within:text-sky-400 underline"}`} href={"/work"}>Work</Link>
        </li>
        <li>
          <Link className={`p-2  ${path === "/profile" && "focus-within:text-sky-400 underline"}`} href={"/profile"}>Profile</Link>
        </li>
        <li>
          <Link className={`p-2  ${path === "/login" && "focus-within:text-sky-400 underline"}`} href={"/auth/login"}>Login</Link>
        </li>
      </ul>
    </div>
  )
}
