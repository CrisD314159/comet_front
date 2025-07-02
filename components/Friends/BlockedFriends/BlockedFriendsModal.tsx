'use client'

import { GetUserBlockedFriends } from "@/lib/serverActions/getActions/GetActions"
import { UserInfo } from "@/lib/types/types"
import { useState } from "react"
import useSWR from "swr"
import FriendCard from "../FriendCard"
import { LockKeyhole } from "lucide-react"

interface BlockedFriendsModalProps{
  mutate: () => void
}

export default function BlockedFriendsModal({mutate}:BlockedFriendsModalProps) {

  const { data, error, isLoading, mutate:blockedListMutate } = useSWR<{ userFriends: UserInfo[] }>('blockedFriends', GetUserBlockedFriends)

  const [open, setOpen] = useState(false)

  const handleOpen = () =>{
    setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
  }

  const handleMutate = () =>{
    blockedListMutate()
    mutate()
  }

  return (
    <>
      <button className="btn btn-soft btn-neutral mt-10 mx-6 dark:text-white" onClick={handleOpen}><LockKeyhole/></button>
      <dialog id="my_modal_1" className="modal" open ={open} onClose={handleClose}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Blocked Friends</h3>
          <div className="modal-action flex flex-col">
            <div className="overflow-y-scroll flex-1 w-full h-full">
              {isLoading && (
              <div className="w-full flex justify-center">
                <span className="loading loading-infinity loading-xl"></span>
              </div>
              )}
              {error && <p>There was an error while loading your friends</p>}
              {data && data.userFriends.length > 0 ?

                (
                  data.userFriends.map(friend =>{
                    return <FriendCard friend={friend} mutate={handleMutate} key={friend.id} blocked/>
                  })
                )
                :
                <p className="text-center">No blocked friends found</p>
              }

            </div>

          <button className="btn btn-soft btn-primary" onClick={handleClose}>Close</button>
          </div>
        </div>
      </dialog>
    </>
  )
}