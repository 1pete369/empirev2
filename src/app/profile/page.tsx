"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "../contexts/UserDataProviderContext";

export default function ProfilePage() {
  const { user, handleLogout } = useUserContext();

  return (
    <div className="text-lg p-4 w-full space-y-2">
      <span className="text-xl font-semibold">Profile page</span>
      {user === null ? (
        <p>User not logged in!</p>
      ) : (
        <div className="flex justify-between p-4 shadow-md rounded-sm max-w-lg border-2 border-solid box-border">
          <div className="flex gap-1 flex-col leading-8">
            <div className=" flex justify-between">
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
            <p>UserName: {user?.username}</p>
            <p>DisplayName: {user?.displayName}</p>
            <p>Email: {user?.email}</p>
            <p>Uid: {user?.uid}</p>
            <p>Provider: {user?.provider}</p>
            <p>CreatedAt: {new Date(user?.createdAt).toLocaleDateString()}</p>
            <p>LastLoginAt: {new Date(user?.lastLoginAt).toLocaleDateString()}</p>
            <div className="flex gap-2 flex-wrap">
            <button
              className="bg-slate-800 p-2.5 min-w-[200px] max-w-[200px] rounded text-white text-lg text-center shadow-md"
              onClick={handleLogout}
              >
              Logout
            </button>
            <Link href={'/profile/edit-profile'}>
              <button
                className="bg-sky-400 p-2.5 min-w-[200px] max-w-[200px] rounded text-white text-lg text-center shadow-md"
                >
                Edit
              </button>
            </Link>
            {
              user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                <Link href={'/admin/dashboard'}>
                <button
                  className="bg-teal-500 p-2.5 min-w-[200px] max-w-[200px] rounded text-white text-lg text-center shadow-md"
                  >
                  Dashboard
                </button>
              </Link>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
