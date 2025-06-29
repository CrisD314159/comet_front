import {z} from "zod";


export const signupValidations = z.object({
  name: z.string().max(60),
  country: z.string().optional(),
  email:z.string().email(),
  password:z.string(),
  profilePictureUrl:z.string().url()
})

export const resetAccount = z.object({
  email:z.string().email()
})

export const changePassword = z.object({
  email:z.string().email(),
  code:z.string(),
  password:z.string()
})
export const verifyAccount = z.object({
  email:z.string().email(),
  code:z.string()
})

export const updateUser = z.object({
  id:z.string(),
  biography:z.string().optional(),
  country:z.string().optional(),
  name:z.string().max(60),
  profilePicture: z.string().url()
})


