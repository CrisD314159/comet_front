'use client'
import { GetUserOverview } from "@/lib/serverActions/getActions/GetActions"
import { UserInfo } from "@/lib/types/types"
import { Vibrant } from "node-vibrant/browser";
import { useEffect, useState } from "react"
import useSWR from "swr"
import UserSettingsEditForm from "./UserSettingsEditModal";
import LogoutModal from "../Logout/LogoutModal";
import Image from "next/image";
import DeleteAccountModal from "../DeleteAccount/DeleteAccountModal";

export default function UserSettingsComponent() {
  const { data, error, isLoading, mutate } = useSWR<UserInfo>('userOverview', GetUserOverview)

  const [color, setColor] = useState('#fff')


  useEffect(()=>{
    if(data){
      Vibrant.from(data.profilePicture).getPalette().then((palette)=> setColor(`${palette.Vibrant?.hex ?? "#3b82f6"}`) )
    }
  },[data])
  

  return (
      <div className={`flex flex-col h-screen w-full`} >
        <h1 className="text-3xl font-bold mt-10 mb-2 sm:ml-20  mx-6">User Settings</h1>
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
                    <Image width={100} height={100} src={data.profilePicture} alt={data.name} />  
                  </div>
                </div>
                  <h2 className="text-2xl font-semibold mt-10">{data.name}</h2>
                  <h3 className="text-lg menu-title font-semibold mt-5">{data.email}</h3>

                <div className="max-md:h-36 h-[65%] sm:w-[50%] mx-10 mt-7 sm:pr-3 overflow-y-scroll">
                  <p className="dark:text-white/80 text-center   ">{data.biography}</p>
                </div>
                <p className="text-xl dark:text-indigo-300 text-indigo-600 my-10  font-medium">📍 {data.country}</p>

              <div className="flex flex-col items-center gap-2">
                <UserSettingsEditForm user={data} mutate={mutate}/>
                <LogoutModal/>
                <DeleteAccountModal/>
              </div>

              </div>

            </div>
          )
          }

      </div>
  )
}