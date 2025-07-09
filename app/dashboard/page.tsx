'use client'
import Tab from "@/components/Dock/Tab";
import Dock from  "@/components/Dock/Dock";
import { User, Bell, Settings, Search } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const FriendsMainComponentDynamic = dynamic(()=> import ("@/components/Friends/FriendsMainComponent"), {
  ssr:false
}) 
const UserSettingsComponentDynamic = dynamic(()=> import ("@/components/UserSettings/UserSettingsComponent"), {
  ssr:false
}) 

const NotificationsComponentDynamic = dynamic(()=> import ("@/components/Notifications/NotificationsComponent"), {
  ssr:false
}) 

const SearchComponentDynamic = dynamic(()=> import ("@/components/Search/SearchMainComponent"), {
  ssr:false
}) 

export default function DashboardPage() {
  return (
    <Suspense>
      <Dock>
        <Tab title="Friends" icon={User} tabkey="friends">
          <Suspense fallback={<span className="loading loading-infinity loading-xl"></span>}>
            <FriendsMainComponentDynamic/>
          </Suspense>
        </Tab>
        <Tab title="Notifications" icon={Bell} tabkey="notifications">
          <Suspense fallback={<span className="loading loading-infinity loading-xl"></span>}>
            <NotificationsComponentDynamic/>
          </Suspense>
        </Tab>
        <Tab title="Search" icon={Search} tabkey="search">
        <Suspense fallback={<span className="loading loading-infinity loading-xl"></span>}>
            <SearchComponentDynamic/>
          </Suspense>
        </Tab>
        <Tab title="Settings" icon={Settings} tabkey="settings">
          <Suspense fallback={<span className="loading loading-infinity loading-xl"></span>}>
            <UserSettingsComponentDynamic/>
          </Suspense>
        </Tab>
      </Dock>
    </Suspense>
  )
}