"use client"

import { useState } from "react"

import { cn } from "@docbird/ui"
import { useMediaQuery } from "@docbird/ui/hooks"
import { Icons } from "@docbird/ui/icons"

export interface InputProps extends React.ComponentProps<"input"> {
  autoFocusOnlyOnDesktop?: boolean
}

const Input: React.FC<InputProps> = ({
  className,
  type,
  autoFocusOnlyOnDesktop,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const { isMobile } = useMediaQuery()

  return (
    <div className="relative">
      <input
        type={isPasswordVisible ? "text" : type}
        autoFocus={autoFocusOnlyOnDesktop ? !isMobile : undefined}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          type === "search" &&
            "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
          type === "file" &&
            "p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground",
          type === "password" ? "hide-password-toggle" : "",
          className,
        )}
        {...props}
      />

      {type === "password" && (
        <button
          className="absolute inset-y-0 right-0 flex items-center rounded-lg px-2.5"
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          aria-label={isPasswordVisible ? "Hide password" : "Show Password"}
        >
          {isPasswordVisible ? (
            <Icons.Eye
              className="size-4 flex-none text-muted-foreground transition hover:text-primary"
              aria-hidden
            />
          ) : (
            <Icons.EyeOff
              className="size-4 flex-none text-muted-foreground transition hover:text-primary"
              aria-hidden
            />
          )}
        </button>
      )}
    </div>
  )
}
Input.displayName = "Input"

export { Input }
