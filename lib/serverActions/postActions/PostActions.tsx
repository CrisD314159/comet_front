'use server'
import { APIURL, FormResponse } from "@/lib/types/types";
import { resetAccount, signupValidations } from "@/lib/zodValidations/zodValidations";
import { checkIsLoggedIn } from "../authActions/Auth";
import { cookies } from "next/headers";


export async function SignUp(formstate:FormResponse, formdata:FormData) {
  const validations = signupValidations.safeParse({
    name : formdata.get("name"),
    country:formdata.get("location"),
    email: formdata.get("email"),
    password: formdata.get("password"),
    profilePictureUrl:formdata.get("profilePicture")
  })

  if(!validations.success){
    return {
      success: false,
      message: validations.error.message
    }
  }

  const {email, name, password, country} = validations.data

  let response: Response
  try {
    response = await fetch(`${APIURL}/users/signup`, {
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email, name, password, country})
    })
    
  } catch {
    return {
      success:false,
      message: "An unexpected error occurred whlie connecting to server"
    }    
  }

  if(response.status === 201){
    return {
      success:true,
      message:"User created"
    }

  }else{
    const {success, message} = await response.json()
    return {
      success,
      message
    }
  }
  
}

export async function SendFriendRequest(receiver:string, message:string) {
  await checkIsLoggedIn()
  const token = (await cookies()).get("token")?.value

  let response : Response

  try {
    response = await fetch(`${APIURL}/friends/sendFriendRequest`, {
      method:'PUT',
      headers:{
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({receiver, message})
    })
    
  } catch {
    throw new Error("An unexpected error occurred whlie connecting to server")
  }

  if(response.status != 200){
    const {message} = await response.json()
    throw new Error(message)
  }
  
}

export async function ResetAccount(formResponse:FormResponse, formdata:FormData){
    const validations = resetAccount.safeParse({
    email: formdata.get("email")
  })

  if(!validations.success){
    return {
      success: false,
      message: validations.error.flatten().fieldErrors
    }
  }

  const {email} = validations.data

  let response: Response
  try {
    response = await fetch(`${APIURL}/auth/resetAccount`, {
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email})
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