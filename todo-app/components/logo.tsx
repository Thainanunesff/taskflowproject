import { CheckSquare } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export default function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <div className="flex items-center gap-2">
      <div className="rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 p-1.5 text-white">
        <CheckSquare className={sizeClasses[size]} />
      </div>
      {showText && (
        <span className={`font-bold tracking-tight ${textSizeClasses[size]}`}>
          Task<span className="text-purple-600">Master</span>
        </span>
      )}
    </div>
  )
}
