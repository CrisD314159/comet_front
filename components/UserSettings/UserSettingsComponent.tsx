'use client'
import { GetUserOverview } from "@/lib/serverActions/getActions/GetActions"
import { UserInfo } from "@/lib/types/types"
import { LogOut } from "lucide-react";
import { Vibrant } from "node-vibrant/browser";
import { useEffect, useState } from "react"
import useSWR from "swr"

export default function UserSettingsComponent() {
  const { data, error, isLoading } = useSWR<UserInfo>('userOverview', GetUserOverview)

  const [color, setColor] = useState('#fff')


  useEffect(()=>{
    if(data){
      Vibrant.from(data.profilePicture).getPalette().then((palette)=> setColor(`${palette.Vibrant?.hex ?? "#3b82f6"}`) )
    }
  },[data])
  



  return (
      <div className={`flex flex-col h-screen w-full`} >
        <h1 className="text-3xl font-bold my-10 sm:ml-20  mx-6">User Settings</h1>
          {isLoading && (
            <div className="w-full flex justify-center">
              <span className="loading loading-infinity loading-xl"></span>
            </div>
            )}
          {error && <p>There was an error while loading your profile</p>}
          {data&&
          (
            <div className="overflow-y-scroll w-[90%] flex-1 mx-auto max-md:pb-[92px]">
              <div className="px-5 flex flex-col items-center justify-center">
                <div className="avatar">
                  <div className="w-50 h-50 rounded-full" style={{boxShadow:`0px 20px 30px 7px ${color}`}}>
                    <img src={data.profilePicture} alt={data.name} />  
                  </div>
                </div>
                  <h2 className="text-2xl font-semibold mt-6">{data.name}</h2>

                <div className="max-md:h-36 h-[65%] sm:w-[50%] mx-10 sm:pr-3 overflow-y-scroll">
                  <p className="dark:text-white/80   ">{data.biography}</p>
                </div>
                <p className="text-xl dark:text-indigo-300 text-indigo-600 mt-10  font-medium">📍 {data.country}</p>

              <div className="flex flex-col items-center gap-2">
                <button className="btn btn-soft btn-primary">Edit your info</button>
                <button className="btn btn-soft btn-error"><LogOut/></button>
              </div>

              </div>

            </div>
          )
          }

      </div>
  )
}