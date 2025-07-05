'use client'

import { GetSearchUsers } from "@/lib/serverActions/getActions/GetActions"
import { isNullOrEmpty, UserInfo } from "@/lib/types/types"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useInView } from "react-intersection-observer"
import SearchUserCard from "./SearchUserCard"

interface SearchListComponentProps{
  initialUsers: UserInfo[]
  keyword:string
}

let CURRENT_PAGE = 0

export default function SearchListComponent({initialUsers, keyword}:SearchListComponentProps) {

  const [users, setUsers] = useState<UserInfo[]>(initialUsers)
  const [hasMore, setHasMore] = useState(false)
  const [pending, setPending] = useState(false)

  const {ref, inView} = useInView({
    threshold:0.1,
  })

  console.log(users);

  const handleUsersFetching = async () =>{
    if(!hasMore || isNullOrEmpty(keyword)) return
    try {
      CURRENT_PAGE = CURRENT_PAGE+1
      setPending(true)
      const newUsers = await GetSearchUsers(keyword, CURRENT_PAGE, 10)
      if(newUsers.length > 0) {
        setUsers([...users, newUsers])
      }else{
        setHasMore(false)
      }
    } catch (error) {
      if(error instanceof Error) toast.error(error.message)
      
    }finally{
      setPending(false)
    }
  }

  useEffect(()=>{
    if(inView && hasMore) handleUsersFetching()

  }, [inView, hasMore])

  return (
    <div className="overflow-y-scroll w-[90%] flex-1 mx-auto max-md:pb-[92px]">
      {
        users.map(user =>{
          return (
            <SearchUserCard friend={user} key={user.id}/>
          )
        })
      }
    {
      pending ?
      (
        <div className=" w-full flex justify-center">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      )
      :
      <div ref={ref}>

      </div>
    }
    </div>
  )
}