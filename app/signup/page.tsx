import SignUpForm from "@/components/SignUp/SignUpForm";
import Link from "next/link";

export default function SignUpPage() {
  return (
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    
            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
              <SignUpForm/>
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                <Link href="/" className="font-semibold text-[#000080] hover:text-indigo-500 dark:text-indigo-700">
                  Back to login
                </Link>
              </p>
            </div>
          </div>
  )
}