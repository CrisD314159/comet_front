import { useEffect, useState } from "react";


import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";

import CallButton from "../Calls/CallButton";
import toast from "react-hot-toast";
interface ChatProps{
  id:string

}
const STREAM_API_KEY = process.env.VITE_STREAM_API_KEY ?? "";

export default function ChatComponent({id}:ChatProps) {
  
    const [chatClient, setChatClient] = useState(null);
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);

    /// usar swr para el token
  
    useEffect(() => {
      const initChat = async () => {
        if (!tokenData?.token || !authUser) return;
  
        try {
          console.log("Initializing stream chat client...");
  
          const client = StreamChat.getInstance(STREAM_API_KEY);
  
          await client.connectUser(
            {
              id: authUser._id,
              name: authUser.fullName,
              image: authUser.profilePic,
            },
            tokenData.token
          );
  
          //
          const channelId = [authUser._id, targetUserId].sort().join("-");
  
          // you and me
          // if i start the chat => channelId: [myId, yourId]
          // if you start the chat => channelId: [yourId, myId]  => [myId,yourId]
  
          const currChannel = client.channel("messaging", channelId, {
            members: [authUser._id, targetUserId],
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
    }, [tokenData, authUser, targetUserId]);
  
    const handleVideoCall = () => {
      if (channel) {
        const callUrl = `${window.location.origin}/call/${channel.id}`;
  
        channel.sendMessage({
          text: `I've started a video call. Join me here: ${callUrl}`,
        });
  
        toast.success("Video call link sent successfully!");
      }
    };
  
    if (loading || !chatClient || !channel) return <span className="loading loading-infinity loading-xl"></span>;
  
    return (
      <div className="h-[93vh]">
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <div className="w-full relative">
              <CallButton handleVideoCall={handleVideoCall} />
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput focus />
              </Window>
            </div>
            <Thread />
          </Channel>
        </Chat>
      </div>
    )
  
}