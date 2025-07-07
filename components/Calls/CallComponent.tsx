'use client'
import { useEffect, useState } from "react";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
  Call,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import useSWR from "swr";
import { GetUserChatToken, GetUserOverview } from "@/lib/serverActions/getActions/GetActions";
import { ChatTokenResponse, UserInfo } from "@/lib/types/types";



interface CallComponentProps{
  callId:string
}
const CallComponent = ({callId}:CallComponentProps) => {
  
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [didJoin, setDidJoin] = useState(false);

    const {data: userData, error: userError, isLoading: userIsLoading} = useSWR<UserInfo>('callUser', GetUserOverview, {
      revalidateOnFocus:false,
      revalidateOnReconnect:false,
      refreshWhenHidden:false
    })

    const {data: tokenData, error: tokenError, isLoading: isTokenLoaiding} = useSWR<ChatTokenResponse>('userToken', GetUserChatToken)

  useEffect(() => {
    const initCall = async () => {
      if (didJoin || !tokenData?.token || !userData || !callId) return;

      try {
        console.log("Initializing Stream video client...");

        const user = {
          id: userData.id,
          name: userData.name,
          image: userData.profilePicture,
        };
        const STREAM_API_KEY = process.env.NEXT_PUBLIC_STEAM_API_KEY ?? "";

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);

        try {
          await callInstance.join({ create: true });
          
        } catch {
          toast.error("Could not load audio or video, check your browser permissions and try again");
        }

        console.log("Joined call successfully");

        setClient(videoClient);
        setCall(callInstance);
        setDidJoin(true);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, userData, callId, didJoin]);
  

  if (userIsLoading || isTokenLoaiding || isConnecting) return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
  );

  if (userError || tokenError ) return (
      <div className="w-full h-full flex justify-center items-center">
        <p>An error occurred while loading the call</p>
      </div>
  );

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  useEffect(() => {
    if(callingState === CallingState.LEFT){
      window.close()
    }
  }, [callingState])


  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallComponent;