import { GetFriendRequests } from "@/lib/serverActions/getActions/GetActions"
import { FriendRequestInfo } from "@/lib/types/types"
import useSWR from "swr"
import NotificationCard from "./NotificationCard"

export default function OutgoingNotifications() {
  const {data, error, isLoading} = useSWR<{friendRequest: FriendRequestInfo[]}>('incoming', GetFriendRequests)

  return (
    <div className="w-full h-full">
      {isLoading && (
        <div className="w-full flex justify-center">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      )}
      {error && <p>There was an error while loading incomig notifications</p>}
      <div className="overflow-y-scroll w-[90%] flex-1 mx-auto max-md:pb-[92px]">
        {
          data && data?.friendRequest.length > 0 ?
          (
            data.friendRequest.map(request =>{
              return (
                <NotificationCard notification={request} key={request.id} incoming={false}/>
              )
            })
          ):
          <p className="text-center mt-7">You have no outgoing friend requests</p>
        }
        
      </div>

    </div>
  )
}