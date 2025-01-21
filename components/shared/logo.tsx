import { cn } from "@/lib/utils"
import Link from "next/link"

interface LogoProps {
    className?: string
}

const Logo = (
    { className }: LogoProps
) => {
  return (
    <Link href={"/dashboard"} className={cn("text-blue-600 cursor-pointer text-3xl font-bold", className)}>
        Resume<span className="text-blue-500">Forge</span>
    </Link>
  )
}

export default Logo;
