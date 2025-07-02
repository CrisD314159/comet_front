'use client'

import { GetUserFriends } from "@/lib/serverActions/getActions/GetActions"
import useSWR from "swr"
import FriendCard from "./FriendCard"
import { UserInfo } from "@/lib/types/types"

export default function FriendsMainComponent() {
  const { data, error, isLoading } = useSWR<{ userFriends: UserInfo[] }>('friendsList', GetUserFriends)


  return (
    <div className="flex flex-col h-screen w-full">
      <h1 className="text-3xl font-bold  sm:ml-20 my-10 mx-6">Friends</h1>
      <div className="overflow-y-scroll w-[90%] flex-1 mx-auto max-md:pb-[72px]">
      {isLoading && (
        <div className="w-full flex justify-center">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
        )}
        {error && <p>There was an error while loading your friends</p>}
        {data &&
        (
          data.userFriends.map(user => {
            return (
              <FriendCard key={user.id} friend={user}/>
            )
          }
          )
        )
        }
      </div>
    </div>
  )
  
}