'use client'
import { UserInfo } from "@/lib/types/types"
import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes, useState } from "react"
import toast from "react-hot-toast"

interface FriendActionModalProps{
  user: UserInfo
  mutate:()=> void
  title:string
  actionText:string
  buttonColor: "error" | "warning" | "accent"
  ButtonIcon:ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  action: (id: string) => Promise<void>
}


export default function FriendActionModal({user, title, action, mutate, actionText, ButtonIcon, buttonColor }:FriendActionModalProps) {

  const [open, setOpen] = useState(false)

  const handleOpen = () =>{
    setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
  }

  const handleDelete = async () =>{
    try {
      await action(user.id)
      mutate()
    } catch (error) {
      if(error instanceof Error) toast.error(error.message)
    } finally{
      handleClose()
    }
  }

  return (
    <>

    <button className={`btn btn-soft btn-${buttonColor} `} onClick={handleOpen}>
      <ButtonIcon/>
    </button>
      <dialog id="my_modal_1" className="modal" open ={open} onClose={handleClose}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="modal-action ">
            <button className="btn btn-soft" onClick={handleClose}>Cancel</button>
            <button className="btn btn-soft btn-error" onClick={handleDelete}>{actionText}</button>
          </div>
        </div>
      </dialog>
    </>
  )
}