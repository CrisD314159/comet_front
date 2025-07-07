'use server'
import { APIURL, FormResponse } from "@/lib/types/types";
import { changePassword, updateUser, verifyAccount } from "@/lib/zodValidations/zodValidations";
import { checkIsLoggedIn } from "../authActions/Auth";
import { cookies } from "next/headers";

export async function ChangePassword(formResponse:FormResponse, formdata:FormData) {
    const validations = changePassword.safeParse({
      email:formdata.get("email"),
      password:formdata.get("password"),
      code:formdata.get("code")
    })
  
    if(!validations.success){
      return {
        success: false,
        message: validations.error.errors.map(e => `${e.path}: ${e.message}`).join('\n')
      }
    }

    return await PutFormMethod("/auth/changePassword", {...validations.data}, undefined)

}

export async function UpdateUser(formResponse:FormResponse, formdata:FormData) {
  await checkIsLoggedIn()
  const token = (await cookies()).get("token")?.value

  const validations = updateUser.safeParse({
    id:formdata.get("id"),
    name:formdata.get("name"),
    biography:formdata.get("biography"),
    profilePicture:formdata.get("profilePicture"),
    country:formdata.get("country")

  })

  if(!validations.success){
  return {
    success: false,
    message: validations.error.errors.map(e => `${e.path}: ${e.message}`).join('\n')
    }
  }

  return await PutFormMethod("/users", {...validations.data}, token)

}

export async function VerifyAccount(formResponse:FormResponse, formdata:FormData) {
    const validations = verifyAccount.safeParse({
      email:formdata.get("email"),
      code:formdata.get("code")
    })
  
    if(!validations.success){
      return {
        success: false,
        message: validations.error.errors.map(e => `${e.path}: ${e.message}`).join('\n')
      }
    }

    return await PutFormMethod("/users/verifyAccount", {...validations.data}, undefined)
  
  
}

async function PutFormMethod(path:string, values:object, token:string|undefined){
  let response: Response
  try {
    response = await fetch(`${APIURL}${path}`, {
      method: 'PUT',
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...values })
    })
    
  } catch {
    return {
      success:false,
      message: "An unexpected error occurred whlie connecting to server"
    }    
  }

  const {success, message} = await response.json()
  return {
    success,
    message
  }
}
  

export async function AcceptFriendRequest(friendRequestId:string) {
  return await PutSwrMethod("/friends/acceptFriendRequest", {friendRequestId})
}
export async function RejectFriendRequest(friendRequestId:string) {
  return await PutSwrMethod("/friends/rejectFriendRequest", {friendRequestId})
  
}
export async function BlockFriend(friendId:string) {
  return await PutSwrMethod("/friends/blockFriend", {friendId})
  
}
export async function UnblockFriend(friendId:string) {
  return await PutSwrMethod("/friends/unblockFriend", {friendId})
}
export async function DeleteFriend(friendId:string) {
  return await PutSwrMethod("/friends/deleteFriend", {friendId})  
}

async function PutSwrMethod(path:string, values:object){
  await checkIsLoggedIn()
  const token = (await cookies()).get("token")?.value
  let response: Response
  try {
    response = await fetch(`${APIURL}${path}`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...values })
    })
    
  } catch {
    throw new Error("An unexpected error occurred whlie connecting to server")
  
  }

  if(!response.ok){
    const {message} = await response.json()
    throw new Error(message)
  }    
}