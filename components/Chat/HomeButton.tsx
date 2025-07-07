import { House } from "lucide-react";
import Link from "next/link";

export default function HomeButton() {
  return(
    <div className="p-3 border-b flex items-center z-50 justify-end max-w-7xl mx-auto w-full absolute top-0 right-15">
        <button className="btn btn-info btn-sm text-white">
        <Link href="/dashboard">
            <House/>
        </Link>
        </button>
    </div>
  )
}