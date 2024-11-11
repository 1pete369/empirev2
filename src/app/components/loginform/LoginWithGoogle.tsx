"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useUserContext } from "@/app/contexts/UserDataProviderContext";
import { redirect } from "next/navigation";

export default function Page() { 
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status

  const { user, handleGoogleLogin } = useUserContext() 

  const handleLoginClick = async () => {
    setIsLoading(true)
    await handleGoogleLogin()
    if(user!==null){
      setIsLoading(false)
    }
  };

  useEffect(()=>{
    if(user!==null){
      redirect('/profile')
    }
  },[user])

  return (
    <div className="text-center">
      {/* {error && <p className="text-red-500">{error}</p>} Display error message */}
      <button
        className="mx-auto flex bg-slate-800 max-w-[240px] min-w-[240px] px-2 py-1.5 rounded text-white text-lg text-center shadow-md gap-2 items-center"
        onClick={handleLoginClick} // Use handleLoginClick to manage login logic
        disabled={isLoading} // Disable button during loading
      >
        <Image src={"/google.svg"} alt="Google Logo" width={20} height={20} />{" "}
        <span>{isLoading ? 'Logging in...' : 'Continue with Google'}</span> {/* Change button text based on loading state */}
      </button>
    </div>
  );
}
