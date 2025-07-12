'use client'
import { FriendRequestInfo } from "@/lib/types/types"
import useSWR from "swr"
import NotificationCard from "./NotificationCard"

interface NotificationsListProps{
  FetchFunction : () => Promise<{friendRequest: FriendRequestInfo[]}>
  notRequestsText:string
  incoming:boolean
}

export default function NotificationsList({FetchFunction, incoming, notRequestsText}:NotificationsListProps) {
  const {data, error, isLoading, mutate} = useSWR<{friendRequest: FriendRequestInfo[]}>(incoming ? 'incoming': 'outgoing', FetchFunction)


  return (
    <div className="w-full h-full overflow-y-scroll pt-6 flex-1">
      {isLoading && (
        <div className="w-full flex justify-center">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      )}
      {error && <p>There was an error while loading incomig notifications</p>}
      <div className="sm:w-[90%] mx-auto max-md:pb-[100px]">
        {
          data && data?.friendRequest.length > 0 ?
          (
            data.friendRequest.map(request =>{
              return (
                <NotificationCard notification={request} key={request.id} incoming={incoming} mutate={mutate}/>
              )
            })
          ):
          <p className="text-center mt-7">{notRequestsText}</p>
        }
        
      </div>

    </div>
  )
}