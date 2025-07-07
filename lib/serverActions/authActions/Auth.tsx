'use server'
import { APIURL, FormResponse, isNullOrEmpty } from "@/lib/types/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function checkIsLoggedIn() {
  try {
    const token = (await cookies()).get('token')?.value
    const refreshToken = (await cookies()).get('refresh')?.value
    
    if(!token){
      return await RefreshToken(refreshToken)
    }
  
    const response = await fetch(`${APIURL}/users/profile`,
      {
        method:'GET',
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }
    )
  
    if(response.status === 200){
      return true
    }
  
    if(response.status === 401 || response.status === 403){
      return await RefreshToken(refreshToken)
    }

  } catch{
    return false    
  }
}

export async function LogIn(formstate:FormResponse, formdata:FormData) {

  const email = formdata.get("email")?.toString()
  const password = formdata.get("password")?.toString()

  let response : Response

  try {
    response = await fetch(`${APIURL}/auth/login`,
      {
        method:'POST',
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({"email":email, "password":password})
      }
    )
    
  } catch {
    return {
      success:false,
      message:"An error occurred while trying to connect to server"
    }
  }

  if(response.status === 200){
    const {token, refreshToken} = await response.json()
    await CreateSession(token, refreshToken)
    redirect("/dashboard")
  }
  if(response.status === 401){
    redirect('/verifyAccount')
  }else{
    const {success, message} = await response.json()
    return {
      success:success,
      message:message
    }
  }

  
}

export async function Logout() {
  const refreshToken = (await cookies()).get("refresh")?.value
  try {
    await fetch(`${APIURL}/auth/logout`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({"refreshToken":refreshToken})
    })
    
  } catch  {
    (await cookies()).delete("token");
    (await cookies()).delete("refresh");
    redirect("/")
  }

  (await cookies()).delete("token");
  (await cookies()).delete("refresh");
  redirect("/")
 
}

export async function RefreshToken(currentRefreshToken:string | undefined) {

  if(!currentRefreshToken){
    return false
  }

  const response = await fetch(`${APIURL}/auth/refresh`,
    {
      method:'PUT',
      headers:{
        'Content-Type': "application/json"
      },
      body:JSON.stringify({"refreshToken":currentRefreshToken})
    }
  )

  if(response.status != 200){
    return false
  }

  const {token, refreshToken} = await response.json()

  if(!refreshToken){
    await CreateSession(token, currentRefreshToken)
  }else{
    await CreateSession(token, refreshToken)
  } 
}
export async function CreateSession(token:string, refreshToken:string) {

  const cookieStore = await cookies()

  cookieStore.set('token', token, {
  httpOnly: true,
  secure: false,
  expires:  new Date(Date.now() + 86400000),// Outputs the date and time exactly 1 day from now,
  sameSite: 'lax',
  path: '/',
  })

  cookieStore.set('refresh', refreshToken, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: 'lax',
    path: '/',
  })
}

export async function CreateSessionThirdParty(token:string, refreshToken:string) {
  if(isNullOrEmpty(token) || isNullOrEmpty(refreshToken)) {
    console.error("no token or refresh provided")
    redirect('/')
  }

  await CreateSession(token, refreshToken)

  redirect('/dashboard?tab=friends')
}
