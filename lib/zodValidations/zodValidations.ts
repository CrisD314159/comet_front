import {z} from "zod";


export const signupValidations = z.object({
  name: z.string().max(60),
  country: z.string().optional(),
  email:z.string().email(),
  password:z.string()
})


export const resetAccount = z.object({
  email:z.string().email()
})