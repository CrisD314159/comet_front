'use client'

import { GetSearchUsers } from "@/lib/serverActions/getActions/GetActions"
import { isNullOrEmpty, UserInfo } from "@/lib/types/types"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import SearchInputComponent from "./SearchInputComponent"
import SearchListComponent from "./SearchListComponent"
import useSWR from "swr"


export default function SearchMainComponent() {

  const [searchParam, setSeachParam] = useState('')


  const {data, isLoading, error, mutate} = useSWR<UserInfo[]>('initialSearchUsers', () => GetSearchUsers(searchParam, 0, 10))

  const handleSearchChange = (cad:string) =>{
    setSeachParam(cad)
  }

  useEffect(()=>{
    async function FetchInitial(cad:string) {
      if(isNullOrEmpty(cad)) return
      try {
        mutate(undefined, true)
      } catch (error) {
        if(error instanceof Error) toast.error(error.message) 
      }
    }

    FetchInitial(searchParam)
  },[searchParam, mutate])

  

  return (
      <div className={`flex flex-col h-screen w-full`} >
        <h1 className="text-3xl font-bold mt-10 mb-2 sm:ml-20  mx-6">Search</h1>
        <div className="w-full flex justify-center items-center px-3">
          <SearchInputComponent setSearch={handleSearchChange}/>
        </div>
        {error && <p className="text-center">There was an error while loading users</p>}
        {isLoading && <div className=" w-full flex justify-center">
          <span className="loading loading-infinity loading-xl"></span>
        </div>}
        {
          data &&
        <SearchListComponent initialUsers={data} keyword={searchParam}/>
        }
      </div>
  )
}