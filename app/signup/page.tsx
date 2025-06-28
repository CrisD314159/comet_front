import SignUpForm from "@/components/SignUp/SignUpForm";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Image
                alt="Your Company"
                src="/comet_logo_blank.png"
                width={100}
                height={100}
                className="mx-auto w-auto"
              />
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
                Create your account
              </h2>
            </div>
    
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