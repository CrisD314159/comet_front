'use client'
import { useEffect, useState } from "react"

interface SearchInputComponentProps{
    setSearch:(cad:string) => void
}

export default function SearchInputComponent({setSearch}: SearchInputComponentProps) {

  const [inputValue, setInputValue] = useState('')

  useEffect(()=>{
    const timeoutId = setTimeout(() => {
      setSearch(inputValue);
    }, 525);
    return () => clearTimeout(timeoutId)
  }, [inputValue, 525])


  return (
<label className="input input-bordered flex items-center gap-2 rounded-full px-4 py-2 bg-base-100 shadow-sm focus-within:ring-2 focus-within:ring-primary/50 transition-all">
  <svg
    className="h-5 w-5 text-base-content/50"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="M21 21l-4.35-4.35"></path>
    </g>
  </svg>
  <input
    type="search"
    placeholder="Search users"
    className="grow bg-transparent outline-none text-sm placeholder:text-base-content/40"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
  />
</label>
  )
}