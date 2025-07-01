'use client'
import { LucideProps } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ForwardRefExoticComponent, ReactElement, RefAttributes, useEffect, useState } from 'react'


interface TabProps {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  title: string
  tabkey: string
  children: React.ReactNode
  onClick?: () => void
}

interface TabsProps {
  children: ReactElement<TabProps>[]
}

const Tabs = ({ children }: TabsProps) => {
  const params = useSearchParams()
  const router = useRouter()
  const [activeTabKey, setActiveTabKey] = useState(children[0]?.props.tabkey)

  const tabFromUrl = params.get('tab')

  useEffect(() => {
    if (tabFromUrl) {
      const exists = children.some(child => child?.props?.tabkey === tabFromUrl)
      if (exists) setActiveTabKey(tabFromUrl)
    }
  }, [tabFromUrl, children])

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tabKey: string,
    cb?: () => void
  ) => {
    e.preventDefault()
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('tab', tabKey)
    router.push(`${window.location.pathname}?${searchParams.toString()}`)
    setActiveTabKey(tabKey)
    cb?.()
  }

  const activeChild = children.find(child => child?.props?.tabkey === activeTabKey)

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-col justify-center h-full w-[50px] space-y-4 backdrop-blur-xs shadow-md p-2">
        {children.map(child => {
          if (!child?.props) return null
          return (
            <a
              key={child.props.tabkey}
              href="#"
              onClick={e => handleClick(e, child.props.tabkey, child.props.onClick)}
              className={`w-[95%] flex items-center justify-center py-2 rounded-2xl shadow-lg  dark:text-white ${
                activeTabKey === child.props.tabkey ? 'bg-indigo-600 ' : 'backdrop-blur-xl'
              }`}
            >
              <child.props.icon />
            </a>
          )
        })}
      </div>
      <div className="w-full p-3">{activeChild}</div>
    </div>
  )
}

export default Tabs