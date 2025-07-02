
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
}

export interface FriendRequestInfo{
  id: string,
  userId:string,
  profilePicture:string,
  name:string,
  biography:string,
  country:string
}
