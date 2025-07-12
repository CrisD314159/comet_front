'use client'
import dynamic from "next/dynamic"
import { useState } from "react"
import { GetFriendRequests, GetOutgoingFriendRequests } from "@/lib/serverActions/getActions/GetActions"


const NotificationsListDynamic = dynamic(()=> import("@/components/Notifications/NotificationsList"), {ssr:false})


export default function NotificationsComponent() {

  const [tabname, setTabname] = useState('incoming')

  const tabs = [{
    name:"Incoming",
    tabkey:"incoming",
  },
  {
    name:"Outgoing",
    tabkey:"outgoing",
  }]


  return (
      <div className={`flex flex-col h-screen w-full`} >
        <h1 className="text-3xl font-bold mt-10 mb-10 sm:ml-20  mx-6">Notifications</h1>
            <div className="w-full flex justify-center">
              <div className="w-[200px] h-16 rounded-4xl shadow-2xl top-25
              flex justify-center items-center gap-2 dark:bg-neutral-900
              ">
                {tabs.map((tab)=>{
                  return (
                    <button
                    key={tab.tabkey}
                    onClick={()=> setTabname(tab.tabkey)}
                    className={`${tabname === tab.tabkey ? 'bg-indigo-600 text-white':' '}
                    px-2 py-1 rounded-2xl dark:text-white 
                    `}
                    >{tab.name}</button>
                  )
                })}
              </div>
            </div>

            {tabname ==='incoming' && (<NotificationsListDynamic FetchFunction={GetFriendRequests} incoming={true} notRequestsText="You have no incoming friend requests"/>)}
            {tabname ==='outgoing' && (<NotificationsListDynamic FetchFunction={GetOutgoingFriendRequests} incoming={false} notRequestsText="You have no outgoing friend requests"/>)}

      </div>
  )
}