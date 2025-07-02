import { FriendRequestInfo } from "@/lib/types/types"

interface NotificationCardProps{
  notification: FriendRequestInfo
  incoming:boolean
}


export default function NotificationCard({notification, incoming}:NotificationCardProps) {
  return (
    <div className="w-[95%] h-[250px] max-md:h-[310px] flex sm:flex-row flex-col justify-between  mx-auto border border-white/20 rounded-2xl my-10 p-6 bg-white/5 backdrop-blur-md shadow-xl hover:shadow-indigo-500/30 transition-shadow duration-300 dark:text-white">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="avatar">
            <div className="w-20 h-20 rounded-full ring-2 ring-indigo-400 ring-offset-2 ring-offset-black/20">
              <img src={notification.profilePicture} alt={notification.name} />
            </div>
          </div>
          <h2 className="text-2xl font-semibold">{notification.name}</h2>
        </div>

        <div className="max-md:h-15 h-[35%] sm:pr-3 overflow-y-scroll">
          <p className="text-sm dark:text-white/80 mb-2 italic ">{notification.biography}</p>
        </div>
        <p className="text-sm dark:text-indigo-300 text-indigo-600  font-medium">🌍 {notification.country}</p>
      </div>
      {
        incoming &&
        (
        <div className="flex items-center max-md:justify-center max-md:gap-1 gap-6 my-4">
          <button className="btn btn-soft btn-info">Accept</button>
          <button className="btn btn-soft btn-primary">Reject</button>
        </div>
        )
      }
  </div>
  )
}