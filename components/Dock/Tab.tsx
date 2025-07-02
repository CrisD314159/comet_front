'use client'

import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

interface TabProps {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  title: string
  tabkey: string
  children: React.ReactNode
  onClick?: () => void
}

const Tab = ({ children }: TabProps) => {
  return <>{children}</>
}

export default Tab