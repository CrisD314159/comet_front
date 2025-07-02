'use client'

import { Logout } from "@/lib/serverActions/authActions/Auth"
import { LogOut } from "lucide-react"
import { useState } from "react"


export default function LogoutModal() {

  const [open, setOpen] = useState(false)

  const handleOpen = () =>{
    setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
  }

  return (
    <>
      <button className="btn btn-soft btn-error" onClick={handleOpen}><LogOut/></button>
      <dialog id="my_modal_1" className="modal" open ={open} onClose={handleClose}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure you want to logout?</h3>
          <div className="modal-action ">
            <button className="btn btn-soft btn-error" onClick={handleClose}>Cancel</button>
            <button className="btn btn-soft btn-info" onClick={async ()=>{
              await Logout()
              handleClose()
            } }>Logout</button>
          </div>
        </div>
      </dialog>
    </>
  )
}