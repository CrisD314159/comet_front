'use client'

import { UserInfo } from "@/lib/types/types"
import { useState } from "react"
import UserSettingsEditForm from "./UserSettingsEditForm"

interface UserSettingsEditFormProps{
  user: UserInfo
  mutate: () => void
}

export default function UserSettingsEditModal({mutate, user}:UserSettingsEditFormProps) {

  const [open, setOpen] = useState(false)

  const handleOpen = () =>{
    setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
  }

  return (
    <>
      <button className="btn btn-soft btn-primary" onClick={handleOpen}>Edit your info</button>
      <dialog id="my_modal_1" className="modal" open ={open} onClose={handleClose}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Profile</h3>
          <div className="modal-action flex flex-col">
            <UserSettingsEditForm mutate={mutate} handleClose={handleClose} user={user}/>
          </div>
        </div>
      </dialog>
    </>
  )
}