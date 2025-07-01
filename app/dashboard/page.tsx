'use client'
import Tab from "@/components/DrawerDock/Tab";
import Tabs from "@/components/DrawerDock/Tabs";
import { User, Bell, Settings } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const FriendsMainComponentDynamic = dynamic(()=> import ("@/components/Friends/FriendsMainComponent"), {
  ssr:false
}) 

export default function DashboardPage() {
  return (
    <Tabs>
      <Tab title="Friends" icon={User} tabkey="friends">
        <Suspense fallback={<span className="loading loading-infinity loading-xl"></span>}>
          <FriendsMainComponentDynamic/>
        </Suspense>
      </Tab>
      <Tab title="Notifications" icon={Bell} tabkey="notifications">
        Notifications
      </Tab>
      <Tab title="Settings" icon={Settings} tabkey="settings">
        Settings
      </Tab>
    </Tabs>
  )
}