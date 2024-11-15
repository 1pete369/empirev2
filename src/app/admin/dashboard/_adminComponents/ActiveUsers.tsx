"use client"

import { useAdminAnalyticsContext } from "@/app/contexts/AdminAnalyticsProvider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { subDays } from "date-fns"

import React, { useEffect } from "react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

const RANGE_OPTIONS = {
  last_7days: {
    label: "Last 7 Days",
    startDate: subDays(new Date(), 7).toString()
  },
  last_30days: {
    label: "Last 30 Days",
    startDate: subDays(new Date(), 30).toString()
  },
  last_90days: {
    label: "Last 90 Days",
    startDate: subDays(new Date(), 90).toString()
  },
  last_365days: {
    label: "Last 365 Days",
    startDate: subDays(new Date(), 365).toString()
  }
}

export default function ActiveUsers() {
  const { pastDaysData, allUsers, handleActiveUsers ,dateRangeForActiveUsers, setDateRangeForActiveUsers } =
    useAdminAnalyticsContext()
  useEffect(() => {
    if (allUsers !== null) {
      const fetchPastData = async () => {
        await handleActiveUsers()
      }
      fetchPastData()
    }
  }, [allUsers,dateRangeForActiveUsers])

  useEffect(() => {
    console.log("PastDaysData", pastDaysData)
  }, [pastDaysData])

  return (
    <div className="p-4 border max-w-lg m-4">
      <div className="py-4 flex flex-col gap-3">
        <div className=" p-1 flex justify-between mx-4">
          <h1 className="text-xl font-semibold">Actiev users Data</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button >select range</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {
                Object.entries(RANGE_OPTIONS).map(([key, value])=>{
                 return <DropdownMenuItem key={key} onClick={()=>setDateRangeForActiveUsers(value.startDate)}>{value.label}</DropdownMenuItem>
                })
            }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ResponsiveContainer className="max-w-lg" height={250}>
          <LineChart
            data={pastDaysData}
            margin={{ top: 5, right: 30, left: 30, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" textAnchor="end" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            {/* <Line type="monotone" dataKey="date" stroke="#8884d8" /> */}
            <Line type="monotone" dot={false} dataKey="activeUserCount" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
