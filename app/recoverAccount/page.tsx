'use client'

import { ResetAccount } from "@/lib/serverActions/postActions/PostActions"
import { startTransition, useActionState, useEffect } from "react"
import toast from "react-hot-toast"

export default function RecoverAccountPage() {
  const [state, action, pending] = useActionState(ResetAccount, undefined)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formdata = new FormData(e.currentTarget)

    startTransition(()=>{
      action(formdata)
    })
  }

  useEffect(()=>{
    if(state?.success === false){
      toast.error(state.message)
    }else if( state?.success === true) toast.success(state.message)
  }, [state])


  return(
    <div className="w-full h-full flex justify-center items-center">
       <form onSubmit={handleSubmit} method="POST" className="space-y-6 max-sm:w-[90%]">
            <div>
              <p className="text-2xl font-bold">Enter your email to reset your account</p>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={pending}
                className="flex w-full justify-center rounded-md dark:bg-indigo-600 bg-[#000080] hover:bg-[#1e1e34] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs dark:hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send recovery code
              </button>

            </div>
          </form>

    </div>
  )
}