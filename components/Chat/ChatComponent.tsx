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
import { House } from "lucide-react";
import Link from "next/link";
interface ChatProps{
  targetUserId:string

}
const STREAM_API_KEY = process.env.NEXT_STEAM_API_KEY ?? "";

export default function ChatComponent({targetUserId}:ChatProps) {
  
    const [chatClient, setChatClient] = useState<StreamChat | null>(null);
    const [channel, setChannel] = useState<Channel | null>(null);
    const [loading, setLoading] = useState(true);

    const {data: userData, error: userError, isLoading: userIsLoading} = useSWR<UserInfo>('authUser', GetUserOverview)

    const {data: tokenData, error: tokenError, isLoading: isTokenLoaiding} = useSWR<ChatTokenResponse>('token', GetUserChatToken)


    /// usar swr para el token
  
    useEffect(() => {
      const initChat = async () => {
        if (!tokenData?.token || !userData) return;
  
        try {
          console.log("Initializing stream chat client...");
  
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
    }, [tokenData, userData, targetUserId]);
  
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
            
              <div className="p-3 border-b flex items-center z-50 justify-end max-w-7xl mx-auto w-full absolute top-0 right-15">
                <Link href="/dashboard">
                  <button className="btn btn-info btn-sm text-white">
                    <House/>
                  </button>
                </Link>
              </div>
              <CallButton handleVideoCall={handleVideoCall} />
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