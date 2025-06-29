import { cookies } from "next/headers"
import { checkIsLoggedIn, Logout } from "../authActions/Auth"
import { APIURL } from "@/lib/types/types"


export async function DeleteUser(){
  await checkIsLoggedIn()
  const token = (await cookies()).get("token")?.value
  let response: Response
  try {
    response = await fetch(`${APIURL}/users`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
  } catch {
    throw new Error("An unexpected error occurred whlie connecting to server")
  }

  if(response.ok){
    await Logout()
  }else{
    const {message} = await response.json()
    throw new Error(message)
  }  
}