import { v4 as uuidv4 } from 'uuid';

const id = uuidv4();
console.log(id); // ej: '6f1e3b14-3d13-41f7-bb79-c733c2d7f78b'
export const APIURL = "http://localhost:8080"

export type FormResponse =
|{

  success:boolean 
  message:string

}|undefined


export interface UserInfo{
  id: string,
  name: string,
  profilePicture: string,
  biography: string,
  country: string
  createdWithGoogle:boolean
}

export interface ChatTokenResponse{
  token: string
}

export interface FriendRequestInfo{
  id: string,
  userId:string,
  profilePicture:string,
  name:string,
  biography:string,
  country:string
}


export const isNullOrEmpty = (cad:string) => {

  if (cad ==='' || cad === undefined || cad === null){
    return true
  }
  return false

}



export async function getChannelId(userA: string, userB: string): Promise<string> {
  const combined = [userA, userB].sort().join("-");
  const encoder = new TextEncoder();
  const data = encoder.encode(combined);

  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  return hashHex;
}