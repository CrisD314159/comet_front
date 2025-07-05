import CallComponent from "@/components/Calls/CallComponent"

export default async function CallPage({
  params,
}: {
  params: Promise<{ id: string }>
}){
  const {id} = await params

  return (
    <CallComponent callId={id}/>
  )
  
};