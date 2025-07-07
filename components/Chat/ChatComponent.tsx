'use client'
import { useEffect, useState } from "react";
import {
  Channel as ChannelComponent,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { Channel, StreamChat } from "stream-chat";
 


import CallButton from "../Calls/CallButton";
import toast from "react-hot-toast";
import useSWR from "swr";
import { GetUserChatToken, GetUserOverview } from "@/lib/serverActions/getActions/GetActions";
import { ChatTokenResponse, getChannelId, UserInfo } from "@/lib/types/types";
import HomeButton from "./HomeButton";
interface ChatProps{
  targetUserId:string

}



export default function ChatComponent({targetUserId}:ChatProps) {
  

    const [chatClient, setChatClient] = useState<StreamChat | null>(null);
    const [channel, setChannel] = useState<Channel | null>(null);
    const [loading, setLoading] = useState(true);
    const [didJoin, setDidJoin] = useState(false);

    const {data: userData, error: userError, isLoading: userIsLoading} = useSWR<UserInfo>('authUser', GetUserOverview)

    const {data: tokenData, error: tokenError, isLoading: isTokenLoaiding} = useSWR<ChatTokenResponse>('token', GetUserChatToken)


    /// usar swr para el token
  
    useEffect(() => {
      const initChat = async () => {
        if (didJoin || !tokenData?.token || !userData) return;
  
        try {
          console.log("Initializing stream chat client...");
          const STREAM_API_KEY = process.env.NEXT_PUBLIC_STEAM_API_KEY ?? "";
  
          const client = StreamChat.getInstance(STREAM_API_KEY);
  
          await client.connectUser(
            {
              id: userData.id,
              name: userData.name,
              image: userData.profilePicture,
            },
            tokenData.token
          );
  
          //
          const channelId = await getChannelId(userData.id, targetUserId);
  
          // you and me
          // if i start the chat => channelId: [myId, yourId]
          // if you start the chat => channelId: [yourId, myId]  => [myId,yourId]
  
          const currChannel = client.channel("messaging", channelId, {
            members: [userData.id, targetUserId],
          });
  
          await currChannel.watch();
          
          setDidJoin(true)
          setChatClient(client);
          setChannel(currChannel);
        } catch (error) {
          console.error("Error initializing chat:", error);
          toast.error("Could not connect to chat. Please try again.");
        } finally {
          setLoading(false);
        }
      };
  
      initChat();
    }, [tokenData, userData, targetUserId, didJoin]);
  
    const handleVideoCall = () => {
      if (channel) {
        const callUrl = `${window.location.origin}/call/${channel.id}`;
  
        channel.sendMessage({
          text: `I've started a video call. Join me here: ${callUrl}`,
        });
  
        toast.success("Video call link sent successfully!");
      }
    };
  
    if (loading || !chatClient || !channel || userIsLoading || isTokenLoaiding) return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );

    if (userError || tokenError) return (
      <div className="w-full h-full flex justify-center items-center">
        <p>An error occurred while loading the call</p>
      </div>
    );
  
    return (
      <div className="h-full">
        <Chat client={chatClient}>
          <ChannelComponent channel={channel} >
            <div className="w-full relative">
              <div className="absolute top-0 right-15 max-sm:right-5">
                <HomeButton/>
                <CallButton handleVideoCall={handleVideoCall} />

              </div>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput focus />
              </Window>
            </div>
            <Thread />
          </ChannelComponent>
        </Chat>
      </div>
    )
  
}