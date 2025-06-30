'use client'

import { useEffect } from "react"

interface AlertProps{
  message:string
  open:boolean
  setOpen:(value:boolean) => void
  type: "success"|"error"|"info"
}

export default function Alert({message, open, setOpen, type}:AlertProps) {
  useEffect(()=>{
    const handleClose = ()=>{
      setOpen(false)
    }

    if(open){
      setTimeout(handleClose, 4000)
    }
  },[open, setOpen])

  return (
    open && (
      <div className={`toast toast-top toast-center animate-ease-in-out`} >
        <div className={`alert alert-${type}`}>
          <span>{message}</span>
        </div>
      </div>
    )
  )
}