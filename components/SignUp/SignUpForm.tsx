'use client'

import { SignUp } from "@/lib/serverActions/postActions/PostActions"
import { startTransition, useActionState, useEffect, useState } from "react"
import ProfilePictureChooser from "../ProfilePicture/ProfilePictureChooser"
import toast from "react-hot-toast"

export default function SignUpForm() {
  const picUrl = "https://api.dicebear.com/9.x/fun-emoji/svg?seed="
  const [state, action, pending] = useActionState(SignUp, undefined)
  const [profileSeed, setProfileSeed] = useState('Aidan')

  useEffect(()=>{
    if(state?.success === false){
      toast.error(state.message)
    }
  }, [state])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formdata = new FormData(event.currentTarget)
    formdata.set("profilePicture", `${picUrl}${profileSeed}`)

    startTransition(() => {
      action(formdata)
    })
  }



  return (
    <form onSubmit={handleSubmit} className="space-y-6">
            <ProfilePictureChooser setSeed={setProfileSeed} url={`${picUrl}${profileSeed}`}/>
            <div className="flex w-full justify-center items-center gap-3">
              <div>
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                  Location
                </label>
                <div className="mt-2">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
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
                Sign Up
              </button>
            </div>
          </form>

  )
}