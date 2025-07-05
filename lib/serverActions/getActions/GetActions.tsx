'use server'
import { cookies } from "next/headers";
import { checkIsLoggedIn } from "../authActions/Auth";
import { APIURL, isNullOrEmpty } from "@/lib/types/types";

export async function GetUserFriends(){
  return await GetGeneralMethod("/users/getFriends")
}

export async function GetUserBlockedFriends(){
  return await GetGeneralMethod("/users/getBlockedFriends")
}

export async function GetOutgoingFriendRequests(){
  return await GetGeneralMethod("/friends/getOutgoingRequests")
}

export async function GetFriendRequests(){
  return await GetGeneralMethod("/friends/getFriendRequests")
}

export async function GetUserOverview(){
  return await GetGeneralMethod("/users/profile")
}

export async function GetUserChatToken(){
  return await GetGeneralMethod("/chat")
}


export async function GetSearchUsers(name:string, offset:number, limit:number){
  if(isNullOrEmpty(name)) return 
  return await GetGeneralMethod(`/users/search?name=${name}&offset=${offset}&limit=${limit}`)
}

async function GetGeneralMethod(path:string){
  await checkIsLoggedIn()
  const token = (await cookies()).get("token")?.value

  let response : Response 

  try {
    response = await fetch(`${APIURL}${path}`, {
      method:'GET',
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
  } catch  {
    throw new Error ("An error occurred while connecting to  server")
  }

  if(response.ok){
    const result = await response.json()
    return result
  }else{
     const {message} = await response.json()
     throw new Error(message)
  }
}

