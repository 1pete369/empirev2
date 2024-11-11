"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { BiLinkExternal } from "react-icons/bi"
import { useUserContext } from "../contexts/UserDataProviderContext"
import { redirect } from "next/navigation"

export default function WorkPage() {

  const { user }= useUserContext()

  useEffect(()=>{
    if(user===null){
      redirect('/')
    }
  },[])

  return (
    // <div className="container w-full flex flex-col gap-4 mx-auto">
    //   <header className="text-center py-4 bg-blue-500">
    //     <h2 className="text-3xl font-bold">Your Daily Tasks</h2>
    //     <p className="text-lg mt-2">
    //       Manage your work, stay productive, and keep track of progress!
    //     </p>
    //   </header>
    //   <section className="p-4">
    //     <h2 className="text-xl font-semibold underline">Featuring!</h2>
    //     <Link href={"/work/todos"} className="">Todos Space</Link>
    //   </section>
    // </div>
    <div className="bg-gray-100 text-gray-800 min-h-screen select-none">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Your Daily Tasks</h1>
        <p className="text-lg mb-6">
          Manage your work, stay productive, and keep track of progress!
        </p>
        {
          user===null &&
          <Link href="/auth/register" className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg font-semibold hover:bg-gray-100 transition">
        Get Started
      </Link>
        }
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <h2 className="text-2xl font-bold  mb-10">Featuring!!</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition max-w-sm hover:bg-blue-600 hover:text-white">
          <Link href={"/work/todos"} className="hover:bg-blue-600 flex items-center gap-1">
              <h3 className="text-xl font-semibold mb-2 underline">
                Todos Space!
              </h3><div><BiLinkExternal /></div>
          </Link>
              <p className="text-lg">Create a checkList of tasks!📃</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition max-w-sm hover:bg-blue-600 hover:text-white">
            <h3 className="text-xl font-semibold mb-2 underline">
              Adding more!!
            </h3>
            <p className="text-lg">Stay Tuned!👋</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      {/* <section className="bg-blue-600 text-white py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Productivity?</h2>
      <p className="text-lg mb-6">Take the first step towards a more organized, goal-driven life.</p>
      <Link href="/auth/register" className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg font-semibold hover:bg-gray-100 transition">
        Join Now
      </Link>
    </section> */}

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white py-8 px-4 text-center mb-0 ">
      <p>&copy; {new Date().getFullYear()} Your Productivity Hub. All Rights Reserved.</p> */}
      {/* <nav className="mt-4 space-x-4">
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/contact" className="hover:underline">Contact</Link>
        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
      </nav> */}
      {/* </footer> */}
    </div>
  )
}
