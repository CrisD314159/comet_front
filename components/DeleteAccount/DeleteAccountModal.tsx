'use client'

import { DeleteUser } from "@/lib/serverActions/deleteActions/DeleteActions"
import { useState } from "react"


export default function DeleteAccountModal() {

  const [open, setOpen] = useState(false)

  const handleOpen = () =>{
    setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
  }

  return (
    <>
      <button className="btn btn-soft btn-warning" onClick={handleOpen}>Delete Account</button>
      <dialog id="my_modal_1" className="modal" open ={open} onClose={handleClose}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure you want to delete permanently your account?</h3>
          <div className="modal-action ">
            <button className="btn btn-soft btn-error" onClick={handleClose}>Cancel</button>
            <button className="btn btn-soft btn-info" onClick={async ()=>{
              await DeleteUser()
              handleClose()
            } }>Delete Account</button>
          </div>
        </div>
      </dialog>
    </>
  )
}