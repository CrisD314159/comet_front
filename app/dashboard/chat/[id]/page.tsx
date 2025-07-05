import ChatComponent from "@/components/Chat/ChatComponent";


export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>
}){
  const {id} = await params

  return (
    <ChatComponent targetUserId={id}/>
  )
  
};